import { ChangeEvent, useEffect, useState } from "react";
import AnswerOption from "./AnswerOption";
import { FaCheck } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { v4 as uuid } from "uuid";
import { createQuestion, editQuestion, getQuestion } from "@/api/questions";
import { useNavigate, useParams } from "react-router";

export interface Option {
  id: string;
  content: string;
  isCorrect: boolean;
  color: string;
}
export interface CreatedQuestion {
  content: string;
  questionType: "SINGLE_CHOICE" | "MULTIPLE_CHOICE";
  fact: string;
  point: number;
  timeLimit: number;
}

export default function AddQuestionPage() {
  const navigate = useNavigate();
  const { mode, id } = useParams();
  const [question, setQuestion] = useState<CreatedQuestion>({
    content: "",
    fact: "",
    questionType: "SINGLE_CHOICE",
    timeLimit: 20,
    point: 1,
  });

  useEffect(() => {
    if (mode === "edit") {
      getQuestion(id as string).then((res) => {
        if (res.success) {
          const editQuestion = res.data;
          setQuestion({
            content: editQuestion.content,
            questionType: editQuestion.questionType,
            timeLimit: editQuestion.timeLimit,
            point: editQuestion.point,
            fact: editQuestion.fact,
          });
          setOptions(
            editQuestion.choices.map((choice) => ({
              id: choice.choiceId,
              content: choice.content,
              isCorrect: choice.isCorrect,
              color: getRandomColor(),
            }))
          );
        }
      });
    }
  }, [mode]);

  const timeOptions = [
    5, 10, 20, 30, 45, 60, 90, 120, 180, 300, 600, 900, 1200,
  ];

  const getRandomColor = (): string => {
    const randomNumber = (): number => Math.floor(Math.random() * 50 + 100);
    return `rgb(${randomNumber()},${randomNumber()},${randomNumber()})`;
  };

  const [options, setOptions] = useState<Array<Option>>(() =>
    Array.from({ length: 4 }, () => ({
      id: uuid(),
      content: "",
      isCorrect: false,
      color: getRandomColor(),
    }))
  );

  const formatLabel = (seconds: number): string => {
    if (seconds < 60) return `${seconds} second${seconds !== 1 ? "s" : ""}`;
    const minutes = seconds / 60;
    return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
  };

  const handCheckCorrectAnswer = (id: string) => {
    if (question.questionType === "SINGLE_CHOICE") {
      setOptions((prev) =>
        prev.map((option) => ({
          ...option,
          isCorrect: option.id === id,
        }))
      );
    } else {
      setOptions((prev) =>
        prev.map((option) =>
          option.id === id
            ? { ...option, isCorrect: !option.isCorrect }
            : option
        )
      );
    }
  };

  const handleEditOption = (id: string, e: ChangeEvent<HTMLInputElement>) => {
    setOptions((prev) =>
      prev.map((opt) =>
        opt.id === id ? { ...opt, content: e.target.value } : opt
      )
    );
  };

  const handleDelelteChoice = (id: string) => {
    setOptions((prev) => prev.filter((option) => option.id !== id));
  };

  const handleSaveQuestion = () => {
    const data = {
      content: question.content,
      questionType: question.questionType,
      timeLimit: question.timeLimit,
      point: question.point,
      fact: question.fact,
      choices: options
        .map((option) => ({
          content: option.content,
          isCorrect: option.isCorrect,
        }))
        .filter((option) => option.content.trim() !== ""),
    };
    if (mode === "add") {
      createQuestion(data)
        .then((res) => {
          if (res.success) {
            navigate("/admin/questions");
          } else {
            console.log("Create question failed");
          }
        })
        .catch((err) => console.log(err));
    } else if (mode === "edit") {
      editQuestion(id as string, data)
        .then((res) => {
          if (res.success) {
            navigate("/admin/questions");
          } else {
            console.log("Create question failed");
          }
        })
        .catch((err) => console.log(err));
    } else {
      console.log("Unknown mode");
    }
  };

  return (
    <div className="p-[20px] h-full overflow-scroll">
      <div className="flex min-h-full items-center justify-center">
        <div className="w-[60%] p-[10px] flex flex-col gap-[10px]">
          <div className="w-full flex flex-col gap-[10px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[5px]">
                <div className="rounded-[8px] px-[5px] py-[7px] bg-[#eae7e7] text-black font-semibold flex items-center cursor-pointer gap-[2px]">
                  <FaCheck size={13} />
                  <select
                    value={question.point}
                    onChange={(e) =>
                      setQuestion((prev) => ({
                        ...prev,
                        point: Number(e.target.value),
                      }))
                    }
                    className=" outline-0 cursor-pointer"
                  >
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>
                        {num} point{num > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="rounded-[8px] px-[5px] py-[7px] cursor-pointer bg-[#eae7e7] text-black font-semibold flex items-center gap-[2px]">
                  <FaRegClock size={13} />
                  <select
                    className="outline-0 cursor-pointer"
                    value={question.timeLimit}
                    onChange={(e) =>
                      setQuestion((prev) => ({
                        ...prev,
                        timeLimit: Number(e.target.value),
                      }))
                    }
                  >
                    {timeOptions.map((sec) => (
                      <option key={sec} value={sec}>
                        {formatLabel(sec)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-[10px]">
                <button
                  onClick={() =>
                    setOptions((prev) => [
                      ...prev,
                      {
                        id: uuid(),
                        content: "",
                        isCorrect: false,
                        color: getRandomColor(),
                      },
                    ])
                  }
                  className="rounded-[8px] p-[7px] cursor-pointer bg-[#eae7e7] text-black font-semibold flex items-center gap-[10px] text-[14px]"
                >
                  <span>
                    <FaPlus size={13} />
                  </span>
                  <span>Add option</span>
                </button>
                <button
                  onClick={handleSaveQuestion}
                  className="rounded-[8px] p-[7px] cursor-pointer bg-[#eae7e7] text-black font-semibold flex items-center gap-[10px] text-[14px]"
                >
                  <span>
                    <FaSave size={13} />
                  </span>
                  <span>Save question</span>
                </button>
                <button
                  onClick={() => navigate("/admin/questions")}
                  className="rounded-[8px] p-[7px] cursor-pointer bg-[#eae7e7] text-black font-semibold flex items-center gap-[5px] text-[14px]"
                >
                  <span>
                    <MdCancel size={13} />
                  </span>
                  <span>Cancel</span>
                </button>
              </div>
            </div>
            <div>
              <input
                type="text"
                value={question.fact}
                onChange={(e) =>
                  setQuestion((prev) => ({ ...prev, fact: e.target.value }))
                }
                placeholder="Add a fact about the question"
                className="w-full border border-[#e5e7eb] rounded-[8px] p-2"
              />
            </div>
          </div>
          <div className="flex items-center justify-center border border-[#e5e7eb] rounded-[8px] focus-within:bg-[#00000049] h-[230px]">
            <input
              type="text"
              value={question.content}
              onChange={(e) =>
                setQuestion((prev) => ({ ...prev, content: e.target.value }))
              }
              placeholder="Type question here"
              className="p-2 w-full h-full text-center text-[20px] outline-0 placeholder:text-[black]"
            />
          </div>
          <div className="grid grid-cols-4 h-[45%] gap-[5px]">
            {options.map((option) => (
              <AnswerOption
                key={option.id}
                question={question}
                option={option}
                onChecked={() => handCheckCorrectAnswer(option.id)}
                onEdited={(e: ChangeEvent<HTMLInputElement>) =>
                  handleEditOption(option.id, e)
                }
                onDeleted={() => handleDelelteChoice(option.id)}
              />
            ))}
          </div>
          <div className="flex items-center gap-[10px]">
            <button
              style={{
                backgroundColor:
                  question.questionType === "SINGLE_CHOICE"
                    ? "#9c9a9a"
                    : "transparent",
              }}
              className="border border-[#e5e7eb] px-[10px] py-[5px] cursor-pointer rounded-[8px] text-[black] font-[600] text-[14px] hover:bg-[#0000003f]"
              onClick={() =>
                setQuestion((q) => ({ ...q, questionType: "SINGLE_CHOICE" }))
              }
            >
              Single correct answer
            </button>
            <button
              style={{
                backgroundColor:
                  question.questionType === "MULTIPLE_CHOICE"
                    ? "#9c9a9a"
                    : "transparent",
              }}
              className="border border-[#e5e7eb] px-[10px] py-[5px] cursor-pointer rounded-[8px] text-[black] font-[600] text-[14px] hover:bg-[#0000003f]"
              onClick={() =>
                setQuestion((q) => ({ ...q, questionType: "MULTIPLE_CHOICE" }))
              }
            >
              Multiple correct answers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
