export interface IClass {
  id: string;
  name: string;
  description: string;
  classNumber: number;
  sectionCode: string;
  academicYear: string;
  organizationId: string;
  teacherId: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  organization: {
    id: string;
    name: string;
  };
  teacher: {
    id: string;
    name: string;
    email: string;
  };
}
