import { AlertTriangle, ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../hooks/api/useApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import user from "../assets/user.png";
import { formatTimestamp } from "../utils/formatTimeStamp";
function Spams() {
  let [spams, setSpams] = useState([]);
  let [spamLoading, setSpamLoading] = useState(false);
  let [deleteBtnLoading, setDeleteBtnLoading] = useState(false);
  const navigation = useNavigate();
  let [removeSpamId, setRemoveSpamId] = useState(null);

  const getSpams = async () => {
    try {
      setSpamLoading(true);
      const res = await api.get("/api/v1/admin/spam", {
        withCredentials: true,
      });
      console.log(res);
      setSpams(res?.data?.reports);
    } catch (error) {
      setSpamLoading(false);
      toast.error(error?.response?.data?.message || error?.message);
      console.log(error);
    } finally {
      setSpamLoading(false);
    }
  };

  const handleContentClick = (contentType, contentId) => {
    if (contentType === "Answer") {
      navigation(`/question/${contentId?.question}`);
    }
    if (contentType === "Question") {
      navigation(`/question/${contentId?._id}`);
    }
    if (contentType === "Message") {
      navigation(`/chat?messageId=${contentId?._id}`);
    }
  };

  console.log(spams);
  useEffect(() => {
    getSpams();
  }, []);

  const actionOnSpam = async (id) => {
    try {
      setRemoveSpamId(id);
      setDeleteBtnLoading(true);
      const res = await api.delete(`/api/v1/admin/spam/${id}`, {
        withCredentials: true,
      });
      toast.success(res?.data?.message);
      getSpams();
    } catch (error) {
      setDeleteBtnLoading(false);
      toast.error(error?.response?.data?.message || error?.message);
      console.log(error);
    } finally {
      setDeleteBtnLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="navbar bg-base-100 shadow-lg">
        <div className="flex-none">
          <button
            className="btn btn-ghost btn-circle"
            onClick={() => navigation(-1)}
          >
            <ChevronLeft size={24} />
          </button>
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-bold">Spams</h1>
        </div>
        <div className="flex-none">
          <div className="badge badge-error gap-2">{spams.length} Pending</div>
        </div>
      </div>
      {spamLoading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : spams.length === 0 ? (
        <div className="alert alert-info">
          <AlertTriangle size={20} />
          <span>No spams to review at this time.</span>
        </div>
      ) : (
        <div className="space-y-4">
          {spams.map((spam) => (
            <div className="card bg-base-100 shadow-xl" key={spam?._id}>
              <div className="card-body">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="avatar cursor-pointer"
                      onClick={() =>
                        navigation(`/profile/${spam?.reportingUser?._id}`)
                      }
                    >
                      <div className="w-10 rounded-full">
                        <img
                          src={spam?.reportingUser?.profileImage || user}
                          alt={spam.reportingUser?.userName}
                        />
                      </div>
                    </div>
                    <div
                      className="cursor-pointer"
                      onClick={() =>
                        navigation(`/profile/${spam?.reportingUser?._id}`)
                      }
                    >
                      <p className="font-semibold">
                        {spam.reportingUser?.userName}
                      </p>
                      <p className="text-xs text-base-content/60">
                        {formatTimestamp(spam?.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="badge badge-warning gap-2">
                    {spam.contentType}
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="font-semibold text-sm">Reason:</span>
                    <p className="text-base-content/80">{spam.reason}</p>
                  </div>

                  <div>
                    <span className="font-semibold text-sm">
                      Reported User:
                    </span>
                    <p className="text-base-content/80">
                      {spam.reportedUser?.userName}
                    </p>
                  </div>

                  <div>
                    <span className="font-semibold text-sm">Content:</span>
                    <div
                      className="bg-base-200 p-3 rounded-lg mt-1 hover:bg-base-300 cursor-pointer transition-all"
                      onClick={() =>
                        handleContentClick(spam?.contentType, spam?.contentId)
                      }
                    >
                      <p className="text-sm text-base-content/70 truncate">
                        {spam?.contentType === "Question" &&
                          spam?.contentId.question}
                        {spam?.contentType === "Answer" &&
                          spam?.contentId.answer}
                        {spam?.contentType === "Message" &&
                          spam?.contentId.message}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card-actions justify-end mt-4">
                  <button
                    className="btn btn-error btn-sm gap-2"
                    onClick={() => actionOnSpam(spam?._id)}
                  >
                    {deleteBtnLoading && removeSpamId === spam?._id ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      "Delete Content"
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Spams;
