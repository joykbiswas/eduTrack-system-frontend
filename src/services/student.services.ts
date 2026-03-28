"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IStudent } from "@/types/student.types";
import { IClass } from "@/types/class.types";

export const getMyStudentProfile = async () => {
  // Self profile via /auth/me or /student/:id
  try {
    const student = await httpClient.get<IStudent>("/student"); // adjust if needed
    return student;
  } catch (error) {
    console.log("Error fetching student profile:", error);
    throw error;
  }
};

// Add enrolled classes, tasks etc. based on backend
export const getEnrolledClasses = async () => {
  try {
    const classes = await httpClient.get<IClass[]>("/classes");
    return classes;
  } catch (error) {
    console.log("Error fetching enrolled classes:", error);
    throw error;
  }
};
