// schemas/class.schema.ts

import { z } from "zod";

export const createClassSchema = z.object({
    name: z.string()
        .min(1, "Class name is required")
        .max(100, "Class name must be less than 100 characters"),
    description: z.string()
        .max(500, "Description must be less than 500 characters")
        .optional()
        .default(""),
    classNumber: z.string()
        .min(1, "Class number is required")
        .regex(/^\d+$/, "Class number must be a valid number"),
    sectionCode: z.string()
        .min(1, "Section code is required")
        .max(10, "Section code must be less than 10 characters"),
    organizationId: z.string()
        .min(1, "Organization is required")
        .uuid("Invalid organization ID"),
    teacherId: z.string()
        .min(1, "Teacher is required")
        .uuid("Invalid teacher ID"),
    academicYear: z.string()
        .min(1, "Academic year is required")
        .regex(/^\d{4}-\d{4}$/, "Academic year must be in format YYYY-YYYY"),
});

export type CreateClassSchemaType = z.infer<typeof createClassSchema>;