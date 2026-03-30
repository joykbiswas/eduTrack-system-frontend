// hooks/useCreateClass.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { createClass } from "@/app/(dashboard)/classes/_actions";
import { ICreateClassRequest } from "@/types/class.types";
import { toast } from "sonner";
import { createClass } from "@/app/(dashboardLayout)/admin/dashboard/class-create/_actions";

export const useCreateClass = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: ICreateClassRequest) => {
            const response = await createClass(data);
            if (!response.success) {
                throw new Error(response.message || "Failed to create class");
            }
            return response;
        },
        onSuccess: (data) => {
            // Invalidate and refetch classes list
            queryClient.invalidateQueries({ queryKey: ["classes"] });
            
            // Show success message
            toast.success(data.message || "Class created successfully!");
        },
        onError: (error: Error) => {
            // Show error message
            toast.error(error.message || "Failed to create class. Please try again.");
        },
    });
};