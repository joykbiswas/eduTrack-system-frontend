/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { IRegisterResponse } from "@/types/auth.types";
import { cookies } from "next/headers";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if(!BASE_API_URL){
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

export interface IRefreshTokensResult {
    accessToken: string;
    refreshToken: string;
    token: string;
}

export async function getNewTokensWithRefreshToken(refreshToken  : string) : Promise<IRefreshTokensResult | null> {
    try {
        const cookieStore = await cookies();
        const sessionToken = cookieStore.get("better-auth.session_token")?.value;

        if (!refreshToken || !sessionToken) {
            console.warn("Missing refresh or session cookie before refresh request", { refreshToken, sessionToken });
            return null;
        }

        const cookieHeader = `refreshToken=${refreshToken}; better-auth.session_token=${sessionToken}`;

        const res = await fetch(`${BASE_API_URL}/auth/refresh-token`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                Cookie : cookieHeader,
            }
        });

        if(!res.ok){
            return null;
        }

        const {data} = await res.json();
        const { accessToken, refreshToken: newRefreshToken, token } = data;

        if (!accessToken || !newRefreshToken || !token) {
            return null;
        }

        return {
            accessToken,
            refreshToken: newRefreshToken,
            token,
        };
    } catch (error) {
        console.error("Error refreshing token:", error);
        return null;
    }
}

export async function getUserInfo() {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")?.value;

        if (!accessToken) {
            return null;
        }

        const cookieHeader = cookieStore
            .getAll()
            .map((cookie) => `${cookie.name}=${cookie.value}`)
            .join("; ");

        const res = await fetch(`${BASE_API_URL}/auth/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cookie": cookieHeader,
                "Authorization": `Bearer ${accessToken}`
            }
        });

        if (!res.ok) {
            console.error("Failed to fetch user info:", res.status, res.statusText);
            return null;
        }

        const { data } = await res.json();

        return data;
    } catch (error) {
        console.error("Error fetching user info:", error);
        return null;
    }
}

// ... existing imports ...

// export interface IRegisterResponse {
//     success: boolean;
//     message: string;
//     data: {
//         token: string;
//         accessToken: string;
//         refreshToken: string;
//         user: any; // আপনি চাইলে এখানে নির্দিষ্ট ইউজার টাইপ দিতে পারেন
//         student: any;
//     };
// // }
// export interface IRegisterResponse {
//     success: boolean;
//     message: string;
//     data: {
//         token: string;
//         accessToken: string;
//         refreshToken: string;
//         user: {
//             id: string;
//             role: string;
//             // ... অন্যান্য ফিল্ড
//         };
//         student: any;
//     };
// }

/**
 * Registers a new user and returns the auth data
 */
export async function registerUser(payload: any): Promise<any> {
    try {
        const res = await fetch(`${BASE_API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        // রেসপন্স যাই হোক (Success বা Error), JSON পার্স করুন
        const result = await res.json();
        
        // যদি res.ok না হয়, তবে সার্ভার থেকে আসা message টি রিটার্ন করুন
        if (!res.ok) {
            return {
                success: false,
                message: result.message || "Registration failed from server",
            };
        }

        return result; // সফল হলে পুরো অবজেক্ট রিটার্ন করবে
    } catch (error) {
        console.error("Error during registration service:", error);
        return { success: false, message: "Network error: check your internet or server" };
    }
}