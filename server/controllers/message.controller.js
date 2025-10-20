import uploadOnCloudinary from "../config/cloudinary.js";
import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { io } from "../socket.js";
import { askToGemini } from "./gemini.controller.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.userId;
    const { message, mediaType } = req.body;
    let media;
    if (req.file) {
      media = await uploadOnCloudinary(req.file.path);
    }
    let newMessage = await Message.create({
      sender: senderId,
      message,
      media: media || null,
      mediaType: mediaType || null,
    });
    newMessage = await newMessage.populate("sender");
    let chat = await Chat.findOne();
    if (!chat) {
      chat = await Chat.create({ messages: [newMessage._id] });
    } else {
      chat.messages.push(newMessage._id);
      await chat.save();
    }
    io.emit("newMessage", newMessage);
    let geminiRes = null;
    if (message.slice(0, 3) === "@ai") {
      try {
        geminiRes = await askToGemini(message);
        let ai = await User.findOne({ userName: "AI" }).select("-password");
        const aiMessage = await Message.create({
          sender: ai?._id,
          message: geminiRes,
        });
        await aiMessage.populate("sender");
        chat.messages.push(aiMessage._id);
        await chat.save();

        io.emit("newMessage", aiMessage);
      } catch (err) {
        console.error("Gemini error:", err.message);
      }
    }
    return res.status(201).json({
      success: true,
      message: "Message send successfully",
      newMessage,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Send Message Failed : ${error.message}` });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    let chat = await Chat.findOne().populate({
      path: "messages",
      populate: { path: "sender", select: "name userName profileImage" },
    });
    if (!chat) {
      return res.status(200).json({
        success: true,
        message: "No messages found",
        messages: [],
      });
    }
    return res.status(200).json({
      message: "All messages fetched successfully",
      messages: chat.messages,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Get All Messages Failed : ${error.message}` });
  }
};
