/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpDown,
  ChevronDown,
  ChevronRight,
  Clock,
  CheckCircle2,
  Calendar,
  BookOpen,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getMyProfile } from "@/app/(dashboardLayout)/(studentRouteGroup)/(studentDashboardLayout)/dashboard/task-list/_action";

export function StudentTaskDataTable() {
  const { data: response, isLoading } = useQuery({
    queryKey: ["my-profile"],
    queryFn: () => getMyProfile(),
  });

  const studentData = response?.data?.student ? [response.data.student] : [];

  const enableExpand = studentData.some(
    (s) => (s.assignedTasks?.length ?? 0) > 0
  );

  const columns: ColumnDef<any>[] = [
    {
      id: "expand",
      header: "",
      cell: ({ row }) => {
        const hasTasks = (row.original.assignedTasks?.length ?? 0) > 0;
        if (!hasTasks) return null;

        return (
          <button 
            onClick={row.getToggleExpandedHandler()}
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
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          Student Name <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="font-bold">{row.original.name}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      id: "taskCount",
      header: "Assigned Tasks",
      cell: ({ row }) => (
        <Badge variant="secondary">
          {row.original.assignedTasks?.length || 0} Tasks
        </Badge>
      ),
    },
  ];

  // 🎯 Updated Expanded Row Renderer
  const renderSubComponent = (row: any) => {
    const tasks = row.original.assignedTasks;

    if (!tasks || tasks.length === 0) return null;

    return (
      <div className="rounded-lg border bg-muted/10 m-3 shadow-sm overflow-hidden">
        <div className="bg-muted/30 px-4 py-2 border-b flex items-center justify-between">
          <h4 className="text-sm font-bold flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary" /> Task Details
          </h4>
          <span className="text-xs text-muted-foreground italic font-medium">
            Assigned to {row.original.name}
          </span>
        </div>
        
        <div className="p-4">
          <Table className="bg-background rounded-md border border-separate border-spacing-0">
            <TableHeader className="bg-muted/20">
              <TableRow>
                <TableHead className="w-[200px]">Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead className="w-[120px]">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((item: any) => (
                <TableRow key={item.id} className="hover:bg-transparent">
                  <TableCell className="font-semibold align-top py-4">
                    {item.task?.title || "No Title"}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground leading-relaxed py-4 max-w-md">
                    {item.task?.description || "No description available."}
                  </TableCell>
                  <TableCell className="align-top py-4">
                    {item.completed ? (
                      <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/10 border-green-200 shadow-none">
                        <CheckCircle2 className="mr-1 h-3 w-3" /> Done
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-orange-600 bg-orange-50 border-orange-200 shadow-none">
                        <Clock className="mr-1 h-3 w-3" /> Pending
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="align-top py-4">
                    <div className="flex items-center text-[11px] text-muted-foreground">
                      <Calendar className="mr-1 h-3 w-3" />
                      {new Date(item.createdAt).toLocaleDateString()}
                    </div>
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
      <DataTable
        columns={columns}
        data={studentData}
        isLoading={isLoading}
        searchColumn="name"
        searchPlaceholder="Filter student..."
        renderSubComponent={renderSubComponent}
        enableExpand={enableExpand}
      />
    </div>
  );
}