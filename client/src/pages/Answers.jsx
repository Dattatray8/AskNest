import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import useQuestion from "../hooks/useQuestion";
import { formatTimestamp } from "../utils/formatTimeStamp";
import user from "../assets/user.png";
import { useEffect, useState } from "react";
import AutoExpandTextarea from "../components/AutoExpandTextArea";
import toast from "react-hot-toast";
import axios from "axios";
import { serverUrl } from "../App";
import { useSelector } from "react-redux";

function Answers() {
  const navigation = useNavigate();
  const { qId } = useParams();
  let { loading, question } = useQuestion(qId);
  const [answerTabOpen, setAnswerTabOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [allAnswers, setAllAnswers] = useState([]);
  const { userData } = useSelector((state) => state.user);

  const getAllAnswers = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/v1/answers/${qId}`, {
        withCredentials: true,
      });
      setAllAnswers(res?.data?.answers);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  useEffect(() => {
    getAllAnswers();
  }, [qId]);

  let MIN_LENGTH = 10;

  let voiceRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  let recognition = new voiceRecognition();

  recognition.onresult = (e) => {
    const speakedText = e.results[0][0].transcript;
    console.log(speakedText);
    setAnswer(speakedText);
  };

  const handleAddAnswer = async () => {
    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/answers/${qId}`,
        { answer },
        { withCredentials: true }
      );
      toast.success(res?.data?.message);
      setAllAnswers([...allAnswers, res?.data?.populatedAnswer]);
      setAnswerTabOpen(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const markAsIGotMyAnswer = async () => {
    try {
      const res = await axios.put(
        `${serverUrl}/api/v1/questions/${qId}/stop`,
        {},
        { withCredentials: true }
      );
      console.log(res);
      toast.success(res?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="navbar shadow-sm flex px-3">
        <button className="btn btn-circle" onClick={() => navigation(-1)}>
          <ChevronLeft />
        </button>
        <div className="text-lg font-semibold m-auto">Question</div>
      </div>
      {loading ? (
        <div className="w-full max-h-[30vh] min-h-[10vh] flex justify-center items-center">
          <span className="loading loading-spinner text-neutral"></span>
        </div>
      ) : (
        <div
          className={`card-body w-full ${
            answerTabOpen ? "opacity-50" : "opacity-100"
          }`}
        >
          <p className="w-full max-h-[30vh] overflow-y-auto whitespace-pre-wrap">
            {question?.question}
          </p>
          <div className="avatar flex items-center gap-4 cursor-pointer">
            <div
              className="w-8 h-8 rounded-full"
              onClick={() => navigation(`/profile/${question?.user?.userName}`)}
            >
              <img src={question?.user?.profileImage || user} alt="profile" />
            </div>
            <h2
              className="font-semibold"
              onClick={() => navigation(`/profile/${question?.user?.userName}`)}
            >
              {question?.user?.userName || "Anonymous"}
            </h2>
            <p className="cursor-default">
              {formatTimestamp(question?.createdAt)}
            </p>
          </div>
        </div>
      )}

      {userData?._id !== question?.user?._id && !question?.stopAnswering && (
        <div
          className={`w-full p-4 absolute bottom-0 ${
            answerTabOpen ? "hidden" : "block"
          }`}
        >
          <button className="btn w-full" onClick={() => setAnswerTabOpen(true)}>
            Answer
          </button>
        </div>
      )}

      {answerTabOpen && (
        <div className="w-full p-4 sm:p-8 h-[80vh] z-[100] fixed bottom-0 right-0 rounded-md">
          <div className="flex px-2 justify-between">
            <button
              className="btn btn-circle"
              onClick={() => setAnswerTabOpen(false)}
            >
              ✕
            </button>
            <p className="font-semibold">Answer</p>
            <button
              className="btn"
              disabled={answer.trim().length < MIN_LENGTH}
              onClick={handleAddAnswer}
            >
              Add
            </button>
          </div>
          <AutoExpandTextarea onChange={(val) => setAnswer(val)} />
          <div className="px-4">
            <ul className="menu w-full menu-horizontal rounded-box">
              <li>
                <a
                  className="tooltip"
                  data-tip="Mic"
                  onClick={() => recognition.start()}
                >
                  <svg
                    aria-label="New voice"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path d="M8 1a2 2 0 0 0-2 2v4a2 2 0 1 0 4 0V3a2 2 0 0 0-2-2Z" />
                    <path d="M4.5 7A.75.75 0 0 0 3 7a5.001 5.001 0 0 0 4.25 4.944V13.5h-1.5a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-1.5v-1.556A5.001 5.001 0 0 0 13 7a.75.75 0 0 0-1.5 0 3.5 3.5 0 1 1-7 0Z" />
                  </svg>
                </a>
              </li>
              <li>
                <a className="tooltip" data-tip="Media">
                  <svg
                    aria-label="New gallery photo"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm10.5 5.707a.5.5 0 0 0-.146-.353l-1-1a.5.5 0 0 0-.708 0L9.354 9.646a.5.5 0 0 1-.708 0L6.354 7.354a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0-.146.353V12a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V9.707ZM12 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}

      <div className={`divider ${answerTabOpen ? "hidden" : ""}`}>
        Answers ({question?.answers?.length || 0})
      </div>

      {allAnswers?.map((ans, index) => (
        <div
          className={`card-body w-full ${
            answerTabOpen ? "opacity-10" : "opacity-100"
          }`}
          key={index}
        >
          <p className="w-full overflow-y-auto whitespace-pre-wrap">
            {ans?.answer}
          </p>
          <div className="avatar flex items-center gap-4 cursor-pointer">
            <div
              className="w-8 h-8 rounded-full"
              onClick={() => navigation(`/profile/${ans?.user?.userName}`)}
            >
              <img src={ans?.user?.profileImage || user} alt="profile" />
            </div>
            <h2
              className="font-semibold"
              onClick={() => navigation(`/profile/${ans?.user?.userName}`)}
            >
              {ans?.user?.userName || "Anonymous"}
            </h2>
            <p className="cursor-default">{formatTimestamp(ans?.createdAt)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Answers;
