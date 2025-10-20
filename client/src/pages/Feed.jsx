import { useNavigate } from "react-router-dom";
import BottomBar from "../components/BottomBar";
import useQuestions from "../hooks/useQuestions";
import { useDispatch, useSelector } from "react-redux";
import EmptyQuestionMessage from "../components/EmptyQuestionMessage";
import Question from "../components/Question";
import { ChevronLeft } from "lucide-react";
import { setPage } from "../redux/questionSlice";

function Feed() {
  const navigation = useNavigate();
  const { loading, hasMore } = useQuestions();
  const { questions, page } = useSelector((state) => state.question);
  const dispatch = useDispatch();

  return (
    <div className="w-full h-full">
      <div className="h-16 sm:flex items-center sm:px-4 px-2 gap-4 hidden">
        <ChevronLeft
          size={28}
          className="cursor-pointer"
          onClick={() => navigation(-1)}
        />
        <p className="card-title">Feed</p>
      </div>
      <div
        className="btn btn-circle fixed bottom-20 right-4 z-100"
        onClick={() => navigation("/ask")}
      >
        <svg
          aria-label="New"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </div>

      {loading ? (
        <div className="flex justify-center items-center w-full h-[100vh]">
          <span className="loading loading-spinner text-neutral h-10 w-10"></span>
        </div>
      ) : questions.length === 0 ? (
        <EmptyQuestionMessage />
      ) : (
        <div
          className={`w-full overflow-y-auto bg-base-300 ${
            !hasMore && "mb-18 sm:mb-0"
          }`}
        >
          {questions.map((q, index) => (
            <Question q={q} key={index} />
          ))}
        </div>
      )}
      {hasMore && (
        <div className="flex justify-center mb-20 sm:mb-0">
          <button
            className="btn m-4"
            onClick={() => dispatch(setPage(page + 1))}
          >
            Load More
          </button>
        </div>
      )}

      <BottomBar tabName={"Feed"} />
    </div>
  );
}

export default Feed;
