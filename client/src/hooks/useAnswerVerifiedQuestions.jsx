import axios from "axios";
import { useEffect, useState } from "react";
import { serverUrl } from "../App";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/questionSlice";
import { setQuestionsVerifed } from "../redux/studentSlice";

function useAnswerVerifiedQuestions(studentId) {
  const dispatch = useDispatch();
  useEffect(() => {
    const getAcceptedAnswers = async () => {
      try {
        dispatch(setLoading(true));
        const result = await axios.get(
          `${serverUrl}/api/v1/student/answered/verified/${studentId}`,
          {
            withCredentials: true,
          }
        );
        dispatch(setQuestionsVerifed(result?.data?.answerVerifiedQuestion));
      } catch (error) {
        dispatch(setLoading(false));
        toast.error(error?.response?.data?.message || error?.message);
      } finally {
        dispatch(setLoading(false));
      }
    };
    getAcceptedAnswers();
  }, [studentId]);
}

export default useAnswerVerifiedQuestions;
