import { getQuizById, Quiz } from "@/api/quizzes";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import QuesitonItem from "./QuestionItem";
import FunctionButton from "./FunctionButton";
import { FaShare } from "react-icons/fa6";
import { MdOutlineSettings } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";
import QuizSettings from "./QuizSettingModal";
import DeleteConfirmModal from "../QuizzesPage/ConfirmModal";
import { FaPlay } from "react-icons/fa";
import { createShortLink } from "@/api/shortlink/shortlink";
import { AuthContext } from "@/App";

export default function QuizDetailPage() {
  const { user } = useContext(AuthContext);
  const params = useParams();
  const [url] = useSearchParams();
  const navigate = useNavigate();
  const quizId = params.quizId as string;
  const [quiz, setQuiz] = useState<Quiz>();
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    getQuizById(quizId)
      .then((res) => {
        if (res.success) {
          console.log(user);
          console.log(res.data);
          setQuiz(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [url]);

  const handleCopyLink = () => {
    createShortLink(params.quizId as string)
      .then((res) => {
        const shortUrl = `http://localhost:3000/${res.data.shortCode}`;
        setTimeout(() => {
          navigator.clipboard
            .writeText(shortUrl)
            .then(async () => {
              window.alert("Copied link to clipboard successfully!");
            })
            .catch((err: Error) => console.error("Failed to copy link:", err));
        }, 0);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      {quiz && <QuizSettings editQuiz={quiz} />}
      <DeleteConfirmModal />
      <div className="flex flex-col gap-[20px] px-[80px] py-[15px] h-full overflow-scroll">
        <div className="flex items-center gap-[15px]">
          <div className="w-[200px] h-[200px]">
            <img
              src="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt=""
              className="w-[100%] h-[100%] object-cover rounded-[8px]"
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <div className="font-[800] text-[18px]">
              {quiz?.title !== "" ? quiz?.title : "Untitled"}
            </div>
            <div className="w-[300px] text-wrap font-sans">
              {quiz?.description}
            </div>
            <div className="flex items-center gap-[10px]">
              <div className="w-[25px] h-[25px]">
                <img
                  src={quiz?.createBy.profileImageUrl}
                  alt=""
                  className="w-[100%] h-[100%] object-cover rounded-[50%]"
                />
              </div>
              <div>{quiz?.createBy.username}</div>
              <div>•</div>
              <div>Category</div>
              <div>•</div>
              <div>Easy</div>
            </div>
          </div>
        </div>
        <div className="flex gap-[10px]">
          {user?.sub == quiz?.createBy.id && (
            <FunctionButton
              size={15}
              title="Setting"
              icon={<MdOutlineSettings size={17} />}
              callback={() => navigate("?edit")}
            />
          )}

          <FunctionButton
            size={15}
            title="Share"
            icon={<FaShare size={17} />}
            callback={() => handleCopyLink()}
          />
          {user?.sub == quiz?.createBy.id && (
            <FunctionButton
              size={15}
              title="Questions"
              icon={<FaListUl size={17} />}
              callback={() => navigate("/admin/questions")}
            />
          )}
          <FunctionButton
            size={15}
            title="Play"
            icon={<FaPlay size={17} />}
            callback={() => navigate(`/quizzes/pre-game/${quizId}`)}
          />
        </div>
        <div className="h-[1px] w-[100%] bg-[#e5e7eb]"></div>
        <div className="border border-[#e5e7eb] rounded-[16px]">
          <div className="flex items-center justify-between py-[20px] px-[15px]">
            <span>{quiz?.questions?.length} questions</span>
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
            {quiz?.questions?.map((question, index) => (
              <QuesitonItem
                key={question.questionId}
                index={index + 1}
                question={question}
                showAnswer={enabled}
                isLastItem={index + 1 === quiz.questions?.length}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
