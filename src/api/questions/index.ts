import axios from "axios";
import { ApiResponse } from "..";
import { Question } from "../quizzes";

interface CreatedChoice {
  content: string;
  isCorrect: boolean;
}

export interface CreateQuestionRequest {
  content: string;
  questionType: "SINGLE_CHOICE" | "MULTIPLE_CHOICE";
  fact: string;
  point: number;
  timeLimit: number;
  choices: Array<CreatedChoice>;
}

const questionApi = axios.create({
  baseURL: "http://localhost:8082/questions",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
  },
});


export const getAllQuestion = async (): Promise<
  ApiResponse<Array<Question>>
> => {
  const res = await questionApi.get("");
  return res.data;
};

export const getQuestion = async (
  id: string
): Promise<ApiResponse<Question>> => {
  const res = await questionApi.get(`/${id}`);
  return res.data;
};

export const editQuestion = async (
  id: string,
  data: CreateQuestionRequest
): Promise<ApiResponse<Question>> => {
  const res = await questionApi.put(`/${id}`, data);
  return res.data;
};

export const deleteQuestion = async (
  id: string
): Promise<ApiResponse<string>> => {
  const res = await questionApi.delete(`/${id}`);
  return res.data;
};

export const createQuestion = async (
  data: CreateQuestionRequest
): Promise<ApiResponse<Question>> => {
  const res = await questionApi.post("", data);
  return res.data;
};




