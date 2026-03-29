// app/admin/dashboard/teacher-edit/[id]/page.tsx
import { notFound } from 'next/navigation'
import { getTeacherById } from '@/services/admin.services'
import { TeacherEditForm } from '@/components/admin/teacher-edit-form'
import type { ITeacher } from '@/types/teacher.types'

interface TeacherEditPageProps {
  params: Promise<{
    id: string
  }>
}

async function getTeacherData(id: string): Promise<ITeacher | null> {
  try {
    const response = await getTeacherById(id)
    return response.data || null
  } catch (error) {
    console.error('Failed to fetch teacher:', error)
    return null
  }
}

export default async function TeacherEditPage({ params }: TeacherEditPageProps) {
  const { id } = await params
  const teacher = await getTeacherData(id)

  if (!teacher) {
    notFound()
  }

  return (
    <div className="container mx-auto py-6">
      <TeacherEditForm teacher={teacher} />
    </div>
  )
}