import {
  AnswerResult,
  Attempt,
  getAllAtempts,
  Question,
  Quiz,
} from "@/api/quizzes";
import { AttemptContext, QuizContext } from "@/layout/ReportPageLayout";
import { FaUser } from "react-icons/fa";
import { useContext, useEffect, useRef, useState } from "react";
import PercentageBar from "./PercentageBar";

export default function AttemptPage() {
  const context = useContext(QuizContext);
  const quiz: Quiz = context?.quiz!;
  const attempts: Array<Attempt> = context?.attempts!;
  const checkAnswer = (attempt: Attempt, question: Question): string => {
    const questionsAnswered = attempt.answers.map((answer) => answer.question);
    if (questionsAnswered.includes(question.questionId)) {
      const answer = attempt.answers.find(
        (ans) => ans.question === question.questionId
      );
      if (answer?.result === AnswerResult.CORRECT) {
        return "bg-[green]";
      } else if (answer?.result === AnswerResult.PARTIAL) {
        return "bg-[orange]";
      } else {
        return "bg-[red]";
      }
    }
    return "bg-gray-400";
  };

  const calculatePoint = (attempt: Attempt) => {
    let point = 0;
    const questionIds = quiz?.questions?.map((quesiton) => quesiton.questionId);
    attempt.answers.map((answer) => {
      if (questionIds!.includes(answer.question) && answer.result === AnswerResult.CORRECT) {
        point += quiz?.questions?.find(
          (question) => question.questionId === answer.question
        )?.point! * answer.accuracyFactor! / 100;
      }
    });
    return point;
  };

  return (
    <div className=" border border-[#e5e7eb] rounded-2xl shadow-sm bg-white font-sans">
      <div className="flex items-center justify-end p-[10px]">
        <div className="flex items-center gap-[10px]">
          <span className="w-[15px] h-[15px]  rounded-[3px] bg-[green]"></span>
          <span className="text-[12px] font-semibold text-gray-500">
            Correct
          </span>
        </div>
      </div>
      <table className="w-full border-collapse">
        {/* Header */}
        <thead className="bg-gray-50 px-[20px] py-[10px]">
          <tr className="text-gray-500 text-sm">
            <th className="py-[10px]">Name</th>
            <th className="py-[10px]"></th>
            <th className="py-[10px]">Accuracy ↑</th>
            <th className="py-[10px]"> Points</th>
            <th className="py-[10px]">Score</th>
            <th className="py-[10px]">Status</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {attempts?.map((attempt) => (
            <tr key={attempt.attemptId} className="">
              <td className="py-3 px-2">
                <div className="flex items-center gap-3 px-2">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center">
                    <FaUser />
                  </div>
                  <span className="font-bold">{attempt.username}</span>
                </div>
              </td>

              {/* Progress */}
              <td className="py-3 flex-1 ">
                <div className="flex items-center gap-1 w-[500px] overflow-scroll">
                  {quiz?.questions?.map((question) => (
                    <div
                      key={question.questionId}
                      className={`w-5 h-4 ${checkAnswer(
                        attempt,
                        question
                      )} rounded-[3px]`}
                    ></div>
                  ))}
                </div>
              </td>

              {/* Accuracy */}
              <td className="text-center py-3">
                <PercentageBar
                  showIndicator={true}
                  indicator={10}
                  radius={20}
                  percentage={
                    attempt.answers.length === 0
                      ? 0
                      : attempt.answers.reduce(
                          (prev, cur) => prev + (cur.accuracyFactor ?? 0),
                          0
                        ) / quiz?.questions?.length!
                  }
                />
              </td>

              {/* Points */}
              <td className="text-center py-3 font-semibold">
                <span className="text-[15px]">{calculatePoint(attempt)}</span>
                <span className="text-[12px] text-[#747171]">
                  /{quiz?.questions?.reduce((prev, cur) => prev + cur.point, 0)}
                </span>
              </td>

              {/* Score + Actions */}
              <td className="text-right py-3 pr-4">
                <div className="flex items-center justify-center gap-4">
                  <div className="font-bold">{attempt.score}</div>
                </div>
              </td>

              <td className="text-right py-3 pr-4">
                <div className="flex items-center justify-center gap-4">
                  <div className="font-bold text-[11px] text-center">
                    {attempt.attemptStatus?.replace("_", " ")}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
