import { useNavigate, useParams } from "react-router-dom";
import { getLabel } from "../utils/getLabel";
import { useSelector } from "react-redux";
import { ChevronLeft } from "lucide-react";
import user from "../assets/user.png";
import toast from "react-hot-toast";
import axios from "axios";
import { serverUrl } from "../App";
import useProfileTabData from "../hooks/profile/useProfileTabData";

function TeacherApplications() {
  const { tabKey } = useParams();
  let tabLabel = getLabel(tabKey);
  const navigation = useNavigate();

  const { loading } = useProfileTabData(tabKey);

  const { teacherApplications } = useSelector((state) => state.admin);

  const approveApplication = async (userId) => {
    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/admin/approve/${userId}`,
        {},
        { withCredentials: true }
      );
      console.log(res);
      toast.success(res?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };
  const removeApplication = async (userId) => {
    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/admin/remove/${userId}`,
        {},
        { withCredentials: true }
      );
      console.log(res);
      toast.success(res?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="h-16 shadow-md flex items-center sm:px-4 px-2">
        <ChevronLeft
          size={28}
          className="cursor-pointer"
          onClick={() => navigation(-1)}
        />
        <p className="ml-4 font-semibold text-xl">{tabLabel}</p>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : teacherApplications.length === 0 ? (
        <div className="flex justify-center items-center h-[60vh] text-gray-500">
          No applications
        </div>
      ) : (
        <div className="w-full flex flex-col gap-4 py-4">
          {teacherApplications?.map((application, index) => (
            <div key={index} className="p-2 shadow-md flex justify-between">
              <div className="flex gap-4 items-center">
                <img
                  src={application?.profileImage || user}
                  alt="profileImage"
                  className="avatar w-10 rounded-full"
                />
                <p>{application?.userName}</p>
              </div>
              {application?.isTeacher && (
                <button
                  className="btn btn-danger"
                  onClick={() => removeApplication(application?._id)}
                >
                  Remove
                </button>
              )}
              {!application?.isTeacher && (
                <button
                  className="btn btn-success"
                  onClick={() => approveApplication(application?._id)}
                >
                  Approve
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TeacherApplications;
