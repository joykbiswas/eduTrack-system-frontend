/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getDefaultDashboardRoute } from "@/lib/authUtils";
import { setTokenInCookies } from "@/lib/tokenUtils";
import { registerUser } from "@/services/auth.services";
import { ApiErrorResponse } from "@/types/api.types";
import { registerZodSchema, IRegisterPayload } from "@/zod/auth.validation";

//     const parsedPayload = registerZodSchema.safeParse(payload);

//     if (!parsedPayload.success) {
//         return { success: false, message: parsedPayload.error.issues[0].message };
//     }

//     try {
//         const response = await registerUser(parsedPayload.data);
//         console.log("response::", response);
//         // API যদি সফল না হয় বা ডেটা না থাকে
//         if (!response || !response.success || !response.data) {
//             return {
//                 success: false,
//                 message: response?.message || "Registration failed",
//             };
//         }

//         const { accessToken, refreshToken, token, user } = response.data;

//         // টোকেন সেট করা - এখানে TypeScript এখন নিশ্চিত যে এগুলো string
//         await setTokenInCookies("accessToken", accessToken);
//         await setTokenInCookies("refreshToken", refreshToken);
//         await setTokenInCookies("better-auth.session_token", token, 24 * 60 * 60);

//         return {
//             success: true,
//             redirectTo: "/",
//         };
//     } catch (error: any) {
//         console.error("Register Action Error:", error);
//         return {
//             success: false,
//             message: error?.message || "An unexpected error occurred",
//         };
//     }
// };
export const registerAction = async (payload: IRegisterPayload): Promise<{ success: true; redirectTo: string } | ApiErrorResponse> => {
    const parsedPayload = registerZodSchema.safeParse(payload);

    if (!parsedPayload.success) {
        return { success: false, message: parsedPayload.error.issues[0].message };
    }

    try {
        const response = await registerUser(parsedPayload.data);

        // এখানে চেক করা হচ্ছে response.success false কি না
        if (!response || response.success === false) {
            return {
                success: false,
                message: response?.message || "Registration failed",
            };
        }

        // সফল হলে ডাটা ডিস্ট্রাকচার করুন
        const { accessToken, refreshToken, token, user } = response.data;

        await setTokenInCookies("accessToken", accessToken);
        await setTokenInCookies("refreshToken", refreshToken);
        await setTokenInCookies("better-auth.session_token", token, 24 * 60 * 60);

        return {
            success: true,
            redirectTo: "/",
        };
    } catch (error: any) {
        return {
            success: false,
            message: "Something went wrong !",
        };
    }
};