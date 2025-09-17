import { useNavigate } from "react-router-dom";
import BottomBar from "../components/BottomBar";
import useQuestions from "../hooks/useQuestions";
import { useSelector } from "react-redux";
import EmptyQuestionMessage from "../components/EmptyQuestionMessage";
import user from "../assets/user.png";
import { formatTimestamp } from "../utils/formatTimeStamp";

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
            <div key={index} className="card shadow-md mb-4 rounded-none">
              <div className="card-body p-4 flex flex-col items-start gap-2">
                <div className="avatar flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full ring ring-primary ring-offset-base-100">
                    <img src={q?.user?.profileImage || user} alt="profile" />
                  </div>
                  <h2 className="font-semibold text-gray-800">
                    {q?.user?.userName || "Anonymous"}
                  </h2>
                  <p>{formatTimestamp(q?.createdAt)}</p>
                </div>
                <div className="w-full">
                  <p className="text line-clamp-2">{q?.question}</p>
                </div>

                <div className="flex items-center justify-end w-full">
                  <button className="btn btn-sm btn-primary">Answer</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <BottomBar tabName={"Feed"} />
    </div>
  );
}

export default Feed;
