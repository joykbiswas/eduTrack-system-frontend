import { z } from "zod";

export const assessmentSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(5, "Description is required"),
  cardId: z.string().min(1, "Please select a word card"),
  // coerce ব্যবহার করা হয়েছে যাতে string ইনপুটকে অটোমেটিক number-এ কনভার্ট করে
  passingScore: z.coerce.number().min(1, "Score must be at least 1").max(100, "Score cannot exceed 100"),
  questions: z.array(
    z.object({
      question: z.string().min(1, "Question is required"),
      answer: z.boolean().default(true),
    })
  ).min(1, "At least one question is required"),
});

export type IAssessmentFormValues = z.infer<typeof assessmentSchema>;