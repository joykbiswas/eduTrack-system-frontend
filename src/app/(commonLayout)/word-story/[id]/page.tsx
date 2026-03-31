/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Lightbulb,
  Music,
  GraduationCap,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { getWordStoryCardById } from "@/app/(dashboardLayout)/teacher/dashboard/word-story-cards-create/_actions";
import QuizCard from "@/components/modules/Home/QuizCard";
import AssessmentItem from "@/components/modules/Home/AssessmentsCard";

// টাইপ আপডেট করুন params এখন Promise
export default async function StoryDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ১. params কে await করুন
  const { id } = await params;
  console.log("Fetching Story for ID:", id);

  // ২. এখন id পাস করুন (আগে undefined যাচ্ছিল কারণ params resolve হয়নি)
  const response = await getWordStoryCardById(id);
  console.log("Full API Response:", response); // পুরো রেসপন্স চেক করুন
  const story = response.data;
  console.log("Extracted Story Data:", story); // ডাটা ফিল্ডগুলো চেক করুন
  if (!story) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-slate-800">Story Not Found</h2>
        <p className="text-slate-500 mb-6">
          The story you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/"
          className="text-primary hover:underline flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-15">
      {/* Sticky Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50 py-4">
        <div className="container mx-auto px-4 flex items-center gap-4">
          <Link
            href="/"
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <span className="font-bold text-lg text-slate-800">
            Story Overview
          </span>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content (Story & Dialogs) */}
          <div className="lg:col-span-6 space-y-8">
            {/* Image Container */}
            <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl bg-slate-200 ring-1 ring-slate-200">
              {/* ১. ব্যাকগ্রাউন্ডে ঝাপসা ইমেজ (এটি খালি জায়গা ভরাট করবে) */}
              <div
                className="absolute inset-0 bg-cover bg-center blur-2xl opacity-30 scale-110"
                style={{ backgroundImage: `url(${story.image})` }}
              />

              {/* ২. মেইন ইমেজ কন্টেইনার */}
              <div className="relative flex justify-center items-center h-[560px] w-[670px] z-10">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="h-48 w-96 object-cover"
                  priority
                />
              </div>

              {/* ৩. গ্রাডিয়েন্ট এবং টেক্সট ওভারলে */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8 z-20">
                <div>
                  <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg leading-tight">
                    {story.title}
                  </h1>
                  <div className="flex flex-wrap gap-2">
                    {story.keywords?.split(",").map((tag: string) => (
                      <Badge
                        key={tag}
                        className="bg-white/20 hover:bg-white/30 backdrop-blur-md border-none py-1.5 px-4 text-sm text-white"
                      >
                        {tag.trim()}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6 text-primary">
                  <BookOpen className="w-6 h-6" />
                  <h2 className="text-2xl font-bold text-slate-900">
                    Full Story
                  </h2>
                </div>
                <p className="text-xl leading-relaxed text-slate-700 font-serif whitespace-pre-wrap">
                  {story.description}
                </p>

                {story.descriptionSound && (
                  <div className="mt-8 p-6 bg-primary/5 rounded-xl border border-primary/10 flex flex-col md:flex-row items-center gap-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-primary rounded-full text-white animate-pulse">
                        <Music className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-slate-800">
                        Listen to Audio Narration
                      </span>
                    </div>
                    <audio
                      controls
                      src={story.descriptionSound}
                      className="w-full h-10"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-amber-50 border-amber-100 rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6 text-amber-700">
                    <Lightbulb className="w-6 h-6" />
                    <h3 className="text-xl font-bold">{story.dialogTitle}</h3>
                  </div>
                  <div className="space-y-4">
                    {story.dialogContent &&
                      Object.values(story.dialogContent).map(
                        (dialog, index) => (
                          <div key={index} className="flex gap-3">
                            <div className="h-6 w-1 bg-amber-400 rounded-full shrink-0 mt-1" />
                            <p className="italic text-slate-700 text-lg">
                              {dialog as string}
                            </p>
                          </div>
                        ),
                      )}
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                  <div className="flex items-center gap-2 mb-4 text-emerald-700">
                    <GraduationCap className="w-6 h-6" />
                    <h3 className="text-xl font-bold">Key Takeaways</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-slate-700">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      <span>Build context with dynamic scenarios.</span>
                    </li>
                    <li className="flex items-start gap-2 text-slate-700">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      <span>Interactive vocabulary retention.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-6 space-y-8">
            <section>
              <h3 className="text-lg font-bold text-slate-900 mb-4 px-1">
                Learning Materials
              </h3>
              <div className="space-y-4">
                {story.materials?.map((material: any) => (
                  <div
                    key={material.id}
                    className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-primary/40 transition-colors"
                  >
                    <span className="text-[10px] uppercase tracking-widest font-bold text-primary mb-1 block">
                      Lesson Module
                    </span>
                    <h4 className="font-bold text-slate-800 mb-2">
                      {material.title}
                    </h4>
                    <p className="text-sm text-slate-600 line-clamp-4">
                      {material.content}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <Separator className="bg-slate-200" />

            <section>
              <h3 className="text-lg font-bold text-slate-900 mb-4 px-1">
                Assessments
              </h3>
              <div className="space-y-4">
                {story.assessments?.map((assessment: any) => (
                  <div
                    key={assessment.id}
                    className="p-5 bg-white rounded-xl border border-slate-200 border-l-4 border-l-rose-500 shadow-sm"
                  >
                    <h4 className="font-bold text-slate-800 mb-1">
                      {assessment.title}
                    </h4>
                    <p className="text-xs text-slate-500 mb-4 italic">
                      {assessment.description}
                    </p>

                    <div className="space-y-3">
                      {assessment.questions?.map((q: any, idx: number) => (
                        <AssessmentItem key={idx} q={q} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <Separator className="bg-slate-200" />

            {/* Knowledge Check Section */}
            <section>
              <h3 className="text-lg font-bold text-slate-900 mb-4 px-1">
                Knowledge Check
              </h3>
              <div className="space-y-4">
                {story.quizzes?.map((quiz: any, i: number) => (
                  <QuizCard key={quiz.id} quiz={quiz} index={i} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
