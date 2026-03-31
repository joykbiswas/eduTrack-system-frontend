/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpClient } from "@/lib/axios/httpClient";

export const taskService = {
  assignTask: async (cardId: string, studentId: string) => {
    const response = await httpClient.post(`/tasks/${cardId}/assign`, { studentId });
    return response;
  },
  deleteAssignedTask: async (id: string): Promise<any> => {
        const response = await httpClient.delete<null>(`/tasks/${id}`);
        return response;
    },
};