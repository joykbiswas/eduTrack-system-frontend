// app/admin/dashboard/teacher-list/page.tsx
import { Suspense } from 'react'
// import { TeacherDataTable } from './components/admin/teacher-data-table'
import { getAllTeachers } from '@/services/admin.services'
import { Card, CardContent,  CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { TeacherDataTable } from '@/components/admin/teacher-data-table'

async function getTeachersData() {
  try {
    const response = await getAllTeachers()
    // Adjust based on your actual response structure
    const teachers = response.data?.teachers || []
    return teachers
  } catch (error) {
    console.error('Failed to fetch teachers:', error)
    return []
  }
}

export default async function TeacherListPage() {
  const teachers = await getTeachersData()

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Suspense fallback={<TeacherListSkeleton />}>
        <TeacherDataTable teachers={teachers} />
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