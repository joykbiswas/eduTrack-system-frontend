// components/classes/classes-data-table.tsx

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
    
    ChevronDown,
    ChevronRight,
    Users,
    BookOpen,
    Calendar,
    Mail,
    Phone,
} from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import Link from "next/link";
// import { getAllClasses, deleteClass } from "@/app/(dashboard)/classes/_actions";
import { IClass, ITeacher } from "@/types/class.types";
import { DeleteDialog } from "./delete-dialog";
import { format } from "date-fns";
import { deleteClass, getAllClasses } from "@/app/(dashboardLayout)/admin/dashboard/class-create/_actions";

export function ClassesDataTable() {
    const queryClient = useQueryClient();

    // Fetch classes data
    const { data: response, isLoading } = useQuery({
        queryKey: ["classes"],
        queryFn: () => getAllClasses(),
    });

    const data = response?.data || [];

    // Check if any class has expandable details (students, tasks, messages)
    const enableExpand = data.some(
        (classItem) => 
            (classItem.students?.length ?? 0) > 0 || 
            (classItem.tasks?.length ?? 0) > 0 ||
            (classItem.messages?.length ?? 0) > 0
    );

    // Table columns
    const columns: ColumnDef<IClass>[] = [
        {
            id: "expand",
            header: "",
            cell: ({ row }) => {
                const hasDetails =
                    (row.original.students?.length ?? 0) > 0 ||
                    (row.original.tasks?.length ?? 0) > 0 ||
                    (row.original.messages?.length ?? 0) > 0;

                if (!hasDetails) return null;

                return (
                    <button onClick={row.getToggleExpandedHandler()} className="p-1">
                        {row.getIsExpanded() ? (
                            <ChevronDown className="h-4 w-4" />
                        ) : (
                            <ChevronRight className="h-4 w-4" />
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
                >
                    Class Name <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="font-medium">{row.original.name}</div>
            ),
        },
        {
            accessorKey: "classNumber",
            header: "Class No",
            cell: ({ row }) => (
                <div className="text-sm">{row.original.classNumber}</div>
            ),
        },
        {
            accessorKey: "sectionCode",
            header: "Section",
            cell: ({ row }) => (
                <Badge variant="outline">Section {row.original.sectionCode}</Badge>
            ),
        },
        {
            id: "organization",
            header: "Organization",
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className="text-sm font-medium">{row.original.organization?.name}</span>
                    <span className="text-xs text-muted-foreground">{row.original.organization?.description}</span>
                </div>
            ),
        },
        {
            id: "teacher",
            header: "Class Teacher",
            cell: ({ row }) => {
                const teacher = row.original.teacher as ITeacher;
                return (
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">{teacher?.name}</span>
                        <span className="text-xs text-muted-foreground">{teacher?.subject}</span>
                    </div>
                );
            },
        },
        {
            accessorKey: "academicYear",
            header: "Academic Year",
            cell: ({ row }) => (
                <Badge variant="secondary">{row.original.academicYear}</Badge>
            ),
        },
        {
            id: "students",
            header: "Students",
            cell: ({ row }) => (
                <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{row.original.students?.length || 0}</span>
                </div>
            ),
        },
        {
            id: "tasks",
            header: "Tasks",
            cell: ({ row }) => (
                <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{row.original.tasks?.length || 0}</span>
                </div>
            ),
        },
        {
            accessorKey: "createdAt",
            header: "Created",
            cell: ({ row }) => (
                <span className="text-sm text-muted-foreground">
                    {format(new Date(row.original.createdAt), "MMM dd, yyyy")}
                </span>
            ),
        },
        {
            id: "actions",
            cell: ({ row }) => (
                <div className="flex gap-2">

                    <DeleteDialog
                        id={row.original.id}
                        name={row.original.name}
                        deleteFn={async (id) => {
                            await deleteClass(id);
                        }}
                        onDelete={() => {
                            // Invalidate and refetch classes list
                            queryClient.invalidateQueries({ queryKey: ["classes"] });
                            toast.success("Class deleted successfully!");
                        }}
                    />
                </div>
            ),
        },
    ];

    // Expanded row renderer - shows detailed information about students, tasks, and messages
    const renderSubComponent = (row: any) => {
        const classItem = row.original as IClass;
        const students = classItem.students || [];
        const tasks = classItem.tasks || [];
        const messages = classItem.messages || [];
        const hasStudents = students.length > 0;
        const hasTasks = tasks.length > 0;
        const hasMessages = messages.length > 0;

        if (!hasStudents && !hasTasks && !hasMessages) return null;

        return (
            <div className="rounded-lg border bg-muted/30 shadow-sm overflow-hidden">
                {/* Header */}
                <div className="border-b bg-muted/50 px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="text-lg font-semibold">Class Details</h4>
                            <p className="text-sm text-muted-foreground">
                                {classItem.name} - {classItem.academicYear}
                            </p>
                        </div>
                        <Badge variant="outline" className="text-sm">
                            Section {classItem.sectionCode}
                        </Badge>
                    </div>
                </div>

                {/* Class Information */}
                <div className="grid grid-cols-2 gap-4 p-4 border-b bg-white">
                    <div>
                        <label className="text-xs font-medium text-muted-foreground uppercase">Description</label>
                        <p className="text-sm mt-1">{classItem.description || "No description provided"}</p>
                    </div>
                    <div>
                        <label className="text-xs font-medium text-muted-foreground uppercase">Class Teacher</label>
                        <div className="mt-1">
                            <p className="text-sm font-medium">{classItem.teacher?.name}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                <Mail className="h-3 w-3" />
                                <span>{classItem.teacher?.email}</span>
                                <Phone className="h-3 w-3 ml-2" />
                                <span>{classItem.teacher?.contactNumber}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Students Section */}
                {hasStudents && (
                    <div className="border-b">
                        <div className="bg-slate-50 px-4 py-2 border-b">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-semibold flex items-center gap-2">
                                        <Users className="h-4 w-4" />
                                        Students
                                    </h4>
                                    <p className="text-xs text-muted-foreground">
                                        {students.length} student(s) enrolled in this class
                                    </p>
                                </div>
                                <Badge variant="secondary">{students.length}</Badge>
                            </div>
                        </div>
                        <div className="overflow-x-auto px-4 py-4">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Roll Number</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {students.map((student: any) => (
                                        <TableRow key={student.id}>
                                            <TableCell className="font-medium">{student.name}</TableCell>
                                            <TableCell>{student.email}</TableCell>
                                            <TableCell>{student.rollNumber || "—"}</TableCell>
                                            <TableCell>
                                                <Badge variant={student.status === "ACTIVE" ? "default" : "secondary"}>
                                                    {student.status || "ACTIVE"}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                )}

                {/* Tasks Section */}
                {hasTasks && (
                    <div className="border-b">
                        <div className="bg-slate-50 px-4 py-2 border-b">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-semibold flex items-center gap-2">
                                        <BookOpen className="h-4 w-4" />
                                        Tasks & Assignments
                                    </h4>
                                    <p className="text-xs text-muted-foreground">
                                        {tasks.length} task(s) assigned to this class
                                    </p>
                                </div>
                                <Badge variant="secondary">{tasks.length}</Badge>
                            </div>
                        </div>
                        <div className="space-y-3 px-4 py-4">
                            {tasks.map((task: any) => (
                                <div key={task.id} className="rounded-lg border p-3 bg-white">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h5 className="font-medium">{task.title}</h5>
                                            <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                                        </div>
                                        <Badge variant={task.status === "COMPLETED" ? "default" : "outline"}>
                                            {task.status || "PENDING"}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            Due: {task.dueDate ? format(new Date(task.dueDate), "MMM dd, yyyy") : "No due date"}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Messages Section */}
                {hasMessages && (
                    <div>
                        <div className="bg-slate-50 px-4 py-2 border-b">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-semibold">Recent Messages</h4>
                                    <p className="text-xs text-muted-foreground">
                                        {messages.length} message(s) in this class
                                    </p>
                                </div>
                                <Badge variant="secondary">{messages.length}</Badge>
                            </div>
                        </div>
                        <div className="space-y-3 px-4 py-4">
                            {messages.slice(0, 5).map((message: any) => (
                                <div key={message.id} className="rounded-lg border p-3 bg-white">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">{message.sender?.name || "System"}</span>
                                                <span className="text-xs text-muted-foreground">
                                                    {format(new Date(message.createdAt), "MMM dd, yyyy HH:mm")}
                                                </span>
                                            </div>
                                            <p className="text-sm mt-1">{message.content}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {messages.length > 5 && (
                                <div className="text-center text-sm text-muted-foreground">
                                    And {messages.length - 5} more messages...
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold">Classes</h2>
                    <p className="text-muted-foreground">Manage all classes and their details</p>
                </div>

                <Link href="/dashboard/classes/create">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Class
                    </Button>
                </Link>
            </div>

            <DataTable
                columns={columns}
                data={data}
                isLoading={isLoading}
                searchColumn="name"
                searchPlaceholder="Search classes..."
                renderSubComponent={renderSubComponent}
                enableExpand={enableExpand}
            />
        </div>
    );
}