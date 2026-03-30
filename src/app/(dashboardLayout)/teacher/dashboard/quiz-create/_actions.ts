
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