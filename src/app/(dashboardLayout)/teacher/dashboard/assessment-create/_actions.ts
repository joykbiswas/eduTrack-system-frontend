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

// export const fetchAllAssessmentsAction = async () => {
//   try {
//     const response = await httpClient.get("/assessments");
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching assessments:", error);
//     throw error;
//   }
// };
export const fetchAllAssessmentsAction = async () => {
  try {
    const response = await assessmentService.getAllAssessment();
    return response;
  } catch (error) {
    console.error("Error fetching materials:", error);
    throw error;
  }
};

// export const deleteMaterialAction = async (id: string) => {
//   try {
//     return await materialService.deleteMaterial(id);
//   } catch (error) {
//     throw error;
//   }
// };
export const deleteAssessmentsAction = async (id: string) => {
  try {
    const response = await assessmentService.deleteAssessment(id);
    return response;
  } catch (error) {
    throw error;
  }
};