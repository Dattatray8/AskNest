import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/questionSlice";
import { setAllUsers } from "../redux/adminSlice";

function useAllUsers() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        dispatch(setLoading(true));
        const result = await axios.get(`${serverUrl}/api/v1/admin/users`, {
          withCredentials: true,
        });
        dispatch(setAllUsers(result?.data?.users));
      } catch (error) {
        dispatch(setLoading(false));
        toast.error(error?.response?.data?.message || error?.message);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchUsers();
  }, []);
}

export default useAllUsers;
