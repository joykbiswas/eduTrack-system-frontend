/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Plus, ChevronDown, ChevronRight, ListChecks, CheckCircle2 } from "lucide-react";
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
      id: "expand",
      header: "",
      cell: ({ row }) => {
        // Options usually exist for Multiple Choice
        const hasOptions = row.original.options && Object.keys(row.original.options).length > 0;
        if (!hasOptions) return <div className="w-4" />;

        return (
          <button
            onClick={(e) => {
              e.stopPropagation();
              row.getToggleExpandedHandler()();
            }}
            className="flex items-center justify-center"
          >
            {row.getIsExpanded() ? (
              <ChevronDown className="h-4 w-4 text-primary" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        );
      },
    },
    {
      id: "cardTitle",
      header: "Story Card",
      cell: ({ row }) => (
        <Badge variant="outline" className="bg-blue-50/50">
          {row.original.card?.title || "N/A"}
        </Badge>
      ),
    },
    {
      accessorKey: "question",
      header: "Question",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium line-clamp-1">
            {row.original.question}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
            {row.original.type?.replace("_", " ")}
          </span>
        </div>
      ),
    },
    
    {
      accessorKey: "correctAnswer",
      header: "Answer",
      cell: ({ row }) => (
        <Badge variant="secondary" className="font-bold text-primary">
          Option {row.original.correctAnswer}
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
        <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
          <DeleteDialog
            id={row.original.id}
            name={row.original.question}
            deleteFn={async (id) => {
              await deleteQuizAction(id);
            }}
            onDelete={() => {
              queryClient.invalidateQueries({ queryKey: ["quizzes"] });
            }}
          />
        </div>
      ),
    },
  ];

  // Render SubComponent to show Multiple Choice Options
  const renderSubComponent = (row: any) => {
    const options = row.original.options;
    const correctKey = row.original.correctAnswer;

    if (!options) return null;

    return (
      <div className="rounded-lg border bg-muted/5 m-3 shadow-sm overflow-hidden">
        <div className="bg-muted/20 px-4 py-2 border-b flex items-center gap-2">
          <ListChecks className="h-4 w-4 text-primary" />
          <h4 className="text-sm font-bold">Quiz Options</h4>
        </div>
        
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(options).map(([key, value]: [string, any]) => {
            const isCorrect = key === correctKey;
            return (
              <div 
                key={key} 
                className={`flex items-center justify-between p-3 rounded-md border ${
                  isCorrect 
                    ? "bg-green-50 border-green-200 ring-1 ring-green-200" 
                    : "bg-background border-border"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`flex items-center justify-center h-6 w-6 rounded-full text-xs font-bold ${
                    isCorrect ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"
                  }`}>
                    {key}
                  </span>
                  <span className={`text-sm ${isCorrect ? "font-semibold text-green-900" : "text-foreground"}`}>
                    {value}
                  </span>
                </div>
                {isCorrect && (
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

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
        enableExpand={true}
        renderSubComponent={renderSubComponent}
        rowCanExpand={(row) => row.original.options && Object.keys(row.original.options).length > 0}
      />
    </div>
  );
}