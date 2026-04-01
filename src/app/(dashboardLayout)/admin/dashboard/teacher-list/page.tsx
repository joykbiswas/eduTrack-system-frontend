import { Suspense } from 'react'
import { getAllTeachers } from '@/services/admin.services'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { TeacherDataTable } from '@/components/admin/teacher-data-table'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

export default async function TeacherListPage() {
  const queryClient = new QueryClient();

  // সার্ভারে টিচারদের ডাটা প্রি-ফেচ করা হচ্ছে
  await queryClient.prefetchQuery({
    queryKey: ["teachers"],
    queryFn: () => getAllTeachers(),
  });

  return (
    <div className="container mx-auto py-6 space-y-6">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <TeacherDataTable />
        </HydrationBoundary>
    </div>
  )
}
