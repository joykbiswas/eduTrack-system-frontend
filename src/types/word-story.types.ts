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
    quizzes: any[];
    materials: any[];
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