import User from "../models/user.model.js";

const isTeacher = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select("role isTeacher");
    if (!user || user.role !== "teacher" || user.isTeacher !== true) {
      return res.status(403).json({ message: "You are not Teacher" });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "teacher check error",
      error: error.message,
    });
  }
};

export default isTeacher;
