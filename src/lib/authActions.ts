"use server";

import { redirect } from "next/navigation";
import { deleteCookie } from "./cookieUtils";

export async function logout() {
  try {
    // Delete all auth cookies
    await deleteCookie("token");
    await deleteCookie("accessToken");
    await deleteCookie("refreshToken");
    await deleteCookie("better-auth.session_token");
    
    // Redirect to login
    redirect("/login");
  } catch (error) {
    console.error("Logout error:", error);
    redirect("/login");
  }
}

