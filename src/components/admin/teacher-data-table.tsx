"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/data-table";
import { DeleteDialog } from "./delete-dialog";
import { getAllTeachers, deleteTeacher } from "@/services/admin.services";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Eye,
  Pencil,
  ArrowUpDown,
  BadgeCheck,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import type { ITeacher } from "@/types/teacher.types";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function TeacherDataTable() {
  const queryClient = useQueryClient();

  // 🔄 TanStack Query ইন্টিগ্রেশন
  const { data: response, isLoading } = useQuery({
    queryKey: ["teachers"],
    queryFn: () => getAllTeachers(),
  });

  const teachersData = response?.data?.teachers || [];

  const columns: ColumnDef<ITeacher>[] = [
    {
      id: "profilePhoto",
      header: "Photo",
      size: 70,
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
          <Avatar className="h-10 w-10 ring-2 ring-background border">
            <AvatarImage src={photo || undefined} alt={name} />
            <AvatarFallback className="bg-linear-to-br from-primary to-primary/80 text-primary-foreground text-xs">
              {initials}
            </AvatarFallback>
          </Avatar>
        );
      },
    },
    {
      accessorKey: "registrationNumber",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent"
        >
          Reg. Number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="font-mono text-sm">
          {row.original.registrationNumber}
        </span>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.name}</div>
          <div className="text-sm text-muted-foreground">
            {row.original.email}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "subject",
      header: "Subject",
      cell: ({ row }) => (
        <Badge variant="secondary" className="font-normal">
          {row.original.subject}
        </Badge>
      ),
    },
    {
      accessorKey: "designation",
      header: "Designation",
      cell: ({ row }) => (
        <div className="max-w-50 truncate" title={row.original.designation}>
          {row.original.designation}
        </div>
      ),
    },
    {
      accessorKey: "experience",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent"
        >
          Experience
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-center">
          <span className="font-medium">{row.original.experience}</span>
          <span className="text-muted-foreground text-sm ml-1">years</span>
        </div>
      ),
    },
    {
      accessorKey: "user.status",
      header: "Status",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {row.original.user?.status === "ACTIVE" ? (
            <>
              <BadgeCheck className="h-4 w-4 text-green-500" />
              <span className="text-green-600 text-sm">Active</span>
            </>
          ) : (
            <>
              <XCircle className="h-4 w-4 text-red-500" />
              <span className="text-red-600 text-sm">Inactive</span>
            </>
          )}
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex gap-1">
          {/* <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Eye className="h-4 w-4" />
          </Button>
          <Link href={`/admin/dashboard/teacher-edit/${row.original.id}`}>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link> */}
          <DeleteDialog
            id={row.original.id}
            name={row.original.name}
            deleteFn={async (id) => {
              await deleteTeacher(id);
            }}
            onDelete={() => {
              queryClient.invalidateQueries({ queryKey: ["teachers"] });
              toast.success("Teacher deleted successfully");
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Teachers</h2>
          <p className="text-muted-foreground mt-1">
            Manage all teachers in the system
          </p>
        </div>
        <Link href="/admin/dashboard/teacher-create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Teacher
          </Button>
        </Link>
      </div>
      <DataTable
        columns={columns}
        data={teachersData}
        isLoading={isLoading}
        searchColumn="name"
        searchPlaceholder="Search by name..."
      />
    </div>
  );
}