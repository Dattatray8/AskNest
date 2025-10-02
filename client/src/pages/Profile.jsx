import { ChevronLeft } from "lucide-react";
import BottomBar from "../components/BottomBar";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProfileData, setUserData } from "../redux/userSlice";
import axios from "axios";
import { serverUrl } from "../App";
import { useEffect, useState } from "react";
import user from "../assets/user.png";
import { roleTabs } from "../config/roleTabs";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileBio from "../components/profile/ProfileBio";
import ProfileTabs from "../components/profile/ProfileTabs";
import ProfileSkeleton from "../components/profile/ProfileSkeleton";

function Profile() {
  const { userName } = useParams();
  const { profileData, userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [load, setLoading] = useState(false);

  const handleProfile = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${serverUrl}/api/v1/users/profile/${userName}`,
        { withCredentials: true }
      );
      dispatch(setProfileData(res?.data?.user));
    } catch (error) {
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
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  return (
    <div className="w-full h-full pb-20">
      {/* Top Bar */}
      <div className="h-16 shadow-md flex items-center sm:px-4 px-2 justify-between">
        <ChevronLeft
          size={28}
          className="cursor-pointer"
          onClick={() => navigation(-1)}
        />
        <p className="font-semibold">{profileData?.userName}</p>
        <button className="btn btn-sm" onClick={handleLogOut}>
          Logout
        </button>
      </div>

      {load ? (
        <ProfileSkeleton />
      ) : (
        <div className="sm:w-full max-w-5xl w-full px-6 sm:px-8 m-auto py-8 flex flex-col gap-6">
          <ProfileHeader
            profileData={profileData}
            userData={userData}
            user={user}
            onEdit={() => navigation("/editprofile")}
          />

          {profileData?.bio && <ProfileBio bio={profileData?.bio} />}

          <div className="divider my-2">Activities</div>

          <ProfileTabs
            role={profileData?.role}
            roleTabs={roleTabs}
            userId={profileData?._id}
          />
        </div>
      )}

      <BottomBar tabName={"Profile"} />
    </div>
  );
}

export default Profile;
