/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpClient } from "@/lib/axios/httpClient";

export const assessmentService = {
  createAssessment: async (data: any) => {
    const response = await httpClient.post("/assessments", data);
    return response.data;
  },

   getAllAssessment: async (): Promise<any> => {
    const response = await httpClient.get("/assessments");
    return response;
  },

  
  deleteAssessment: async (id: string): Promise<any> => {
    const response = await httpClient.delete(`/assessments/${id}`);
    return response;
  },
};
