/* eslint-disable @typescript-eslint/no-explicit-any */
// components/forms/ClassCreateForm.tsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ITeacher } from "@/types/class.types";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useCreateClass } from "@/hooks/useCreateClass";
import { fetchOrganizations, fetchTeachers } from "@/app/(dashboardLayout)/admin/dashboard/class-create/_actions";
import { createClassSchema } from "@/zod/class.schema";
import { useRouter } from "next/navigation";

interface ClassCreateFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
}

export const ClassCreateForm = ({ onSuccess, onCancel }: ClassCreateFormProps) => {
    const router = useRouter()
    const { mutate: createClass, isPending } = useCreateClass();

    // Fetch organizations
    const { 
        data: organizationsData, 
        isLoading: isLoadingOrganizations,
        error: organizationsError 
    } = useQuery({
        queryKey: ["organizations"],
        queryFn: fetchOrganizations,
    });

    // Fetch teachers
    const { 
        data: teachersData, 
        isLoading: isLoadingTeachers,
        error: teachersError 
    } = useQuery({
        queryKey: ["teachers"],
        queryFn: fetchTeachers,
    });

    const organizations = organizationsData?.data || [];
    const teachers = teachersData?.data?.teachers || [];
    console.log("organizations ===", organizations);
    console.log("teachers ====", teachers);

    const form = useForm<any>({
        resolver: zodResolver(createClassSchema),
        defaultValues: {
            name: "",
            description: "",
            classNumber: "",
            sectionCode: "",
            organizationId: "",
            teacherId: "",
            academicYear: new Date().getFullYear() + "-" + (new Date().getFullYear() + 1),
        },
    });

    const onSubmit = (values: any) => {
        createClass(values, {
            onSuccess: () => {
                form.reset();
                onSuccess?.();
                router.push('/admin/dashboard/class-list');
            },
        });
    };

    // Generate academic year options (last 5 years and next 5 years)
    const currentYear = new Date().getFullYear();
    const academicYears = Array.from({ length: 11 }, (_, i) => {
        const startYear = currentYear - 5 + i;
        return `${startYear}-${startYear + 1}`;
    });

    // Show loading state
    if (isLoadingOrganizations || isLoadingTeachers) {
        return (
            <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2">Loading form data...</span>
            </div>
        );
    }

    // Show error state
    if (organizationsError || teachersError) {
        return (
            <div className="text-center py-8 text-red-500">
                <p>Failed to load form data. Please try again.</p>
                <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => window.location.reload()}
                >
                    Retry
                </Button>
            </div>
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Class Name *</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="e.g., Class 9-A"
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
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter class description (e.g., Business Stream)"
                                    className="resize-none"
                                    rows={3}
                                    {...field}
                                    disabled={isPending}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="classNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Class Number *</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="e.g., 11"
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
                        name="sectionCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Section Code *</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="e.g., 1"
                                        {...field}
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="academicYear"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Academic Year *</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                disabled={isPending}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select academic year" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {academicYears.map((year) => (
                                        <SelectItem key={year} value={year}>
                                            {year}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="organizationId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Organization *</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                disabled={isPending}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select organization" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {organizations.map((org) => (
                                        <SelectItem key={org.id} value={org.id}>
                                            {org.name}
                                        </SelectItem>
                                    ))}
                                    {organizations.length === 0 && (
                                        <div className="px-2 py-1.5 text-sm text-muted-foreground">
                                            No organizations found
                                        </div>
                                    )}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="teacherId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Class Teacher *</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                disabled={isPending}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select teacher" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {teachers.map((teacher: ITeacher) => (
                                        <SelectItem key={teacher.id} value={teacher.id}>
                                            {teacher.name} {teacher.subject ? `(${teacher.subject})` : ''}
                                        </SelectItem>
                                    ))}
                                    {teachers.length === 0 && (
                                        <div className="px-2 py-1.5 text-sm text-muted-foreground">
                                            No teachers found
                                        </div>
                                    )}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end gap-3">
                    {onCancel && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onCancel}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                    )}
                    <Button type="submit" disabled={isPending}>
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating...
                            </>
                        ) : (
                            "Create Class"
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
};