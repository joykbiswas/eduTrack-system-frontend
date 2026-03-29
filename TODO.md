Admin Dashboard Completion - TODO
## Approved Plan Steps (from BLACKBOXAI analysis)
**Status: 0/20 completed**
### Phase 1: Services & Schemas (4 steps)
- [ ] 1. Update `src/services/admin.services.ts` - Add all CRUD functions (create/update/delete/getById for admin, teacher, student, organization, class).
- [ ] 2. Create `src/zod/admin.schemas.ts` - Zod schemas for all create/update forms.
- [ ] 3. Minor type updates if needed (`src/types/*.ts`).
- [ ] 4. Install missing shadcn deps (`npx shadcn@latest add table form dialog button input select label skeleton`) + `pnpm add react-hook-form @hookform/resolvers zod lucide-react` if missing.
### Phase 2: Reusable Components (6 steps)
- [ ] 5. Create `src/components/admin/delete-dialog.tsx` (shared).
- [ ] 6. Create `src/components/admin/admin-create-form.tsx` + `admin-data-table.tsx`.
- [ ] 7. Create `src/components/admin/teacher-create-form.tsx` + `teacher-data-table.tsx`.
- [ ] 8. Create `src/components/admin/student-create-form.tsx` + `student-data-table.tsx`.
- [ ] 9. Create `src/components/admin/organization-create-form.tsx` + `organization-data-table.tsx`.
- [ ] 10. Create `src/components/admin/class-create-form.tsx` + `class-data-table.tsx`.
### Phase 3: Pages (10 steps)
- [ ] 11. `src/app/admin/dashboard/admin-create/page.tsx`
- [ ] 12. `src/app/admin/dashboard/admin-list/page.tsx`
- [ ] 13. `src/app/admin/dashboard/teacher-create/page.tsx`
- [ ] 14. `src/app/admin/dashboard/teacher-list/page.tsx`
- [ ] 15. `src/app/admin/dashboard/student-create/page.tsx`
- [ ] 16. `src/app/admin/dashboard/student-list/page.tsx`
- [ ] 17. `src/app/admin/dashboard/organization-create/page.tsx`
- [ ] 18. `src/app/admin/dashboard/organization-list/page.tsx`
- [ ] 19. `src/app/admin/dashboard/class-create/page.tsx`
- [ ] 20. `src/app/admin/dashboard/class-list/page.tsx`
### Phase 4: Testing
- [ ] 21. Test all 10 pages: Forms submit, tables load/search/paginate/delete confirm.
- [ ] 22. Update this TODO with completions.
**Next: Phase 1 Step 1 - Update services.**