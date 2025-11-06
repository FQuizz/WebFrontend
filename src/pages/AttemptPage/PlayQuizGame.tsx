import { finishAttempt, getAttempt } from "@/api/attempt/attempt";
import {
  AnswerResult,
  Attempt,
  Choice,
  getQuizById,
  Question,
  Quiz,
} from "@/api/quizzes";
import {
  useEffect,
  useLayoutEffect,
  useOptimistic,
  useState,
  useTransition,
} from "react";
import { useNavigate, useParams } from "react-router";
import SingleChoiceQuiz from "./SingleQuiz";
import QuesitonItem from "../QuizDetailPage/QuestionItem";
import MutipleChoiceQuiz from "./MutipleQuiz";

export default function PlayQuizGame() {
  const [quiz, setQuiz] = useState<Quiz>();
  const [attempt, setAttempt] = useState<Attempt>();
  const [timer, setTimer] = useState<number>();
  const [questionIndex, setQuestionIndex] = useState(0);
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    getQuizById(params.quizId as string)
      .then((res) => {
        setQuiz(res.data);
        setTimer(res.data.questions?.at(0)?.timeLimit);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getAttempt(params.attemptId as string)
      .then((res) => setAttempt(res.data))
      .catch((err) => console.log(err));
  }, [questionIndex]);

  useEffect(() => {
    if (timer === 0) {
      getNextQuestion();
    }
    const timerId = setTimeout(() => {
      if (timer) {
        setTimer((prev) => prev! - 1);
      }
    }, 1000);
    return () => clearTimeout(timerId);
  });

  useEffect(() => {
    if (quiz && questionIndex >= quiz?.questions?.length!) {
      finishAttempt(params.attemptId as string)
        .then((res) => {
          if (res.success)
            navigate(
              `/quizzes/summary/${params.quizId}/attempts/${params.attemptId}`
            );
        })
        .catch((err) => console.log(err));
    } else {
      setTimer(quiz?.questions?.at(questionIndex)?.timeLimit);
    }
  }, [questionIndex, quiz, navigate, params.attemptId]);

  const getNextQuestion = () => {
    setQuestionIndex((prev) => prev + 1);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-orange-100">
      <div className="flex flex-1 h-full items-center justify-center p-[25px]">
        <div className="flex flex-col gap-2.5 w-full h-full">
          <div className="flex items-center justify-between">
            <div className="font-semibold font-sans bg-orange-400 p-2 rounded-lg text-white">
              <span>Participant: </span>
              <span>{attempt?.username}</span>
            </div>
            <div className="flex items-center gap-[10px] ">
              <div className="font-semibold font-sans bg-orange-400 px-4 py-2 rounded-2xl text-white">
                {timer}
              </div>
              <div className="font-semibold font-sans bg-orange-400 p-2 rounded-lg text-white">
                {attempt?.score} point
              </div>
            </div>
          </div>
          <div className="w-full bg-[#20202098] text-white flex items-center justify-center h-[40%] rounded-lg relative">
            <div className="font-sans -top-2.5 absolute bg-black border border-[#bab7b7] px-3 rounded-2xl">
              {questionIndex + 1}/{quiz?.questions?.length}
            </div>
            <div className="text-[25px] py-[100px] font-[Quicksand,Helvetica,Arial]">
              {quiz?.questions?.at(questionIndex)?.content}
            </div>
          </div>

          {quiz?.questions?.at(questionIndex)?.questionType ===
            "SINGLE_CHOICE" && (
            <SingleChoiceQuiz
              nextQuestion={getNextQuestion}
              currentQuestion={quiz?.questions?.at(questionIndex)!}
            />
          )}
          {quiz?.questions?.at(questionIndex)?.questionType ===
            "MULTIPLE_CHOICE" && (
            <MutipleChoiceQuiz
              nextQuestion={getNextQuestion}
              currentQuestion={quiz?.questions?.at(questionIndex)!}
            />
          )}
        </div>
      </div>
    </div>
  );
}
