/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpClient } from "@/lib/axios/httpClient";

export const assessmentService = {
  createAssessment: async (data: any) => {
    const response = await httpClient.post("/assessments", data);
    return response.data;
  },
};