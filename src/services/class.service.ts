// services/class.service.ts

import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types/api.types";
import { IClass, ICreateClassRequest, IOrganization, ITeachersResponse } from "@/types/class.types";

export const classService = {
    createClass: async (data: ICreateClassRequest): Promise<ApiResponse<IClass>> => {
        const response = await httpClient.post<IClass>('/classes', data);
        return response;
    },

    getClasses: async (queryString?: string): Promise<ApiResponse<IClass[]>> => {
        const response = await httpClient.get<IClass[]>(queryString ? `/classes?${queryString}` : '/classes');
        return response;
    },

    getClassById: async (id: string): Promise<ApiResponse<IClass>> => {
        const response = await httpClient.get<IClass>(`/classes/${id}`);
        return response;
    },

    updateClass: async (id: string, data: Partial<ICreateClassRequest>): Promise<ApiResponse<IClass>> => {
        const response = await httpClient.put<IClass>(`/classes/${id}`, data);
        return response;
    },

    deleteClass: async (id: string): Promise<ApiResponse<null>> => {
        const response = await httpClient.delete<null>(`/classes/${id}`);
        return response;
    },
};

// Organization service functions
export const getAllOrganizations = async (queryString?: string): Promise<ApiResponse<IOrganization[]>> => {
    const response = await httpClient.get<IOrganization[]>(
        queryString ? `/organizations?${queryString}` : "/organizations"
    );
    return response;
};

// Teacher service functions
export const getAllTeachers = async (queryString?: string): Promise<ApiResponse<ITeachersResponse>> => {
    const response = await httpClient.get<ITeachersResponse>(
        queryString ? `/teacher?${queryString}` : "/teacher"
    );
    return response;
};