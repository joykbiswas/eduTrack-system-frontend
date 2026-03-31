/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Plus} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { DeleteDialog } from "../admin/delete-dialog";

import { deleteAssessmentsAction, fetchAllAssessmentsAction } from "@/app/(dashboardLayout)/teacher/dashboard/assessment-create/_actions";

export function AssessmentDataTable() {
  const queryClient = useQueryClient();

  const { data: response, isLoading } = useQuery({
    queryKey: ["assessments"],
    queryFn: () => fetchAllAssessmentsAction(),
  });

  const assessmentsData = response?.data || [];

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.original.title}</span>
          <span className="text-xs text-muted-foreground line-clamp-1">
            {row.original.description}
          </span>
        </div>
      ),
    },
    {
      id: "questionCount",
      header: "Questions",
      cell: ({ row }) => (
        <Badge variant="secondary">
          {row.original.questions?.length || 0} Items
        </Badge>
      ),
    },
    {
      accessorKey: "passingScore",
      header: "Passing Score",
      cell: ({ row }) => (
        <div className="font-semibold text-center text-green-600">
          {row.original.passingScore}%
        </div>
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
          {/* <Link href={`/teacher/dashboard/assessment-view/${row.original.id}`}>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
          <Link href={`/teacher/dashboard/assessment-edit/${row.original.id}`}>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link> */}
          <DeleteDialog
            id={row.original.id}
            name={row.original.title}
            deleteFn={async (id) => {
              await deleteAssessmentsAction(id);
            }}
            onDelete={() => {
              queryClient.invalidateQueries({ queryKey: ["assessments"] });
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
          <h2 className="text-3xl font-bold tracking-tight">Assessments</h2>
          <p className="text-muted-foreground mt-1">
            Manage your true/false tests and evaluations
          </p>
        </div>
        <Link href="/teacher/dashboard/assessment-create">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Assessment
          </Button>
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={assessmentsData}
        isLoading={isLoading}
        searchColumn="title"
        searchPlaceholder="Search by title..."
      />
    </div>
  );
}