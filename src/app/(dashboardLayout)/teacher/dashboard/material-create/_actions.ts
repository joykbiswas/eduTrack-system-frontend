/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { materialService } from "@/services/material.service";
import { revalidatePath } from "next/cache";

export const createMaterialAction = async (data: any) => {
  try {
    const response = await materialService.createMaterial(data);
    // ডাটা তৈরি হওয়ার পর লিস্ট পেজ রিফ্রেশ করার জন্য revalidatePath ব্যবহার করা ভালো
    revalidatePath("/teacher/dashboard/material-list");
    return response;
  } catch (error: any) {
    console.error("Error creating material:", error);
    // এরর মেসেজটি ক্লায়েন্টে পাঠানোর জন্য থ্রো করুন
    throw new Error(error.response?.data?.message || "Failed to create material");
  }
};

export const fetchAllMaterialsAction = async () => {
  try {
    const response = await materialService.getAllMaterials();
    console.log("Response Material---", response);
    return response;
  } catch (error) {
    console.error("Error fetching materials:", error);
    throw error;
  }
};

export const deleteMaterialAction = async (id: string) => {
  try {
    return await materialService.deleteMaterial(id);
  } catch (error) {
    throw error;
  }
};