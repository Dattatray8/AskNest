import { useNavigate } from "react-router-dom";
import { formatTimestamp } from "../utils/formatTimeStamp";
import user from "../assets/user.png";
import { useSelector } from "react-redux";

function Question({ q }) {
  const { userData } = useSelector((state) => state.user);
  const navigation = useNavigate();
  return (
    <div className="card mb-4 rounded-none">
      <div
        className="card-body p-4 flex flex-col items-start cursor-pointer gap-2"
        onClick={() => navigation(`/question/${q?._id}`)}
      >
        <div className="avatar flex items-center gap-4">
          <div className="w-8 h-8 rounded-full ring ring-primary ring-offset-base-100">
            <img src={q?.user?.profileImage || user} alt="profile" />
          </div>
          <h2 className="font-semibold">{q?.user?.userName || "Anonymous"}</h2>
          <p>{formatTimestamp(q?.createdAt)}</p>
        </div>
        <div className="w-full">
          <p className="text line-clamp-2 whitespace-pre-wrap">{q?.question}</p>
        </div>
        {userData?._id !== q?.user?._id && !q?.stopAnswering && (
          <div className="flex items-center justify-end w-full">
            <button className="btn btn-sm btn-primary">Answer</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Question;
