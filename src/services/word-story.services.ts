// services/cloudinary.service.ts
// services/word-story-card.service.ts

import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types/api.types";
import { ICreateWordStoryCardRequest, IWordStoryCard } from "@/types/word-story.types";

export const wordStoryCardService = {
    createWordStoryCard: async (data: ICreateWordStoryCardRequest): Promise<ApiResponse<IWordStoryCard>> => {
        const response = await httpClient.post<IWordStoryCard>('/word-story-cards', data);
        return response;
    },

    getWordStoryCards: async (queryString?: string): Promise<ApiResponse<IWordStoryCard[]>> => {
        const response = await httpClient.get<IWordStoryCard[]>(
            queryString ? `/word-story-cards?${queryString}` : '/word-story-cards'
        );
        return response;
    },

    getWordStoryCardById: async (id: string): Promise<ApiResponse<IWordStoryCard>> => {
        const response = await httpClient.get<IWordStoryCard>(`/word-story-cards/${id}`);
        return response;
    },

    updateWordStoryCard: async (id: string, data: Partial<ICreateWordStoryCardRequest>): Promise<ApiResponse<IWordStoryCard>> => {
        const response = await httpClient.put<IWordStoryCard>(`/word-story-cards/${id}`, data);
        return response;
    },

    deleteWordStoryCard: async (id: string): Promise<ApiResponse<null>> => {
        const response = await httpClient.delete<null>(`/word-story-cards/${id}`);
        return response;
    },
};
