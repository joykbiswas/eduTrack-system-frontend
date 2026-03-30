// app/(dashboard)/classes/_actions.ts

"use server";

import { getAllOrganizations, getAllTeachers } from "@/services/admin.services";
import { classService } from "@/services/class.service";
// import { getAllOrganizations, getAllTeachers } from "@/services/class.service";
// import { classService, getAllOrganizations, getAllTeachers } from "@/services/class.services";
import { ICreateClassRequest } from "@/types/class.types";

export const createClass = async (data: ICreateClassRequest) => {
    try {
        const response = await classService.createClass(data);
        return response;
    } catch (error) {
        console.error("Error creating class:", error);
        throw error;
    }
};

export const getAllClasses = async () => {
    try {
        const response = await classService.getClasses();
        return response;
    } catch (error) {
        console.error("Error fetching classes:", error);
        throw error;
    }
};

export const deleteClass = async (id: string) => {
    try {
        const response = await classService.deleteClass(id);
        return response;
    } catch (error) {
        console.error("Error deleting class:", error);
        throw error;
    }
};


export const fetchOrganizations = async () => {
    try {
        const response = await getAllOrganizations();
        return response;
    } catch (error) {
        console.error("Error fetching organizations:", error);
        throw error;
    }
};

export const fetchTeachers = async () => {
    try {
        const response = await getAllTeachers();
        return response;
    } catch (error) {
        console.error("Error fetching teachers:", error);
        throw error;
    }
};