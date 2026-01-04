import { AlertTriangle, ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../hooks/api/useApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import user from "../assets/user.png";
import { formatTimestamp } from "../utils/formatTimeStamp";
import { useSocket } from "../hooks/useSocket";

function Reports() {
  let [reports, setReports] = useState([]);
  let [reportLoading, setReportLoading] = useState(false);
  let [approveReportLoading, setApproveReportLoading] = useState(false);
  let [removeReportLoading, setRemoveReportLoading] = useState(false);
  const navigation = useNavigate();
  const { socket } = useSocket();
  let [approveReportId, setApproveReportId] = useState(null);
  let [removeReportId, setRemoveReportId] = useState(null);

  const getReports = async () => {
    try {
      setReportLoading(true);
      const res = await api.get("/api/v1/report", { withCredentials: true });
      console.log(res);
      setReports(res?.data?.reports);
    } catch (error) {
      setReportLoading(false);
      toast.error(error?.response?.data?.message || error?.message);
      console.log(error);
    } finally {
      setReportLoading(false);
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

  console.log(reports);

  useEffect(() => {
    getReports();
  }, []);

  const approveReport = async (reportId) => {
    try {
      setApproveReportId(reportId);
      setApproveReportLoading(true);
      const res = await api.post(
        "/api/v1/teacher/report",
        { reportId },
        {
          withCredentials: true,
        }
      );
      toast.success(res?.data?.message);
      getReports();
    } catch (error) {
      console.log(error);
      setApproveReportLoading(false);
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setApproveReportLoading(false);
    }
  };

  const removeReport = async (reportId) => {
    try {
      setRemoveReportId(reportId);
      setRemoveReportLoading(true);
      const res = await api.delete(`/api/v1/teacher/report/${reportId}`, {
        withCredentials: true,
      });
      toast.success(res?.data?.message);
      getReports();
    } catch (error) {
      console.log(error);
      setRemoveReportLoading(false);
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setRemoveReportLoading(false);
    }
  };

  useEffect(() => {
    socket?.on("newReport", (report) => {
      setReports((prev) => [report, ...prev]);
    });

    return () => socket?.off("newReport");
  }, [socket]);

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
          <h1 className="text-xl font-bold">Reports</h1>
        </div>
        <div className="flex-none">
          <div className="badge badge-error gap-2">
            {reports.length} Pending
          </div>
        </div>
      </div>
      {reportLoading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : reports.length === 0 ? (
        <div className="alert alert-info">
          <AlertTriangle size={20} />
          <span>No reports to review at this time.</span>
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <div className="card bg-base-100 shadow-xl" key={report?._id}>
              <div className="card-body">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="avatar cursor-pointer"
                      onClick={() =>
                        navigation(`/profile/${report?.reportingUser?._id}`)
                      }
                    >
                      <div className="w-10 rounded-full">
                        <img
                          src={report?.reportingUser?.profileImage || user}
                          alt={report.reportingUser?.userName}
                        />
                      </div>
                    </div>
                    <div
                      className="cursor-pointer"
                      onClick={() =>
                        navigation(`/profile/${report?.reportingUser?._id}`)
                      }
                    >
                      <p className="font-semibold">
                        {report.reportingUser?.userName}
                      </p>
                      <p className="text-xs text-base-content/60">
                        {formatTimestamp(report?.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="badge badge-warning gap-2">
                    {report.contentType}
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="font-semibold text-sm">Reason:</span>
                    <p className="text-base-content/80">{report.reason}</p>
                  </div>

                  <div>
                    <span className="font-semibold text-sm">
                      Reported User:
                    </span>
                    <p className="text-base-content/80">
                      {report.reportedUser?.userName}
                    </p>
                  </div>

                  <div>
                    <span className="font-semibold text-sm">Content:</span>
                    <div
                      className="bg-base-200 p-3 rounded-lg mt-1 hover:bg-base-300 cursor-pointer transition-all"
                      onClick={() =>
                        handleContentClick(
                          report?.contentType,
                          report?.contentId
                        )
                      }
                    >
                      <p className="text-sm text-base-content/70 truncate">
                        {report?.contentType === "Question" &&
                          report?.contentId.question}
                        {report?.contentType === "Answer" &&
                          report?.contentId.answer}
                        {report?.contentType === "Message" &&
                          report?.contentId.message}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card-actions justify-end mt-4">
                  <button
                    className="btn btn-error btn-sm gap-2"
                    onClick={() => removeReport(report?._id)}
                  >
                    {removeReportLoading && removeReportId === report?._id ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      "Remove Report"
                    )}
                  </button>
                  <button
                    className="btn btn-success btn-sm gap-2"
                    onClick={() => approveReport(report?._id)}
                  >
                    {approveReportLoading && approveReportId === report?._id ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      "Approve"
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

export default Reports;
