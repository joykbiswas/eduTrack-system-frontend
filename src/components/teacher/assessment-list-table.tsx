/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Plus, ChevronDown, ChevronRight, HelpCircle, Check, X } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { DeleteDialog } from "../admin/delete-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { deleteAssessmentsAction, fetchAllAssessmentsAction } from "@/app/(dashboardLayout)/teacher/dashboard/assessment-create/_actions";

export function AssessmentDataTable() {
  const queryClient = useQueryClient();

  const { data: response, isLoading } = useQuery({
    queryKey: ["assessments"],
    queryFn: () => fetchAllAssessmentsAction(),
  });

  const assessmentsData = response?.data || [];

  // 1. Define Columns with the Expand Trigger
  const columns: ColumnDef<any>[] = [
    {
      id: "expand",
      header: "",
      cell: ({ row }) => {
        const hasQuestions = (row.original.questions?.length ?? 0) > 0;
        if (!hasQuestions) return <div className="w-4" />;

        return (
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent row click conflict
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
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.original.description}</span>
          <span className="text-xs text-muted-foreground line-clamp-1">
            {row.original.title}
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
        <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
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

  // 2. Render SubComponent (The expanded content)
  const renderSubComponent = (row: any) => {
    const questions = row.original.questions;

    if (!questions || questions.length === 0) return null;

    return (
      <div className="rounded-lg border bg-muted/10 m-3 shadow-sm overflow-hidden">
        <div className="bg-muted/30 px-4 py-2 border-b flex items-center justify-between">
          <h4 className="text-sm font-bold flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-primary" /> Question Details
          </h4>
        </div>
        
        <div className="p-4">
          <Table className="bg-background rounded-md border">
            <TableHeader className="bg-muted/20">
              <TableRow>
                <TableHead className="w-12 text-center">#</TableHead>
                <TableHead>Question Text</TableHead>
                <TableHead className="w-[150px] text-center">Correct Answer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {questions.map((q: any, index: number) => (
                <TableRow key={index} className="hover:bg-transparent">
                  <TableCell className="text-center font-medium text-muted-foreground">
                    {index + 1}
                  </TableCell>
                  <TableCell className="font-medium">
                    {q.question}
                  </TableCell>
                  <TableCell className="text-center">
                    {q.answer ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">
                        <Check className="mr-1 h-3 w-3" /> True
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-red-200">
                        <X className="mr-1 h-3 w-3" /> False
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  };

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
        // 3. Pass Expansion Props
        enableExpand={true}
        renderSubComponent={renderSubComponent}
        rowCanExpand={(row) => row.original.questions?.length > 0}
      />
    </div>
  );
}