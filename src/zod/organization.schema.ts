// schemas/organization.schema.ts
import { z } from "zod";

export const createOrganizationSchema = z.object({
  name: z
    .string()
    .min(3, "Organization name must be at least 3 characters")
    .max(100, "Organization name must not exceed 100 characters")
    .trim(),
  
  description: z
    .string()
    .max(500, "Description must not exceed 500 characters")
    .optional()
    .nullable()
    .transform((val) => (val?.trim() === "" ? null : val)),
  
  parentId: z.string().uuid("Invalid parent organization ID").optional().nullable(),
});

export type CreateOrganizationFormValues = z.infer<typeof createOrganizationSchema>;