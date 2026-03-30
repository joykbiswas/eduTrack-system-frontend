import { z } from "zod";

export const QuizSchema = z.object({
  cardId: z.string().min(1, "Please select a word story card"),
  type: z.enum(["MULTIPLE_CHOICE", "TRUE_FALSE"]), // Add other types if needed
  question: z.string().min(5, "Question must be at least 5 characters"),
  options: z.object({
    A: z.union([z.string(), z.number()]),
    B: z.union([z.string(), z.number()]),
    C: z.union([z.string(), z.number()]),
  }),
  correctAnswer: z.enum(["A", "B", "C"]),
});

export type IQuizFormValues = z.infer<typeof QuizSchema>;