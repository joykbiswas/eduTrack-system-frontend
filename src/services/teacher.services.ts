/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IWordStoryCard, IAssessment } from "@/types/dashboard.types";
// Add types as needed, e.g., IWordStoryCard, IAssessment

export const getAllWordStoryCards = async (queryString?: string) => {
  try {
    const cards = await httpClient.get<IWordStoryCard[]>(queryString ? `/word-story-cards?${queryString}` : "/word-story-cards");
    return cards;
  } catch (error) {
    console.log("Error fetching word story cards:", error);
    throw error;
  }
};

export const getWordStoryCardById = async (id: string) => {
  try {
    const card = await httpClient.get<IWordStoryCard>(`/word-story-cards/${id}`);
    return card;
  } catch (error) {
    console.log("Error fetching word story card:", error);
    throw error;
  }
};

export const getAllAssessments = async () => {
  try {
    const assessments = await httpClient.get<IAssessment[]>("/assessments");
    return assessments.data || assessments;
    
  } catch (error) {
    console.log("Error fetching assessments:", error);
    throw error;
  }
};

export const getAllQuizzes = async () => {
  try {
    const quizzes = await httpClient.get<any[]>("/quizzes");
    return quizzes;
  } catch (error) {
    console.log("Error fetching quizzes:", error);
    throw error;
  }
};

export const getAllMaterials = async () => {
  try {
    const materials = await httpClient.get<any[]>("/material");
    return materials;
  } catch (error) {
    console.log("Error fetching materials:", error);
    throw error;
  }
};
