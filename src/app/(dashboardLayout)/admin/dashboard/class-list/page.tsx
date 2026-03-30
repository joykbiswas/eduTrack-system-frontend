// app/(dashboard)/classes/page.tsx

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
// import { getAllClasses } from "./_actions";
// import { ClassesDataTable } from "@/components/classes/classes-data-table";
import { getAllClasses } from "../class-create/_actions";
import { ClassesDataTable } from "@/components/admin/classes-data-table";

export default async function ClassesListPage() {
    const queryClient = new QueryClient();

    // Prefetch classes data on the server
    await queryClient.prefetchQuery({
        queryKey: ["classes"],
        queryFn: () => getAllClasses(),
    });

    return (
        <div className="container mx-auto py-6 space-y-6">
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ClassesDataTable />
            </HydrationBoundary>
        </div>
    );
}