/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { assessmentService } from "@/services/assessment.service";
import { IAssessmentFormValues } from "@/zod/assessment.schema";

export const createAssessmentAction = async (data: IAssessmentFormValues) => {
  try {
    return await assessmentService.createAssessment(data);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to create assessment");
  }
};