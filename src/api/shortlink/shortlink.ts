import axios, { AxiosResponse } from "axios";
import { ApiResponse } from "..";
export interface ShortLink {
  id: string;                 // UUID
  shortCode: string;
  originalUrl: string;
  createAt: string;           // ISO date string (e.g. "2025-10-31T09:00:00")
  createBy: string;
  clickCount: number;
  isActive: boolean;
}

const shortlinkApi = axios.create({
    headers:{
        "Content-Type":"application/json",
    },
    baseURL:"http://localhost/api/shortlinks",
    
})


export const createShortLink = async (quizId : string) : Promise<ApiResponse<ShortLink>> => {
    const res = await shortlinkApi.post("",{originalUrl : `http://localhost:3000/quizzes/pre-game/${quizId}`})
    return res.data
}