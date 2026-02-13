import { ChevronLeft } from "lucide-react";
import BottomBar from "../components/BottomBar";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProfileData, setUserData } from "../redux/userSlice";
import axios from "axios";
import { serverUrl } from "../App";
import { useEffect, useState } from "react";
import userI from "../assets/user.png";
import { roleTabs } from "../config/roleTabs";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileBio from "../components/profile/ProfileBio";
import ProfileTabs from "../components/profile/ProfileTabs";
import ProfileSkeleton from "../components/profile/ProfileSkeleton";
import toast from "react-hot-toast";
import useCurrentUser from "../hooks/auth/useCurrentUser";
import { useSocket } from "../hooks/useSocket";
import BanCountdown from "../components/BanCountDown";

function Profile() {
  const { id } = useParams();
  const { profileData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [load, setLoading] = useState(false);
  const { user } = useCurrentUser();
  const { socket } = useSocket();

  const handleProfile = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${serverUrl}/api/v1/users/profile/${id}`, {
        withCredentials: true,
      });
      dispatch(setProfileData(res?.data?.user));
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleProfile();
  }, [id, dispatch]);

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

  const applyForTeacherRole = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/v1/users/applyTeacherRole`,
        {},
        { withCredentials: true }
      );
      toast.success(result?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  useEffect(() => {
    socket?.on("teacherApplicationApplied", (updatedUser) => {
      dispatch(setUserData(updatedUser));
    });
  }, [socket, dispatch]);

  const cancelApplicationForTeacherRole = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/v1/users/removeTeacherApplication`,
        {},
        { withCredentials: true }
      );
      toast.success(result?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  useEffect(() => {
    socket?.on("teacherApplicationCanceled", (updatedUser) => {
      dispatch(setUserData(updatedUser));
    });
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.on("teacherApplicationApproved", (updatedUser) => {
      dispatch(setUserData(updatedUser));
    });
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.on("teacherApplicationDisapproved", (updatedUser) => {
      dispatch(setUserData(updatedUser));
    });
  }, [socket, dispatch]);

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
            userData={user}
            user={userI}
            onEdit={() => navigation("/editprofile")}
          />

          {profileData?.bio && <ProfileBio bio={profileData?.bio} />}

          {user?.role === "teacher" &&
            !user?.isAppliedForTeacherRole &&
            !user?.isTeacher && (
              <button
                className="btn btn-primary btn-wide max-w-sm self-center w-full"
                onClick={applyForTeacherRole}
              >
                Apply For Teacher Role
              </button>
            )}

          {user?.role === "teacher" ||
            (profileData?.role === "teacher" &&
              !user?.isAppliedForTeacherRole &&
              user?.isTeacher && (
                <p className="badge badge-dash badge-success self-center">
                  You are a Teacher Now
                </p>
              ))}

          {user?._id !== profileData?._id && profileData?.isTeacher && (
            <p className="badge badge-dash badge-success self-center">
              Verified Teacher
            </p>
          )}

          {user?.role === "teacher" &&
            user?.isAppliedForTeacherRole &&
            !user?.isTeacher && (
              <button
                className="btn btn-warning btn-wide max-w-sm self-center w-full"
                onClick={cancelApplicationForTeacherRole}
              >
                Cancel Teacher Role Application
              </button>
            )}

          {user?.isBanned && (
            <div className="flex flex-col items-center gap-4 border border-error p-4 justify-center rounded-md text-base-content">
              You are banned for <BanCountdown banDuration={user.banDuration} />
            </div>
          )}

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
