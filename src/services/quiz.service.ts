/* eslint-disable @typescript-eslint/no-explicit-any */
// services/quiz.service.ts

import { httpClient } from "@/lib/axios/httpClient";
import { IQuizFormValues } from "@/zod/quiz.schema";


export const quizService = {
  getAllQuizzes: async (): Promise<any> => {
    const response = await httpClient.get("/quizzes");
    return response;
  },
  createQuiz: async (data: IQuizFormValues) => {
    const response = await httpClient.post("/quizzes", data);
    return response;
  },

  deleteQuiz: async (id: string): Promise<any> => {
    const response = await httpClient.delete(`/quizzes/${id}`);
    return response;
  },
};