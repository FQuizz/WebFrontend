import { useEffect, useState } from "react";
import QuesitonItem from "../QuizDetailPage/QuestionItem";
import { Question } from "@/api/quizzes";
import { getAllQuestion } from "@/api/questions";
import FunctionButton from "../QuizDetailPage/FunctionButton";
import { FaPlus } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router";
import QuizModal from "./QuizModal";
import DeleteConfirmModal from "../QuizzesPage/ConfirmModal";

export default function QuestionPage() {
  const [questions, setQuestions] = useState<Array<Question>>([]);
  const [onDelete, setOnDelete] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useSearchParams();

  const navigate = useNavigate();
  useEffect(() => {
    getAllQuestion()
      .then((res) => {
        if (res.success) {
          setQuestions(res.data);
          setOnDelete(false);
        }
      })
      .catch((err) => console.log(err));
  }, [onDelete, url]);
  return (
    <>
      <QuizModal />
      <DeleteConfirmModal />
      <div className="flex flex-col gap-[20px] px-[80px] py-[15px] h-full overflow-scroll">
        <div className="text-[20px] font-[600] flex flex-col gap-[10px]">
          <div>Questions are created by me</div>
          <div>
            <FunctionButton
              size={15}
              title="Add Question"
              icon={<FaPlus size={17} />}
              callback={() => navigate("add")}
            />
          </div>
        </div>
        <div className="h-[1px] w-[100%] bg-[#e5e7eb]"></div>
        <div className="border border-[#e5e7eb] rounded-[16px]">
          <div className="flex items-center justify-between py-[20px] px-[15px]">
            <span>{questions.length} questions</span>
            <span className="flex items-center gap-[10px]">
              <span>Show answers</span>
              <button
                onClick={() => setEnabled(!enabled)}
                className={`relative cursor-pointer hover:opacity-[0.6] inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  enabled ? "bg-green-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    enabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </span>
          </div>
          <div>
            {questions.map((question, index) => (
              <>
                {question.content !== "" && (
                  <QuesitonItem
                    index={index + 1}
                    question={question}
                    showAnswer={enabled}
                    onAddQuestion={() => setOpen(true)}
                    setOnDeleteFlag={setOnDelete}
                    isLastItem={index + 1 === questions?.length}
                  />
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
