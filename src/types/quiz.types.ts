// /* eslint-disable @typescript-eslint/no-explicit-any */
// // types/quiz.types.ts

// export interface IQuiz {
//     id: string;
//     cardId: string;
//     type: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "FILL_BLANK";
//     question: string;
//     options: Record<string, any>;
//     correctAnswer: string;
//     points: number;
//     createdAt: string;
//     updatedAt: string;
//     card?: {
//         id: string;
//         title: string;
//     };
// }

// export interface ICreateQuizRequest {
//     cardId: string;
//     type: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "FILL_BLANK";
//     question: string;
//     options: {
//         A: string | number;
//         B: string | number;
//         C: string | number;
//         D?: string | number;
//     };
//     correctAnswer: string;
//     points?: number;
// }

// export interface IQuizFormValues {
//     cardId: string;
//     type: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "FILL_BLANK";
//     question: string;
//     optionA: string | number;
//     optionB: string | number;
//     optionC: string | number;
//     optionD?: string | number;
//     correctAnswer: string;
//     points: number;
// }