
// types/class.types.ts

export interface IOrganization {
    id: string;
    name: string;
    description: string | null;
    parentId: string | null;
    isDeleted: boolean;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface ITeacher {
    id: string;
    name: string;
    email: string;
    profilePhoto: string | null;
    contactNumber: string | null;
    address: string | null;
    registrationNumber: string | null;
    experience: number | null;
    gender: string | null;
    qualification: string | null;
    currentWorkingPlace: string | null;
    designation: string | null;
    subject: string | null;
    averageRating: number;
    isDeleted: boolean;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
    userId: string;
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