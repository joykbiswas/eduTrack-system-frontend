/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllWordStoryCards } from "@/services/teacher.services";
import { IQuizFormValues, QuizSchema } from "@/zod/quiz.schema";
import { createQuizAction } from "@/app/(dashboardLayout)/teacher/dashboard/quiz-create/_actions";

// import { QuizSchema, IQuizFormValues } from "./quiz.schema";
// import { createQuizAction, getAllWordStoryCards } from "../_actions";

export default function CreateQuizForm() {
  const router = useRouter();

  // 1. Fetch Cards for the Dropdown
  const { data: cardResponse, isLoading: isCardsLoading } = useQuery({
    queryKey: ["word-story-cards"],
    queryFn: () => getAllWordStoryCards(),
  });

  const form = useForm<IQuizFormValues>({
    resolver: zodResolver(QuizSchema),
    defaultValues: {
      type: "MULTIPLE_CHOICE",
      question: "",
      options: { A: "", B: "", C: "" },
      correctAnswer: "A",
    },
  });

  // 2. Mutation for creating the quiz
  const { mutate, isPending } = useMutation({
    mutationFn: createQuizAction,
    onSuccess: () => {
      toast.success("Quiz created successfully!");
      router.push("/teacher/dashboard/quiz-list"); 
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  function onSubmit(values: IQuizFormValues) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl border p-6 rounded-lg bg-white shadow-sm">
        
        {/* Card Selection Dropdown */}
        <FormField
          control={form.control}
          name="cardId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Word Story Card</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={isCardsLoading ? "Loading cards..." : "Select a card"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {cardResponse?.data?.map((card) => (
                    <SelectItem key={card.id} value={card.id}>
                      {card.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Question Field */}
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Input placeholder="What is 3 + 9?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Options Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(["A", "B", "C"] as const).map((opt) => (
            <FormField
              key={opt}
              control={form.control}
              name={`options.${opt}`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Option {opt}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        {/* Correct Answer Selection */}
        <FormField
          control={form.control}
          name="correctAnswer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correct Answer</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the correct option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="A">Option A</SelectItem>
                  <SelectItem value="B">Option B</SelectItem>
                  <SelectItem value="C">Option C</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Creating..." : "Create Quiz"}
        </Button>
      </form>
    </Form>
  );
}