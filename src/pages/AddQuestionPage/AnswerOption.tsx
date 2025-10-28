import { FaTrashAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { CreatedQuestion, Option } from "./AddQuestionPage";
import { ChangeEvent, useRef } from "react";
interface Props {
  option: Option;
  question: CreatedQuestion;
  onChecked: Function;
  onDeleted: () => void;
  onEdited: (e: ChangeEvent<HTMLInputElement>) => void;
}
export default function AnswerOption({ onEdited, onDeleted , option, question, onChecked }: Props) {

  return (
    <div
      style={{ backgroundColor: option.color }}
      className="flex flex-col h-[250px] rounded-[8px] p-[5px]"
    >
      <div className="flex items-center justify-between p-[5px]">
        <div className="cursor-pointer">
          <FaTrashAlt color="white" onClick={onDeleted}/>
        </div>
        <div
          onClick={() => onChecked()}
          style={{
            backgroundColor: option.isCorrect ? "green" : "#00000087",
            borderRadius:
              question.questionType === "SINGLE_CHOICE" ? "50%" : "0%",
          }}
          className="w-[20px] h-[20px] border-2 border-[white] flex items-center justify-center cursor-pointer ]"
        >
          <FaCheck color="white" size={10} />
        </div>
      </div>
      <div className="focus-within:bg-[#00000063] flex flex-1 items-center justify-center rounded-[8px]">
        <input
          type="text"
          value={option.content}
          onChange={(e) => onEdited(e)}
          placeholder="Type answer option here"
          className="text-[white] flex-1 outline-0 text-center placeholder:text-[white]"
        />
      </div>
    </div>
  );
}
