import { NavSection } from "@/types/dashboard.types";
import { getDefaultDashboardRoute, UserRole } from "./authUtils";

// Existing code + EduTrack updates
export const getCommonNavItems = (role: UserRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);
  return [
    {
      items: [
        {
          title: "Home",
          href: "/",
          icon: "Home",
        },
        {
          title: "Dashboard",
          href: defaultDashboard,
          icon: "LayoutDashboard",
        },
        {
          title: "My Profile",
          href: `/my-profile`,
          icon: "User",
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          title: "Change Password",
          href: "change-password",
          icon: "Settings",
        },
      ],
    },
  ];
};

export const teacherNavItems: NavSection[] = [
  {
    title: "Content Management",
    items: [
      {
        title: "Word Story Cards",
        href: "/teacher/dashboard/word-story-cards",
        icon: "BookOpen",
      },
      {
        title: "Assessments",
        href: "/teacher/dashboard/assessments",
        icon: "ClipboardList",
      },
      {
        title: "Classes",
        href: "/teacher/dashboard/classes",
        icon: "Calender",
      },
      {
        title: "My Timetable",
        href: "/teacher/dashboard/my-timetable",
        icon: "Clock",
      },
    ],
  },
];

export const adminNavItems: NavSection[] = [
  {
    title: "User Management",
    items: [
      {
        title: "Admins",
        href: "/admin/dashboard/admins-management",
        icon: "Shield",
      },
      {
        title: "Teachers",
        href: "/admin/dashboard/teachers-management",
        icon: "UserCog",
      },
      {
        title: "Students",
        href: "/admin/dashboard/students-management",
        icon: "Users",
      },
    ],
  },
  {
    title: "Org Management",
    items: [
      {
        title: "Organizations",
        href: "/admin/dashboard/organizations-management",
        icon: "Building2",
      },
      {
        title: "Classes",
        href: "/admin/dashboard/classes-management",
        icon: "Home",
      },
    ],
  },
];

export const studentNavItems: NavSection[] = [
  {
    title: "My Learning",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: "LayoutDashboard",
      },
      {
        title: "My Classes",
        href: "/dashboard/my-classes",
        icon: "Calender",
      },
      {
        title: "Tasks",
        href: "/dashboard/tasks",
        icon: "ClipboardList",
      },
    ],
  },
];

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
  const commonNavItems = getCommonNavItems(role);

  switch (role) {
    case "SUPER_ADMIN":
    case "ADMIN":
      return [...commonNavItems, ...adminNavItems];

    case "TEACHER":
      return [...commonNavItems, ...teacherNavItems];

    case "STUDENT":
      return [...commonNavItems, ...studentNavItems];

    default:
      return commonNavItems;
  }
};
