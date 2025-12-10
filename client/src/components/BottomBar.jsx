import { useNavigate } from "react-router-dom";
import useCurrentUser from "../hooks/auth/useCurrentUser";

function BottomBar({ tabName }) {
  const { user } = useCurrentUser();
  const navigation = useNavigate();
  return (
    <div className="dock dock-md sm:hidden m-auto h-18">
      <button
        className={tabName === "Home" ? "dock-active" : ""}
        onClick={() => navigation("/")}
      >
        <svg
          className="size-[1.2em]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt">
            <polyline
              points="1 11 12 2 23 11"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            ></polyline>
            <path
              d="m5,13v7c0,1.105.895,2,2,2h10c1.105,0,2-.895,2-2v-7"
              fill="none"
              stroke="currentColor"
              strokeLinecap="square"
              strokeWidth="2"
            ></path>
            <line
              x1="12"
              y1="22"
              x2="12"
              y2="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            ></line>
          </g>
        </svg>
        <span className="dock-label">Home</span>
      </button>

      <button
        className={tabName === "Search" ? "dock-active" : ""}
        onClick={() => navigation("/search")}
      >
        <svg
          className="size-[1.2em]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <circle
            cx="11"
            cy="11"
            r="7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          ></circle>
          <line
            x1="16.5"
            y1="16.5"
            x2="22"
            y2="22"
            stroke="currentColor"
            strokeWidth="2"
          ></line>
        </svg>
        <span className="dock-label">Search</span>
      </button>

      <button
        className={tabName === "Chat" ? "dock-active" : ""}
        onClick={() => navigation("/chat")}
      >
        <svg
          className="size-[1.2em]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M4 4h16v12H5.17L4 17.17V4z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <polyline
            points="4 17.17 5.17 16 20 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
        <span className="dock-label">Chat</span>
      </button>

      <button
        className={tabName === "Feed" ? "dock-active" : ""}
        onClick={() => navigation("/feed")}
      >
        <svg
          className="size-[1.2em]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <rect
            x="3"
            y="4"
            width="18"
            height="16"
            rx="2"
            ry="2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          ></rect>
          <line
            x1="3"
            y1="10"
            x2="21"
            y2="10"
            stroke="currentColor"
            strokeWidth="2"
          ></line>
        </svg>
        <span className="dock-label">Feed</span>
      </button>

      <button
        className={tabName === "Profile" ? "dock-active" : ""}
        onClick={() => {
          userData
            ? navigation(`/profile/${user?._id}`)
            : navigation("/login");
        }}
      >
        <svg
          className="size-[1.2em]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <circle
            cx="12"
            cy="8"
            r="4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          ></circle>
          <path
            d="M4 20c0-4 4-6 8-6s8 2 8 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          ></path>
        </svg>
        <span className="dock-label">Profile</span>
      </button>
    </div>
  );
}

export default BottomBar;
