import User from "../models/user.model.js";

const isAdmin = async (req, res, next) => {
  try {
    const isAdmin = await User.findById(req.userId);
    if (!isAdmin || isAdmin.role !== "admin") {
      return res.status(403).json({ message: "You are not Admin" });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "admin check error",
      error: error.message,
    });
  }
};

export default isAdmin;
