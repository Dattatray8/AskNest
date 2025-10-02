import useAskedQuestions from "../hooks/useAskedQuestions";
import useAnsweredQuestions from "../hooks/useAnsweredQuestions";
import Question from "../components/Question";

export const tabConfig = {
  questions: {
    hook: useAskedQuestions,
    component: Question,
    mapProps: (item) => ({ q: item }),
  },
  s_answers: {
    hook: useAnsweredQuestions,
    component: Question,
    mapProps: (item) => ({ a: item }),
  },
};
