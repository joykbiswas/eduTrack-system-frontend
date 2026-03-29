// app/admin/dashboard/teacher-list/components/teacher-data-table.tsx
"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
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

interface TeacherDataTableProps {
  teachers: ITeacher[];
}

export function TeacherDataTable({ teachers }: TeacherDataTableProps) {
  const pathname = usePathname();
  const [data, setData] = useState(teachers);
  const [isLoading, setIsLoading] = useState(false);

  const refreshData = async () => {
    setIsLoading(true);
    try {
      const response = await getAllTeachers();
      // Handle the response structure based on your API
      const teachersData = response.data?.teachers || [];
      setData(teachersData);
    } catch (error) {
      toast.error("Failed to load teachers");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTeacher(id);
      toast.success("Teacher deleted successfully");
      await refreshData();
    } catch (error) {
      toast.error("Failed to delete teacher");
      throw error;
    }
  };

  useEffect(() => {
    refreshData();
  }, [pathname]);

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
      accessorKey: "qualification",
      header: "Qualification",
      cell: ({ row }) => (
        <div
          className="max-w-[150px] truncate text-sm"
          title={row.original.qualification}
        >
          {row.original.qualification}
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
      accessorKey: "gender",
      header: "Gender",
      cell: ({ row }) => (
        <Badge
          variant={row.original.gender === "MALE" ? "default" : "secondary"}
        >
          {row.original.gender === "MALE" ? "Male" : "Female"}
        </Badge>
      ),
    },
    {
      accessorKey: "contactNumber",
      header: "Contact",
      cell: ({ row }) => row.original.contactNumber || "N/A",
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
          <>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Eye className="h-4 w-4" />
            </Button>
          </>
          <Link href={`/admin/dashboard/teacher-edit/${row.original.id}`}>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          <DeleteDialog
            id={row.original.id}
            name={row.original.name}
            onDelete={() =>
              setData(data.filter((teacher) => teacher.id !== row.original.id))
            }
            deleteFn={handleDelete}
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
        data={data}
        isLoading={isLoading}
        searchColumn="name"
        searchPlaceholder="Search by name..."
      />
    </div>
  );
}
