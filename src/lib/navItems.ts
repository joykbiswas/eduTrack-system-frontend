import { NavSection } from "@/types/dashboard.types";
import { getDefaultDashboardRoute, UserRole } from "./authUtils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);
  return [
    {
      // title : "Dashboard",
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
    title: " Student Management",
    items: [
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
      // {
      //   title: "Grades",
      //   href: "/teacher/dashboard/grades",
      //   icon: "FileText",
      // },
      // {
      //   title: "My Feedback",
      //   href: "/teacher/dashboard/my-feedback",
      //   icon: "Star",
      // },
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
      // {
      //   title: "Teachers",
      //   href: "/admin/dashboard/teachers-management",
      //   icon: "Stethoscope",
      // },
      // {
      //   title: "Students",
      //   href: "/admin/dashboard/students-management",
      //   icon: "Users",
      // },
    ],
  },
  {
    title: "Hospital Management",
    items: [
      {
        title: "Appointments",
        href: "/admin/dashboard/appointments-management",
        icon: "Calendar",
      },
      {
        title: "Schedules",
        href: "/admin/dashboard/schedules-management",
        icon: "Clock",
      },
      // {
      //   title: "Subjects",
      //   href: "/admin/dashboard/subjects-management",
      //   icon: "Hospital",
      // },
      // {
      //   title: "Teacher Timetable",
      //   href: "/admin/dashboard/teacher-timetable-management",
      //   icon: "CalendarClock",
      // },
      // {
      //   title: "Teacher Subjects",
      //   href: "/admin/dashboard/teacher-subjects-management",
      //   icon: "Stethoscope",
      // },
      {
        title: "Payments",
        href: "/admin/dashboard/payments-management",
        icon: "CreditCard",
      },
      {
        title: "Prescriptions",
        href: "/admin/dashboard/prescriptions-management",
        icon: "FileText",
      },
      {
        title: "Reviews",
        href: "/admin/dashboard/reviews-management",
        icon: "Star",
      },
    ],
  },
];

export const studentNavItems: NavSection[] = [
  {
    title: "Enrollments",
    items: [
      {
        title: "My Enrollments",
        href: "/dashboard/my-enrollments",
        icon: "Calendar",
      },
      {
        title: "Enroll Class",
        href: "/dashboard/enroll-class",
        icon: "ClipboardList",
      },
    ],
  },
  {
    title: "Academic Records",
    items: [
      {
        title: "My Grades",
        href: "/dashboard/my-grades",
        icon: "FileText",
      },
      {
        title: "Academic Records",
        href: "/dashboard/academic-records",
        icon: "Activity",
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
  }
};
