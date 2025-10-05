import { createSlice } from "@reduxjs/toolkit";

const questionSlice = createSlice({
  name: "question",
  initialState: {
    questions: [],
    loading: false,
    filteredQuestions: [],
  },
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setFilteredQuestions: (state, action) => {
      state.filteredQuestions = action.payload;
    },
  },
});

export const { setQuestions, setLoading, setFilteredQuestions } =
  questionSlice.actions;

export default questionSlice.reducer;
