/* eslint-disable @typescript-eslint/no-explicit-any */

import { httpClient } from "@/lib/axios/httpClient";

export const materialService = {
    createMaterial: async (data: any) => {
    const response = await httpClient.post("/materials", data);
    return response.data;
  },

  getAllMaterials: async (): Promise<any> => {
    const response = await httpClient.get("/materials");
    return response;
  },

  deleteMaterial: async (id: string) => {
    const response = await httpClient.delete(`/materials/${id}`);
    return response.data;
  }

// getMaterialById: async (id: string): Promise<any> => {
//     const response = await httpClient.get(`/materials/${id}`);
//     return response.data;
//   },
};