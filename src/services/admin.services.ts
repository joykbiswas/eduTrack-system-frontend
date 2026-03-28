"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IAdmin } from "@/types/admin.types";
import { ITeachersResponse, ITeacher } from "@/types/teacher.types";
import { IStudentsResponse, IStudent } from "@/types/student.types";
import { IOrganization } from "@/types/organization.types";
import { IClass } from "@/types/class.types";

export const getAllAdmins = async () => {
  try {
    const admins = await httpClient.get<IAdmin[]>("/admin");
    return admins;
  } catch (error) {
    console.log("Error fetching admins:", error);
    throw error;
  }
};

export const getAllTeachers = async (queryString?: string) => {
  try {
    const teachers = await httpClient.get<ITeachersResponse>(queryString ? `/teacher?${queryString}` : "/teacher");
    return teachers;
  } catch (error) {
    console.log("Error fetching teachers:", error);
    throw error;
  }
};

export const getTeacherById = async (id: string) => {
  try {
    const teacher = await httpClient.get<ITeacher>(`/teacher/${id}`);
    return teacher;
  } catch (error) {
    console.log("Error fetching teacher by id:", error);
    throw error;
  }
};

export const getAllStudents = async () => {
  try {
    const students = await httpClient.get<IStudentsResponse>("/student");
    return students;
  } catch (error) {
    console.log("Error fetching students:", error);
    throw error;
  }
};

export const getAllOrganizations = async () => {
  try {
    const organizations = await httpClient.get<IOrganization[]>("/organizations");
    return organizations;
  } catch (error) {
    console.log("Error fetching organizations:", error);
    throw error;
  }
};

export const getAllClasses = async () => {
  try {
    const classes = await httpClient.get<IClass[]>("/classes");
    return classes;
  } catch (error) {
    console.log("Error fetching classes:", error);
    throw error;
  }
};
