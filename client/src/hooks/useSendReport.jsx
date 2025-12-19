import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "../hooks/api/useApi";

export const useSendReport = () => {
  const [loading, setLoading] = useState(false);

  const sendReport = async (reason, reportedUserId, contentId, contentType) => {
    try {
      setLoading(true);
      const loadingToast = toast.loading("Sending report...");

      const res = await api.post(
        "/api/v1/report",
        { reason, reportedUserId, contentId, contentType },
        { withCredentials: true }
      );
      toast.success(res?.data.message, { duration: 2000 });
      toast.dismiss(loadingToast);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendReport, loading };
};
