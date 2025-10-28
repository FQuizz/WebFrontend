import { Quiz } from "@/api/quizzes";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { useNavigate } from "react-router";
import { FaTrashAlt } from "react-icons/fa";
interface Props {
  quiz: Quiz;
  showAction?: boolean;
}
export default function QuizItem({ quiz, showAction = true }: Props) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center hover:bg-orange-100 p-[10px] cursor-pointer rounded-[8px]">
      <div className="flex items-center gap-[15px] w-[80%]">
        <div className="w-[50px] h-[50px]">
          <img
            src="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt=""
            className="w-[100%] h-[100%] object-cover rounded-[8px]"
          />
        </div>
        <div className="flex flex-col gap-[5px]">
          <div>
            <div className="flex items-center gap-[10px]">
              <span
                className="font-[600] text-[15px] text-wrap w-[250px]"
                onClick={() => navigate(`/admin/quizzes/${quiz.quizId}`)}
              >
                {quiz.title}
              </span>
              <span className="font-[600] text-[10px] px-[5px] py-[2px] border-1 rounded-[3px] border-[#e5e7eb]">
                {quiz.visibility.replace("_", " ")}
              </span>
            </div>
          </div>
          <div className="text-[rgba(80,87,94,0.9)] text-[14px] font-[500]">
            <div className="w-[200px] overflow-clip h-[25px]">{quiz.description}</div>
            <span>{quiz.totalQuestion} Qs </span>
            <span>• {quiz.totalAttempt} attempts </span>
            <span>• Category</span>
          </div>
        </div>
      </div>
      {showAction && (
        <div className="flex items-center justify-between w-[20%]">
          <div className="text-[rgba(80,87,94,0.9)] text-[16px]">
            {new Date(quiz.createAt).toLocaleDateString()}
          </div>
          <button
            className="flex items-center justify-center gap-[2px] px-[20px] py-[8px] bg-[white] border-[1.7px] border-[#e5e7eb] rounded-[10px] font-[600] cursor-pointer hover:bg-[rgba(234,237,240,0.8)]"
            onClick={() => navigate(`${quiz.quizId}?edit`)}
          >
            <span>
              <MdOutlineModeEditOutline size={17} />
            </span>
            <span className="text-[13px]">Edit</span>
          </button>
          <button
            className="flex items-center justify-center gap-[2px] px-[20px] py-[8px] bg-[white] border-[1.7px] border-[#e5e7eb] rounded-[10px] font-[600] cursor-pointer hover:bg-[rgba(234,237,240,0.8)]"
            onClick={() => navigate(`?deleteId=${quiz.quizId}`)}
          >
            <span>
              <FaTrashAlt size={17} />
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
