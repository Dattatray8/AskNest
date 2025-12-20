import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useSelector } from "react-redux";
import { serverUrl } from "../config/config";
import { io } from "socket.io-client";

const SocketContext = createContext();

export default SocketContext;

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isLoginned, setIsLoginned] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { userData } = useSelector((state) => state.user);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (userData?._id) {
      const socketIo = io(serverUrl, {
        query: {
          userId: userData?._id,
        },
      });
      setSocket(socketIo);
      socketIo.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
      return () => {
        socketIo.off("getOnlineUsers");
        socketIo.close();
        setSocket(null);
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [userData?._id]);

  const value = {
    onlineUsers,
    socket,
    theme,
    setTheme,
    isLoginned,
    setIsLoginned,
  };
  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
