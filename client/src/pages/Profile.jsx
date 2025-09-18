import { ChevronLeft, UserPen } from "lucide-react";
import BottomBar from "../components/BottomBar";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProfileData, setUserData } from "../redux/userSlice";
import axios from "axios";
import { serverUrl } from "../App";
import { useEffect, useState } from "react";
import user from "../assets/user.png";

function Profile() {
  const { userName } = useParams();
  const { profileData, userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleProfile = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${serverUrl}/api/v1/users/profile/${userName}`,
        { withCredentials: true }
      );
      dispatch(setProfileData(res?.data?.user));
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleProfile();
  }, [userName, dispatch]);

  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/v1/auth/logout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      navigation("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="h-16 shadow-md flex items-center sm:px-4 px-2 justify-between">
        <ChevronLeft
          size={28}
          className="cursor-pointer"
          onClick={() => navigation(-1)}
        />
        <p>{profileData?.userName}</p>
        <button className="btn" onClick={handleLogOut}>
          Logout
        </button>
      </div>

      {loading ? (
        <div className="sm:w-1/2 w-full px-8 sm:px-0 m-auto justify-start py-8 flex flex-col gap-8">
          <div className="flex flex-col gap-8 w-full">
            <div className="flex items-center gap-12 justify-center">
              <div className="skeleton h-24 w-24 shrink-0 rounded-full"></div>
              <div className="flex flex-col gap-4">
                <div className="skeleton h-4 w-20 m-auto"></div>
                <div className="skeleton h-4 w-28 m-auto"></div>
              </div>
            </div>
          </div>
          <div className="skeleton h-32 w-full"></div>
        </div>
      ) : (
        <div className="sm:w-1/2 w-full px-8 sm:px-0 m-auto py-8 flex flex-col gap-4">
          <div className="flex gap-10 justify-center relative">
            <div className="avatar">
              <div className="w-24 rounded-full shadow-md">
                <img src={profileData?.profileImage || user} />
              </div>
            </div>
            <div className="flex flex-col gap-2 items-center justify-center">
              <div>{profileData?.userName}</div>
              {profileData?.profession && (
                <div className="badge badge-soft badge-primary">
                  {profileData?.profession}
                </div>
              )}
            </div>
            {userData?._id === profileData?._id && (
              <UserPen
                className="absolute top-0 right-0 cursor-pointer"
                onClick={() => navigation("/editprofile")}
              />
            )}
          </div>
          {profileData?.bio && <div className="p-4">{profileData?.bio}</div>}
        </div>
      )}

      <BottomBar tabName={"Profile"} />
    </div>
  );
}

export default Profile;
