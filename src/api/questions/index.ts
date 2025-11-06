import axios from "axios";
import { ApiResponse, refreshToken } from "..";
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


questionApi.interceptors.response.use(
  (response) => response,
  async (err) => {
    const originalRequest = err.config;
    console.log("Retry: " + originalRequest._retry);
    if (err.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        console.log("refresh token");
        await refreshToken();
        console.log("new acess token: " + localStorage.getItem("accessToken"));
        console.log(
          "accessToken is new:" + originalRequest.headers.Authorization !==
            `Bearer ${localStorage.getItem("accessToken")}`
        );
        return questionApi(originalRequest);
      } catch (refreshErr) {
        console.log(refreshErr);
        window.location.href = "/admin/home"
      }
    }
    return Promise.reject(err);
  }
);

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




