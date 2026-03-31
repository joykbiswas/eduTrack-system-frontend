/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { materialSchema, IMaterialFormValues } from "@/zod/material.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { createMaterialAction } from "@/app/(dashboardLayout)/teacher/dashboard/material-create/_actions";
import { getAllWordStoryCards } from "@/services/teacher.services";

interface MaterialCreateFormProps {
  wordCards: any[];
}

export default function MaterialCreateForm({ wordCards }: MaterialCreateFormProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: cardResponse, isLoading: isCardsLoading } = useQuery({
    queryKey: ["word-story-cards"],
    queryFn: () => getAllWordStoryCards(),
  });
  const form = useForm<any>({
    resolver: zodResolver(materialSchema),
    defaultValues: {
      title: "",
      content: "",
      type: "TEXT",
      cardId: "",
    },
  });

  // ২. Mutation setup
  const { mutate, isPending } = useMutation({
    mutationFn: (values: IMaterialFormValues) => createMaterialAction(values),
    onSuccess: (res) => {
      toast.success( "Material created successfully!");
      queryClient.invalidateQueries({ queryKey: ["materials"] }); // যদি লিস্ট থাকে তবে রিফ্রেশ করবে
      router.push("/teacher/dashboard/material-list");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create material");
    },
  });

  const onSubmit = (values: IMaterialFormValues) => {
    mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl bg-white p-6 rounded-lg border shadow-sm">
        
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Material Title</FormLabel>
                <FormControl><Input {...field} placeholder="Lesson 1" /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="TEXT">TEXT</SelectItem>
                    <SelectItem value="VIDEO">VIDEO</SelectItem>
                    <SelectItem value="AUDIO">AUDIO</SelectItem>
                    <SelectItem value="IMAGE">IMAGE</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Learning content here..." rows={5} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Saving..." : "Create Material"}
        </Button>
      </form>
    </Form>
  );
}