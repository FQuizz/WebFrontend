import { AnswerResult, Attempt, Question } from "@/api/quizzes";
import { QuizContext } from "@/layout/ReportPageLayout";
import { FaUser } from "react-icons/fa";
import { memo, useContext, useMemo } from "react";

export default function OverviewPage() {
  const context = useContext(QuizContext);
  const questions = context?.quiz?.questions ?? [];
  const questionIds = questions.map((question) => question.questionId);
  const attempts = context?.attempts ?? [];

  const calculatePoint = (attempt: Attempt) => {
    let point = 0;
    attempt.answers.map((answer) => {
      if (
        questionIds!.includes(answer.question) &&
        answer.result === AnswerResult.CORRECT
      ) {
        point +=
          (questions?.find(
            (question) => question.questionId === answer.question
          )?.point! *
            answer.accuracyFactor!) /
          100;
      }
    });
    return point;
  };

  return (
    <div className="border border-[#e5e7eb] rounded-lg">
      <table className="w-full border-collapse rounded-lg overflow-hidden text-center">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-sm">
            <th className="py-2 px-4 font-semibold text-left">Participant</th>
            <th className="py-2 px-4 font-semibold">Score</th>
            <th className="py-2 px-4 font-semibold">
              Points
              <br />
              <span className="text-xs font-normal">
                Out of {questions.reduce((prev, cur) => prev + cur.point, 0)}
              </span>
            </th>
            {questions.map((question, i) => {
              const allAnswers = attempts.flatMap((a) => a.answers);
              const totalAccuracy = allAnswers
                .filter((a) => a.question === question.questionId)
                .reduce((sum, a) => sum + (a.accuracyFactor ?? 0), 0);

              const percentage = Math.round(
                totalAccuracy /
                  allAnswers.filter((a) => a.question === question.questionId)
                    .length || 0
              );

              const bgColor =
                percentage < 30
                  ? "bg-red-500"
                  : percentage < 60
                  ? "bg-yellow-500"
                  : percentage < 80
                  ? "bg-green-400"
                  : "bg-emerald-500";

              return (
                <th key={question.questionId} className="py-2 px-4">
                  <div className="flex flex-col items-center gap-[5px]">
                    <div className="font-semibold font-sans text-[12px]">
                      Q{i + 1}
                    </div>
                    <div
                      className={`text-white ${bgColor} w-fit px-[5px] py-[1px] rounded-[5px] text-[11px] font-sans font-medium`}
                    >
                      {percentage}%
                    </div>
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {attempts.map((attempt) => {
            const answerMap = useMemo(
              () => new Map(attempt.answers.map((a) => [a.question, a.result])),
              [attempt.answers]
            );

            return (
              <tr
                key={attempt.attemptId}
                className="border-t border-t-[#e5e7eb] text-sm text-gray-800"
              >
                <td className="py-2 px-4 text-left font-semibold flex items-center gap-2.5">
                    <span><FaUser /></span>
                    <span>{attempt.username}</span>
                </td>
                <td className="py-2 px-4 font-bold">{attempt.score}</td>
                <td className="py-2 px-4 font-semibold">{calculatePoint(attempt)}</td>

                {questions.map((question, qIndex) => {
                  const result = answerMap.get(question.questionId);

                  let cellClass = "bg-gray-300 text-gray-600";
                  let symbol = "!";

                  if (result === AnswerResult.CORRECT) {
                    cellClass = "bg-green-500 text-white";
                    symbol = "✓";
                  } else if (result === AnswerResult.INCORRECT) {
                    cellClass = "bg-red-500 text-white";
                    symbol = "X";
                  } else if (result === AnswerResult.PARTIAL) {
                    cellClass = "bg-orange-500 text-white";
                    symbol = "✓";
                  }

                  return (
                    <td key={qIndex} className="py-2 px-2">
                      <div
                        className={`${cellClass} font-semibold rounded-md py-1 text-xs`}
                      >
                        {symbol}
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
