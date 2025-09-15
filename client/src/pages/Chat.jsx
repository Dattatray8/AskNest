import axios from "axios";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SenderMessage from "../components/SenderMessage";
import ReceiverMessage from "../components/ReceiverMessage";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setMessages } from "../redux/chatSlice";
import { useSocket } from "../hooks/useSocket";
import { useContext } from "react";
import SocketContext from "../context/SocketContext";

function Chat() {
  const navigation = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.chat);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { socket } = useSocket();
  const { onlineUsers } = useContext(SocketContext);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message === "") {
      toast.error("Type a message");
      return;
    }
    try {
      //   const formdata = new FormData();
      //   formdata.append("message", message);
      const result = await axios.post(
        `${serverUrl}/api/v1/chat/send`,
        { message },
        { withCredentials: true }
      );
      dispatch(setMessages([...messages, result?.data?.newMessage]));
      setMessage("");
    } catch (error) {
      console.log(error?.response?.data?.message || error?.message);
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
      dispatch(setMessages([...messages, msg]));
    });
    return () => socket?.off("newMessage");
  }, [messages, setMessages]);

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
        <div className="my-20 overflow-y-auto w-full flex flex-col gap-3">
          {messages?.map((message, index) =>
            message?.sender?._id === userData?._id ? (
              <SenderMessage message={message} key={index} />
            ) : (
              <ReceiverMessage message={message} key={index} />
            )
          )}
        </div>
      )}

      <form
        className="flex justify-center items-center h-20 fixed bottom-0 left-0 right-0 w-full px-2 gap-2"
        onSubmit={sendMessage}
      >
        <input
          type="text"
          placeholder="Enter message"
          className="input w-[90%] rounded-full p-6 max-w-xl"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="btn rounded-full h-12 w-12 p-0"
          onClick={sendMessage}
        >
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
        </button>
      </form>
    </div>
  );
}

export default Chat;
