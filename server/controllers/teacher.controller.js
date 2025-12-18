import Answer from "../models/answer.model.js";
import Question from "../models/question.model.js";
import Report from "../models/report.model.js";
import User from "../models/user.model.js";

export const getAllAnswers = async (req, res) => {
  try {
    const { teacherId } = req.params;
    if (!teacherId) {
      return res
        .status(400)
        .json({ success: false, message: "teacherId required" });
    }
    const answers = await Answer.find({ user: teacherId })
      .populate("question")
      .sort({ createdAt: -1 });

    const answeredQuestion = [];
    const seenQuestionIds = new Set();

    await Promise.all(
      answers.map(async (answer) => {
        const populatedQuestion = await Question.findById(
          answer.question._id
        ).populate("user", "userName profileImage");
        if (
          populatedQuestion &&
          !seenQuestionIds.has(populatedQuestion._id.toString())
        ) {
          answeredQuestion.push(populatedQuestion);
          seenQuestionIds.add(populatedQuestion._id.toString());
        }
      })
    );
    return res.status(200).json({
      success: true,
      answeredQuestion,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in fetching answers",
      error: error.message,
    });
  }
};

export const verifyAnswer = async (req, res) => {
  try {
    const { answerId } = req.params;

    if (!answerId) {
      return res.status(400).json({ message: "AnswerId are required" });
    }

    const teacher = await User.findById(req.userId);
    if (!teacher || teacher.role !== "teacher" || !teacher.isTeacher) {
      return res
        .status(403)
        .json({ message: "You are not a verified teacher" });
    }

    const answer = await Answer.findById(answerId).populate("user");
    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    answer.verifiedAnswer = true;
    await answer.save();

    return res.status(200).json({
      success: true,
      message: "Answer verified successfully",
      updatedAnswer: answer,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error verifying answer",
      error: error.message,
    });
  }
};

export const approveReport = async (req, res) => {
  try {
    const { reportId } = req.body;
    let report = await Report.findById(reportId).populate("contentId");
    if (!report) {
      return res
        .status(404)
        .json({ success: false, message: "Report not found" });
    }
    if (report.sentToAdmin) {
      return res.status(200).json({ message: "Already sent to admin" });
    }
    if (report.contentId) {
      report.contentId.isSpam = true;
      await report.contentId.save();
    }
    report.sentToAdmin = true;
    await report.save();
    return res
      .status(200)
      .json({ success: true, message: "Report sent to admin successully" });
  } catch (error) {
    return res.status(500).json({
      message: "Error approve report",
      error: error.message,
    });
  }
};

export const removeReport = async (req, res) => {
  try {
    const { reportId } = req.body;
    let report = await Report.findById(reportId).select(
      "sentToAdmin reportingUser"
    );
    if (!report) {
      return res
        .status(404)
        .json({ success: false, message: "Report not found" });
    }
    let reportingUser = await User.findById(report.reportingUser).select(
      "spamMarkCount"
    );
    if (reportingUser) {
      reportingUser.spamMarkCount = (reportingUser.spamMarkCount || 0) + 1;
      await reportingUser.save();
    }
    if (!report.sentToAdmin) {
      await Report.deleteOne({ _id: report?._id });
    }
    return res
      .status(200)
      .json({ success: true, message: "Report remove successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Error remove report",
      error: error.message,
    });
  }
};
