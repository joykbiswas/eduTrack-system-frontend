export interface IStudent {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string;
  contactNumber?: string;
  address?: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: 'STUDENT';
    status: 'ACTIVE' | 'BLOCKED' | 'DELETED';
  };
  enrolledClasses: Array<{
    id: string;
    name: string;
    description: string;
  }>;
  assignedTasks: Array<{
    id: string;
    title: string;
    completed: boolean;
  }>;
  progress: unknown[];
}

export interface IStudentsResponse {
  data: IStudent[]; // from analysis.md
}
