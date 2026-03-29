/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";
import {  IAdmin } from "@/types/admin.types";
import { ITeachersResponse, ITeacher, ICreateTeacherPayload, IUpdateTeacherPayload } from "@/types/teacher.types";
import { IStudentsResponse } from "@/types/student.types";
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

// Admin CRUD (Client-side)
export const createAdmin = async (payload: { password: string; admin: { name: string; email: string; role: 'ADMIN' | 'SUPER_ADMIN'; contactNumber?: string; } }) => {
  try {
    const admin = await httpClient.post('/admin', payload);
    return admin;
  } catch (error) {
    console.log("Error creating admin:", error);
    throw error;
  }
};

export const getAdminById = async (id: string) => {
  try {
    const admin = await httpClient.get(`/admin/${id}`);
    return { data: admin };
  } catch (error) {
    console.log("Error fetching admin by id:", error);
    throw error;
  }
};

export const updateAdmin = async (id: string, payload: {
  name: string;
  role: 'ADMIN' | 'SUPER_ADMIN';
  contactNumber?: string;
}) => {
  try {
    const response = await httpClient.put(`/admin/${id}`, payload);
    
    console.log('Response from server:', response);
 
    return response.data; // Return the data part directly
  } catch (error) {
    console.log("Error updating admin:", error);
    throw error;
  }
};

export const deleteAdmin = async (id: string) => {
  try {
    await httpClient.delete(`/admin/${id}`);
  } catch (error) {
    console.log("Error deleting admin:", error);
    throw error;
  }
};

// ... rest unchanged (teacher/student/org/class use httpClient)
// export const createTeacher = async (payload: ICreateTeacherPayload) => {
//   try {
//     const teacher = await httpClient.post('/teacher/create-teacher', payload);
//     return teacher;
//   } catch (error) {
//     console.log("Error creating teacher:", error);
//     throw error;
//   }
// };

// services/admin.services.ts
// services/admin.services.ts
export const createTeacher = async (payload: ICreateTeacherPayload) => {
  console.log("Sending payload to API:", payload);

  try {
    const response = await httpClient.post('/teacher/create-teacher', payload);
    console.log("API raw response:", response);
    
    // Return the data directly from response
    return response;
  } catch (error: any) {
    console.error("Error creating teacher:", error);
    
    // Handle different error formats
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    if (error.response?.data?.body?.message) {
      throw new Error(error.response.data.body.message);
    }
    
    // Handle network errors
    if (error.message === 'Network Error') {
      throw new Error('Network error. Please check your connection.');
    }
    
    throw new Error(error.message || 'Failed to create teacher');
  }
};

export const updateTeacher = async (id: string, payload: IUpdateTeacherPayload) => {
  try {
    const teacher = await httpClient.patch(`/teacher/${id}`, payload);
    return teacher;
  } catch (error) {
    console.log("Error updating teacher:", error);
    throw error;
  }
};

export const deleteTeacher = async (id: string) => {
  try {
    await httpClient.delete(`/teacher/${id}`);
  } catch (error) {
    console.log("Error deleting teacher:", error);
    throw error;
  }
};

export const createStudent = async (payload: { password: string; student: { name: string; email: string; contactNumber?: string; address?: string; profilePhoto?: string } }) => {
  try {
    const student = await httpClient.post('/student', payload);
    return student;
  } catch (error) {
    console.log("Error creating student:", error);
    throw error;
  }
};

export const getStudentById = async (id: string) => {
  try {
    const student = await httpClient.get(`/student/${id}`);
    return student;
  } catch (error) {
    console.log("Error fetching student by id:", error);
    throw error;
  }
};

export const updateStudent = async (id: string, payload: { student?: Partial<{ name: string; email: string; contactNumber?: string; address?: string; profilePhoto?: string }> }) => {
  try {
    const student = await httpClient.put(`/student/${id}`, payload);
    return student;
  } catch (error) {
    console.log("Error updating student:", error);
    throw error;
  }
};

export const deleteStudent = async (id: string) => {
  try {
    await httpClient.delete(`/student/${id}`);
  } catch (error) {
    console.log("Error deleting student:", error);
    throw error;
  }
};

export const createOrganization = async (payload: { name: string; description: string; logo?: string }) => {
  try {
    const org = await httpClient.post('/organizations', payload);
    return org;
  } catch (error) {
    console.log("Error creating organization:", error);
    throw error;
  }
};

export const getOrganizationById = async (id: string) => {
  try {
    const org = await httpClient.get(`/organizations/${id}`);
    return org;
  } catch (error) {
    console.log("Error fetching organization by id:", error);
    throw error;
  }
};

export const updateOrganization = async (id: string, payload: Partial<{ name: string; description: string; logo?: string }>) => {
  try {
    const org = await httpClient.put(`/organizations/${id}`, payload);
    return org;
  } catch (error) {
    console.log("Error updating organization:", error);
    throw error;
  }
};

export const deleteOrganization = async (id: string) => {
  try {
    await httpClient.delete(`/organizations/${id}`);
  } catch (error) {
    console.log("Error deleting organization:", error);
    throw error;
  }
};

export const createClass = async (payload: { name: string; description: string; classNumber: number; sectionCode: string; academicYear: string; organizationId: string; teacherId: string }) => {
  try {
    const cls = await httpClient.post('/classes', payload);
    return cls;
  } catch (error) {
    console.log("Error creating class:", error);
    throw error;
  }
};

export const getClassById = async (id: string) => {
  try {
    const cls = await httpClient.get(`/classes/${id}`);
    return cls;
  } catch (error) {
    console.log("Error fetching class by id:", error);
    throw error;
  }
};

export const updateClass = async (id: string, payload: Partial<{ name: string; description: string; classNumber: number; sectionCode: string; academicYear: string; organizationId: string; teacherId: string }>) => {
  try {
    const cls = await httpClient.put(`/classes/${id}`, payload);
    return cls;
  } catch (error) {
    console.log("Error updating class:", error);
    throw error;
  }
};

export const deleteClass = async (id: string) => {
  try {
    await httpClient.delete(`/classes/${id}`);
  } catch (error) {
    console.log("Error deleting class:", error);
    throw error;
  }
};

