import { updateQuiz, Quiz } from "@/api/quizzes";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSearchParams } from "react-router";

interface Props {
  editQuiz: Quiz;
}

export default function QuizSettings({ editQuiz }: Props) {
  const [url, setUrl] = useSearchParams();
  const [quiz, setQuiz] = useState(editQuiz);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (
      url.keys().toArray().includes("create") ||
      url.keys().toArray().includes("edit")
    ) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [url]);

  const handleSaveQuiz = () => {
    const data = {
      title: quiz.title,
      description: quiz.description,
      visibility: quiz.visibility,
    };
    updateQuiz(quiz.quizId, data)
      .then((res) => {
        if (res.success) {
          setUrl("");
          window.alert("Edit the quiz successfully");
          setOpen(false);
        } else {
          window.alert("Edit the quiz failed");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      {open && quiz && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#0000007a] z-50">
          <div className="bg-white rounded-2xl shadow-xl w-[550px] max-w-3xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Quiz settings</h2>
              <button
                className="text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
                onClick={() => {
                  setOpen(false);
                  setUrl("");
                }}
              >
                &times;
              </button>
            </div>

            <div className=" gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    <strong>Title</strong>
                    <div>Enter a title for your quiz.</div>
                  </label>
                  <input
                    type="text"
                    value={quiz?.title}
                    onChange={(e) =>
                      setQuiz((prev) => ({ ...prev, title: e.target.value }))
                    }
                    placeholder=""
                    className="w-full border rounded-lg p-2 outline-none text-[16px]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <div>
                      <strong>Description </strong>(Optional)
                    </div>
                    <div>
                      Provide a short description for your kahoot to increase
                      visibility.
                    </div>
                  </label>
                  <textarea
                    placeholder=""
                    value={quiz?.description}
                    onChange={(e) =>
                      setQuiz((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="w-full h-[150px] border rounded-lg p-2 outline-none text-[16px]"
                  />
                </div>

                {/* Visibility */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    <div>
                      <strong>Visibility</strong>
                    </div>
                    Choose who can see this quiz.
                  </p>

                  <div
                    onClick={() =>
                      setQuiz((prev) => ({ ...prev, visibility: "PUBLIC" }))
                    }
                    className={`flex items-center border rounded-lg p-3 mb-2 cursor-pointer ${
                      quiz?.visibility === "PUBLIC"
                        ? "border-green-500 b-green-50"
                        : "border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      checked={quiz?.visibility === "PUBLIC"}
                      onChange={() =>
                        setQuiz((prev) => ({ ...prev, visibility: "PUBLIC" }))
                      }
                      className="mr-3 accent-green-500"
                    />
                    <div>
                      <p className="font-medium text-sm">🌍 Public</p>
                      <p className="text-xs text-gray-500">
                        This resource will be publicly visible to everyone
                      </p>
                    </div>
                  </div>

                  <div
                    onClick={() =>
                      setQuiz((prev) => ({ ...prev, visibility: "PRIVATE" }))
                    }
                    className={`flex items-center border rounded-lg p-3 mb-2 cursor-pointer ${
                      quiz?.visibility === "PRIVATE"
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      checked={quiz?.visibility === "PRIVATE"}
                      onChange={() =>
                        setQuiz((prev) => ({ ...prev, visibility: "PRIVATE" }))
                      }
                      className="mr-3 accent-red-500"
                    />
                    <div>
                      <p className="font-medium text-sm">🔒 Private</p>
                      <p className="text-xs text-gray-500">
                        This resource will be visible only to you and people you
                        share with
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      className="px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setOpen(false);
                        setUrl("");
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-700 cursor-pointer"
                      onClick={handleSaveQuiz}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
