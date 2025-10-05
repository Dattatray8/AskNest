import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getLabel } from "../utils/getLabel";
import useAllUsers from "../hooks/useAllUsers";
import { ChevronLeft } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { serverUrl } from "../App";
import { setAllUsers } from "../redux/adminSlice";

function AllUsers() {
  const { tabKey } = useParams();
  const { loading } = useSelector((state) => state.question);
  const { allUsers } = useSelector((state) => state.admin);
  const navigation = useNavigate();
  let tabLabel = getLabel(tabKey);
  const dispatch = useDispatch();

  useAllUsers();

  const approveApplication = async (userId) => {
    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/admin/approve/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(
        setAllUsers(
          allUsers.map((u) =>
            u._id === userId
              ? { ...u, isTeacher: true, isAppliedForTeacherRole: false }
              : u
          )
        )
      );
      toast.success(res?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const removeFromTeacher = async (userId) => {
    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/admin/disapprove/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(
        setAllUsers(
          allUsers.map((u) =>
            u._id === userId
              ? { ...u, isTeacher: false, isAppliedForTeacherRole: false }
              : u
          )
        )
      );
      toast.success(res?.data?.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const getFilteredUsers = async (filter) => {
    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/admin/users/${filter}`,
        {},
        { withCredentials: true }
      );
      dispatch(setAllUsers(res?.data?.users));
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="h-16 shadow-md flex items-center px-2 sm:px-4">
        <ChevronLeft
          size={28}
          className="cursor-pointer"
          onClick={() => navigation(-1)}
        />
        <p className="ml-4 font-semibold text-xl">{tabLabel}</p>
      </div>

      <div className="flex justify-start p-4 items-center gap-3">
        <label htmlFor="filter" className="label">
          Filter:
        </label>
        <select
          defaultValue={"all"}
          className="select w-40"
          onChange={(e) => getFilteredUsers(e.target.value)}
        >
          <option value="all">All</option>
          <option value="banned">Banned</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : allUsers.length === 0 ? (
        <div className="flex justify-center items-center h-[60vh] text-gray-500">
          No Users
        </div>
      ) : (
        <div className="overflow-x-auto w-full mt-4">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Username</th>
                <th>Banned</th>
                <th>Spam Count</th>
                <th>Role</th>
                <th>Is Teacher</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user, index) => (
                <tr key={index}>
                  <td
                    onClick={() => navigation(`/profile/${user?.userName}`)}
                    className="cursor-pointer"
                  >
                    {user.userName}
                  </td>
                  <td>{user.isBanned ? "Yes" : "No"}</td>
                  <td>{user.spamMarkCount}</td>
                  <td>{user.role}</td>
                  <td>{user.isTeacher ? "Yes" : "No"}</td>
                  <td>
                    {!user.isTeacher && !user?.isAppliedForTeacherRole ? (
                      <button className="btn btn-sm btn-error">Ban</button>
                    ) : (
                      <div>
                        {user?.isAppliedForTeacherRole && !user?.isTeacher && (
                          <button
                            className="btn btn-sm btn-success"
                            onClick={() => approveApplication(user._id)}
                          >
                            Approve
                          </button>
                        )}
                        {!user?.isAppliedForTeacherRole && user?.isTeacher && (
                          <button
                            className="btn btn-sm btn-error"
                            onClick={() => removeFromTeacher(user._id)}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AllUsers;
