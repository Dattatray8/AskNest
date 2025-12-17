import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import user from "../assets/user.png";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfileData, setUserData } from "../redux/userSlice";
import { serverUrl } from "../App";
import axios from "axios";
import toast from "react-hot-toast";

function EditProfile() {
  const navigation = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const imageInput = useRef();
  const [frontendImage, setFrontendImage] = useState(
    userData?.profileImage || user
  );
  const [backendImage, setBackendImage] = useState(null);
  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const [data, setData] = useState({
    userName: "",
    bio: "",
    profession: "",
  });

  useEffect(() => {
    if (userData) {
      setData({
        name: userData.name || "",
        userName: userData.userName || "",
        bio: userData.bio || "",
        profession: userData.profession || "",
      });
      setFrontendImage(userData.profileImage || user);
    }
  }, [userData]);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleEditProfile = async () => {
    try {
      setLoading(true);
      setErrorMessage(false);
      const formData = new FormData();
      formData.append("userName", data.userName);
      formData.append("bio", data.bio);
      formData.append("profession", data.profession);
      if (backendImage) {
        formData.append("profileImage", backendImage);
      } else {
        formData.append("profileImage", userData.profileImage);
      }
      let res = await axios.put(
        `${serverUrl}/api/v1/users/editProfile`,
        formData,
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      dispatch(setUserData(res?.data?.user));
      dispatch(setProfileData(res?.data?.user));
      navigation(`/profile/${res?.data?.user._id}`);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setErrorMessage(error?.response?.data?.message || error?.message);
    }
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

  return (
    <div className="w-full h-full">
      <div className="h-16 shadow-md flex items-center sm:px-4 px-2">
        <ChevronLeft
          size={28}
          className="cursor-pointer"
          onClick={() => navigation(-1)}
        />
        <p className="ml-4 font-semibold text-xl">Edit Profile</p>
      </div>
      <div className="flex flex-col items-center gap-8 sm:w-1/2 w-full m-auto pt-6">
        <div className="avatar">
          <div
            className="w-24 rounded-full shadow-md cursor-pointer"
            onClick={() => imageInput?.current.click()}
          >
            <input
              type="file"
              accept="image/*"
              ref={imageInput}
              hidden
              onChange={handleImage}
            />
            <img src={frontendImage} alt="user image" />
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full items-center px-4 sm:px-2">
          <input
            type="text"
            className="input"
            placeholder="Enter your username"
            value={data?.userName}
            onChange={(e) => setData({ ...data, userName: e.target.value })}
          />
          <input
            type="text"
            className="input"
            placeholder="Enter your profession"
            value={data?.profession}
            onChange={(e) => setData({ ...data, profession: e.target.value })}
          />
          <input
            type="text"
            className="input"
            placeholder="Enter your bio"
            value={data?.bio}
            onChange={(e) => setData({ ...data, bio: e.target.value })}
          />
          <button className="btn w-1/2" onClick={handleEditProfile}>
            {loading ? (
              <span className="loading loading-spinner text-neutral"></span>
            ) : (
              "Save Profile"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
