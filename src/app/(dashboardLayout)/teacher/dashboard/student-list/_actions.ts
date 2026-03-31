/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { taskService } from "@/services/task.service";

export const assignTaskAction = async ({ cardId, studentId }: { cardId: string; studentId: string }) => {
  try {
    const response = await taskService.assignTask(cardId, studentId);
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to assign task");
  }
};
export const deleteAssignedTaskAction = async (id: string) => {
    try {
        const response = await taskService.deleteAssignedTask(id);
        return response;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to delete task");
    }
};