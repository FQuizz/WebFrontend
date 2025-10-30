import { QuizContext } from "@/layout/ReportPageLayout"
import { useContext } from "react"
import QuestionReviewItem from "./QuestionReviewItem"
import { Attempt } from "@/api/quizzes"

export default function QuestionReviewPage(){
    const context = useContext(QuizContext)
    const questions = context?.quiz?.questions
    const attempts = context?.attempts!
    const answers = attempts.map(attempt => attempt.answers).reduce((prev, cur) => [...prev,...cur], [])
    return (
        <div className="flex flex-col gap-[20px]">
            {questions?.map((question, index) => (
                <QuestionReviewItem key={question.questionId} index={index + 1} question={question} answers={answers.filter(answer => answer.question === question.questionId && answer.choices.length !== 0)}/>
            ))}
        </div>
    )
}