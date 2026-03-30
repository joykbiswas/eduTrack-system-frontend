// schemas/word-story-card.schema.ts

import { z } from "zod";

export const createWordStoryCardSchema = z.object({
    title: z.string()
        .min(1, "Title is required")
        .max(200, "Title must be less than 200 characters"),
    image: z.string()
        .min(1, "Image is required")
        .url("Please provide a valid image URL"),
    keywords: z.string()
        .min(1, "Keywords are required")
        .max(500, "Keywords must be less than 500 characters"),
    description: z.string()
        .min(1, "Description is required")
        .max(1000, "Description must be less than 1000 characters"),
    dialogTitle: z.string()
        .min(1, "Dialog title is required")
        .max(200, "Dialog title must be less than 200 characters"),
    dialog1: z.string()
        .min(1, "Dialog 1 is required")
        .max(500, "Dialog 1 must be less than 500 characters"),
    dialog2: z.string()
        .min(1, "Dialog 2 is required")
        .max(500, "Dialog 2 must be less than 500 characters"),
    dialog3: z.string()
        .min(1, "Dialog 3 is required")
        .max(500, "Dialog 3 must be less than 500 characters"),
});

export type CreateWordStoryCardSchemaType = z.infer<typeof createWordStoryCardSchema>;