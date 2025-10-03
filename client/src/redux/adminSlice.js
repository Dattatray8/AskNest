import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    teacherApplications: [],
    allUsers: [],
  },
  reducers: {
    setTeacherApplications: (state, action) => {
      state.teacherApplications = action.payload;
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
  },
});

export const { setTeacherApplications, setAllUsers } = adminSlice.actions;

export default adminSlice.reducer;
