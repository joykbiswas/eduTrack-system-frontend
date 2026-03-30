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
      <Suspense fallback={<TeacherListSkeleton />}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <TeacherDataTable />
        </HydrationBoundary>
      </Suspense>
    </div>
  )
}

function TeacherListSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </CardContent>
    </Card>
  )
}