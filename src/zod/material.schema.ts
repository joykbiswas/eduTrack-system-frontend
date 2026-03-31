import { z } from "zod";

export const materialSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  type: z.enum(["TEXT", "VIDEO", "AUDIO", "IMAGE"]).default("TEXT"),
  cardId: z.string().min(1, "Please select a word card"),
});

export type IMaterialFormValues = z.infer<typeof materialSchema>;