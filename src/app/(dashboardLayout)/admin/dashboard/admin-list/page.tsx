import { AdminDataTable } from '@/components/admin/admin-data-table'
import { getAllAdmins } from '@/services/admin.services'

export const revalidate = 0

export default async function AdminListPage() {
  const adminsResponse = await getAllAdmins()
  const admins = adminsResponse.data || adminsResponse

  return (
    <main className="min-h-screen bg-background p-8">
      <AdminDataTable admins={admins} />
    </main>
  )
}
