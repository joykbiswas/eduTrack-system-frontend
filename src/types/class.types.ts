/* eslint-disable @typescript-eslint/no-explicit-any */
// types/class.types.ts

export interface IOrganization {
    id: string;
    name: string;
    description: string | null;
    parentId: string | null;
    isDeleted?: boolean;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
    parent?: IOrganization | null;
    children?: IOrganization[];
    classes?: IClass[];
    lookups?: any[];
}

export interface ITeacher {
    id: string;
    name: string;
    email: string;
    profilePhoto: string | null;
    contactNumber: string;
    address: string;
    registrationNumber: string;
    experience: number;
    gender: string;
    qualification: string;
    currentWorkingPlace: string;
    designation: string;
    subject: string;
    averageRating: number;
    isDeleted: boolean;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
    userId: string;
    user?: {
        id: string;
        email: string;
        name: string;
        role: string;
        status: string;
        emailVerified: boolean;
        image: string | null;
        isDeleted: boolean;
        createdAt: string;
        updatedAt: string;
    };
    assignedClasses?: any[];
}

export interface ITeachersResponse {
    teachers: ITeacher[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface IClass {
    id: string;
    name: string;
    description: string | null;
    classNumber: number;
    sectionCode: string;
    academicYear: string;
    organizationId: string;
    teacherId: string;
    isDeleted: boolean;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
    organization?: IOrganization;
    teacher?: ITeacher;
    students?: any[];
    tasks?: any[];
    messages?: any[];
}


export interface ICreateClassRequest {
    name: string;
    description?: string;
    classNumber: string;
    sectionCode: string;
    organizationId: string;
    teacherId: string;
    academicYear: string;
}

export interface IClassFormValues {
    name: string;
    description: string;
    classNumber: string;
    sectionCode: string;
    organizationId: string;
    teacherId: string;
    academicYear: string;
}