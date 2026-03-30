// app/(dashboard)/word-story-cards/page.tsx

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getAllWordStoryCards } from "../word-story-cards-create/_actions";
import { WordStoryCardDataTable } from "@/components/teacher/word-story-list-table";
// import { getAllWordStoryCards } from "./_actions";
// import { WordStoryCardDataTable } from "@/components/word-story-card/word-story-card-data-table";

export default async function WordStoryCardListPage() {
    const queryClient = new QueryClient();

    // Prefetch word story cards data on the server
    await queryClient.prefetchQuery({
        queryKey: ["word-story-cards"],
        queryFn: () => getAllWordStoryCards(),
    });

    return (
        <div className="container mx-auto py-6 space-y-6">
            <HydrationBoundary state={dehydrate(queryClient)}>
                <WordStoryCardDataTable />
            </HydrationBoundary>
        </div>
    );
}