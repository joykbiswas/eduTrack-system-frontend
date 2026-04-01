/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpClient } from "@/lib/axios/httpClient";

export const studentService = {
  getAllStudents: async (): Promise<any> => {
    const response = await httpClient.get("/student");
    return response.data; // এখানে আপনার API response অনুযায়ী response.data রিটার্ন করা হচ্ছে
  },

  deleteStudent: async (id: string): Promise<any> => {
    const response = await httpClient.delete(`/student/${id}`);
    return response;
  },
};