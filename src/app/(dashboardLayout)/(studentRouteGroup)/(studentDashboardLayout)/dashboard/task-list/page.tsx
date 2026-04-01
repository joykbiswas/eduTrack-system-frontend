import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getMyProfile } from "./_action";
import { StudentTaskDataTable } from "@/components/teacher/student-task-table";
// import { StudentTaskTable } from "@/components/teacher/student-task-table";
// import { getMyProfile } from "./_actions";
// import { StudentTaskTable } from "@/components/student/student-task-table";

export default async function StudentTaskPage() {
  const queryClient = new QueryClient();

  // সার্ভার সাইডে স্টুডেন্টের প্রোফাইল এবং টাস্ক প্রি-ফেচ করা হচ্ছে
  await queryClient.prefetchQuery({
    queryKey: ["my-profile"],
    queryFn: () => getMyProfile(),
  });

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Learning Dashboard</h1>
        <p className="text-muted-foreground">
          Track your assigned story cards and your learning progress.
        </p>
      </div>

      <HydrationBoundary state={dehydrate(queryClient)}>
        {/* এই কম্পোনেন্টটি আগের প্রোভাইড করা TanStack Query টেবিলটি */}
        <StudentTaskDataTable />
      </HydrationBoundary>
    </div>
  );
}