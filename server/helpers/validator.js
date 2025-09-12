import User from "../models/user.model.js";

export const fieldValidator = async (data, rules) => {
  for (const field in rules) {
    const rule = rules[field];
    if (rule.includes("required") && !data[field]) {
      return { valid: false, message: `${field} is required` };
    }
    if (rule.includes("unique") && data[field]) {
      const exists = await User.findOne({ [field]: data[field] });
      if (exists) {
        return { valid: false, message: `${field} already exists` };
      }
    }
    if (field === "password" && data[field]) {
      if (data[field].length < 6) {
        return {
          valid: false,
          message: "Password must be at least 6 characters long.",
        };
      }
    }
  }
  return { valid: true };
};