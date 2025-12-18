import { useDispatch } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";

export const useCurrentUserHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${serverUrl}/api/v1/users/getcurrentuser`,
          { withCredentials: true }
        );
        dispatch(setUserData(res?.data?.user));
      } catch (error) {
        console.log(error);
        setLoading(false);
        dispatch(setUserData(null));
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [dispatch]);
  return { loading };
};
