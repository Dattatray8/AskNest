import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    mediaType: {
      type: String,
      enum: ["image", "video"],
    },
    media: {
      type: String,
    },
    answer: {
      type: String,
      required: true,
    },
    isSpam: {
      type: Boolean,
      default: false,
    },
    verifiedAnswer: {
      type: Boolean,
      default: false,
    },
    gotAnswer: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Answer = mongoose.model("Answer", answerSchema);
export default Answer;
