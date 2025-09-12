import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connection successfull");
  } catch (error) {
    console.log(`Error in Database connection due to : ${error.message}`);
  }
};