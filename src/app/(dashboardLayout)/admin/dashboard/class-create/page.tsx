
import { ClassCreateForm } from "@/components/admin/class-create-form";
import { getAllOrganizations, getAllTeachers } from "@/services/admin.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";


export default async function ClassCreatePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["organizations"],
    queryFn: () => getAllOrganizations(),
  });

   await queryClient.prefetchQuery({
      queryKey: ["teachers"],
      queryFn: () => getAllTeachers(),
    });

  return (
    <div className="container mx-auto py-6 space-y-6">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ClassCreateForm />
      </HydrationBoundary>
    </div>
  );
}