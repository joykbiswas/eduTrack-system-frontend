# EduTrack Dashboards Implementation TODO
Generated from approved plan. Steps completed will be marked.

## 1. [x] Create Types
- src/types/teacher.types.ts
- src/types/student.types.ts
- src/types/admin.types.ts
- src/types/organization.types.ts
- src/types/class.types.ts
- [x] Update src/types/dashboard.types.ts

## 2. [x] Create Services
- src/services/admin.services.ts
- src/services/teacher.services.ts
- src/services/student.services.ts

## 3. [x] Nav Items
- src/lib/navItems.ts

## 4. [x] Implement Dashboard Pages
- src/app/(dashboardLayout)/admin/dashboard/page.tsx
- src/app/(dashboardLayout)/teacher/dashboard/page.tsx
- src/app/(dashboardLayout)/(studentRouteGroup)/(studentDashboardLayout)/dashboard/page.tsx

## 5. [ ] Test
- pnpm dev
- Check fetches/metrics/tables per role

## 6. [ ] Polish
- Add charts/tables via shadcn
- Responsive UI
