import jwt from "jsonwebtoken";

export const generateToken = async(payload) => {
  try {
    const token = await jwt.sign({ id: payload }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return token;
  } catch (error) {
    console.log(`Token generation failed: ${error.message}`);
  }
};