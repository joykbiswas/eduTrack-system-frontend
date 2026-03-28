export interface ITeacher {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string;
  contactNumber?: string;
  address?: string;
  registrationNumber: string;
  experience: number;
  gender: 'MALE' | 'FEMALE';
  qualification: string;
  currentWorkingPlace: string;
  designation: string;
  subject: string;
  averageRating: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: 'TEACHER';
    status: 'ACTIVE' | 'BLOCKED' | 'DELETED';
  };
  assignedClasses: Array<{
    id: string;
    name: string;
  }>;
}

export interface ICreateTeacherPayload {
  password: string;
  teacher: {
    name: string;
    email: string;
    contactNumber?: string;
    address?: string;
    registrationNumber: string;
    experience: number;
    gender: 'MALE' | 'FEMALE';
    qualification: string;
    currentWorkingPlace: string;
    designation: string;
    subject: string;
  };
}

export interface IUpdateTeacherPayload {
  teacher?: {
    name?: string;
    contactNumber?: string;
    // partial updates
  };
}

export interface ITeachersResponse {
  teachers: ITeacher[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
