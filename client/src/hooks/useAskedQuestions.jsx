import axios from "axios";
import { useEffect, useState } from "react";
import { serverUrl } from "../App";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/questionSlice";
import { setQuestionsAsked } from "../redux/studentSlice";

function useAskedQuestions(studentId) {
  const dispatch = useDispatch();
  useEffect(() => {
    const getAskedQuestions = async () => {
      try {
        dispatch(setLoading(true));
        const result = await axios.get(
          `${serverUrl}/api/v1/student/asked/${studentId}`,
          {
            withCredentials: true,
          }
        );
        dispatch(setQuestionsAsked(result?.data?.questions));
      } catch (error) {
        dispatch(setLoading(false));
        toast.error(error?.response?.data?.message || error?.message);
      } finally {
        dispatch(setLoading(false));
      }
    };
    getAskedQuestions();
  }, [studentId]);
}

export default useAskedQuestions;
