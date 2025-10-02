import axios from "axios";
import { useEffect, useState } from "react";
import { serverUrl } from "../App";
import toast from "react-hot-toast";

function useAnsweredQuestions(studentId) {
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState([]);
  useEffect(() => {
    const getAnswers = async () => {
      try {
        setLoading(true);
        const result = await axios.get(
          `${serverUrl}/api/v1/student/answered/${studentId}`,
          {
            withCredentials: true,
          }
        );
        setAnswers(result?.data?.answeredQuestion);
      } catch (error) {
        setLoading(false);
        toast.error(error?.response?.data?.message || error?.message);
      } finally {
        setLoading(false);
      }
    };
    getAnswers();
  }, []);
  return { loading, answers };
}

export default useAnsweredQuestions;
