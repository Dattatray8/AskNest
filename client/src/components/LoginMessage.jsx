import { useNavigate } from "react-router-dom";
import SocketContext from "../context/SocketContext";
import { useContext } from "react";
import { X } from "lucide-react";

function LoginMessage() {
  const navigation = useNavigate();
  let { setIsLoginned } = useContext(SocketContext);

  return (
    <div className="w-screen h-screen fixed inset-0 flex justify-center items-center bg-base-100/50">
      <div className="card bg-neutral text-neutral-content w-96 shadow-xl">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
          onClick={() => setIsLoginned(true)}
          aria-label="Close"
        >
          <X size={18} />
        </button>
        <div className="card-body items-center text-center">
          <h2 className="card-title">Login Required</h2>
          <p>
            Please login or create an account to explore the feed, ask
            questions, and get your doubts solved instantly.
          </p>
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary"
              onClick={() => {
                navigation("/login");
                setIsLoginned(true);
              }}
            >
              Login
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => {
                navigation("/signup");
                setIsLoginned(true);
              }}
            >
              SignUp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginMessage;
