import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../App";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/questionSlice";
import { setTeacherAnswers } from "../redux/adminSlice";

function useAllTeacherAnswers(teacherId) {
  const dispatch = useDispatch();
  useEffect(() => {
    const getAllAnswers = async () => {
      try {
        dispatch(setLoading(true));
        const result = await axios.get(
          `${serverUrl}/api/v1/teacher/answered/${teacherId}`,
          {
            withCredentials: true,
          }
        );
        dispatch(setTeacherAnswers(result?.data?.answeredQuestion));
      } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
        toast.error(error?.response?.data?.message || error?.message);
      } finally {
        dispatch(setLoading(false));
      }
    };
    getAllAnswers();
  }, [teacherId]);
}

export default useAllTeacherAnswers;
