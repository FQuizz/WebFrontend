import { Question } from "@/api/quizzes";
import { FaCheckCircle } from "react-icons/fa";
import FunctionButton from "./FunctionButton";
import { LiaEditSolid } from "react-icons/lia";
import { FaRegTrashAlt } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router";
import { deleteQuestion } from "@/api/questions";
import { Dispatch, SetStateAction, useContext } from "react";
import { FaPlus } from "react-icons/fa";
import { AuthContext } from "@/App";
interface Props {
  index: number;
  showAnswer: boolean;
  question: Question;
  isLastItem: boolean;
  setOnDeleteFlag?: Dispatch<SetStateAction<boolean>>;
  onAddQuestion?: Function;
}
export default function QuesitonItem({
  isLastItem,
  index,
  question,
  showAnswer,
  setOnDeleteFlag,
  onAddQuestion,
}: Props) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [url, setUrl] = useSearchParams();
  return (
    <div
      key={question.questionId}
      className={`border border-[#e5e7eb] p-[15px] ${
        isLastItem ? "rounded-b-[16px]" : ""
      } flex flex-col gap-[15px]`}
    >
      <div className="flex items-center justify-between">
        <div className="text-[14px]">
          <span>{index}. </span>
          <span>{question.questionType.replace("_", " ")}</span>
          <span> • {question.timeLimit} sec</span>
          <span> • {question.point} pt</span>
        </div>
        <div className="flex items-center gap-[10px]">
          {user?.sub == question.createBy && (
            <>
              <FunctionButton
                size={10}
                title="Edit"
                icon={<LiaEditSolid size={17} />}
                callback={() =>
                  navigate(`/admin/questions/${question.questionId}/edit`)
                }
              />
              {onAddQuestion && (
                <div
                  onClick={() => {
                    url.append("questionId", question.questionId);
                    setUrl(url);
                    onAddQuestion!();
                  }}
                  className="px-[15px] py-[8px] border border-[#e5e7eb] rounded-[16px] cursor-pointer hover:bg-[#e5e7eb]"
                >
                  <FaPlus />
                </div>
              )}
              <div
                onClick={() =>
                  navigate(`?deleteQuestionId=${question.questionId}`)
                }
                className="px-[15px] py-[8px] border border-[#e5e7eb] rounded-[16px] cursor-pointer hover:bg-[#e5e7eb]"
              >
                <FaRegTrashAlt />
              </div>
            </>
          )}
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
                {choice.isCorrect && showAnswer ? (
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
  );
}
