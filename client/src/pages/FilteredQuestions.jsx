import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredQuestions } from "../redux/questionSlice";
import { serverUrl } from "../App";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getLabel } from "../utils/getLabel";
import { useEffect, useState } from "react";
import Question from "../components/Question";

function FilteredQuestions() {
  const { tabKey } = useParams();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { filteredQuestions } = useSelector((state) => state.question);
  let tabLabel = getLabel(tabKey);
  const [loading, setLoading] = useState(false);

  const getFilteredQuestions = async (filter) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${serverUrl}/api/v1/questions/filter/${filter}`,
        {},
        { withCredentials: true }
      );
      console.log(res?.data?.questions);
      dispatch(setFilteredQuestions(res?.data?.questions));
    } catch (error) {
      setLoading(true);
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFilteredQuestions(tabKey);
  }, []);
  return (
    <div className="w-full h-full">
      <div className="h-16 shadow-md flex items-center px-2 sm:px-4">
        <ChevronLeft
          size={28}
          className="cursor-pointer"
          onClick={() => navigation(-1)}
        />
        <p className="ml-4 font-semibold text-xl">{tabLabel}</p>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="bg-base-300">
          {filteredQuestions.map((q, idx) => (
            <Question key={idx} q={q} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FilteredQuestions;
