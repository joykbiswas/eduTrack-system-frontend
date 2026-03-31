// app/(dashboardLayout)/teacher/dashboard/quiz-list/page.tsx
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
// import { fetchAllQuizzesAction } from "./_actions";
import { QuizDataTable } from "@/components/teacher/quiz-list-table";
import { fetchAllQuizzesAction } from "../quiz-create/_actions";

export default async function QuizListPage() {
  const queryClient = new QueryClient();

  // সার্ভারে ডাটা প্রি-ফেচিং
  await queryClient.prefetchQuery({
    queryKey: ["quizzes"],
    queryFn: () => fetchAllQuizzesAction(),
  });

  return (
    <div className="container mx-auto py-6 space-y-6">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <QuizDataTable />
      </HydrationBoundary>
    </div>
  );
}