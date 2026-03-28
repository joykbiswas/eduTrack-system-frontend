"use client"
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SheetTitle } from "@/components/ui/sheet";
import { getIconComponent } from "@/lib/iconMapper";
import { cn } from "@/lib/utils";
import { NavItem, NavSection } from "@/types/dashboard.types";
import { UserInfo } from "@/types/user.types";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardMobileSidebarProps{
    userInfo : UserInfo;
    navItems : NavSection[];
    dashboardHome : string;
}

const renderMobileNavItem = (item: NavItem, key: string, pathname: string) => {
  if (item.items && item.items.length > 0) {
    return (
      <div key={key}>
        <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase">
          {item.title}
        </div>
        <div className="space-y-1 pl-4">
          {item.items.map((child, index) => renderMobileNavItem(child, `${key}-${index}`, pathname))}
        </div>
      </div>
    );
  }

  const Icon = item.icon ? getIconComponent(item.icon) : null;
  const href = item.href ?? "#";
  const isActive = pathname === item.href;

  return (
    <Link
      href={href}
      key={key}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
      )}
    >
      {Icon && <Icon className="h-4 w-4" />}
      <span className="flex-1">{item.title}</span>
    </Link>
  );
};

const DashboardMobileSidebar = ({dashboardHome, navItems, userInfo} : DashboardMobileSidebarProps ) => {
    const pathname = usePathname()
  return (
    <div className="flex h-full flex-col overflow-y-auto">
      {/* Logo / Brand */}
      <div className="flex h-16 items-center border-b px-6">
        <Link href={dashboardHome}>
          <span className="text-xl font-bold text-primary">PH Healthcare</span>
        </Link>
      </div>

      <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

      {/* Navigation Area  */}

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navItems.map((section, sectionId) => (
            <div key={sectionId}>
              {section.title && (
                <h4 className="mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase">
                  {section.title}
                </h4>
              )}

              <div className="space-y-1">
                {section.items.map((item, id) => renderMobileNavItem(item, `nav-item-${sectionId}-${id}`, pathname))}
              </div>

              {sectionId < navItems.length - 1 && (
                <Separator className="my-4" />
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* User Info */}
      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
          {/* if profile doesnt exist , use first letter of user name as profile photo like component */}
            <span className="text-sm font-semibold text-primary">
              {userInfo.name.charAt(0).toUpperCase()}
            </span>
          </div>

          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate">{userInfo.name}</p>
            <p className="text-xs text-muted-foreground capitalize">
              {userInfo.role.toLocaleLowerCase().replace("_", " ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardMobileSidebar