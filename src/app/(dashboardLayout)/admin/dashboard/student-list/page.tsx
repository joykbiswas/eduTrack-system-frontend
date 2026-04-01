import { fetchAllStudentsAction } from "@/app/(dashboardLayout)/teacher/dashboard/student-list/_actions";
import { StudentDataTable } from "@/components/admin/student-data-table";
import { QueryClient } from "@tanstack/react-query";

export default async function StudentListPage() {
  const queryClient = new QueryClient();

  
  await queryClient.prefetchQuery({
    queryKey: ["students"],
    queryFn: () => fetchAllStudentsAction(),
  });
  return (
    <main className="min-h-screen bg-background p-8">
      <StudentDataTable />
    </main>
  )
}