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
      .populate("user", "userName profileImage")
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
    const questions = await Question.find()
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
    let question = await Question.findById(questionId).populate("user");
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    const user = await User.findById(req.userId);
    if (user?._id.equals(question?.user?._id)) {
      question.stopAnswering = true;
      await question.save();
    } else {
      return res.status(403).json({ message: "You are not questions author." });
    }
    return res
      .status(200)
      .json({ success: true, message: "Stopped talking answers" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Stop Answering Failed : ${error.message}` });
  }
};
