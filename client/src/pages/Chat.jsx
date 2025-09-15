import axios from "axios";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SenderMessage from "../components/SenderMessage";
import ReceiverMessage from "../components/ReceiverMessage";
import { serverUrl } from "../App";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

function Chat() {
  const navigation = useNavigate();
  const [allMessages, setAllMessages] = useState([]);
  const { userData } = useSelector((state) => state.user);
  const [message, setMessage] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message === "") {
      toast.error("Type a message");
      return;
    }
    try {
      console.log("Sending message:", message);
      //   const formdata = new FormData();
      //   formdata.append("message", message);
      const result = await axios.post(
        `${serverUrl}/api/v1/chat/send`,
        { message },
        { withCredentials: true }
      );
      setMessage("");
    } catch (error) {
      console.log(error?.response?.data?.message || error?.message);
    }
  };

  const getAllMessages = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/v1/chat/getmessages`, {
        withCredentials: true,
      });
      setAllMessages(result?.data?.messages);
    } catch (error) {
      console.log(error?.response?.data?.message || error?.message);
    }
  };
  useEffect(() => {
    getAllMessages();
  }, []);

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
          <p className="text-sm text-gray-500">2 online</p>
        </div>
      </div>
      <div className="my-20 overflow-y-auto w-full flex flex-col gap-3">
        {allMessages.map((message, index) =>
          message?.sender?._id === userData?._id ? (
            <SenderMessage message={message} key={index} />
          ) : (
            <ReceiverMessage message={message} key={index} />
          )
        )}
      </div>
      <form
        className="flex justify-center items-center h-20 fixed bottom-0 left-0 right-0 w-full gap-2"
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
