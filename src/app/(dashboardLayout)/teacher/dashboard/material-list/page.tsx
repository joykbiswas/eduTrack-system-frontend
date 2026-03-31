// app/(dashboardLayout)/teacher/dashboard/material-list/page.tsx
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchAllMaterialsAction } from "../material-create/_actions";
import { MaterialDataTable } from "@/components/teacher/material-list-table";

export default async function MaterialListPage() {
  const queryClient = new QueryClient();

  // সার্ভারে ডাটা প্রি-ফেচ করা
  await queryClient.prefetchQuery({
    queryKey: ["materials"],
    queryFn: () => fetchAllMaterialsAction(),
  });

  return (
    <div className="container mx-auto py-6 space-y-6">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MaterialDataTable />
      </HydrationBoundary>
    </div>
  );
}