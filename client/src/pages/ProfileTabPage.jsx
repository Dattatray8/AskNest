import { useNavigate, useParams } from "react-router-dom";
import useAskedQuestions from "../hooks/useAskedQuestions";
import { ChevronLeft } from "lucide-react";
import { getLabel } from "../utils/getLabel";
import Question from "../components/Question";
import useAnsweredQuestions from "../hooks/useAnsweredQuestions";
import useAnswerAcceptedQuestions from "../hooks/useAnswerAcceptedQuestions";
import { useSelector } from "react-redux";
import useAllTeacherAnswers from "../hooks/useAllTeacherAnswers";

function ProfileTabPage() {
  const { userId, tabKey } = useParams();
  const { loading } = useSelector((state) => state.question);
  const { profileData } = useSelector((state) => state.user);
  const navigation = useNavigate();
  let tabLabel = getLabel(tabKey);

  useAskedQuestions(userId);
  useAnsweredQuestions(userId);
  useAnswerAcceptedQuestions(userId);
  useAllTeacherAnswers(userId);

  const { questionsAsked } = useSelector((state) => state.student);
  const { questionsAnswered } = useSelector((state) => state.student);
  const { questionsAccepted } = useSelector((state) => state.student);
  const { teacherAnswers } = useSelector((state) => state.admin);

  let dataToRender = [];
  if (tabLabel === "Questions" && profileData?.role === "student") {
    dataToRender = questionsAsked || [];
  }
  if (tabLabel === "Answers" && profileData?.role === "student") {
    dataToRender = questionsAnswered || [];
  }
  if (tabLabel === "Accepted Answers" && profileData?.role === "student") {
    dataToRender = questionsAccepted || [];
  }
  if (tabLabel === "Answers" && profileData?.role === "teacher") {
    dataToRender = teacherAnswers || []; 
  }

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
      ) : dataToRender.length === 0 && !loading ? (
        <div className="flex justify-center items-center h-[60vh] text-gray-500">
          No data found
        </div>
      ) : (
        dataToRender.map((item, idx) => <Question q={item} key={idx} />)
      )}
    </div>
  );
}

export default ProfileTabPage;
