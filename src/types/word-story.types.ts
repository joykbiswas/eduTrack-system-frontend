/* eslint-disable @typescript-eslint/no-explicit-any */
// types/word-story-card.types.ts

export interface IDialogContent {
    dialog1: string;
    dialog2: string;
    dialog3: string;
}

export interface IWordStoryCard {
    id: string;
    title: string;
    image: string;
    keywords: string;
    description: string;
    descriptionSound: string | null;
    dialogTitle: string;
    dialogContent: IDialogContent;
    status: "DRAFT" | "PUBLISHED";
    isDeleted: boolean;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
    cardContents: any[];
    // quizzes: any[];
    // materials: any[];
    quizzes: IQuiz[];
    materials: IMaterial[];
    assessments: IAssessment[];
}

export interface ICreateWordStoryCardRequest {
    title: string;
    image: string;
    keywords: string;
    description: string;
    dialogTitle: string;
    dialogContent: IDialogContent;
}

export interface IWordStoryCardFormValues {
    title: string;
    image: string;
    keywords: string;
    description: string;
    dialogTitle: string;
    dialog1: string;
    dialog2: string;
    dialog3: string;
}
// types/word-story-card.types.ts

export interface IDialogContent {
    dialog1: string;
    dialog2: string;
    dialog3: string;
}

export interface IQuiz {
    id: string;
    cardId: string;
    type: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "FILL_BLANK";
    question: string;
    options: Record<string, any>;
    correctAnswer: string;
    points: number;
    createdAt: string;
    updatedAt: string;
}

export interface IMaterial {
    id: string;
    title: string;
    content: string;
    type: "TEXT" | "VIDEO" | "AUDIO" | "PDF";
    cardId: string;
    isDeleted: boolean;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface IAssessmentQuestion {
    question: string;
    answer: boolean | string;
}

export interface IAssessment {
    id: string;
    title: string;
    description: string;
    cardId: string;
    questions: IAssessmentQuestion[];
    passingScore: number;
    isDeleted: boolean;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface ICreateWordStoryCardRequest {
    title: string;
    image: string;
    keywords: string;
    description: string;
    dialogTitle: string;
    dialogContent: IDialogContent;
}

export interface IWordStoryCardFormValues {
    title: string;
    image: string;
    keywords: string;
    description: string;
    dialogTitle: string;
    dialog1: string;
    dialog2: string;
    dialog3: string;
}