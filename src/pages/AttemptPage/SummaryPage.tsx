import { getAttempt } from "@/api/attempt/attempt";
import {
  AnswerResult,
  Attempt,
  getQuizById,
  Question,
  Quiz,
} from "@/api/quizzes";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FaMedal } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
export default function SummaryPage() {
  const [quiz, setQuiz] = useState<Quiz>();
  const [attempt, setAttempt] = useState<Attempt>();
  const params = useParams();

  useEffect(() => {
    getAttempt(params.attemptId as string)
      .then((res) => setAttempt(res.data))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    getQuizById(params.quizId as string)
      .then((res) => setQuiz(res.data))
      .catch((err) => console.log(err));
  }, []);

  const calculateTimeGap = () => {
    const created = new Date(attempt?.createAt!);
    const completed = new Date(attempt?.completeAt!);

    const diffMs =
      (completed.getTime() - created.getTime()) / quiz?.questions?.length!; // milliseconds
    const diffSec = Math.floor(diffMs / 1000); // seconds
    const diffMin = Math.floor(diffSec / 60); // minutes
    const diffHr = Math.floor(diffMin / 60); // hours
    return `${diffHr !== 0 ? diffHr + "h" : ""}${
      diffMin !== 0 ? diffMin + "m" : ""
    } ${diffSec}s`;
  };

  const getAnswer = (question: Question): string => {
    const answer = attempt?.answers.find(
      (answer) => answer.question === question.questionId
    );
    if(answer){
        switch (answer.result){
            case AnswerResult.CORRECT:
                return "green"
            case AnswerResult.INCORRECT:
                return "red"
            case AnswerResult.PARTIAL:
                return "blue"
            default: 
                return "gray"
        }
    }
    return "gray"
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 h-full overflow-scroll">
      <div className="flex flex-1 min-h-full items-center justify-center p-[100px] bg-orange-100">
        <div className="border h-full p-4 flex flex-col gap-4 bg-[#efb045] text-white w-[550px] rounded-lg font-sans">
          <div className="text-[20px] text-center font-semibold">Summary</div>
          <div className="flex items-center justify-center gap-2.5 text-[20px] p-2.5 text-center font-semibold">
            <span>Paticipant:</span>
            <span>{attempt?.username}</span>
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="text-[14px]">Accuracy</div>
            <div className="w-full h-4 relative bg-[#ffffff]  rounded-2xl">
              <div
                className="rounded-2xl absolute top-0 left-0 bottom-0 bg-green-500"
                style={{
                  width: `${
                    attempt?.answers.length === 0
                      ? 0
                      : attempt?.answers.reduce(
                          (prev, cur) => prev + cur.accuracyFactor!,
                          0
                        )! / attempt?.answers.length!
                  }%`,
                }}
              >
                <div className="absolute -top-1.5 -right-1 bottom-0 bg-white text-black text-[10px] flex items-center justify-center font-sans px-2.5 py-3.5 rounded-xl">
                  {attempt?.answers.length === 0
                    ? 0
                    : attempt?.answers.reduce(
                        (prev, cur) => prev + cur.accuracyFactor!,
                        0
                      )! / attempt?.answers.length!}
                  %
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 text-[14px]">
              <div className="flex flex-1 items-center justify-between bg-amber-600 rounded-2xl py-2 px-4">
                <div>
                  <div>Rank</div>
                  <div>1 / {quiz?.totalAttempt}</div>
                </div>
                <FaMedal size={20} />
              </div>
              <div className="flex flex-1 items-center justify-between bg-amber-600 rounded-2xl py-2 px-4">
                <div>
                  <div>Score</div>
                  <div>{attempt?.score}</div>
                </div>
                <FaStar size={20} />
              </div>
            </div>
          </div>

          <div>
            <div className="text-center text-[18px] font-semibold">Perfomance Stats</div>
            <div className="grid grid-cols-3 gap-2.5 py-2">
              <div className="flex flex-col items-center justify-center border border-[#c3bebe] rounded-lg bg-green-600 py-1">
                <div className="font-semibold text-[18px]">
                  {
                    attempt?.answers.filter(
                      (answer) => answer.result === AnswerResult.CORRECT
                    ).length
                  }
                </div>
                <div>Correct</div>
              </div>
              <div className="flex flex-col items-center justify-center border border-[#c3bebe] rounded-lg bg-red-600 py-1">
                <div className="font-semibold text-[18px]">
                  {
                    attempt?.answers.filter(
                      (answer) => answer.result === AnswerResult.PARTIAL
                    ).length
                  }
                </div>
                <div>Partially correct</div>
              </div>
              <div className="flex flex-col items-center justify-center border border-[#c3bebe] rounded-lg bg-orange-500 py-1">
                <div className="font-semibold text-[18px]">
                  {
                    attempt?.answers.filter(
                      (answer) => answer.result === AnswerResult.INCORRECT
                    ).length
                  }
                </div>
                <div>Incorrect</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2.5 py-2">
              <div className="flex flex-col items-center justify-center border border-[#c3bebe] rounded-lg bg-blue-600 py-1">
                <div className="font-semibold text-[18px]">
                  {calculateTimeGap()}
                </div>
                <div>Time/ques</div>
              </div>
              <div className="flex flex-col items-center justify-center border border-[#c3bebe] rounded-lg bg-purple-600 py-1">
                <div className="font-semibold text-[18px]">
                  {quiz?.questions?.length === 0 ||
                  attempt?.answers.length === 0
                    ? 0
                    : quiz?.questions?.length! - attempt?.answers.length!}
                </div>
                <div>No answers</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <div>
              <div className="text-[18px] font-semibold">Review Quesiton</div>
            </div>
            {quiz?.questions?.map((question, index) => (
              <div
                key={question.questionId}
                className="flex flex-col gap-2.5 bg-white p-2.5 text-black rounded-xl border-l-8"
                style={{ borderLeftColor: getAnswer(question) }}
              >
                <div className="flex items-center justify-between border-b border-b-gray-300 py-2">
                  <div>
                    {index + 1}. {question.content}
                  </div>
                </div>
                {question.choices.map((choice) => (
                  <div
                    key={choice.choiceId}
                    className="flex items-center gap-2.5"
                  >
                    <span className="w-3.5 h-3.5 rounded-full bg-[#c5c4c4] flex items-center justify-center">
                      {attempt?.answers
                        .find(
                          (answer) => answer.question === question.questionId
                        )
                        ?.choices.filter((choice) => !choice.isCorrect)
                        .map((choice) => choice.choiceId)
                        .includes(choice.choiceId) && (
                        <FaXmark size={10} color="red" />
                      )}
                      {question.choices
                        .filter((choice) => choice.isCorrect)
                        .map((choice) => choice.choiceId)
                        .includes(choice.choiceId) && (
                        <FaCheck size={10} color="green" />
                      )}
                    </span>
                    <span>{choice.content}</span>
                    {attempt?.answers
                      .find((answer) => answer.question === question.questionId)
                      ?.choices.map((choice) => choice.choiceId)
                      .includes(choice.choiceId) && (
                      <small className="text-orange-500">Your answer</small>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
