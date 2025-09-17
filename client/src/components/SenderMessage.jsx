import { useEffect, useRef } from "react";
import user from "../assets/user.png";
import { formatTimestamp } from "../utils/formatTimeStamp";

function SenderMessage({ message }) {
  const sender = useRef();
  useEffect(() => {
    sender.current.scrollIntoView({ behavior: "smooth" });
  }, [message?.message]);
  return (
    <div className="w-[90%] self-end sm:pr-4 pr-2 mt-3" ref={sender}>
      <div className="chat chat-end">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={message?.sender?.profileImage || user}
            />
          </div>
        </div>
        <div className="chat-header">{message?.sender?.userName}</div>
        <div className="chat-bubble">{message?.message}</div>
        <div className="chat-footer opacity-50">
          {formatTimestamp(message?.createdAt)}
        </div>
      </div>
    </div>
  );
}

export default SenderMessage;
