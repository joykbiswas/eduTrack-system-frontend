"use client";

import { Button } from "@/components/ui/button";
import { BookOpen, Menu, X } from "lucide-react";
import Link from "next/link";
import type { UserInfo } from "@/types/user.types";
import { useState } from "react";
import { logout } from "@/lib/authActions";
import UserDropdown from "@/components/modules/Dashboord/UserDropdown";

interface NavbarClientProps {
  userInfo?: UserInfo;
}

const NavbarClient = ({ userInfo }: NavbarClientProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isLoggedIn = Boolean(userInfo);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <BookOpen className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">EduTrack</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </Link>
          {isLoggedIn && (
            <Link
              href="/dashboard"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>
          )}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {isLoggedIn ? (
            <UserDropdown userInfo={userInfo!} />
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              {/* <Link href="/register">
                <Button>Get Started</Button>
              </Link> */}
            </>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {mobileOpen && (
        <div className="border-t px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              About
            </Link>
            {isLoggedIn && (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  Dashboard
                </Link>
                <div className="flex items-center gap-3 rounded-lg border border-slate-200 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {userInfo?.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{userInfo?.name}</span>
                    <span className="text-xs text-muted-foreground capitalize">
                      {userInfo?.role.toLowerCase().replace("_", " ")}
                    </span>
                  </div>
                </div>
              </>
            )}
            <div className="flex flex-col gap-2 pt-2">
              {isLoggedIn ? (
                <Button variant="outline" className="w-full" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline" className="w-full" onClick={() => setMobileOpen(false)}>
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="w-full" onClick={() => setMobileOpen(false)}>
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarClient;
