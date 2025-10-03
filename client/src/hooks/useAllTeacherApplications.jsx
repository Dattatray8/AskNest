import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/questionSlice";
import { setTeacherApplications } from "../redux/adminSlice";

function useAllTeacherApplications() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        dispatch(setLoading(true));
        const result = await axios.get(
          `${serverUrl}/api/v1/admin/applications`,
          { withCredentials: true }
        );
        dispatch(setTeacherApplications(result?.data?.users));
      } catch (error) {
        dispatch(setLoading(false));
        toast.error(error?.response?.data?.message || error?.message);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchApplications();
  }, []);
}

export default useAllTeacherApplications;
