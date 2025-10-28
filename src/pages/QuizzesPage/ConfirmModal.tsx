import { deleteQuestion } from "@/api/questions";
import { deleteQuestionFromQuiz, deleteQuiz } from "@/api/quizzes";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useParams, useSearchParams } from "react-router";
export default function DeleteConfirmModal() {
  const [open, setOpen] = useState(false);
  const params = useParams()
  const [url, setUrl] = useSearchParams();
  useEffect(() => {
    const keys = url.keys().toArray();
    if (keys.includes("deleteId") || keys.includes("deleteQuestionId")) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [url]);

  const handleClick = () => {
    const keys = url.keys().toArray();
    if (keys.includes("deleteId")) {
      handleDeleteQuiz();
    } else if (keys.includes("deleteQuestionId")) {
      hanldeDeleteQuestion();
    }
  };

  const handleDeleteQuiz = () => {
    if (url.keys().toArray().includes("deleteId")) {
      deleteQuiz(url.get("deleteId")!)
        .then((res) => {
          if (res.success) {
            setUrl("");
          } else {
            window.alert("Delete quiz failed");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const hanldeDeleteQuestion = () => {
    if (url.keys().toArray().includes("deleteQuestionId") && !params.quizId) {
      deleteQuestion(url.get("deleteQuestionId")!)
        .then((res) => {
          if (res.success) {
            setUrl("");
            window.alert("Delete question successfully");
          } else {
            console.log("Delete question failed");
          }
        })
        .catch((err) => console.log(err));
    }else{
        deleteQuestionFromQuiz(params.quizId!,url.get("deleteQuestionId")!)
        .then(res => {
            if(res.success){
                setUrl("")
                window.alert("Delete question successfully")
            }else{
                window.alert("Delete question failed")
            }
        }) 
        .catch(err => console.log(err))
    }
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-lg shadow-lg w-[500px] p-6">
            {/* Close button (X) */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>

            {/* Icon and message */}
            <div className="flex items-start space-x-3 mb-4">
              <div className="flex items-center justify-center p-[10px] rounded-[50%] bg-red-100 text-red-600 text-[14px]">
                <IoMdClose size={15} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Are you sure you want to delete this activity?
                </h2>
                <p className="text-sm text-gray-600">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setOpen(false);
                  setUrl("");
                }}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleClick}
                className="px-4 py-2 rounded-md bg-orange-600 text-white hover:bg-orange-700 cursor-pointer"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
