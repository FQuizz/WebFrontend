import { addQuestion, getAllQuizzes, Quiz } from "@/api/quizzes";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export default function QuizModal() {
  const [quizzes, setQuizzes] = useState<Array<Quiz>>([]);
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useSearchParams();
  useEffect(() => {
    getAllQuizzes()
      .then((res) => {
        if (res.success) {
          setQuizzes(res.data);
        } else {
          console.log("Get all quizzes failed");
        }
      })
      .catch((err) => console.log(err));
  }, [url]);

  useEffect(() => {
    if (url.keys().toArray().includes("questionId")) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [url]);

  const addQuestionToQuiz = (quizId: string) => {
    const questionId = url.get("questionId")!;
    addQuestion(quizId, questionId)
      .then((res) => {
        if (res.success) {
          window.alert("Add question to quiz successfully");
          setOpen(false);
        } else {
          window.alert(res.message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg w-[500px] max-h-[80vh] overflow-y-auto shadow-lg">
            {/* Header */}
            <div className="flex justify-between items-center p-4">
              <h2 className="text-xl font-semibold">Quizzes</h2>
              <button
                onClick={() => setUrl("")}
                className="text-gray-500 hover:text-gray-800 text-2xl leading-none cursor-pointer"
              >
                ×
              </button>
            </div>

            {/* Body */}
            <div className="p-4 flex flex-col gap-4">
                {quizzes.length === 0 && (
                    <div className="flex items-center justify-center">No created quiz</div>
                )}
              {quizzes.map((quiz) => (
                <div
                  key={quiz.quizId}
                  onClick={() => addQuestionToQuiz(quiz?.quizId)}
                  className="flex justify-between items-center hover:bg-[rgba(234,237,240,0.8)] p-[10px] cursor-pointer rounded-[8px]"
                >
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
                          <span className="font-[600] text-[15px]">
                            {quiz.title}
                          </span>
                          <span className="font-[600] text-[10px] px-[5px] py-[2px] border-1 rounded-[3px] border-[#e5e7eb]">
                            {quiz.visibility.replace("_", " ")}
                          </span>
                        </div>
                      </div>
                      <div className="text-[rgba(80,87,94,0.9)] text-[14px] font-[500]">
                        <span>{quiz.totalQuestion} Qs </span>
                        <span>• {quiz.totalAttempt} attempts </span>
                        <span>• Category</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-[20%]">
                    <div className="text-[rgba(80,87,94,0.9)] text-[16px]">
                      {new Date(quiz.createAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex justify-end p-4">
              <button
                onClick={() => setUrl("")}
                className="px-3 py-1 bg-[#8a8a8b] text-white rounded hover:opacity-[0.8] transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
