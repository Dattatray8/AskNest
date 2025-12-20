import { useEffect, useRef, useState } from "react";
import userImg from "../assets/user.png";
import { formatTimestamp } from "../utils/formatTimeStamp";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle, Copy, MoreHorizontal, Volume2, X } from "lucide-react";
import { speakText } from "../utils/speakText";
import VideoPlayer from "./VideoPlayer";
import useCurrentUser from "../hooks/auth/useCurrentUser";
import toast from "react-hot-toast";
import { useSendReport } from "../hooks/useSendReport";

function ReceiverMessage({ message }) {
  const sender = useRef();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const messageId = searchParams.get('messageId');
  const [zoomImage, setZoomImage] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showReportInBox, setShowReportInBox] = useState(false);
  const reportDialogRef = useRef(null);
  const { user } = useCurrentUser();
  const [reason, setReason] = useState("");
  let { loading, sendReport } = useSendReport();

  const isHighlighted = message?._id === messageId;

  useEffect(() => {
    if (isHighlighted && sender.current) {
      setTimeout(() => {
        sender.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 500);
    } else {
      sender.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message?.message, isHighlighted]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(message?.message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.err("Failed to copy text: ", err);
      console.error("Failed to copy text: ", err);
    }
  };

  useEffect(() => {
    if (showReportInBox && reportDialogRef.current) {
      reportDialogRef.current.showModal();
    }
  }, [showReportInBox]);

  return (
    <div 
      className={`w-[90%] self-start sm:pl-4 pl-2 transition-all duration-300 ${
        isHighlighted ? 'ring-4 ring-warning rounded-lg p-2 bg-warning/10' : ''
      }`} 
      ref={sender}
    >
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-8 h-8 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              className="cursor-pointer"
              onClick={() => navigate(`/profile/${message?.sender?.userName}`)}
              src={message?.sender?.profileImage || userImg}
            />
          </div>
        </div>
        <div className="flex gap-3 py-1 items-center">
          <div className="chat-header">{message?.sender?.userName}</div>
          <div className="flex items-center">
            <button
              onClick={() => speakText(message?.message)}
              className="btn btn-circle w-5 h-5 btn-outline"
            >
              <Volume2 className="w-3 h-3" />
            </button>
            <button
              onClick={copyToClipboard}
              className="btn btn-ghost btn-xs opacity-60 hover:opacity-100 transition-opacity"
              title="Copy response"
            >
              {copied ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
            {user?.userName !== "Admin" && (
              <details className="dropdown">
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
                  value={reason}
                  onChange={(e) => {
                    setReason(e.target.value);
                  }}
                />
                <div className="modal-action">
                  <form method="dialog">
                    <button
                      className="btn"
                      disabled={loading}
                      onClick={async () => {
                        setShowReportInBox(false);
                        await sendReport(
                          reason,
                          message?.sender?._id,
                          message?._id,
                          "Message"
                        );
                      }}
                    >
                      Send Report
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        )}
        <div className="chat-bubble flex flex-col">
          {message?.media &&
            (message?.mediaType === "image" ? (
              <img
                src={message?.media}
                alt="media"
                className="w-50 cursor-pointer"
                onClick={() => setZoomImage(true)}
              />
            ) : (
              <VideoPlayer video={message?.media} />
            ))}
          <p className="m-1">{message?.message}</p>
        </div>
        <div className="chat-footer opacity-50">
          {formatTimestamp(message?.createdAt)}
        </div>
      </div>

      {zoomImage && (
        <div
          className="fixed inset-0 bg-black/80 z-999 flex items-center justify-center"
          onClick={() => setZoomImage(false)}
        >
          <button
            className="btn btn-circle btn-sm btn-ghost absolute top-4 right-4 z-1000 text-white bg-black/60 hover:bg-black/80"
            onClick={() => setZoomImage(false)}
          >
            <X size={22} />
          </button>

          <img
            src={message?.media}
            alt="zoomed"
            className="max-w-[90%] max-h-[90%] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

export default ReceiverMessage;
