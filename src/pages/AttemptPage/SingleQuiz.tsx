import { submitAnswer } from "@/api/attempt/attempt";
import { AnswerResult, Choice, Question } from "@/api/quizzes";
import { useState, useTransition } from "react";
import { useParams } from "react-router";

interface Props {
  currentQuestion: Question;
  nextQuestion: () => void;
}
export default function SingleChoiceQuiz({
  nextQuestion,
  currentQuestion,
}: Props) {
  const params = useParams();
  const [selected, setSelected] = useState<Array<Choice>>();
  const [correctChoiceIds, setCorrectChoiceIds] = useState<Array<string>>();
  const [_, startTransition] = useTransition();

  const answerAction = (choice: Choice) => {
    submitAnswer(params.attemptId as string, currentQuestion.questionId, [
      choice.choiceId,
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
    setSelected([choice]);
    startTransition(() => {
      answerAction(choice);
    });
  };
  return (
    <div className="grid grid-cols-4 gap-4.5 h-[50%]">
      {currentQuestion?.choices.map((choice) => (
        <div
          onClick={!selected ? () => handleSelect(choice) : undefined}
          key={choice.choiceId}
          className="h-full"
        >
          <div
            style={{
              opacity: !selected
                ? 1
                : selected
                    .map((choice) => choice.choiceId)
                    .includes(choice.choiceId) ||
                  correctChoiceIds?.includes(choice.choiceId)
                ? 1
                : 0,
              backgroundColor:
                !selected || !correctChoiceIds
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
  );
}
