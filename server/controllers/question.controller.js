import Answer from "../models/answer.model.js";
import Question from "../models/question.model.js";
import User from "../models/user.model.js";

export const askQuestion = async (req, res) => {
  try {
    const { question } = req.body;
    const newQuestion = await Question.create({
      question,
      user: req.userId,
    });
    const user = await User.findById(req.userId).populate("asked");
    user.asked.push(newQuestion?._id);
    await user.save();
    const populatedQuestion = await Question.findById(
      newQuestion?._id
    ).populate("user");
    return res.status(201).json({
      success: true,
      message: "Question Posted Successfully",
      populatedQuestion,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Question Creation Failed : ${error.message}` });
  }
};

export const getQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const question = await Question.findById(questionId)
      .populate("user", "userName profileImage role")
      .populate("answers answers.user");
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Question fetched successfully",
      question,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Questio Fetch Failed : ${error.message}` });
  }
};

export const allQuestions = async (req, res) => {
  try {
    const { page } = req.params;
    let limit = 5;
    let skip = (page - 1) * limit;
    const questions = await Question.find()
      .skip(skip)
      .limit(limit)
      .populate("user", "userName profileImage")
      .populate("answers")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Questions Fetched Successfully",
      questions,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `All Question Fetch Failed : ${error.message}` });
  }
};

export const iGotMyAnswer = async (req, res) => {
  try {
    const questionId = req.params.questionId;
    const answerId = req.params.answerId;
    let question = await Question.findById(questionId).populate("user");
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    let answer = await Answer.findById(answerId).populate("user");
    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }
    const user = await User.findById(req.userId);
    if (user?._id.equals(question?.user?._id)) {
      question.stopAnswering = true;
      answer.gotAnswer = true;
      await answer.save();
      await question.save();
    } else {
      return res.status(403).json({ message: "You are not questions author." });
    }
    return res.status(200).json({
      success: true,
      message: "Stopped talking answers",
      updatedAnswer: answer,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Stop Answering Failed : ${error.message}` });
  }
};

export const getCustomQuestions = async (req, res) => {
  try {
    const { questionType } = req.params;
    if (!questionType)
      return res.status(400).json({ message: "questionType is required" });

    let filter = {};

    switch (questionType) {
      case "unanswered":
        filter = { answers: { $size: 0 } };
        break;
      case "accepted":
        filter = { stopAnswering: true };
        break;
      case "t_answers":
        filter = {};
      default:
        filter = {};
    }
    const questions = await Question.find(filter)
      .populate("user", "userName profileImage")
      .populate("answers")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Questions Fetched Successfully",
      questions,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching questions",
      error: error.message,
    });
  }
};
