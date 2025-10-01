import Question from "../models/question.model";

export const askedQuestions = async (req, res) => {
  try {
    const { studentId } = req.params;
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
