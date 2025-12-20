import Report from "../models/report.model.js";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import Chat from "../models/chat.model.js";
import { io, getSocketId } from "../socket.js";
import Question from "../models/question.model.js";
import Answer from "../models/answer.model.js";

export const approveTeacherApplication = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.isTeacher = true;
    user.isAppliedForTeacherRole = false;
    await user.save();
    io.to(await getSocketId(user?._id)).emit(
      "teacherApplicationApproved",
      user
    );
    io.to(getSocketId(req.userId));
    return res
      .status(200)
      .json({ message: "Teacher role approved successfully", user });
  } catch (error) {
    return res.status(500).json({
      message: "Error to approve teacher application",
      error: error.message,
    });
  }
};

export const disapproveTeacherApplication = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.isTeacher = false;
    user.isAppliedForTeacherRole = false;
    await user.save();
    io.to(getSocketId(user?._id)).emit("teacherApplicationDisapproved", user);
    return res
      .status(200)
      .json({ message: "Teacher role disapproved successfully", user });
  } catch (error) {
    return res.status(500).json({
      message: "Error to disapprove teacher application",
      error: error.message,
    });
  }
};

export const getAllTeacherApplications = async (req, res) => {
  try {
    const users = await User.find({
      isAppliedForTeacherRole: true,
      isTeacher: false,
    }).select("-password");
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({
      message: "Error Fetching teacher applications",
      error: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({
      userName: { $ne: "AI" },
      _id: { $ne: req.userId },
    }).select("-password");
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({
      message: "Error Fetching users",
      error: error.message,
    });
  }
};

export const getCustomUsers = async (req, res) => {
  try {
    const { usersType } = req.params;
    if (!usersType)
      return res.status(400).json({ message: "userType is required" });

    const baseFilter = { userName: { $ne: "AI" }, _id: { $ne: req.userId } };
    let filter = {};

    switch (usersType) {
      case "banned":
        filter = { ...baseFilter, isBanned: true };
        break;
      case "teacher":
        filter = { ...baseFilter, isTeacher: true };
        break;
      case "student":
        filter = { ...baseFilter, role: "student" };
        break;
      default:
        filter = baseFilter;
    }

    const users = await User.find(filter).select("-password");
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
};

export const actionOnSpam = async (req, res) => {
  try {
    const { reportId } = req.params;
    if (!reportId) {
      return res
        .status(400)
        .json({ success: false, message: "ReportId is required" });
    }
    let report = await Report.findById(reportId);
    if (!report) {
      return res
        .status(404)
        .json({ success: false, message: "Report not found" });
    }
    if (report.contentType === "Message") {
      await Message.findByIdAndDelete(report.contentId);
      await Chat.updateMany({}, { $pull: { messages: report.contentId } });
    } else if (report.contentType === "Question") {
      let content = await Question.findById(report.contentId);
      if (!content) {
        return res
          .status(404)
          .json({ success: false, message: "Content not found" });
      }
      await User.findByIdAndUpdate(content.user, {
        $pull: { asked: content._id },
      });
      await Answer.deleteMany({ question: report.contentId });
      await Question.findByIdAndDelete(content._id);
    } else if (report.contentType === "Answer") {
      let content = await Answer.findById(report.contentId);
      if (!content) {
        return res
          .status(404)
          .json({ success: false, message: "Content not found" });
      }
      await User.findByIdAndUpdate(content.user, {
        $pull: { solved: content.question },
      });
      await Question.updateOne(
        { _id: content.question },
        { $pull: { answers: content._id } }
      );
      await Answer.findByIdAndDelete(content._id);
    }
    if (report.reportedUser) {
      await User.findByIdAndUpdate(report.reportedUser, {
        $inc: { spamMarkCount: 1 },
      });
    }
    await Report.deleteOne({ _id: report._id });
    return res.status(200).json({
      success: true,
      message: "Spam handled and cleaned up successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching spams",
      error: error.message,
    });
  }
};

export const allSpam = async (req, res) => {
  try {
    let reports = await Report.find({ sentToAdmin: true })
      .populate("contentId")
      .populate("reportedUser", "userName profileImage")
      .populate("reportingUser", "userName profileImage")
      .sort({ createdAt: -1 });
    return res
      .status(200)
      .json({ success: true, message: "Report fetched Successfully", reports });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching spams",
      error: error.message,
    });
  }
};
