import { Answer, AnswerResult, Question } from "@/api/quizzes";
import { FaRegCheckSquare } from "react-icons/fa";
import { FaCoins } from "react-icons/fa";
import PercentageBar from "./PercentageBar";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
interface Props {
  question: Question;
  answers: Array<Answer>;
  index: number;
}
export default function QuestionReviewItem({
  question,
  answers,
  index,
}: Props) {
  return (
    <div className="border border-[#e5e7eb] rounded-[8px] shadow-sm p-[15px]">
      <div className="flex items-center justify-between pb-[10px]">
        <div className="flex items-center gap-[10px] text-[11px] font-semibold">
          <div className="flex items-center gap-[5px] p-[5px] bg-[#d8d7d7] rounded-[5px]">
            <FaRegCheckSquare />
            <div>{question.questionType.replace("_", " ")}</div>
          </div>
          <div className="flex items-center gap-[5px] p-[5px] bg-[#d8d7d7] rounded-[5px]">
            <FaCoins />
            <div>{question.point} point</div>
          </div>
        </div>
        <div className="text-[12px] flex items-center gap-[5px]">
          <PercentageBar
            showIndicator={false}
            radius={10}
            percentage={Number(
              (answers.length != 0
                ? answers.reduce((prev, cur) => prev + cur.accuracyFactor!, 0) /
                  answers.length
                : 0
              ).toPrecision(2)
            )}
          />
          <div className="flex items-center gap-[10px]">
            <div className="flex items-center gap-[5px]">
              <span className="font-semibold font-sans">
                {answers.length != 0
                  ? answers.reduce(
                      (prev, cur) => prev + cur.accuracyFactor!,
                      0
                    ) / answers.length
                  : 0}
                %
              </span>
              <span className="text-[#676767]">Accuracy</span>
            </div>

            <div>|</div>
            <div className="font-semibold tetx-[14px]">
              {answers.length} answers
            </div>
          </div>
        </div>
      </div>
      <div className="h-[1px] bg-[#e5e7eb]"></div>
      <div className="py-[10px] text-[14px] flex flex-col gap-[10px]">
        <div>
          <div className="text-[#585757] font-semibold font-sans text-[12px]">
            Question
          </div>
          <div className="font-semibold">
            {index}. {question.content}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div>
              <div className="text-[#585757] font-semibold font-sans text-[12px]">
                Options
              </div>
              {question.choices.map((choice, idx) => (
                <div key={idx} className="flex items-center gap-[10px]">
                  <div>{String.fromCharCode(65 + idx)}</div>
                  <div>
                    <div className="font-semibold font-sans">
                      {choice.content}
                    </div>
                    <div className="relative w-[200px] bg-[#f0efef] text-[11px] font-medium text-[#414040] px-[5px] py-[1px] rounded-[3px] z-10 overflow-hidden font-sans">
                      <div
                        className="absolute top-0 left-0 bottom-0 z-0"
                        style={{
                          width: `${Math.round(
                            (200 *
                              answers.filter((answers) =>
                                answers.choices
                                  .map((c) => c.choiceId)
                                  .includes(choice.choiceId)
                              ).length) /
                              answers.length
                          )}px`,
                          backgroundColor: choice.isCorrect
                            ? "#b9f8cf"
                            : "#f2b7b7",
                        }}
                      ></div>

                      <div className="relative z-10 flex items-center justify-between">
                        {choice.isCorrect ? (
                          <FaCheck color="green" />
                        ) : (
                          <FaXmark color="red" />
                        )}
                        {
                          answers.filter((answers) =>
                            answers.choices
                              .map((c) => c.choiceId)
                              .includes(choice.choiceId)
                          ).length
                        }{" "}
                        answered
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-[15px] w-[250px] flex flex-col gap-[10px] font-sans border-l-2 border-l-[#e5e7eb]">
            <div className="w-full text-[12px]">
              <div className="flex items-center justify-between">
                <div>Correct</div>
                <div className="font-semibold">
                  {
                    answers.filter(
                      (answer) => answer.result === AnswerResult.CORRECT
                    ).length
                  }{" "}
                  answers
                </div>
              </div>
              <div className="w-full h-[20px] bg-[#e6e5e5] relative">
                <div
                  className="bg-green-500 absolute top-0 left-0 bottom-0 z-10"
                  style={{
                    width: `${
                      (answers.filter(
                        (answer) => answer.result === AnswerResult.CORRECT
                      ).length /
                        answers.length) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
            <div className="w-full text-[12px]">
              <div className="flex items-center justify-between">
                <div>Partial correct</div>
                <div className="font-semibold">
                  {
                    answers.filter(
                      (answer) => answer.result === AnswerResult.PARTIAL
                    ).length
                  }{" "}
                  answers
                </div>
              </div>
              <div className="w-full h-[20px] bg-[#e6e5e5] relative">
                <div
                  className="bg-orange-500 absolute top-0 left-0 bottom-0 z-10"
                  style={{
                    width: `${
                      (answers.filter(
                        (answer) => answer.result === AnswerResult.PARTIAL
                      ).length /
                        answers.length) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
            <div className="w-full text-[12px]">
              <div className="flex items-center justify-between">
                <div>Incorrect</div>
                <div className="font-semibold">
                  {
                    answers.filter(
                      (answer) => answer.result === AnswerResult.INCORRECT
                    ).length
                  }{" "}
                  answers
                </div>
              </div>
              <div className="w-full h-[20px] bg-[#e6e5e5] relative">
                <div
                  className="bg-red-500 absolute top-0 left-0 bottom-0 z-10"
                  style={{
                    width: `${
                      (answers.filter(
                        (answer) => answer.result === AnswerResult.INCORRECT
                      ).length /
                        answers.length) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
