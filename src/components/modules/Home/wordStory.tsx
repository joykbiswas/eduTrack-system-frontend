"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
// import { getAllWordStoryCards } from "@/app/(dashboard)/word-story-cards/_actions";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, ArrowRight } from "lucide-react";
import { getAllWordStoryCards } from "@/app/(dashboardLayout)/teacher/dashboard/word-story-cards-create/_actions";

export default function WordStory() {
  const { data, isLoading } = useQuery({
    queryKey: ["word-story-cards"],
    queryFn: () => getAllWordStoryCards(),
  });

  if (isLoading) {
    return (
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 py-10">
        {[1, 2, 3].map((i) => <Skeleton key={i} className="h-[350px] w-full rounded-xl" />)}
      </div>
    );
  }

  const stories = data?.data || [];

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="mb-14 text-center">
          
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured Stories</h2>
            <p className="mt-4 text-lg text-muted-foreground">Master vocabulary through engaging narratives</p>
          
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <Card key={story.id} className="group hover:shadow-2xl transition-all duration-300 border-slate-200 overflow-hidden flex flex-col">
              <div className="relative h-60 w-full overflow-hidden">
                <Image
                  src={story.image || "/placeholder.jpg"}
                  alt={story.title}
                  fill
                  className="h-40 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-white/90 text-primary hover:bg-white">New Story</Badge>
                </div>
              </div>
              
              {/* <CardHeader className=""> */}
                <CardTitle className="text-xl font-bold line-clamp-1 group-hover:text-primary transition-colors">
                  {story.title}
                </CardTitle>
              {/* </CardHeader> */}

              <CardContent className=" pt-0 flex-grow">
                <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">
                  {story.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {story.keywords.split(",").slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[11px] font-medium px-2 py-1 bg-slate-100 rounded text-slate-600 uppercase tracking-wider">
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              </CardContent>

              <CardFooter className=" border-t bg-slate-50/50">
                <Link href={`/word-story/${story.id}`} className="w-full">
                  <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-md">
                    Read Details <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}