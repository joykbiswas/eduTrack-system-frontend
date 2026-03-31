import { cookies } from "next/headers";
import NavbarClient from "./NavbarClient";
import { getUserInfo } from "@/services/auth.services";
import type { UserInfo } from "@/types/user.types";

const Navbar = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const userInfo: UserInfo | null = accessToken ? await getUserInfo() : null;

  return <NavbarClient userInfo={userInfo ?? undefined} />;
};

export default Navbar;
