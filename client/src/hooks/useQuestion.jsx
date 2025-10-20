import axios from "axios";
import { useEffect, useState } from "react";
import { serverUrl } from "../App";
import toast from "react-hot-toast";

function useQuestion(qId) {
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState();
  useEffect(() => {
    const getQuestion = async () => {
      try {
        setLoading(true);
        const result = await axios.get(`${serverUrl}/api/v1/questions/${qId}`, {
          withCredentials: true,
        });
        setQuestion(result?.data?.question);
      } catch (error) {
        setLoading(false);
        toast.error(error?.response?.data?.message || error?.message);
      } finally {
        setLoading(false);
      }
    };
    getQuestion();
  }, [qId]);
  return { loading, question };
}

export default useQuestion;
