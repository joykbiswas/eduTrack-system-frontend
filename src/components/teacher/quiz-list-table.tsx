/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { DeleteDialog } from "../admin/delete-dialog";
import {
  deleteQuizAction,
  fetchAllQuizzesAction,
} from "@/app/(dashboardLayout)/teacher/dashboard/quiz-create/_actions";

export function QuizDataTable() {
  const queryClient = useQueryClient();

  const { data: response, isLoading } = useQuery({
    queryKey: ["quizzes"],
    queryFn: () => fetchAllQuizzesAction(),
  });

  const quizzesData = response?.data || [];
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "question",
      header: "Question",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium line-clamp-1">
            {row.original.question}
          </span>
          <span className="text-xs text-muted-foreground">
            {row.original.type}
          </span>
        </div>
      ),
    },
    {
      id: "cardTitle",
      header: "Word Card",
      cell: ({ row }) => (
        <Badge variant="outline" className="bg-blue-50/50">
          {row.original.card?.title || "N/A"}
        </Badge>
      ),
    },
    {
      accessorKey: "correctAnswer",
      header: "Answer",
      cell: ({ row }) => (
        <Badge variant="secondary" className="font-bold">
          {row.original.correctAnswer}
        </Badge>
      ),
    },
    {
      accessorKey: "points",
      header: "Points",
      cell: ({ row }) => (
        <div className="text-center font-semibold">{row.original.points}</div>
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
          <Link href={`/teacher/dashboard/quiz-edit/${row.original.id}`}>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link> */}

          <DeleteDialog
            id={row.original.id}
            name={row.original.title}
            deleteFn={async (id) => {
              await deleteQuizAction(id);
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
          <h2 className="text-3xl font-bold tracking-tight">Quizzes</h2>
          <p className="text-muted-foreground mt-1">
            Manage and monitor all quizzes
          </p>
        </div>
        <Link href="/teacher/dashboard/quiz-create">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Quiz
          </Button>
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={quizzesData}
        isLoading={isLoading}
        searchColumn="question"
        searchPlaceholder="Search by question..."
      />
    </div>
  );
}
