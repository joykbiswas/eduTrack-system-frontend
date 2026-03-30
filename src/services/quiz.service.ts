// services/quiz.service.ts

import { httpClient } from "@/lib/axios/httpClient";
// import { ApiResponse } from "@/types/api.types";
// import { ICreateQuizRequest, IQuiz } from "@/types/quiz.types";
import { IQuizFormValues } from "@/zod/quiz.schema";

// export const quizService = {
//     createQuiz: async (data: ICreateQuizRequest): Promise<ApiResponse<IQuiz>> => {
//         const response = await httpClient.post<IQuiz>('/quizzes', data);
//         return response;
//     },

//     getQuizzes: async (queryString?: string): Promise<ApiResponse<IQuiz[]>> => {
//         const response = await httpClient.get<IQuiz[]>(
//             queryString ? `/quizzes?${queryString}` : '/quizzes'
//         );
//         return response;
//     },

//     getQuizById: async (id: string): Promise<ApiResponse<IQuiz>> => {
//         const response = await httpClient.get<IQuiz>(`/quizzes/${id}`);
//         return response;
//     },

//     updateQuiz: async (id: string, data: Partial<ICreateQuizRequest>): Promise<ApiResponse<IQuiz>> => {
//         const response = await httpClient.put<IQuiz>(`/quizzes/${id}`, data);
//         return response;
//     },

//     deleteQuiz: async (id: string): Promise<ApiResponse<null>> => {
//         const response = await httpClient.delete<null>(`/quizzes/${id}`);
//         return response;
//     },
// };
export const quizService = {
  createQuiz: async (data: IQuizFormValues) => {
    const response = await httpClient.post("/quizzes", data);
    return response;
  },
};