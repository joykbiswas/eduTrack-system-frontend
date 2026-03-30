import { AdminDataTable } from '@/components/admin/admin-data-table'
import { getAllAdmins } from '@/services/admin.services'

// ডাটা সবসময় লেটেস্ট রাখার জন্য revalidate ০ রাখা হয়েছে
export const revalidate = 0

export default async function AdminListPage() {
  // সার্ভার সাইড থেকে প্রাথমিক ডাটা ফেচ করা হচ্ছে
  const adminsResponse = await getAllAdmins()
  
  // এপিআই রেসপন্স স্ট্রাকচার অনুযায়ী ডাটা এক্সট্রাক্ট করা
  const initialAdmins = adminsResponse?.data || adminsResponse || []

  return (
    <main className="min-h-screen bg-background p-8">
      {/* AdminDataTable-এ initialAdmins পাস করা হয়েছে যাতে useQuery-র 
          initialData হিসেবে এটি ব্যবহার করা যায়। 
      */}
      <AdminDataTable initialAdmins={initialAdmins} />
    </main>
  )
}