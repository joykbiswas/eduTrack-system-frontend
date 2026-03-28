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
          href: "/change-password",
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
        title: "Admins Management",
        items: [
          {
            title: "Admin Create",
            href: "/admin/dashboard/admin-create",
            icon: "Shield",
          },
          {
            title: "Admins List",
            href: "/admin/dashboard/admin-list",
            icon: "Shield",
          },
        ],
      },
      {
        title: "Teachers Management",
        items: [
          {
            title: "Teacher Create",
            href: "/admin/dashboard/teacher-create",
            icon: "UserCog",
          },
          {
            title: "Teachers List",
            href: "/admin/dashboard/teacher-list",
            icon: "UserCog",
          },
        ],
      },
      {
        title: "Students Management",
        items: [
          {
            title: "Student Create",
            href: "/admin/dashboard/student-create",
            icon: "Users",
          },
          {
            title: "Students List",
            href: "/admin/dashboard/student-list",
            icon: "Users",
          },
        ],
      },
      {
        title: "Org Management",
        items: [
          {
            title: "Organization Create",
            href: "/admin/dashboard/organization-create",
            icon: "Building2",
          },
          {
            title: "Organization List",
            href: "/admin/dashboard/organization-list",
            icon: "Building2",
          },
        ],
      },
      {
        title: "Class Management",
        items: [
          {
            title: "Class Create",
            href: "/admin/dashboard/class-create",
            icon: "Building2",
          },
          {
            title: "Classes List",
            href: "/admin/dashboard/class-list",
            icon: "Home",
          },
        ],
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
