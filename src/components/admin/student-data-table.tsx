/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpDown,
  Plus,
  Pencil,
  ChevronRight,
  ClipboardList,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { DeleteDialog } from "../admin/delete-dialog"; // পাথ চেক করে নিন
import { fetchAllStudentsAction } from "@/app/(dashboardLayout)/teacher/dashboard/student-list/_actions";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

// const fetchStudents = async (): Promise<IStudent[]> => {
//   const response = await fetch(`${baseUrl}/student`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     credentials: "include",
//   });

//   if (!response.ok) {
//     throw new Error("Failed to fetch students");
//   }

//   const json = await response.json();
//   return json?.data ?? [];
// };

const deleteStudentClient = async (id: string) => {
  const response = await fetch(`${baseUrl}/student/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to delete student");
  }
};

export function StudentDataTable() {
  const queryClient = useQueryClient();

    
    const { data: response, isLoading } = useQuery({
      queryKey: ["students"],
      queryFn: () => fetchAllStudentsAction(),
    });
  
    

  const data = response || [];

  // 🔍 Expand logic: যদি assignedTasks থাকে তবেই এক্সপ্যান্ড হবে
  const enableExpand = data.some((student: any) => student.assignedTasks?.length > 0);

  const columns: ColumnDef<any>[] = [
    {
      id: "expand",
      header: "",
      cell: ({ row }) => {
        const hasTasks = (row.original.assignedTasks?.length ?? 0) > 0;
        if (!hasTasks) return <div className="w-4" />;

        return (
          <span className="inline-flex h-4 w-4 items-center justify-center">
            <ChevronRight className="h-4 w-4" />
          </span>
        );
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Student Name <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.user?.status;
        return (
          <Badge variant={status === "ACTIVE" ? "default" : "secondary"}>
            {status}
          </Badge>
        );
      },
    },
    {
      id: "tasksCount",
      header: "Total Tasks",
      cell: ({ row }) => (
        <Badge variant="outline" className="flex w-fit gap-1">
          <ClipboardList className="h-3 w-3" />
          {row.original.assignedTasks?.length || 0}
        </Badge>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
          <Link href={`/admin/dashboard/student-edit/${row.original.id}`}>
            <Button size="sm" variant="ghost">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          <DeleteDialog
            id={row.original.id}
            name={row.original.name}
            deleteFn={async (id) => await deleteStudentClient(id)}
            onDelete={() => {
              queryClient.invalidateQueries({ queryKey: ["students"] });
            }}
          />
        </div>
      ),
    },
  ];

  // 🎯 Expanded Row Renderer: Assigned Tasks Table
  const renderSubComponent = (row: any) => {
    const tasks = row.original.assignedTasks;

    return (
      <div className="rounded-lg border bg-muted/30 p-4 shadow-inner">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Assigned Tasks for {row.original.name}
          </h4>
          <Badge>{tasks.length} Task(s)</Badge>
        </div>

        <div className="overflow-hidden rounded-md border bg-background">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Task Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Task Status</TableHead>
                <TableHead>Completed</TableHead>
                <TableHead>Assigned At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.task?.title}</TableCell>
                  <TableCell className="max-w-100 truncate">{item.task?.description}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.task?.status === "PENDING" ? "outline" : "default"
                      }
                    >
                      {item.task?.status ?? "Unknown"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {item.completedAt
                      ? new Date(item.completedAt).toLocaleDateString()
                      : "Not Completed"}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {new Date(item.createdAt).toLocaleDateString()}
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
          <h2 className="text-3xl font-bold tracking-tight">Students</h2>
          <p className="text-sm text-muted-foreground">
            Manage student records and view assigned task progress.
          </p>
        </div>
        
      </div>

      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        searchColumn="name"
        searchPlaceholder="Search students..."
        enableExpand={enableExpand}
        renderSubComponent={renderSubComponent}
      />
    </div>
  );
}