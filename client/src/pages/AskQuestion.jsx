import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setQuestions } from "../redux/questionSlice";

function AskQuestion() {
  const navigation = useNavigate();
  const [question, setQuestion] = useState("");
  let MIN_LENGTH = 10;
  const dispatch = useDispatch();
  const { questions } = useSelector((state) => state.question);

  let voiceRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  let recognition = new voiceRecognition();

  recognition.onresult = (e) => {
    const speakedText = e.results[0][0].transcript;
    console.log(speakedText);
    setQuestion(speakedText);
  };

  const handleAskQuestion = async () => {
    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/questions`,
        { question },
        { withCredentials: true }
      );
      console.log(res);
      dispatch(setQuestions([...questions, res?.data?.populatedQuestion]));
      toast.success(res?.data?.message);
      navigation("/feed");
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="navbar shadow-sm flex justify-between px-3">
        <button className="btn btn-circle" onClick={() => navigation(-1)}>
          ✕
        </button>
        <div className="text-lg font-semibold">Ask your question</div>
        <button className="btn" disabled={question.trim().length < MIN_LENGTH} onClick={handleAskQuestion}>
          Ask it
        </button>
      </div>
      <div className="h-[45vh] p-4">
        <textarea
          className="textarea w-full h-full overflow-y-auto text-[1rem] p-4"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        ></textarea>
      </div>
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
  );
}

export default AskQuestion;
