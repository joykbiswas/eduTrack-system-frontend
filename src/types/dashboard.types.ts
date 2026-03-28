export interface NavItem {
    title : string,
    href : string,
    icon : string
}

export interface NavSection {
    title ?: string,
    items : NavItem[]
}

export interface DashboardStats {
  totalTeachers: number;
  totalStudents: number;
  totalOrganizations: number;
  totalClasses: number;
  totalAdmins: number;
  totalCards: number;
  totalAssessments: number;
}

export interface IWordStoryCard {
  id: string;
  title: string;
  image?: string;
  keywords: string;
  description: string;
  status: 'DRAFT' | 'PUBLISHED';
  createdAt: string;
  quizzes: Array<{
    id: string;
    question: string;
    type: string;
  }>;
  assessments: Array<{
    id: string;
    title: string;
  }>;
  materials: Array<{
    id: string;
    title: string;
    type: 'TEXT';
  }>;
}

export interface IAssessment {
  id: string;
  title: string;
  description: string;
  cardId: string;
  passingScore: number;
  questions: Array<{
    question: string;
    answer: boolean;
  }>;
}
