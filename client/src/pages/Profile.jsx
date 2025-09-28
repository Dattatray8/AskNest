import { ChevronLeft, UserPen } from "lucide-react";
import BottomBar from "../components/BottomBar";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProfileData, setUserData } from "../redux/userSlice";
import axios from "axios";
import { serverUrl } from "../App";
import { useEffect, useState } from "react";
import user from "../assets/user.png";
import useQuestions from "../hooks/useQuestions";
import Question from "../components/Question";
import EmptyStateMessage from "../components/EmptyStateMessage";

function Profile() {
  const { userName } = useParams();
  const { profileData, userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [load, setLoading] = useState(false);
  const [navTabs, setNavTabs] = useState("questions");
  const { loading } = useQuestions();
  const { questions } = useSelector((state) => state.question);

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

  const roleTabs = {
    student: [
      { label: "My Questions", key: "questions" },
      { label: "My Answers", key: "answers" },
      { label: "Accepted Answers", key: "accepted" },
      { label: "Verified Answers", key: "verified" },
    ],
    teacher: [
      { label: "Spam Reports", key: "spamReports" },
      { label: "Spam Questions", key: "spamQuestions" },
      { label: "Spam Answers", key: "spamAnswers" },
      { label: "Verified Answers", key: "verified" },
    ],
    admin: [
      { label: "Reported Questions", key: "reportedQuestions" },
      { label: "Reported Answers", key: "reportedAnswers" },
      { label: "Reported Messages", key: "reportedMessages" },
      { label: "Teacher Applications", key: "teacherApplications" },
    ],
  };

  const renderTabContent = () => {
    if (loading) {
      return (
        <div className="w-full max-h-[30vh] min-h-[10vh] flex justify-center items-center">
          <span className="loading loading-spinner text-neutral"></span>
        </div>
      );
    }

    switch (navTabs) {
      case "questions": {
        const userQuestions = questions.filter(
          (q) => q?.user?._id === userData?._id
        );
        return userQuestions.length === 0 ? (
          <EmptyStateMessage
            icon="❓"
            title="You haven't asked any questions yet"
            subtitle="Ask questions to get help from the community"
          />
        ) : (
          userQuestions.map((q, index) => <Question q={q} key={index} />)
        );
      }

      case "answers": {
        const userAnsweredQuestions = questions.filter((q) =>
          q.answers?.some(
            (a) => a.user === userData?._id || a?.user?._id === userData?._id
          )
        );
        return userAnsweredQuestions.length === 0 ? (
          <EmptyStateMessage
            icon="💬"
            title="You haven't answered any questions yet"
            subtitle="Share your knowledge by answering questions"
          />
        ) : (
          userAnsweredQuestions.map((q, index) => (
            <Question q={q} key={index} />
          ))
        );
      }

      case "accepted": {
        const userAcceptedAnswers = questions.filter((q) =>
          q.answers?.some(
            (a) =>
              (a.user === userData?._id || a?.user?._id === userData?._id) &&
              a.gotAnswer === true
          )
        );
        return userAcceptedAnswers.length === 0 ? (
          <EmptyStateMessage
            icon="🏆"
            title="No accepted answers yet"
            subtitle="When your answer gets accepted, it will show up here"
          />
        ) : (
          userAcceptedAnswers.map((q, index) => <Question q={q} key={index} />)
        );
      }

      default:
        return <div>No data</div>;
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

      {load ? (
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
          {profileData?.bio && (
            <div className="sm:p-4 max-h-[100px] overflow-y-auto">
              {profileData?.bio}
            </div>
          )}

          <div className="overflow-x-auto">
            <div className="tabs tabs-box min-w-max tabs-lift flex justify-center">
              {roleTabs[userData?.role]?.map((tab, index) => (
                <input
                  key={index}
                  type="radio"
                  name="role_tabs"
                  className="tab"
                  aria-label={tab.label}
                  defaultChecked={index === 0}
                  onClick={() => setNavTabs(tab.key)}
                />
              ))}
            </div>
          </div>

          <div className="max-h-max mb-18">{renderTabContent()}</div>
        </div>
      )}

      <BottomBar tabName={"Profile"} />
    </div>
  );
}

export default Profile;
