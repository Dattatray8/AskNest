import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import chatSlice from "./chatSlice";
import questionSlice from "./questionSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    chat: chatSlice,
    question: questionSlice,
  },
});
