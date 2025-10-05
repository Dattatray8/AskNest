import Answer from "../models/answer.model.js";
import Question from "../models/question.model.js";

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
