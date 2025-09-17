import { useNavigate } from "react-router-dom";

function EmptyQuestionMessage() {
  const navigation = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-120px)] px-6">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <svg
            className="w-24 h-24 mx-auto text-base-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h3 className="text-xl font-semibold text-base-content mb-2">
          No Questions Yet
        </h3>

        <p className="text-base-content/70 mb-6">
          Be the first to spark a conversation! Ask a question and get the
          discussion started.
        </p>

        <button
          className="btn btn-primary btn-wide"
          onClick={() => navigation("/ask")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Ask a Question
        </button>
      </div>
    </div>
  );
}

export default EmptyQuestionMessage;
