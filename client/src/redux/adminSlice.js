import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    teacherApplications: [],
    allUsers: [],
    teacherAnswers: [],
  },
  reducers: {
    setTeacherApplications: (state, action) => {
      state.teacherApplications = action.payload;
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setTeacherAnswers: (state, action) => {
      state.teacherAnswers = action.payload;
    },
  },
});

export const { setTeacherApplications, setAllUsers, setTeacherAnswers } =
  adminSlice.actions;

export default adminSlice.reducer;
