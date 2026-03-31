/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Eye,
  Pencil,
  ArrowUpDown,
  FileText,
  Video,
  Music,
  Image as ImageIcon,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { DeleteDialog } from "../admin/delete-dialog";
import {
  fetchAllMaterialsAction,
  deleteMaterialAction,
} from "@/app/(dashboardLayout)/teacher/dashboard/material-create/_actions";
// import { toast } from "sonner";

export function MaterialDataTable() {
  const queryClient = useQueryClient();

  // ১. TanStack Query দিয়ে ডাটা রিড করা
  const { data: response, isLoading } = useQuery({
    queryKey: ["materials"],
    queryFn: () => fetchAllMaterialsAction(),
  });

  // response?.data থেকে মেটেরিয়াল লিস্ট নেওয়া
  const materialsData = response?.data || [];
console.log("materialsData ======", materialsData);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          Title <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="font-medium">{row.original.title}</div>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.original.type;
        return (
          <div className="flex items-center gap-2">
            {type === "TEXT" && <FileText className="h-4 w-4 text-blue-500" />}
            {type === "VIDEO" && <Video className="h-4 w-4 text-red-500" />}
            {type === "AUDIO" && <Music className="h-4 w-4 text-purple-500" />}
            {type === "IMAGE" && (
              <ImageIcon className="h-4 w-4 text-green-500" />
            )}
            <span className="text-xs font-semibold">{type || "N/A"}</span>
          </div>
        );
      },
    },
    {
      id: "cardTitle",
      header: "Word Card",
      cell: ({ row }) => (
        <Badge variant="outline" className="bg-slate-50">
          {row.original.card?.title || "No Card"}
        </Badge>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {row.original.createdAt
            ? format(new Date(row.original.createdAt), "dd MMM yyyy")
            : "N/A"}
        </span>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex gap-1">
          {/* <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Eye className="h-4 w-4" />
          </Button>
          <Link href={`/teacher/dashboard/material-edit/${row.original.id}`}>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link> */}

          <DeleteDialog
            id={row.original.id}
            name={row.original.title}
            deleteFn={async (id) => {
              await deleteMaterialAction(id);
            }}
            onDelete={() => {
              queryClient.invalidateQueries({ queryKey: ["materials"] });
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
          <h2 className="text-3xl font-bold tracking-tight">Materials</h2>
          <p className="text-muted-foreground mt-1">
            Manage all learning materials
          </p>
        </div>
        <Link href="/teacher/dashboard/material-create">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Material
          </Button>
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={materialsData}
        isLoading={isLoading}
        searchColumn="title"
        searchPlaceholder="Search by title..."
      />
    </div>
  );
}
