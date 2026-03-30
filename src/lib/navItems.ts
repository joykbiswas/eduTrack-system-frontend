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
  ];
};

export const teacherNavItems: NavSection[] = [
  {
    title: "Content Management",
    items: [
      {
        title: "Word Story Cards",
        items: [
          {
            title: "Card Create",
            href: "/teacher/dashboard/word-story-cards-create",
            icon: "BookOpen",
          },
          {
            title: "Card List",
            href: "/teacher/dashboard/word-story-cards-list",
            icon: "BookOpen",
          },
        ],
      },
      {
        title: "Assessments",
        items: [
          {
            title: "Assessment Create",
            href: "/teacher/dashboard/assessment-create",
            icon: "ClipboardList",
          },
          {
            title: "Assessment List",
            href: "/teacher/dashboard/assessment-list",
            icon: "ClipboardList",
          },
        ],
      },
      {
        title: "Classes",
        items: [
          {
            title: "Class Create",
            href: "/teacher/dashboard/classes-create",
            icon: "Calender",
          },
          {
            title: "Class List",
            href: "/teacher/dashboard/classes-list",
            icon: "Calender",
          },
        ],
      },
      {
        title: "Quizzes",
        items: [
          {
            title: "Quiz Create",
            href: "/teacher/dashboard/quiz-create",
            icon: "Calender",
          },
          {
            title: "Quiz List",
            href: "/teacher/dashboard/quiz-list",
            icon: "Calender",
          },
        ],
      },
      {
        title: "Material",
        items: [
          {
            title: "material Create",
            href: "/teacher/dashboard/material-create",
            icon: "Calender",
          },
          {
            title: "material List",
            href: "/teacher/dashboard/material-list",
            icon: "Calender",
          },
        ],
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
        items: [
          {
            title: "Classes List",
            href: "/dashboard/class-list",
            icon: "Calender",
          },
        ],
      },
      {
        title: "Tasks",
        items: [
          {
            title: "Tasks List",
            href: "/dashboard/tasks",
            icon: "ClipboardList",
          },
        ],
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
