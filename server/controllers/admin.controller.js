import User from "../models/user.model";

export const approveTeacherApplication = async (req, res) => {
  try {
    const isAdmin = await User.findById(req.userId);
    if (!isAdmin || isAdmin.role !== "admin") {
      return res.status(403).json({ message: "You are not Admin" });
    }
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.isTeacher = true;
    user.isAppliedForTeacherRole = false;
    await user.save();
    return res
      .status(200)
      .json({ message: "Teacher role approved successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Error to approve teacher application",
      error: error.message,
    });
  }
};

export const disapproveTeacherApplication = async (req, res) => {
  try {
    const isAdmin = await User.findById(req.userId);
    if (!isAdmin || isAdmin.role !== "admin") {
      return res.status(403).json({ message: "You are not Admin" });
    }
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.isTeacher = false;
    user.isAppliedForTeacherRole = false;
    await user.save();
    return res
      .status(200)
      .json({ message: "Teacher role disapproved successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Error to disapprove teacher application",
      error: error.message,
    });
  }
};
