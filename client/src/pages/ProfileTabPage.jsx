import { useNavigate, useParams } from "react-router-dom";
import useAskedQuestions from "../hooks/useAskedQuestions";
import { ChevronLeft } from "lucide-react";
import { getLabel } from "../utils/getLabel";
import Question from "../components/Question";
import useAnsweredQuestions from "../hooks/useAnsweredQuestions";

function ProfileTabPage() {
  const { userId, tabKey } = useParams();
  const { loading, questions } = useAskedQuestions(userId);
  const { answers } = useAnsweredQuestions(userId);
  const navigation = useNavigate();
  console.log(answers);
  let tabLabel = getLabel(tabKey);
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
      {loading && (
        <div className="flex justify-center items-center h-[70vh]">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {questions.map((q, idx) => (
        <Question q={q} key={idx} />
      ))}
    </div>
  );
}

export default ProfileTabPage;
