// import { authService } from "@/services/task.service";
"use server";

import { authService } from "@/services/task.service";

// import { authService } from "@/services/teacher.services";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getMyProfile = async () => {
  try {
    const response = await authService.getMe();
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch profile");
  }
};