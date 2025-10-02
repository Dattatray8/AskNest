import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import chatSlice from "./chatSlice";
import questionSlice from "./questionSlice";
import studentSlice from "./studentSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    chat: chatSlice,
    question: questionSlice,
    student: studentSlice,
  },
});
