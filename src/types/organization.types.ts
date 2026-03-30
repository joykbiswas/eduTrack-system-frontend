/* eslint-disable @typescript-eslint/no-explicit-any */
// export interface IOrganization {
//   id: string;
//   name: string;
//   description: string;
//   parentId?: string | null;
//   isDeleted: boolean;
//   createdAt: string;
//   updatedAt: string;
//   parent?: IOrganization | null;
//   children: IOrganization[];
//   classes: Array<{
//     id: string;
//     name: string;
//   }>;
// }

// types/organization.types.ts
export interface Organization {
  id: string;
  name: string;
  description: string | null;
  parentId: string | null;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  parent: Organization | null;
  children: Organization[];
}

export interface CreateOrganizationRequest {
  name: string;
  description?: string;
  parentId?: string | null;
}

export interface CreateOrganizationRequest {
  name: string;
  description?: string;
  parentId?: string | null;
}

export interface CreateOrganizationResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    description: string | null;
    parentId: string | null;
    isDeleted: boolean;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
    parent: any;
    children: any[];
  };
}

// types/organization.types.ts

export interface IClass {
  id: string;
  name: string;
  description: string;
  classNumber: number;
  sectionCode: string;
  academicYear: string;
}

export interface IOrganization {
  id: string;
  name: string;
  description: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;

  parent: {
    id: string;
    name: string;
  } | null;

  children: IOrganization[];
  classes: IClass[];
  lookups: any[];
}

export interface IOrganizationsResponse {
  success: boolean;
  message: string;
  data: IOrganization[];
}