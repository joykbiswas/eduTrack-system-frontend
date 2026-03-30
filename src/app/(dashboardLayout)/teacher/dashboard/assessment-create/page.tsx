/* eslint-disable @typescript-eslint/no-explicit-any */
// import { wordStoryService } from "@/services/word-story.service";
import AssessmentCreateForm from "@/components/teacher/assessment-create-form";
import { wordStoryCardService } from "@/services/word-story.services";

// টাইপ ডিফাইন করা (ঐচ্ছিক কিন্তু ভালো প্র্যাকটিস)
interface IWordCard {
  id: string;
  title: string;
  [key: string]: any;
}

export default async function AssessmentCreatePage() {
  let wordCards: IWordCard[] = [];

  try {
    // ১. সার্ভার থেকে সব Word Story Cards নিয়ে আসা
    const response = await wordStoryCardService.getWordStoryCards();
    
    // আপনার API রেসপন্স যদি { success: true, data: [...] } ফরম্যাটে হয়
    wordCards = response?.data || [];
  } catch (error) {
    console.error("Error fetching word cards:", error);
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Create New Assessment</h1>
        <p className="text-gray-500 mt-2">
          Fill in the details below to create a True/False assessment for a specific word card.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-2">
        {/* ২. আপনার তৈরি করা ফর্ম কম্পোনেন্টটি এখানে কল করা হচ্ছে */}
        <AssessmentCreateForm wordCards={wordCards} />
      </div>
    </div>
  );
}