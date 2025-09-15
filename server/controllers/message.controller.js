import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.userId;
    const { message } = req.body;
    const newMessage = await Message.create({
      sender: senderId,
      message,
    });
    let chat = await Chat.findOne();
    if (!chat) {
      chat = await Chat.create({ messages: [newMessage._id] });
    } else {
      chat.messages.push(newMessage._id);
      await chat.save();
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
    let chat = await Chat.findOne().populate("messages");
    if (!chat) {
      return res.status(200).json({
        success: true,
        message: "No messages found",
        messages: [],
      });
    }
    return res
      .status(200)
      .json({
        message: "All messages fetched successfully",
        messages: chat.messages,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Get All Messages Failed : ${error.message}` });
  }
};
