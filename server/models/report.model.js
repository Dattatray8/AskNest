import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    reportingUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reportedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reason: {
      type: String,
      required: true,
    },
    contentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "contentType",
    },
    contentType: {
      type: String,
      required: true,
      enum: ["Message", "Question", "Answer"],
    },
    sentToAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);
export default Report;
