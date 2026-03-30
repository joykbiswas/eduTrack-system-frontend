// app/(dashboard)/word-story-cards/_actions.ts

"use server";

import { wordStoryCardService } from "@/services/word-story.services";
import { ICreateWordStoryCardRequest } from "@/types/word-story.types";

// import { wordStoryCardService } from "@/services/word-story-card.service";
// import { ICreateWordStoryCardRequest } from "@/types/word-story-card.types";

export const createWordStoryCard = async (data: ICreateWordStoryCardRequest) => {
    try {
        const response = await wordStoryCardService.createWordStoryCard(data);
        return response;
    } catch (error) {
        console.error("Error creating word story card:", error);
        throw error;
    }
};

export const getAllWordStoryCards = async () => {
    try {
        const response = await wordStoryCardService.getWordStoryCards();
        return response;
    } catch (error) {
        console.error("Error fetching word story cards:", error);
        throw error;
    }
};

export const deleteWordStoryCard = async (id: string) => {
    try {
        const response = await wordStoryCardService.deleteWordStoryCard(id);
        return response;
    } catch (error) {
        console.error("Error deleting word story card:", error);
        throw error;
    }
};