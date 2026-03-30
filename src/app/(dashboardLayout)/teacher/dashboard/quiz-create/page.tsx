// app/(dashboard)/quizzes/create/page.tsx

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getAllWordStoryCards } from "../word-story-cards-create/_actions";
import CreateQuizForm from "@/components/teacher/quiz-create-form";

export default async function CreateQuizPage() {
    const queryClient = new QueryClient();

    // Prefetch word story cards data on the server
    await queryClient.prefetchQuery({
        queryKey: ["word-story-cards"],
        queryFn: () => getAllWordStoryCards(),
    });

    return (
        <div className="container mx-auto py-6">
            <HydrationBoundary state={dehydrate(queryClient)}>
                <CreateQuizForm />
            </HydrationBoundary>
        </div>
    );
}