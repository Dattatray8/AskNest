import Question from "../models/question.model.js";
import User from "../models/user.model.js";
import Answer from "../models/answer.model.js";

export const answer = async (req, res) => {
  try {
    const { answer } = req.body;
    const { questionId } = req.params;
    let question = await Question.findById(questionId).populate("user");
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    const user = await User.findById(req.userId);
    if (user?._id.equals(question?.user?._id)) {
      return res.status(403).json({
        success: false,
        message: "You cannot answer your own question",
      });
    }
    if (question.stopAnswering) {
      return res.status(400).json({ message: "Asker got his answer" });
    }
    const newAnswer = await Answer.create({
      answer,
      user: req.userId,
    });
    question.answers.push(newAnswer?._id);
    user.solved.push(newAnswer?._id);
    await question.save();
    await user.save();
    const populatedAnswer = await Answer.findById(newAnswer?._id).populate(
      "user"
    );
    return res.status(201).json({
      success: true,
      message: "Answer created successfully",
      populatedAnswer,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Answer Creation Failed : ${error.message}` });
  }
};
