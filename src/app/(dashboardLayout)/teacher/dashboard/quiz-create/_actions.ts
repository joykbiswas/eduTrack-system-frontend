
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { quizService } from "@/services/quiz.service";

import { IQuizFormValues } from "@/zod/quiz.schema";

export const createQuizAction = async (data: IQuizFormValues) => {
  try {
    const response = await quizService.createQuiz(data);
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to create quiz");
  }
};

export const fetchAllQuizzesAction = async () => {
  try {
    return await quizService.getAllQuizzes();
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    throw error;
  }
};


export const deleteQuizAction = async (id: string) => {
    try {
        const response = await quizService.deleteQuiz(id);
        return response;
    } catch (error) {
        console.error("Error deleting word story card:", error);
        throw error;
    }
};