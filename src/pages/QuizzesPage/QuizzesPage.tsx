import { createQuiz, getAllQuizzes, Quiz } from "@/api/quizzes";
import { useEffect, useState } from "react";
import QuizItem from "./QuizItem";
import { FaPlus } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router";
import DeleteConfirmModal from "./ConfirmModal";
enum Filter {
  ALL = "ALL",
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
}
export default function QuizzesPage() {
  const [url] = useSearchParams();
  const [quizzes, setQuizzes] = useState<Array<Quiz>>([]);
  const [filter, setFilter] = useState<Filter>(Filter.ALL);
  const navigate = useNavigate();
  useEffect(() => {
    getAllQuizzes()
      .then((res) => {
        if (res.success) {
          let countUntitle = 1;
          console.log(res.data);
          setQuizzes(
            res.data.map((quiz) => {
              if (quiz.title === "") {
                quiz.title = `Untitled-${countUntitle}`;
                countUntitle++;
              }
              return quiz;
            })
          );
        }
      })
      .catch((err) => console.log(err));
  }, [url]);
  const handleAddQuiz = () => {
    createQuiz({
      title: "",
      description: "",
      visibility: "PUBLIC",
    })
      .then((res) => {
        if (res.success) {
          navigate(`${res.data.quizId}?create`);
        } else {
          window.alert("Create quiz failed");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <DeleteConfirmModal />
      <div className="flex flex-col p-[50px] gap-[25px] h-full overflow-scroll">
        <div className="text-[20px] font-[600]">Quizzes are created by me</div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[20px]">
            <button
              className={`bg-[white] ${
                filter === Filter.ALL
                  ? "border-[1.7px] border-[#e5e7eb]"
                  : "border-none hover:bg-[#e5e7eb] [#e5e7eb] text-[rgba(80,87,94,0.8)]"
              } px-[30px] py-[8px] text-[14px] font-[600] rounded-full cursor-pointer`}
            >
              <span>All </span>
              <span>
                ({quizzes?.length}/{quizzes?.length})
              </span>
            </button>
            <button
              className={`bg-[white] ${
                filter === Filter.PUBLIC
                  ? "border-[1.7px] border-[#e5e7eb]"
                  : "border-none hover:bg-[#e5e7eb] [#e5e7eb] text-[rgba(80,87,94,0.8)]"
              } px-[30px] py-[8px] text-[14px] font-[600] rounded-full cursor-pointer`}
            >
              <span>Public </span>
              <span>
                ({quizzes?.filter((q) => q.visibility === "PUBLIC").length}/
                {quizzes?.length})
              </span>
            </button>
            <button
              className={`bg-[white] ${
                filter === Filter.PRIVATE
                  ? "border-[1.7px] border-[#e5e7eb]"
                  : "border-none hover:bg-[#e5e7eb] text-[rgba(80,87,94,0.8)]"
              } px-[30px] py-[8px] text-[14px] font-[600] rounded-full cursor-pointer`}
            >
              <span>Private </span>
              <span>
                ({quizzes?.filter((q) => q.visibility === "PRIVATE").length}/
                {quizzes?.length})
              </span>
            </button>
          </div>
          <button
            className={`bg-[white] border border-[#e5e7eb] px-[30px] py-[8px] text-[14px] font-[600] rounded-full cursor-pointer hover:bg-[#e5e7eb] flex items-center gap-[10px]`}
            onClick={handleAddQuiz}
          >
            <span>
              <FaPlus />
            </span>
            <span>Add quiz</span>
          </button>
        </div>
        <div className="border-[1.7px] border-[#e5e7eb] rounded-[16px] p-[10px]">
          {quizzes?.map((quiz) => (
            <QuizItem quiz={quiz} key={quiz.quizId} />
          ))}
        </div>
      </div>
    </>
  );
}
