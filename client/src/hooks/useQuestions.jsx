import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { serverUrl } from "../App";
import { useState } from "react";
import { setQuestions } from "../redux/questionSlice";

function useQuestions() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${serverUrl}/api/v1/questions`, {
          withCredentials: true,
        });
        dispatch(setQuestions(res?.data?.questions));
      } catch (error) {
        setLoading(false);
        toast.error(error?.response?.data?.message || error?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [dispatch]);
  return { loading };
}

export default useQuestions;
