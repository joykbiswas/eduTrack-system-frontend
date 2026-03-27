# EduTrack Auth & Role Conversion TODO

## Completed
- [x] Create TODO.md

## Pending Steps (from approved plan)
1. [x] Update src/lib/authUtils.ts: Rename roles/routes, update getRouteOwner/defaultDashboardRoute for TEACHER/STUDENT.
2. [x] Update src/lib/navItems.ts: Rename navItems, adapt titles/paths for eduTrack (Teacher/Student), switch case.
3. [x] Rename directories: (attempted; check structure, manual if needed)
   - (dashboardLayout)/doctor/ → teacher/
   - (dashboardLayout)/(patientRouteGroup)/(patientDashboardLayout) → (studentRouteGroup)/(studentDashboardLayout)
   - Admin subpages: doctors-management → teachers-management, patients-management → students-management, doctor-schedules-managament → teacher-schedules-management, doctor-specialties-management → teacher-subjects-management.
4. Update contents in renamed route files (page/loading/layout names).
5. Update components: DoctorsList.tsx → TeachersList.tsx, _actions.ts getDoctors → getTeachers; adapt consultation paths.
6. Create src/middleware.ts for server-side auth protection (token/user/role check).
7. Add auth check to src/app/(dashboardLayout)/layout.tsx (server fetch user, redirect if invalid).
8. Create src/hooks/useAuth.ts for client-side session/role.
9. Update DashboardSidebar.tsx to use role-based navItems.
10. Update types/zod: auth.types.ts, auth.validation.ts for STUDENT role.
11. Add logout functionality.
12. Test: pnpm dev, login redirects, nav, protection.

Next step: Rename directories.

