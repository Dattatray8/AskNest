import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      enum: ["student", "teacher", "admin"],
    },
    userName: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    bio: {
      type: String,
    },
    profession: {
      type: String,
    },
    forgotPassword: {
      resetOtp: {
        type: String,
      },
      otpExpires: {
        type: Date,
      },
      isOtpVerified: {
        type: Boolean,
        default: false,
      },
    },
    fcmToken: {
      type: String,
      default: null,
    },
    asked: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    solved: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    spamMarkCount: {
      type: Number,
      default: 0,
    },
    isAppliedForTeacherRole: {
      type: Boolean,
      default: false,
    },
    isTeacher: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    banDuration: {
      type: Date,
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
