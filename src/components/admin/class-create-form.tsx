// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Loader2 } from "lucide-react";
// import { createClass } from "@/services/admin.services";

// // 🛡️ Zod Validation Schema
// const classSchema = z.object({
//   name: z.string().min(3, "Name must be at least 3 characters"),
//   description: z.string().min(5, "Description is required"),
//   classNumber: z.string().min(1, "Class number is required"),
//   sectionCode: z.string().min(1, "Section code is required"),
//   organizationId: z.string().uuid("Invalid Organization ID"),
//   teacherId: z.string().uuid("Invalid Teacher ID"),
//   academicYear: z.string().regex(/^\d{4}-\d{4}$/, "Format: 2024-2025"),
// });

// type ClassFormValues = z.infer<typeof classSchema>;

// export function ClassCreateForm() {
//   const queryClient = useQueryClient();
//   const router = useRouter();

//   const form = useForm<ClassFormValues>({
//     resolver: zodResolver(classSchema),
//     defaultValues: {
//       name: "",
//       description: "",
//       classNumber: "",
//       sectionCode: "",
//       organizationId: "",
//       teacherId: "",
//       academicYear: "",
//     },
//   });

//   // 🚀 TanStack Mutation
//   const { mutate, isPending } = useMutation({
//     mutationFn: (data: ClassFormValues) => createClass(data),
//     onSuccess: (response) => {
//       if (response.success) {
//         toast.success(response.message || "Class created successfully!");
//         // ইনভ্যালিডেট করে ডাটা রিফ্রেশ করা
//         queryClient.invalidateQueries({ queryKey: ["classes"] });
//         router.push("/admin/dashboard/classes"); // সাকসেস হলে লিস্টে পাঠিয়ে দিন
//       }
//     },
//     onError: (error: any) => {
//       toast.error(error?.response?.data?.message || "Something went wrong");
//     },
//   });

//   function onSubmit(values: ClassFormValues) {
//     mutate(values);
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl border p-6 rounded-lg bg-white shadow-sm">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {/* Class Name */}
//           <FormField
//             control={form.control}
//             name="name"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Class Name</FormLabel>
//                 <FormControl>
//                   <Input placeholder="e.g. Class 9-A" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Academic Year */}
//           <FormField
//             control={form.control}
//             name="academicYear"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Academic Year</FormLabel>
//                 <FormControl>
//                   <Input placeholder="2024-2025" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Class Number */}
//           <FormField
//             control={form.control}
//             name="classNumber"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Class Number</FormLabel>
//                 <FormControl>
//                   <Input placeholder="11" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Section Code */}
//           <FormField
//             control={form.control}
//             name="sectionCode"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Section Code</FormLabel>
//                 <FormControl>
//                   <Input placeholder="1" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Organization ID */}
//           <FormField
//             control={form.control}
//             name="organizationId"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Organization ID</FormLabel>
//                 <FormControl>
//                   <Input placeholder="UUID from organization" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Teacher ID */}
//           <FormField
//             control={form.control}
//             name="teacherId"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Teacher ID</FormLabel>
//                 <FormControl>
//                   <Input placeholder="UUID from teacher" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>

//         {/* Description */}
//         <FormField
//           control={form.control}
//           name="description"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Description</FormLabel>
//               <FormControl>
//                 <Textarea placeholder="e.g. Business Stream" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <Button type="submit" className="w-full" disabled={isPending}>
//           {isPending ? (
//             <>
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               Creating...
//             </>
//           ) : (
//             "Create Class"
//           )}
//         </Button>
//       </form>
//     </Form>
//   );
// }