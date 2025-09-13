import { useDispatch } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";

function useCurrentUser() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/v1/users/getcurrentuser`,
          { withCredentials: true }
        );
        dispatch(setUserData(res?.data?.user));
      } catch (error) {
        console.log(error);
        dispatch(setUserData(null));
      }
    };
    fetchUser();
  }, [dispatch]);
}

export default useCurrentUser;
