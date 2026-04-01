/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import {
  Plus,
  ArrowUpDown,
  FileText,
  Video,
  Music,
  Image as ImageIcon,
  ChevronDown,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { DeleteDialog } from "../admin/delete-dialog";
import {
  fetchAllMaterialsAction,
  deleteMaterialAction,
} from "@/app/(dashboardLayout)/teacher/dashboard/material-create/_actions";
import Image from "next/image";

export function MaterialDataTable() {
  const queryClient = useQueryClient();

  const { data: response, isLoading } = useQuery({
    queryKey: ["materials"],
    queryFn: () => fetchAllMaterialsAction(),
  });

  const materialsData = response?.data || [];

  const columns: ColumnDef<any>[] = [
    {
      id: "expand",
      header: "",
      cell: ({ row }) => {
        // Expand if there is content or a specific material type
        const hasContent = !!row.original.content;
        if (!hasContent) return <div className="w-4" />;

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
        <Badge variant="outline" className="bg-slate-50">
          {row.original.card?.title || "No Card"}
        </Badge>
      ),
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent"
        >
          Title <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="font-medium">{row.original.title}</div>,
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
            {type === "IMAGE" && <ImageIcon className="h-4 w-4 text-green-500" />}
            <span className="text-xs font-semibold">{type || "N/A"}</span>
          </div>
        );
      },
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
// Render SubComponent to show the Material Content
  const renderSubComponent = (row: any) => {
    const { content, type, title } = row.original;

    return (
      <div className="rounded-lg border bg-muted/5 m-3 shadow-sm overflow-hidden">
        <div className="bg-muted/20 px-4 py-2 border-b flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-primary" />
          <h4 className="text-sm font-bold">Material Preview: {title}</h4>
        </div>
        
        <div className="p-4">
          {type === "TEXT" ? (
            /* 1. 'whitespace-normal' ensures text breaks into new lines.
               2. 'break-words' prevents long words/links from causing a scrollbar.
               3. 'max-w-2xl' or 'max-w-prose' keeps the text at a readable width.
            */
            <div className="prose prose-sm max-w-3xl text-muted-foreground leading-relaxed whitespace-normal break-words">
              {content}
            </div>
          ) : type === "IMAGE" ? (
            <div className="flex flex-col gap-2">
              <p className="text-xs text-muted-foreground mb-2 break-all">Image URL: {content}</p>
              <Image 
                src={content} 
                alt={title} 
                className="max-h-60 w-auto rounded-md object-contain border bg-white" 
              />
            </div>
          ) : (
            <div className="flex items-center gap-2 p-4 border rounded-md bg-background overflow-hidden">
              {type === "VIDEO" ? <Video className="flex-shrink-0 text-red-500" /> : <Music className="flex-shrink-0 text-purple-500" />}
              <span className="text-sm font-medium flex-shrink-0">Link: </span>
              <a 
                href={content} 
                target="_blank" 
                rel="noreferrer" 
                className="text-sm text-blue-600 hover:underline break-all"
              >
                {content}
              </a>
            </div>
          )}
        </div>
      </div>
    );
  };

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
        enableExpand={true}
        renderSubComponent={renderSubComponent}
        rowCanExpand={(row) => !!row.original.content}
      />
    </div>
  );
}