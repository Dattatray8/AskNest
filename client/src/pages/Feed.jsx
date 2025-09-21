import { useNavigate } from "react-router-dom";
import BottomBar from "../components/BottomBar";
import useQuestions from "../hooks/useQuestions";
import { useSelector } from "react-redux";
import EmptyQuestionMessage from "../components/EmptyQuestionMessage";
import Question from "../components/Question";

function Feed() {
  const navigation = useNavigate();
  const { loading } = useQuestions();
  const { questions } = useSelector((state) => state.question);

  return (
    <div className="w-full h-full">
      <div
        className="btn btn-circle absolute bottom-20 right-4"
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
        <div className="w-full h-[calc(100vh_-_72px)] overflow-y-auto">
          {questions.map((q, index) => (
            <Question q={q} key={index} />
          ))}
        </div>
      )}

      <BottomBar tabName={"Feed"} />
    </div>
  );
}

export default Feed;
