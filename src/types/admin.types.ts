export interface IAdmin {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'SUPER_ADMIN';
  profilePhoto?: string;
  contactNumber?: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: 'ADMIN' | 'SUPER_ADMIN';
    status: 'ACTIVE';
  };
}

export interface EditAdmin {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'SUPER_ADMIN';
  profilePhoto: string | null;
  contactNumber: string | null;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user?: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    role: string;
    status: string;
    needPasswordChange: boolean;
    isDeleted: boolean;
    deletedAt: string | null;
    image: string | null;
    createdAt: string;
    updatedAt: string;
  };
}
