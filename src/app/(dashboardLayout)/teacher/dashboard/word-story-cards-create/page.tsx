// app/(dashboard)/word-story-cards/create/page.tsx

import { WordStoryCardCreateForm } from "@/components/teacher/word-story-create-form";

// import { WordStoryCardCreateForm } from "@/components/word-story-card/word-story-card-create-form";

export default function CreateWordStoryCardPage() {
    return (
        <div className="container mx-auto py-6">
            <WordStoryCardCreateForm />
        </div>
    );
}