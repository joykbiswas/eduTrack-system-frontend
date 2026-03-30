"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/data-table";
import { DeleteDialog } from "./delete-dialog";
import { getAllAdmins, deleteAdmin } from "@/services/admin.services";
import { Button } from "@/components/ui/button";
import { Plus, Eye, Pencil } from "lucide-react";
import { toast } from "sonner";
import type { IAdmin } from "@/types/admin.types";
import Link from "next/link";
import Image from "next/image";
// TanStack Query Imports
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface AdminDataTableProps {
  initialAdmins: IAdmin[];
}

export function AdminDataTable({ initialAdmins }: AdminDataTableProps) {
  const queryClient = useQueryClient();

  // ১. ডাটা ফেচিং এর জন্য useQuery
  const { data: admins, isLoading } = useQuery({
    queryKey: ["admins"],
    queryFn: async () => {
      const response = await getAllAdmins();
      return response?.data || response || [];
    },
    initialData: initialAdmins, // সার্ভার থেকে আসা ডাটা শুরুতে দেখাবে
  });

  // ২. ডিলিট করার জন্য useMutation
  const { mutate: deleteMutation } = useMutation({
    mutationFn: deleteAdmin,
    onSuccess: () => {
      toast.success("Admin deleted successfully");
      // টেবিল ডাটা রিফ্রেশ করা
      queryClient.invalidateQueries({ queryKey: ["admins"] });
    },
    onError: () => {
      toast.error("Failed to delete admin");
    },
  });

  const columns: ColumnDef<IAdmin>[] = [
    {
      id: "profilePhoto",
      header: "Photo",
      size: 60,
      cell: ({ row }) => {
        const photo = row.original.profilePhoto;
        const name = row.original.name;
        const initials = name
          .split(" ")
          .slice(0, 2)
          .map((n) => n[0])
          .join("")
          .toUpperCase();

        return (
          <div className="flex items-center">
            {photo ? (
              <Image
                src={photo}
                width={40}
                height={40}
                alt={`${name}'s profile`}
                className="h-10 w-10 rounded-full object-cover ring-2 ring-background border"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : null}
            <div
              className={`h-10 w-10 rounded-full flex items-center justify-center text-xs font-medium ring-2 ring-background border flex-shrink-0 ml-0 ${
                photo
                  ? "hidden"
                  : "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground"
              }`}
            >
              {initials}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      accessorKey: "contactNumber",
      header: "Contact",
      cell: ({ row }) => row.original.contactNumber || "N/A",
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Eye className="h-4 w-4" />
          </Button>
          <Link href={`/admin/dashboard/admin-edit/${row.original.id}`}>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>

          <DeleteDialog
            id={row.original.id}
            name={row.original.name}
            deleteFn={async (id) => {
              await deleteAdmin(id);
            }}
            onDelete={() =>
              queryClient.invalidateQueries({ queryKey: ["admins"] })
            }
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Admins</h2>
        <Link href="/admin/dashboard/admin-create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Admin
          </Button>
        </Link>
      </div>
      {/* TanStack Query থেকে পাওয়া ডাটা এবং লোডিং স্টেট পাস করা হয়েছে */}
      <DataTable columns={columns} data={admins} isLoading={isLoading} />
    </div>
  );
}
