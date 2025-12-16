import { useEffect, useRef, useState } from "react";
import user from "../assets/user.png";
import { formatTimestamp } from "../utils/formatTimeStamp";
import { useNavigate } from "react-router-dom";
import { Volume2, X } from "lucide-react";
import { speakText } from "../utils/speakText";

function ReceiverMessage({ message }) {
  const sender = useRef();
  const navigate = useNavigate();
  const [zoomImage, setZoomImage] = useState(false);

  useEffect(() => {
    sender.current.scrollIntoView({ behavior: "smooth" });
  }, [message?.message]);

  return (
    <div className="w-[90%] self-start sm:pl-4 pl-2" ref={sender}>
      <div className="chat chat-start">
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
        <div className="flex gap-3 py-1">
          <div className="chat-header">{message?.sender?.userName}</div>
          <button
            onClick={() => speakText(message?.message)}
            className="btn btn-circle w-5 h-5 btn-outline"
          >
            <Volume2 className="w-3 h-3" />
          </button>
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
          className="fixed inset-0 bg-black/80 z-[999] flex items-center justify-center"
          onClick={() => setZoomImage(false)}
        >
          <button
            className="btn btn-circle btn-sm btn-ghost absolute top-4 right-4 z-[1000] text-white bg-black/60 hover:bg-black/80"
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
