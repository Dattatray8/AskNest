import { useRef } from "react";
import user from "../assets/user.png";
import { useEffect } from "react";

function ReceiverMessage({ message }) {
  const sender = useRef();
  useEffect(() => {
    sender.current.scrollIntoView({ behavior: "smooth" });
  }, [message?.message]);
  return (
    <div className="w-[90%] self-start sm:pl-4 pl-2" ref={sender}>
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt="Tailwind CSS chat bubble component" src={message?.sender?.profileImage || user} />
          </div>
        </div>
        <div className="chat-header">{message?.sender?.userName}</div>
        <div className="chat-bubble">{message?.message}</div>
        <div className="chat-footer opacity-50">
          {message?.createdAt
            ? new Date(message.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "Now"}
        </div>
      </div>
    </div>
  );
}

export default ReceiverMessage;
