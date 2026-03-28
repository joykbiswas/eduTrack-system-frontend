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
