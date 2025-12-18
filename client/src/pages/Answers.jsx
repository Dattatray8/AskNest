import {
  Check,
  CheckCircle,
  ChevronLeft,
  Copy,
  MoreHorizontal,
  MoreVertical,
  Volume2,
  X,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import useQuestion from "../hooks/useQuestion";
import { formatTimestamp } from "../utils/formatTimeStamp";
import userImg from "../assets/user.png";
import { useEffect, useRef, useState } from "react";
import AutoExpandTextarea from "../components/AutoExpandTextArea";
import toast from "react-hot-toast";
import axios from "axios";
import { serverUrl } from "../App";
import { useSelector } from "react-redux";
import { speakText } from "../utils/speakText";
import VideoPlayer from "../components/VideoPlayer";
import useCurrentUser from "../hooks/auth/useCurrentUser";

function Answers() {
  const navigation = useNavigate();
  const { qId } = useParams();
  let { loading, question } = useQuestion(qId);
  const [answerTabOpen, setAnswerTabOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [allAnswers, setAllAnswers] = useState([]);
  const { userData } = useSelector((state) => state.user);
  const [zoomQuestionImage, setQuestionZoomImage] = useState(false);
  const [zoomAnswerImage, setAnswerZoomImage] = useState(null);
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const imageInput = useRef();
  const [mediaType, setMediaType] = useState("");
  const [copied, setCopied] = useState(false);
  const [showReportInBox, setShowReportInBox] = useState(false);
  const reportDialogRef = useRef(null);
  const { user } = useCurrentUser();

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.err("Failed to copy text: ", err);
      console.error("Failed to copy text: ", err);
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.includes("image")) {
        setMediaType("image");
      } else {
        setMediaType("video");
      }
      setBackendImage(file);
      setFrontendImage(URL.createObjectURL(file));
    }
  };

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
      console.log(answer);
      const formData = new FormData();
      formData.append("answer", answer);
      formData.append("mediaType", mediaType);
      formData.append("media", backendImage);
      const res = await axios.post(
        `${serverUrl}/api/v1/answers/${qId}`,
        formData,
        { withCredentials: true }
      );
      toast.success(res?.data?.message);
      setAllAnswers([...allAnswers, res?.data?.populatedAnswer]);
      setAnswerTabOpen(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const markAsIGotMyAnswer = async (ansId) => {
    try {
      const res = await axios.put(
        `${serverUrl}/api/v1/questions/${qId}/${ansId}/stop`,
        {},
        { withCredentials: true }
      );
      console.log(res);
      toast.success(res?.data?.message);
      setAllAnswers((prev) =>
        prev.map((a) => (a._id === ansId ? { ...a, gotAnswer: true } : a))
      );
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const verifyAnswer = async (ansId) => {
    try {
      const res = await axios.put(
        `${serverUrl}/api/v1/teacher/verify/${ansId}`,
        {},
        { withCredentials: true }
      );
      console.log(res);
      toast.success(res?.data?.message);
      setAllAnswers((prev) =>
        prev.map((a) => (a._id === ansId ? { ...a, verifiedAnswer: true } : a))
      );
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  useEffect(() => {
    if (showReportInBox && reportDialogRef.current) {
      reportDialogRef.current.showModal();
    }
  }, [showReportInBox]);

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
          {question?.media && question?.mediaType === "image" && (
            <div className="w-full h-[20vh]">
              <img
                src={question?.media}
                alt="selected image"
                className="h-full w-full object-cover cursor-pointer"
                onClick={() => setQuestionZoomImage(true)}
              />
            </div>
          )}
          {question?.media && question?.mediaType === "video" && (
            <VideoPlayer video={question?.media} />
          )}
          <p className="w-full max-h-[30vh] overflow-y-auto whitespace-pre-wrap">
            {question?.question}
          </p>
          <div className="flex items-center justify-end gap-1">
            <button
              onClick={() => speakText(question?.question)}
              className="btn btn-circle w-5 h-5 btn-outline"
            >
              <Volume2 className="w-3 h-3" />
            </button>
            <button
              onClick={() => copyToClipboard(question?.question)}
              className="btn btn-ghost btn-xs opacity-60 hover:opacity-100 transition-opacity"
              title="Copy response"
            >
              {copied ? (
                <CheckCircle className="w-3 h-3 text-green-500" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </button>
            {user?.userName !== "Admin" && (
              <details className="dropdown dropdown-end">
                <summary className="btn btn-circle w-6 h-6">
                  <MoreHorizontal size={15} />
                </summary>
                <ul className="menu dropdown-content">
                  <li
                    className="cursor-pointer btn"
                    onClick={() => {
                      setShowReportInBox(true);
                    }}
                  >
                    Report
                  </li>
                </ul>
              </details>
            )}
          </div> 
          {showReportInBox && (
            <div>
              <dialog ref={reportDialogRef} id="my_modal_1" className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Give Report Reason</h3>
                  <input
                    type="text"
                    placeholder="Report Reason"
                    className="input my-4"
                  />
                  <div className="modal-action">
                    <form method="dialog">
                      <button
                        className="btn"
                        onClick={() => setShowReportInBox(false)}
                      >
                        Send Report
                      </button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
          )}
          <div className="avatar flex items-center gap-4 cursor-pointer">
            <div
              className="w-8 h-8 rounded-full"
              onClick={() => navigation(`/profile/${question?.user?._id}`)}
            >
              <img
                src={question?.user?.profileImage || userImg}
                alt="profile"
              />
            </div>
            <h2
              className="font-semibold"
              onClick={() => navigation(`/profile/${question?.user?._id}`)}
            >
              {question?.user?.userName || "Anonymous"}
            </h2>
            <p className="cursor-default">
              {formatTimestamp(question?.createdAt)}
            </p>
          </div>
        </div>
      )}
      {zoomQuestionImage && (
        <div
          className="fixed inset-0 bg-black/80 z-999 flex items-center justify-center"
          onClick={() => setQuestionZoomImage(false)}
        >
          <button
            className="btn btn-circle btn-sm btn-ghost absolute top-4 right-4 z-1000 text-white bg-black/60 hover:bg-black/80"
            onClick={() => setQuestionZoomImage(false)}
          >
            <X size={22} />
          </button>

          <img
            src={question?.media}
            alt="zoomed"
            className="max-w-[90%] max-h-[90%] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
      {userData?._id !== question?.user?._id && !question?.stopAnswering && (
        <div
          className={`w-full p-4 fixed bottom-0 ${
            answerTabOpen ? "hidden" : "block"
          }`}
        >
          <button className="btn w-full" onClick={() => setAnswerTabOpen(true)}>
            Answer
          </button>
        </div>
      )}

      {answerTabOpen && (
        <div className="w-full p-4 sm:p-8 h-[80vh] z-100 fixed bottom-0 right-0 rounded-md overflow-y-auto">
          <div className="flex p-2 justify-between">
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
          <AutoExpandTextarea
            onChange={(val) => setAnswer(val)}
            answer={answer}
            img={frontendImage}
            mediaType={mediaType}
          />
          <div className="px-4 fixed bottom-0 right-0 mb-4">
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
              <input
                type="file"
                accept="image/*,video/*"
                ref={imageInput}
                hidden
                onChange={handleImage}
              />
              <li>
                <a
                  className="tooltip"
                  data-tip="Media"
                  onClick={() => imageInput.current.click()}
                >
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
        Answers ({allAnswers?.length || 0})
      </div>

      {allAnswers?.map((ans, index) => (
        <div
          className={`card-body mb-12 w-full ${
            answerTabOpen ? "opacity-10" : "opacity-100"
          }`}
          key={index}
        >
          <div className="flex gap-2">
            {ans?.gotAnswer && (
              <div className="badge badge-outline badge-warning rounded-full">
                Accepted
              </div>
            )}
            {ans?.verifiedAnswer && (
              <div className="badge badge-outline badge-success rounded-full">
                Verified
              </div>
            )}
          </div>
          {ans?.media && ans?.mediaType === "image" && (
            <div className="w-full h-[20vh]">
              <img
                src={ans.media}
                alt="answer image"
                className="h-full w-full object-cover cursor-pointer"
                onClick={() => setAnswerZoomImage(ans.media)}
              />
            </div>
          )}
          {ans?.media && ans?.mediaType === "video" && (
            <VideoPlayer video={ans?.media} />
          )}
          <p className="w-full overflow-y-auto whitespace-pre-wrap">
            {ans?.answer}
          </p>
          <div className="flex items-center justify-end gap-1">
            <button
              onClick={() => speakText(ans?.answer)}
              className="btn btn-circle w-5 h-5 btn-outline"
            >
              <Volume2 className="w-3 h-3" />
            </button>
            <button
              onClick={() => copyToClipboard(ans?.answer)}
              className="btn btn-ghost btn-xs opacity-60 hover:opacity-100 transition-opacity"
              title="Copy response"
            >
              {copied ? (
                <CheckCircle className="w-3 h-3 text-green-500" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </button>
            {user?.userName !== "Admin" && (
              <details className="dropdown dropdown-end">
                <summary className="btn btn-circle w-6 h-6">
                  <MoreHorizontal size={15} />
                </summary>
                <ul className="menu dropdown-content">
                  <li
                    className="cursor-pointer btn"
                    onClick={() => {
                      setShowReportInBox(true);
                    }}
                  >
                    Report
                  </li>
                </ul>
              </details>
            )}
          </div>
          {showReportInBox && (
            <div>
              <dialog ref={reportDialogRef} id="my_modal_1" className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Give Report Reason</h3>
                  <input
                    type="text"
                    placeholder="Report Reason"
                    className="input my-4"
                  />
                  <div className="modal-action">
                    <form method="dialog">
                      <button
                        className="btn"
                        onClick={() => setShowReportInBox(false)}
                      >
                        Send Report
                      </button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
          )}
          <div className="avatar flex items-center gap-4 cursor-pointer">
            <div
              className="w-8 h-8 rounded-full"
              onClick={() => navigation(`/profile/${ans?.user?._id}`)}
            >
              <img src={ans?.user?.profileImage || userImg} alt="profile" />
            </div>
            <h2
              className="font-semibold"
              onClick={() => navigation(`/profile/${ans?.user?._id}`)}
            >
              {ans?.user?.userName || "Anonymous"}
            </h2>
            <span className="cursor-default">
              {formatTimestamp(ans?.createdAt)}
            </span>
            {ans?.user?.role === "teacher" && ans?.user?.isTeacher && (
              <div className="flex justify-center items-center p-0.5 bg-success rounded-full">
                <Check
                  size={"1rem"}
                  className="text-base-100 flex justify-center"
                />
              </div>
            )}

            {userData?._id === question?.user?._id &&
              question?.user?.role === "student" &&
              !question?.stopAnswering && (
                <details className="dropdown dropdown-end absolute right-0">
                  <summary className="btn m-1 p-0 btn-circle">
                    <MoreVertical />
                  </summary>
                  <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-lg">
                    <li>
                      <a onClick={() => markAsIGotMyAnswer(ans?._id)}>Accept</a>
                    </li>
                  </ul>
                </details>
              )}

            {userData?._id !== ans?.user?._id &&
              userData?.role === "teacher" &&
              userData?.isTeacher &&
              !ans?.verifiedAnswer && (
                <details className="dropdown dropdown-end absolute right-0">
                  <summary className="btn m-1 p-0 btn-circle">
                    <MoreVertical />
                  </summary>
                  <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-lg">
                    <li>
                      <a onClick={() => verifyAnswer(ans?._id)}>
                        Mark As Verified
                      </a>
                    </li>
                  </ul>
                </details>
              )}
          </div>
        </div>
      ))}

      {zoomAnswerImage && (
        <div
          className="fixed inset-0 bg-black/80 z-999 flex items-center justify-center"
          onClick={() => setAnswerZoomImage(null)}
        >
          <button
            className="btn btn-circle btn-sm btn-ghost absolute top-4 right-4 z-1000 text-white bg-black/60 hover:bg-black/80"
            onClick={() => setAnswerZoomImage(null)}
          >
            <X size={22} />
          </button>

          <img
            src={zoomAnswerImage}
            alt="zoomed answer"
            className="max-w-[90%] max-h-[90%] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

export default Answers;
