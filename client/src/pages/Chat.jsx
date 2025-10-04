import axios from "axios";
import { ChevronLeft, Video } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SenderMessage from "../components/SenderMessage";
import ReceiverMessage from "../components/ReceiverMessage";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addMessage, setMessages } from "../redux/chatSlice";
import { useSocket } from "../hooks/useSocket";
import { useContext } from "react";
import SocketContext from "../context/SocketContext";
import AiResponse from "../components/AiResponse";

function Chat() {
  const navigation = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.chat);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { socket } = useSocket();
  const { onlineUsers } = useContext(SocketContext);
  const [sendLoading, setSendLoading] = useState(false);

  let voiceRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  let recognition = new voiceRecognition();

  recognition.onresult = (e) => {
    const speakedText = e.results[0][0].transcript;
    console.log(speakedText);
    setMessage(speakedText);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message === "") {
      toast.error("Type a message");
      return;
    }
    try {
      setSendLoading(true);
      //   const formdata = new FormData();
      //   formdata.append("message", message);
      await axios.post(
        `${serverUrl}/api/v1/chat/send`,
        { message },
        { withCredentials: true }
      );
      setMessage("");
    } catch (error) {
      setSendLoading(false);
      console.log(error?.response?.data?.message || error?.message);
      toast.error(error?.response?.data?.message || error?.message);
      setMessage("");
    } finally {
      setSendLoading(false);
    }
  };

  const getAllMessages = async () => {
    try {
      setLoading(true);
      const result = await axios.get(`${serverUrl}/api/v1/chat/getmessages`, {
        withCredentials: true,
      });
      dispatch(setMessages(result?.data?.messages));
    } catch (error) {
      console.log(error?.response?.data?.message || error?.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllMessages();
  }, [dispatch]);

  useEffect(() => {
    socket?.on("newMessage", (msg) => {
      dispatch(addMessage(msg));
    });
    return () => socket?.off("newMessage");
  }, [dispatch, socket]);

  return (
    <div className="w-full h-[100vh] flex flex-col relative overflow-x-hidden">
      <div className="h-20 shadow-md flex items-center fixed top-0 right-0 left-0 z-[100]">
        <ChevronLeft
          size={28}
          className="cursor-pointer mx-4"
          onClick={() => navigation(-1)}
        />
        <div>
          <p className="text-lg font-semibold">General Chat</p>
          <p className="text-sm text-gray-500">{onlineUsers.length} online</p>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center w-full mt-20 h-full">
          <span className="loading loading-spinner text-neutral h-10 w-10"></span>
        </div>
      ) : (
        <div className="flex-1 px-2 mt-20 mb-20 overflow-y-auto w-full flex flex-col gap-3">
          {messages?.map((message, index) =>
            message?.sender?.userName !== "AI" ? (
              message?.sender?._id === userData?._id ? (
                <SenderMessage message={message} key={index} />
              ) : (
                <ReceiverMessage message={message} key={index} />
              )
            ) : (
              <AiResponse message={message} key={index} />
            )
          )}
        </div>
      )}

      <form
        className="flex justify-center items-center h-20 fixed bottom-0 left-0 right-0 w-full px-2 gap-3"
        onSubmit={sendMessage}
      >
        <input
          type="text"
          placeholder="Enter message"
          className="input w-[90%] rounded-full py-6 pl-6 pr-16 max-w-xl sm:max-w-[50%] text-lg"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="fab fab-flower absolute right-17 sm:right-[30vw] md:right-[29vw] lg:right-[28vw] lg:mr- xl:right-[27.25vw] z-[100]">
          <div tabIndex={0} role="button" className="btn btn-circle btn-lg">
            <svg
              aria-label="New"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-6"
            >
              <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
            </svg>
          </div>
          <button className="fab-main-action btn btn-circle btn-lg btn-primary">
            <svg
              aria-label="New post"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M11.013 2.513a1.75 1.75 0 0 1 2.475 2.474L6.226 12.25a2.751 2.751 0 0 1-.892.596l-2.047.848a.75.75 0 0 1-.98-.98l.848-2.047a2.75 2.75 0 0 1 .596-.892l7.262-7.261Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            className="btn btn-circle btn-lg"
            onClick={() => {
              toast("🚧 Feature under development!");
            }}
          >
            <Video />
          </button>
          <button
            className="btn btn-circle btn-lg"
            onClick={() => {
              toast("🚧 Feature under development!");
            }}
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
          </button>
          <button
            className="btn btn-circle btn-lg"
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
          </button>
        </div>
        <button
          className="btn rounded-full h-12 w-12 p-0"
          onClick={sendMessage}
        >
          {sendLoading ? (
            <span className="loading loading-spinner text-neutral"></span>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M22 2L11 13"></path>
              <path d="M22 2L15 22l-4-9-9-4 20-7z"></path>
            </svg>
          )}
        </button>
      </form>
    </div>
  );
}

export default Chat;
