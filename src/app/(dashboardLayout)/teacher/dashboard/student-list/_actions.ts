/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { studentService } from "@/services/studentassientment.service";
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

export const fetchAllStudentsAction = async () => {
  try {
    const response = await studentService.getAllStudents();
    return response;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

export const deleteStudentAction = async (id: string) => {
  try {
    return await studentService.deleteStudent(id);
  } catch (error) {
    throw error;
  }
};