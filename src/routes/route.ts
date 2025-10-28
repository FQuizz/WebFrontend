import HomePageLayout from "@/layout/HomePageLayout";
import ReportPageLayout from "@/layout/ReportPageLayout";
import AddQuestionPage from "@/pages/AddQuestionPage/AddQuestionPage";
import QuizzesPage from "@/pages/QuizzesPage/QuizzesPage";
import QuestionPage from "@/pages/QuestionPage/QuestionPage";
import QuizDetailPage from "@/pages/QuizDetailPage/QuizDetailPage";
import ReportDetailPage from "@/pages/ReportDetailPage/ReportDetailPage";
import AttemptPage from "@/pages/ReportPage/AttemptPage";
import OverviewPage from "@/pages/ReportPage/OverviewPage";
import QuestionReviewPage from "@/pages/ReportPage/QuestionReviewPage";
import ReportPage from "@/pages/ReportPage/ReportPage";
import React from "react";
import HomePage from "@/pages/HomePage/HomePage";

export interface Route {
  path: string;
  component: React.ElementType;
  layout?: React.ElementType;
  isAuth: boolean;
}

export const routes: Array<Route> = [
  {
    path: "/admin/home",
    component: HomePage,
    layout:HomePageLayout,
    isAuth: false,
  },
  {
    path: "/admin/quizzes",
    component: QuizzesPage,
    layout: HomePageLayout,
    isAuth: false,
  },
  {
    path: "/admin/quizzes/:quizId",
    component: QuizDetailPage,
    layout: HomePageLayout,
    isAuth: false,
  },
  {
    path: "/admin/questions",
    component: QuestionPage,
    layout: HomePageLayout,
    isAuth: true,
  },
  {
    path: "/admin/questions/:mode",
    component: AddQuestionPage,
    layout: HomePageLayout,
    isAuth: true,
  },
  {
    path: "/admin/questions/:id/:mode",
    component: AddQuestionPage,
    layout: HomePageLayout,
    isAuth: true,
  },
  {
    path: "/admin/reports",
    component: ReportPage,
    layout: HomePageLayout,
    isAuth: true,
  },
  {
    path: "/admin/reports/:quizId/attempts",
    component: AttemptPage,
    layout: ReportPageLayout,
    isAuth: true,
  },
  {
    path: "/admin/reports/:quizId/questions",
    component: QuestionReviewPage,
    layout: ReportPageLayout,
    isAuth: true,
  },
  {
    path: "/admin/reports/:quizId/overview",
    component: OverviewPage,
    layout: ReportPageLayout,
    isAuth: true,
  },
];
