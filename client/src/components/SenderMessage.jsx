import { useEffect, useRef, useState } from "react";
import user from "../assets/user.png";
import { formatTimestamp } from "../utils/formatTimeStamp";
import { useNavigate } from "react-router-dom";
import { Volume2, X } from "lucide-react";
import { speakText } from "../utils/speakText";

function SenderMessage({ message }) {
  const sender = useRef();
  const navigate = useNavigate();
  const [zoomImage, setZoomImage] = useState(false);
  useEffect(() => {
    sender.current.scrollIntoView({ behavior: "smooth" });
  }, [message?.message]);
  return (
    <div className="w-[90%] self-end sm:pr-4 pr-2 mt-3" ref={sender}>
      <div className="chat chat-end">
        <div className="flex gap-3 py-1">
          <div className="chat-header">{message?.sender?.userName}</div>
          <button
            onClick={() => speakText(message?.message)}
            className="btn btn-circle w-5 h-5 btn-outline"
          >
            <Volume2 className="w-3 h-3" />
          </button>
        </div>
        <div className="chat-image avatar">
          <div className="w-8 h-8 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              className="cursor-pointer"
              onClick={() => navigate(`/profile/${message?.sender?.userName}`)}
              src={message?.sender?.profileImage || user}
            />
          </div>
        </div>
        <div className="chat-bubble flex flex-col">
          {message?.media &&
            (message?.mediaType === "image" ? (
              <img
                src={message?.media}
                alt="media"
                className="w-[200px] cursor-pointer"
                onClick={() => setZoomImage(true)}
              />
            ) : (
              <video src={message?.media} controls className="w-[200px]" />
            ))}
          <p className="m-1">{message?.message}</p>
        </div>
        <div className="chat-footer opacity-50">
          {formatTimestamp(message?.createdAt)}
        </div>
      </div>
      {zoomImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex justify-center items-center"
          onClick={() => setZoomImage(false)}
        >
          <img
            src={message?.media}
            alt="zoomed"
            className="max-w-[90%] max-h-[90%] object-contain rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
}

export default SenderMessage;
