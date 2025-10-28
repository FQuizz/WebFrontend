import { IconType } from "react-icons";
import HomePageLayout from "./HomePageLayout";
import { MdQuiz } from "react-icons/md";
import { Link, NavLink, useParams } from "react-router";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { Attempt, getAllAtempts, getQuizById, Quiz } from "@/api/quizzes";
import { GoGoal } from "react-icons/go";
import { FaRegCalendar } from "react-icons/fa";
import { MdGroups2 } from "react-icons/md";
import { FaRegQuestionCircle } from "react-icons/fa";
interface Props {
  children: React.ReactElement;
}

interface FigureProps {
  title: string;
  figure: string;
  icon: React.ReactNode;
}

export interface AttemptContext {
  quiz: Quiz;
  attempts: Array<Attempt>;
}

const activeStyle = "text-orange-600 border-b-4 border-orange-600";
const inActiveStyle = "text-[#6f6c6c] hover:text-orange-600";
function FigureItem({ title, figure, icon }: FigureProps) {
  return (
    <div className="flex items-center gap-[15px] border border-[#e5e7eb] rounded-[10px] p-[10px]">
      <div className="p-[15px] bg-[#d9d8d8] rounded-[5px]">{icon}</div>
      <div>
        <div className="text-[11px] font-semibold text-[#6f6c6c]">{title}</div>
        <div className="font-extrabold text-[20px] font-sans">{figure}</div>
      </div>
    </div>
  );
}
export const QuizContext = createContext<AttemptContext | undefined>(undefined);

export default function ReportPageLayout({ children }: Props) {
  const params = useParams();
  const [quiz, setQuiz] = useState<Quiz>();
  const [attempts, setAttempts] = useState<Array<Attempt>>([]);
  useEffect(() => {
    getQuizById(params.quizId as string)
      .then((res) => {
        if (res.success) {
          setQuiz(res.data);
        } else {
          console.log("Get quiz by id failed");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getAllAtempts(params.quizId as string)
      .then((res) => {
        if (res.success) {
          setAttempts(res.data);
        } else {
          console.log("Get all attempts failed");
        }
      })
      .catch((err) => console.log(err));
  }, [params.quizId]);

  const calculateAccuracy = useMemo(() => {
    if(attempts.length == 0){
        return 0;
    }
    const answers = attempts?.map(attempt => attempt.answers)
    .reduce((prev, cur) => [...prev,...cur], [])
    return answers
    .filter(answer => answer.result != null)
    .reduce((prev, cur) => prev + cur.accuracyFactor! , 0) / answers.length 
  },[attempts]) 
  return (
    <HomePageLayout>
      <div className="h-full overflow-scroll">
        <div>
          <div className="font-bold text-[20px] flex items-center gap-[10px]">
            <div>{quiz?.title}</div>
            <div className="text-[12px] border border-[#e5e7eb] px-[10px] py-[3px] rounded-[8px]">
              {quiz?.visibility}
            </div>
          </div>
          <div className="flex items-center gap-[10px] text-[#535151] font-medium">
            <span>
              <FaRegCalendar />
            </span>
            <span>Create at: {new Date(quiz?.createAt!).toLocaleString()}</span>
            <span> - </span>
            <span>
              Last modified at: {new Date(quiz?.modifiedAt!).toLocaleString()}
            </span>
          </div>
        </div>
        <div className="px-[50px] py-[20px]">
          <div className="border border-[#e5e7eb] rounded-[8px] py-[10px]">
            <div className="pb-[15px] pt-[5px] px-[20px] border-b border-b-[#e5e7eb] ">
              <div className="bg-orange-200 p-[8px] text-[13px] w-fit font-semibold text-center rounded-[5px] border-l-5 border-orange-500 flex items-center gap-[5px] text-orange-500">
                <span>
                  <MdQuiz size={18} />
                </span>
                <span>Classic quiz</span>
              </div>
            </div>
            <div className="px-[20px] py-[15px] grid grid-cols-4 gap-[15px]">
              <FigureItem
                icon={<GoGoal size={20} />}
                title="Accuracy"
                figure={String(calculateAccuracy.toPrecision(2)) + "%"}
              />
              <FigureItem
                icon={<GoGoal size={20} />}
                title="Completion Rate"
                figure={attempts.length === 0 ? "0%" : String((attempts.filter(attempt => attempt.attemptStatus === "COMPLETED").length / attempts.length * 100).toPrecision(2)) + "%"}
              />
              <FigureItem
                icon={<MdGroups2 size={20} />}
                title="Total Attempts"
                figure={String(quiz?.totalAttempt)}
              />
              <FigureItem
                icon={<FaRegQuestionCircle size={20} />}
                title="Total Questions"
                figure={String(quiz?.totalQuestion)}
              />
            </div>
            <div className="py-[10px] px-[20px] hover:opacity-[0.8]">
              <Link
                to={`/admin/quizzes/${params.quizId!}`}
                className="text-[12px] font-semibold p-[10px] bg-[#e5e7eb] rounded-[5px] text-[#535151]"
              >
                View quiz
              </Link>
            </div>
          </div>
          <div className="mt-[50px] border border-[#e5e7eb] rounded-[8px]">
            <div className="border-b border-b-[#e5e7eb] h-full flex px-[20px]">
              <NavLink
                to={`/admin/reports/${quiz?.quizId}/attempts`}
                style={{
                  fontWeight: 600,
                  height: "100%",
                  boxSizing: "border-box",
                  paddingInline: 22,
                  paddingBlock: 10,
                  fontSize: 15,
                }}
                className={({ isActive }) =>
                  isActive ? activeStyle : inActiveStyle
                }
              >
                Attempts
              </NavLink>

              <NavLink
                to={`/admin/reports/${quiz?.quizId}/questions`}
                style={{
                  fontWeight: 600,
                  height: "100%",
                  boxSizing: "border-box",
                  paddingInline: 22,
                  paddingBlock: 10,
                  fontSize: 15,
                }}
                className={({ isActive }) =>
                  isActive ? activeStyle : inActiveStyle
                }
              >
                Questions
              </NavLink>
              <NavLink
                to={`/admin/reports/${quiz?.quizId}/overview`}
                style={{
                  fontWeight: 600,
                  height: "100%",
                  boxSizing: "border-box",
                  paddingInline: 22,
                  paddingBlock: 10,
                  fontSize: 15,
                }}
                className={({ isActive }) =>
                  isActive ? activeStyle : inActiveStyle
                }
              >
                Overview
              </NavLink>
            </div>
            <div className="p-[20px]">
              <QuizContext value={{ quiz: quiz!, attempts: attempts }}>
                {children}
              </QuizContext>
            </div>
          </div>
        </div>
      </div>
    </HomePageLayout>
  );
}
