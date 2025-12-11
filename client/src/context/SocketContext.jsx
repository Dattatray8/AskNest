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
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { userData } = useSelector((state) => state.user);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (userData) {
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
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [userData]);

  const value = {
    onlineUsers,
    socket,
    theme,
    setTheme,
  };
  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
