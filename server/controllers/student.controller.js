import Answer from "../models/answer.model.js";
import Question from "../models/question.model.js";

export const askedQuestions = async (req, res) => {
  try {
    const { studentId } = req.params;
    if (!studentId) {
      return res
        .status(400)
        .json({ success: false, message: "studentId required" });
    }
    const questions = await Question.find({ user: studentId })
      .populate("user", "userName profileImage")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      questions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch questions",
      error: error.message,
    });
  }
};

export const answeredQuestions = async (req, res) => {
  try {
    const { studentId } = req.params;
    if (!studentId) {
      return res
        .status(400)
        .json({ success: false, message: "studentId required" });
    }
    const answers = await Answer.find({ user: studentId })
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
      success: false,
      message: "Failed to fetch answers",
      error: error.message,
    });
  }
};

export const acceptedAnswers = async (req, res) => {
  try {
    const { studentId } = req.params;
    if (!studentId) {
      return res
        .status(400)
        .json({ success: false, message: "studentId required" });
    }
    const answers = await Answer.find({ user: studentId, gotAnswer: true })
      .populate("question")
      .sort({ createdAt: -1 });
    const answerAcceptedQuestion = [];
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
          answerAcceptedQuestion.push(populatedQuestion);
          seenQuestionIds.add(populatedQuestion._id.toString());
        }
      })
    );
    return res.status(200).json({
      success: true,
      answerAcceptedQuestion,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch answers",
      error: error.message,
    });
  }
};

export const verifiedAnswers = async (req, res) => {
  try {
    const { studentId } = req.params;
    if (!studentId) {
      return res
        .status(400)
        .json({ success: false, message: "studentId required" });
    }
    const answers = await Answer.find({ user: studentId, verifiedAnswer: true })
      .populate("question")
      .sort({ createdAt: -1 });
    const answerVerifiedQuestion = [];
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
          answerVerifiedQuestion.push(populatedQuestion);
          seenQuestionIds.add(populatedQuestion._id.toString());
        }
      })
    );
    return res.status(200).json({
      success: true,
      answerVerifiedQuestion,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch answers",
      error: error.message,
    });
  }
};
