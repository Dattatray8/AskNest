import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../App";
import { useState } from "react";
import { setQuestions } from "../redux/questionSlice";

function useQuestions() {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const dispatch = useDispatch();
  const { questions, page } = useSelector((state) => state.question);
  console.log(page)
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${serverUrl}/api/v1/questions/page/${page}`, {
          withCredentials: true,
        });
        if (res?.data?.questions.length === 0) {
          setHasMore(false);
          return;
        }
        let allQuestions = [...questions, ...res?.data?.questions];
        let uniqueQuestions = Array.from(
          new Map(allQuestions.map((q) => [q._id, q])).values()
        );
        dispatch(setQuestions(uniqueQuestions));
      } catch (error) {
        setLoading(false);
        toast.error(error?.response?.data?.message || error?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [page, dispatch]);
  return { loading, hasMore };
}

export default useQuestions;
