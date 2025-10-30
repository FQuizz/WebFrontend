import axios from "axios";
import { ApiResponse } from "..";

export interface Quiz {
  quizId: string;
  title: string;
  description: string;
  totalQuestion: number;
  totalAttempt: number;
  visibility: string;
  createBy: number;
  createAt: Date;
  modifiedBy: number;
  modifiedAt: Date;
  questions?: Array<Question>;
}

export interface Question {
  questionId: string;
  content: string;
  questionType: "SINGLE_CHOICE" | "MULTIPLE_CHOICE";
  fact: string;
  point: number;
  timeLimit: number;
  createBy: number;
  createAt: Date;
  modifiedBy: number;
  modifiedAt: Date;
  choices: Array<Choice>;
}

export interface Choice {
  id: string;
  choiceId: string;
  content: string;
  isCorrect: boolean;
}

const quizApi = axios.create({
  baseURL: "http://localhost:8082/quizzes",
  headers: {
    "Content-Type": "application/json",
  },
});

export enum AnswerResult {
  CORRECT = "CORRECT",
  INCORRECT = "IN_CORRECT",
  PARTIAL = "PARTIAL_CORRECT",
}

export interface Answer {
  id?: number;
  answerId?: string; // UUID
  point?: number;
  accuracyFactor?: number;
  result?: AnswerResult;
  question: string; // UUID
  createAt: Date; // ISO date string
  modifiedAt: Date; // ISO date string
  attempt?: Attempt;
  choices: Array<Choice>;
}

export interface Attempt {
  id?: number;
  attemptId?: string; // UUID
  username: string;
  createAt: Date; // ISO date string
  modifiedAt: Date; // ISO date string
  attemptStatus?: "IN_PROGRESS" | "COMPLETED";
  completeAt?: string;
  score?: number;
  answers: Array<Answer>;
}

export const getAllPublicQuizzes = async (
  lastQuizId?: string
): Promise<ApiResponse<Array<Quiz>>> => {
  const res = await quizApi.get("/all", {
    params: {
      lastQuizId
    },
  });
  return res.data;
};

export const getAllQuizzes = async (): Promise<ApiResponse<Array<Quiz>>> => {
  const res = await quizApi.get("");
  return res.data;
};

export const getAllQuizzesForReport = async (): Promise<
  ApiResponse<Array<Quiz>>
> => {
  const res = await quizApi.get("/report");
  return res.data;
};

export const getQuizById = async (
  quizId: string
): Promise<ApiResponse<Quiz>> => {
  const res = await quizApi.get(`/${quizId}`);
  return res.data;
};

export const addQuestion = async (
  quizId: string,
  questionId: string
): Promise<ApiResponse<string>> => {
  const res = await quizApi.post(`/${quizId}/questions/${questionId}`);
  return res.data;
};

export const createQuiz = async (data: Object): Promise<ApiResponse<Quiz>> => {
  const res = await quizApi.post("", data);
  return res.data;
};

export const updateQuiz = async (
  quizId: string,
  data: Object
): Promise<ApiResponse<Quiz>> => {
  const res = await quizApi.put(`/${quizId}`, data);
  return res.data;
};

export const deleteQuiz = async (
  quizId: string
): Promise<ApiResponse<Quiz>> => {
  const res = await quizApi.delete(`/${quizId}`);
  return res.data;
};

export const deleteQuestionFromQuiz = async (
  quizId: string,
  questionId: string
): Promise<ApiResponse<string>> => {
  const res = await quizApi.delete(`/${quizId}/questions/${questionId}`);
  return res.data;
};

export const getAllAtempts = async (
  quizId: string
): Promise<ApiResponse<Array<Attempt>>> => {
  const res = await quizApi.get(`/${quizId}/attempts`);
  return res.data;
};

export const createAtempt = async (
  quizId: string,
  username: string
): Promise<ApiResponse<Attempt>> => {
  const res = await quizApi.post(`/${quizId}/attempts`,{username});
  return res.data;
};
