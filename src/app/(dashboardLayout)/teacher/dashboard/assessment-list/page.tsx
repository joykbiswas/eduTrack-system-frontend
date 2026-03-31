// app/(dashboardLayout)/teacher/dashboard/assessment-list/page.tsx
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchAllAssessmentsAction } from "../assessment-create/_actions";
import { AssessmentDataTable } from "@/components/teacher/assessment-list-table";
// import { fetchAllAssessmentsAction } from "./_actions";
// import { AssessmentDataTable } from "@/components/teacher/assessment-list-table";

export default async function AssessmentListPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["assessments"],
    queryFn: () => fetchAllAssessmentsAction(),
  });

  return (
    <div className="container mx-auto py-6 space-y-6">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AssessmentDataTable />
      </HydrationBoundary>
    </div>
  );
}