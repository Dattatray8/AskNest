import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "token is not found" });
    }
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = verifyToken.id;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "authentication error",
        error: error.message,
      });
  }
};

export default isAuth;
