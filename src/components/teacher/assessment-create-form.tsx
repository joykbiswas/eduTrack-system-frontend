/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { assessmentSchema, IAssessmentFormValues } from "@/zod/assessment.schema";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Trash2, Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { createAssessmentAction } from "@/app/(dashboardLayout)/teacher/dashboard/assessment-create/_actions";
import { useRouter } from "next/navigation";

export default function AssessmentCreateForm({ wordCards }: { wordCards: any[] }) {
    const router = useRouter();
  const form = useForm<any>({
    resolver: zodResolver(assessmentSchema),
    defaultValues: {
      title: "True/False Test",
      description: "",
      cardId: "",
      passingScore: 10,
      questions: [{ question: "", answer: true }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const onSubmit = async (values: IAssessmentFormValues) => {
    try {
      await createAssessmentAction(values);
      toast.success("Assessment created successfully!");
      // Navigate back to list
                router.push("/teacher/dashboard/assessment-list");
      form.reset();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-4xl bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card Selection */}
          <FormField
            control={form.control}
            name= "cardId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Story Card</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a story card" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {wordCards.map((card) => (
                      <SelectItem key={card.id} value={card.id}>{card.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
control={form.control}
            name= "title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assessment Title</FormLabel>
                <FormControl><Input {...field} placeholder="e.g. True/False Test" /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
         control={form.control}
          name= "description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl><Input {...field} placeholder="Short description..." /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name= "passingScore"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passing Score (%)</FormLabel>
              <FormControl><Input type="number" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4 border-t pt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Questions</h3>
            <Button type="button" variant="outline" size="sm" onClick={() => append({ question: "", answer: true })}>
              <Plus className="w-4 h-4 mr-1" /> Add Question
            </Button>
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-4 items-end p-4 border rounded-md bg-gray-50">
              <div className="flex-1 space-y-2">
                <FormField
                  control= {form.control}
                  name={`questions.${index}.question`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question {index + 1}</FormLabel>
                      <FormControl><Input {...field} placeholder="Enter true/false question" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name={`questions.${index}.answer`}
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center space-y-2 pb-2">
                    <FormLabel>{field.value ? "True" : "False"}</FormLabel>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)} disabled={fields.length === 1}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Creating..." : "Create Assessment"}
        </Button>
      </form>
    </Form>
  );
}