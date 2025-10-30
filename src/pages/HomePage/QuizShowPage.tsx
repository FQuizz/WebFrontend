import { getQuizById, Question, Quiz } from "@/api/quizzes";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaPlus } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router";
import { FaPlay } from "react-icons/fa";
import QuizModal from "../QuestionPage/QuizModal";
interface Props {
  quiz: Quiz;
}
export default function QuizShowPage({ quiz }: Props) {
  const [questions, setQuestions] = useState<Array<Question>>([]);
  const [url, setUrl] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    getQuizById(quiz.quizId)
      .then((res) => {
        if (res.success) {
          setQuestions(res.data.questions!);
        } else {
          console.log("Get quiz by id failed");
        }
      })
      .catch((err) => console.log(err));
  }, [quiz]);
  return (
    <>
      <QuizModal />
      <div className="border border-orange-400 rounded-[8px]">
        <div className="flex items-center justify-between px-[20px] py-[10px]">
          <div>
            <div className="font-semibold">{quiz.title}</div>
            <div className="text-[#656565]">{quiz.totalQuestion} questions</div>
          </div>
          <div>
            <button
              onClick={() => navigate(`/quizzes/pre-game/${quiz.quizId}`)}
              className="flex items-center gap-[5px] border-none bg-orange-400 px-[15px] py-[6px] rounded-[5px] text-[12px] text-white cursor-pointer hover:opacity-[0.8]"
            >
              <span>
                <FaPlay />
              </span>
              <span>Play</span>
            </button>
          </div>
        </div>
        <div>
          {questions.map((question, index) => (
            <div
              key={question.questionId}
              className="flex flex-col gap-[15px] px-[20px] py-[15px]"
            >
              <div className="h-[1px] bg-[#e5e7eb]"></div>
              <div className="flex items-center justify-between">
                <div className="text-[14px]">
                  <span>{index}. </span>
                  <span>{question.questionType.replace("_", " ")}</span>
                  <span> • {question.timeLimit} sec</span>
                  <span> • {question.point} pt</span>
                </div>
                <div className="flex items-center gap-[10px]">
                  <div
                    onClick={() => {
                      url.append("questionId", question.questionId);
                      setUrl(url);
                    }}
                    className="px-[15px] py-[8px] border border-[#e5e7eb] rounded-[16px] cursor-pointer hover:bg-[#e5e7eb]"
                  >
                    <FaPlus />
                  </div>
                </div>
              </div>
              <div>
                <div className="text-[16px] font-[600] mb-[10px]">
                  {question.content}
                </div>
                <div className="flex flex-col gap-[10px]">
                  <div className="grid grid-cols-2 gap-[10px]">
                    {question?.choices.map((choice) => (
                      <div
                        key={choice.choiceId}
                        className="flex items-center gap-[10px]"
                      >
                        {choice.isCorrect ? (
                          <FaCheckCircle color="green" size={17} />
                        ) : (
                          <div className="border w-[15px] h-[15px] rounded-[50%]"></div>
                        )}
                        <div className="text-[15px]">{choice.content}</div>
                      </div>
                    ))}
                  </div>
                  {question.fact && (
                    <div>
                      <span className="font-[600]">Fact: </span>
                      <span>{question.fact}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
