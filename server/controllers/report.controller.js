import Report from "../models/report.model.js";
import { io } from "../socket.js";

export const createReport = async (req, res) => {
  try {
    const { reason, reportedUserId, contentId, contentType } = req.body;
    if (!reportedUserId || !contentId) {
      return res.status(400).json({
        success: false,
        message: "Content or Reported User Must be exists",
      });
    }
    if (!reason || !contentType) {
      return res.status(400).json({
        success: false,
        message: "Reporting reason or content type is required!",
      });
    }
    let report = await Report.create({
      reportingUser: req.userId,
      reportedUser: reportedUserId,
      contentId: contentId,
      reason,
      contentType,
    });
    // notify all verified teachers
    io.to("verified-teachers").emit("newReport", report);
    return res
      .status(201)
      .json({ success: true, message: "Report Sent Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Report Creation Failed : ${error.message}` });
  }
};

export const getReports = async (_, res) => {
  try {
    const reports = await Report.find({ sentToAdmin: false })
      .sort({ createdAt: -1 })
      .populate("contentId")
      .populate("reportingUser", "profileImage userName")
      .populate("reportedUser", "profileImage userName");
    return res.status(200).json({ success: true, reports });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Report Fetch Failed : ${error.message}` });
  }
};
