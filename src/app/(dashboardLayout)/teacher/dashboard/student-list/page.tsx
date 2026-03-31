import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getAllWordStoryCards } from "../word-story-cards-create/_actions";
import { TeacherAssientStudentDataTable } from "@/components/admin/teacher-assient-student-list";

export default async function StudentListPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["word-story-cards"],
    queryFn: () => getAllWordStoryCards(),
  });

  return (
    <div className="min-h-screen bg-background p-8">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TeacherAssientStudentDataTable />
      </HydrationBoundary>
    </div>
  );
}
