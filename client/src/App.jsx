import { useContext } from "react";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import SocketContext from "./context/SocketContext";

export const serverUrl = "http://localhost:8000";

function App() {
  const { theme } = useContext(SocketContext);
  return (
    <div
      className="w-screen relative min-h-screen overflow-hidden"
      data-theme={theme}
    >
      <AppRoutes />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
