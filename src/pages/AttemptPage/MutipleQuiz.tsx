import { submitAnswer } from "@/api/attempt/attempt";
import { AnswerResult, Choice, Question } from "@/api/quizzes";
import { useState, useTransition } from "react";
import { useParams } from "react-router";

interface Props {
  currentQuestion: Question;
  nextQuestion: () => void;
}
export default function MutipleChoiceQuiz({
  nextQuestion,
  currentQuestion,
}: Props) {
  const params = useParams();
  const [onSubmit, setOnSubmit] = useState(false);
  const [selected, setSelected] = useState<Array<Choice>>();
  const [correctChoiceIds, setCorrectChoiceIds] = useState<Array<string>>();
  const [_, startTransition] = useTransition();

  const answerAction = (choices: Array<Choice>) => {
    setOnSubmit(true);
    setCorrectChoiceIds(
      currentQuestion.choices
        .filter((choice) => choice.isCorrect)
        .map((choice) => choice.choiceId)
    );
    submitAnswer(params.attemptId as string, currentQuestion.questionId, [
      choices.map((choice) => choice.choiceId).join(","),
    ])
      .then((res) => {
        setCorrectChoiceIds(
          currentQuestion.choices
            .filter((choice) => choice.isCorrect)
            .map((choice) => choice.choiceId)
        );
        setTimeout(() => {
          nextQuestion();
          setSelected(undefined);
          setCorrectChoiceIds(undefined);
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  const handleSelect = (choice: Choice) => {
    if (!selected) {
      setSelected([choice]);
    } else {
      if (selected.map((choice) => choice.choiceId).includes(choice.choiceId)) {
        setSelected((prev) =>
          prev?.filter((c) => c.choiceId !== choice.choiceId)
        );
      } else {
        setSelected((prev) => [...prev!, choice]);
      }
    }
  };
  return (
    <>
      {console.log(selected)}
      <div className="grid grid-cols-4 gap-4.5 h-[50%]">
        {currentQuestion?.choices.map((choice) => (
          <div
            onClick={() => handleSelect(choice)}
            key={choice.choiceId}
            className="h-full relative"
          >
            <input
              onChange={() => handleSelect(choice)}
              checked={
                selected &&
                selected
                  .map((_choice) => _choice.choiceId)
                  .includes(choice.choiceId)
              }
              type="checkbox"
              id={choice.choiceId}
              className="absolute top-0 right-0 w-[25px] h-[25px] accent-green-400 cursor-pointer"
              style={{
                visibility: !onSubmit
                  ? "visible"
                  : onSubmit &&
                    selected &&
                    (selected
                      .map((choice) => choice.choiceId)
                      .includes(choice.choiceId) ||
                      correctChoiceIds?.includes(choice.choiceId))
                  ? "visible"
                  : "hidden",
              }}
            />
            <div
              style={{
                opacity: !onSubmit
                  ? 1
                  : onSubmit &&
                    selected &&
                    (selected
                      .map((choice) => choice.choiceId)
                      .includes(choice.choiceId) ||
                      correctChoiceIds?.includes(choice.choiceId))
                  ? 1
                  : 0,
                backgroundColor:
                  (!selected || !correctChoiceIds) && !onSubmit
                    ? "orange"
                    : correctChoiceIds?.length !== 0 &&
                      correctChoiceIds?.includes(choice.choiceId)
                    ? "green"
                    : "red",
              }}
              className="
      transition-all duration-300 ease-in-out 
      rounded-xl text-white h-full flex items-center justify-center text-[25px] 
      cursor-pointer hover:opacity-80 border-b-8 border-b-[#8c4e0c] font-[Quicksand,Helvetica,Arial]"
            >
              {choice.content}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={
          selected
            ? () => startTransition(() => answerAction(selected))
            : undefined
        }
        disabled={!selected ? true : false}
        className="self-end bg-orange-500 text-white px-4 py-2 rounded-lg font-sans font-semibold cursor-pointer hover:opacity-[0.8] disabled:bg-gray-500"
      >
        Submit
      </button>
    </>
  );
}
