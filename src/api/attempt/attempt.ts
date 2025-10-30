import axios from "axios";
import { ApiResponse } from "..";
import { Answer, Attempt } from "../quizzes";
const attemptApi = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: "http://localhost:8082/attempts",
});

export const getAttempt = async (
  attemptId: string
): Promise<ApiResponse<Attempt>> => {
  const res = await attemptApi.get(`/${attemptId}`);
  return res.data;
};

export const finishAttempt = async (
  attemptId: string
): Promise<ApiResponse<string>> => {
  const res = await attemptApi.put(`/${attemptId}/finish`);
  return res.data;
};


export const submitAnswer = async (
  attemptId: string,
  questionId : string,
  choiceIds : Array<String>
): Promise<ApiResponse<Answer>> => {
  const res = await attemptApi.post(`/${attemptId}/answers`, undefined , {
    params: {
        questionId,
        choiceIds: choiceIds.join(",")
    }
  });
  return res.data;
};
