import { getAllQuizzes, getAllQuizzesForReport, Quiz } from "@/api/quizzes";
import { useEffect, useState } from "react";
import { FaPlay, FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { useNavigate } from "react-router";

export default function ReportPage() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<Array<Quiz>>([]);
  useEffect(() => {
    getAllQuizzesForReport()
      .then((res) => {
        if (res.success) {
          let countUntitle = 1;
          console.log(res.data);
          setQuizzes(
            res.data.map((quiz) => {
              if (quiz.title === "") {
                quiz.title = `Untitled-${countUntitle}`;
                countUntitle++;
              }
              return quiz;
            })
          );
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex flex-col gap-[10px]">
      <div className="text-[20px] font-semibold">Reports</div>
      <div className="p-6 bg-white rounded-lg shadow">
        <table className="w-full border-collapse">
          {/* Header */}
          <thead className="bg-gray-50 text-gray-600 text-sm font-medium">
            <tr>
              <th className="p-3 text-left">Quiz title</th>
              <th className="p-3 text-left">Create date</th>
              <th className="p-3 text-left">attemtps</th>
              <th className="p-3 text-left">questions</th>
              <th className="p-3 text-left">Description</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="text-sm text-gray-700 cursor-pointer">
            {quizzes.map((quiz) => (
              <tr
                key={quiz.quizId}
                className="hover:bg-gray-50"
                onClick={() => navigate(`${quiz.quizId}/attempts`)}
              >
                <td className="p-3">
                  <div className="font-semibold">{quiz.title}</div>
                  <div className="flex items-center text-gray-500 text-xs space-x-2 mt-1">
                    <FaCheckCircle className="text-green-600" />
                    <span>Quiz</span>
                  </div>
                </td>

                <td className="p-3">
                  {new Date(quiz.createAt).toLocaleDateString()}
                </td>
                <td className="p-3">{quiz.totalAttempt}</td>
                <td className="p-3">{quiz.totalQuestion}</td>
                <td className="p-3">{quiz.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
