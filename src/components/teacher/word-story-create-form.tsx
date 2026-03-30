/* eslint-disable @typescript-eslint/no-explicit-any */
// components/word-story-card/word-story-card-create-form.tsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUpload } from "./image-upload";
import { createWordStoryCard } from "@/app/(dashboardLayout)/teacher/dashboard/word-story-cards-create/_actions";
import { createWordStoryCardSchema, CreateWordStoryCardSchemaType } from "@/zod/word-story.schema";

export function WordStoryCardCreateForm() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const form = useForm<CreateWordStoryCardSchemaType>({
        resolver: zodResolver(createWordStoryCardSchema),
        defaultValues: {
            title: "",
            image: "",
            keywords: "",
            description: "",
            dialogTitle: "",
            dialog1: "",
            dialog2: "",
            dialog3: "",
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: createWordStoryCard,
        onSuccess: (response) => {
            if (response?.success === true) {
                toast.success(response.message || "Word story card created successfully!");
                
                // Invalidate and refetch word story cards list
                queryClient.invalidateQueries({ queryKey: ["word-story-cards"] });
                
                // Navigate back to list
                router.push("/teacher/dashboard/word-story-cards-list");
                router.refresh();
            } else {
                throw new Error(response?.message || "Failed to create word story card");
            }
        },
        onError: (error: any) => {
            const errorMessage = error.message || "Failed to create word story card";
            toast.error(errorMessage);
            
            // Handle specific error cases
            if (errorMessage.includes("title")) {
                form.setError("title", {
                    type: "manual",
                    message: "Title already exists or is invalid"
                });
            }
        },
    });

    const onSubmit = (values: CreateWordStoryCardSchemaType) => {
        // Transform form values to match API request
        const payload = {
            title: values.title,
            image: values.image,
            keywords: values.keywords,
            description: values.description,
            dialogTitle: values.dialogTitle,
            dialogContent: {
                dialog1: values.dialog1,
                dialog2: values.dialog2,
                dialog3: values.dialog3,
            },
        };
        
        mutate(payload);
    };

    const handleImageChange = (url: string) => {
        form.setValue("image", url, { shouldValidate: true });
    };

    return (
        <div className="container mx-auto max-w-4xl">
            <Button 
                variant="ghost" 
                onClick={() => router.back()} 
                className="mb-6"
                disabled={isPending}
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to list
            </Button>
            
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Create Word Story Card</CardTitle>
                    <CardDescription>
                        Create a new word story card with images, keywords, and dialog content.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {/* Image Upload */}
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <ImageUpload
                                                value={field.value}
                                                onChange={handleImageChange}
                                                onError={(error) => {
                                                    form.setError("image", {
                                                        type: "manual",
                                                        message: error
                                                    });
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Title */}
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Story Title *</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="e.g., The Clever Fox" 
                                                {...field} 
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            A catchy title for your word story
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Keywords */}
                            <FormField
                                control={form.control}
                                name="keywords"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Keywords *</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="e.g., fox, forest, clever, animals, trick" 
                                                {...field} 
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Comma-separated keywords for search and categorization
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Description */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description *</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="A clever fox uses his intelligence to escape danger in the forest..."
                                                className="resize-none min-h-25"
                                                {...field}
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Brief description of the story
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Dialog Section */}
                            <div className="space-y-4">
                                <div className="border-b pb-2">
                                    <h3 className="text-lg font-semibold">Dialog Content</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Create interactive dialog questions for the story
                                    </p>
                                </div>

                                <FormField
                                    control={form.control}
                                    name="dialogTitle"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Dialog Title *</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    placeholder="e.g., Fox Question" 
                                                    {...field} 
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="dialog1"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Dialog 1 *</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="How can I escape from the trap?"
                                                    className="resize-none"
                                                    rows={2}
                                                    {...field}
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="dialog2"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Dialog 2 *</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Who will help me cut the wheat?"
                                                    className="resize-none"
                                                    rows={2}
                                                    {...field}
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="dialog3"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Dialog 3 *</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Who will help me eat the bread?"
                                                    className="resize-none"
                                                    rows={2}
                                                    {...field}
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Form Actions */}
                            <div className="flex gap-4 pt-4">
                                <Button 
                                    type="button" 
                                    variant="outline" 
                                    onClick={() => router.back()}
                                    disabled={isPending}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isPending}>
                                    {isPending ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Creating...
                                        </>
                                    ) : (
                                        "Create Word Story Card"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}