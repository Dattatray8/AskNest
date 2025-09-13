import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

export const serverUrl = "http://localhost:8000";

function App() {
  return (
    <div className="w-screen relative min-h-screen overflow-hidden">
      <AppRoutes />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
