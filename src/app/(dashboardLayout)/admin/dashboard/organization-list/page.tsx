import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getAllOrganizations } from "@/services/admin.services";
import { OrganizationDataTable } from "@/components/admin/organization-data-table";

export default async function OrganizationListPage() {
  const queryClient = new QueryClient();

  // সার্ভারে ডাটা প্রি-ফেচ করা হচ্ছে
  await queryClient.prefetchQuery({
    queryKey: ["organizations"],
    queryFn: () => getAllOrganizations(),
  });

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* HydrationBoundary ডাটা ক্লায়েন্ট useQuery-তে পৌঁছে দেবে */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <OrganizationDataTable />
      </HydrationBoundary>
    </div>
  );
}