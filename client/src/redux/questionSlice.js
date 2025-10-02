import { createSlice } from "@reduxjs/toolkit";

const questionSlice = createSlice({
  name: "question",
  initialState: {
    questions: [],
    loading: false,
  },
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setQuestions, setLoading } = questionSlice.actions;

export default questionSlice.reducer;
