import axios from "axios";
import { useEffect, useState } from "react";
import { serverUrl } from "../App";
import toast from "react-hot-toast";

function useAskedQuestions(studentId) {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    const getQuestions = async () => {
      try {
        setLoading(true);
        const result = await axios.get(
          `${serverUrl}/api/v1/student/asked/${studentId}`,
          {
            withCredentials: true,
          }
        );
        setQuestions(result?.data?.questions);
      } catch (error) {
        setLoading(false);
        toast.error(error?.response?.data?.message || error?.message);
      } finally {
        setLoading(false);
      }
    };
    getQuestions();
  }, []);
  return { loading, questions };
}

export default useAskedQuestions;
