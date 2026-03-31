import MaterialCreateForm from "@/components/teacher/material-create-Form";
import { wordStoryCardService } from "@/services/word-story.services";
import { QueryClient } from "@tanstack/react-query";
import { getAllWordStoryCards } from "../word-story-cards-create/_actions";

export default async function MaterialCreatePage() {
  const queryClient = new QueryClient();

  const wordCardsResponse = await wordStoryCardService.getWordStoryCards();
  const wordCards = wordCardsResponse?.data || [];
  
  // Prefetch word story cards data on the server
  await queryClient.prefetchQuery({
    queryKey: ["word-story-cards"],
    queryFn: () => getAllWordStoryCards(),
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Material</h1>
      <MaterialCreateForm wordCards={wordCards} />
    </div>
  );
}
