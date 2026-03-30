/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpDown,
  Plus,
  Pencil,
  ChevronDown,
  ChevronRight,
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
import {
  getAllOrganizations,
  deleteOrganization,
} from "@/services/admin.services";
import { DeleteDialog } from "./delete-dialog";
import { IClass, IOrganization } from "@/types/organization.types";

interface Props {
  organizations: IOrganization[];
}

export function OrganizationDataTable({ organizations }: Props) {
  const pathname = usePathname();
  const [data, setData] = useState(organizations);
  const enableExpand = data.some(
    (org) => (org.classes?.length ?? 0) > 0 || (org.lookups?.length ?? 0) > 0
  );
  console.log("==Data ==: ", data);
  const [isLoading, setIsLoading] = useState(false);

  // 🔄 Refresh
  const refreshData = async () => {
    setIsLoading(true);
    try {
      const res = await getAllOrganizations();
      setData(res.data || []);
    } catch {
      toast.error("Failed to load organizations");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, [pathname]);

  // 🧱 Columns
  const columns: ColumnDef<IOrganization>[] = [
    // Expand
    {
      id: "expand",
      header: "",
      cell: ({ row }) => {
        const hasDetails =
          (row.original.classes?.length ?? 0) > 0 ||
          (row.original.lookups?.length ?? 0) > 0;

        if (!hasDetails) {
          return null;
        }

        return (
          <button onClick={row.getToggleExpandedHandler()}>
            {row.getIsExpanded() ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        );
      },
    },

    // Name
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Name <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="font-medium">{row.original.name}</div>
      ),
    },

    // Parent
    {
      id: "parent",
      header: "Parent",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {row.original.parent?.name || "—"}
        </span>
      ),
    },

    // Description
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="max-w-62.5 truncate">
          {row.original.description}
        </div>
      ),
    },

    // Classes Count
    {
      id: "classes",
      header: "Classes",
      cell: ({ row }) => (
        <Badge variant="secondary">
          {row.original.classes?.length || 0}
        </Badge>
      ),
    },

    // Created
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {new Date(row.original.createdAt).toLocaleDateString()}
        </span>
      ),
    },

    // Actions
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          {/* Edit */}
          <Link
            href={`/admin/dashboard/organization-edit/${row.original.id}`}
          >
            <Button size="sm" variant="ghost">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>

          {/* Delete */}
          <DeleteDialog
            id={row.original.id}
            name={row.original.name}
            deleteFn={async (id) => {
              await deleteOrganization(id);
              toast.success("Deleted successfully");
              refreshData();
            }}
            onDelete={() =>
              setData((prev) =>
                prev.filter((org) => org.id !== row.original.id)
              )
            }
          />
        </div>
      ),
    },
  ];

  // 🎯 Expanded Row Renderer
  const renderSubComponent = (row: any) => {
    const classes = row.original.classes;
    const lookups = row.original.lookups;
    const hasClasses = classes?.length > 0;
    const hasLookups = lookups?.length > 0;

    if (!hasClasses && !hasLookups) {
      return null;
    }

    return (
      <div className="rounded-lg border bg-muted shadow-sm">
        {hasClasses && (
          <div className="border-b bg-slate-50 px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h4 className="text-lg font-semibold">Classes</h4>
                <p className="text-sm text-muted-foreground">
                  {classes.length} class(es) linked to this organization.
                </p>
              </div>
              <Badge variant="secondary">{classes.length}</Badge>
            </div>
          </div>
        )}

        <div className="overflow-x-auto px-4 py-4">
          {hasClasses ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Class Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Academic Year</TableHead>
                  <TableHead>Section</TableHead>
                  {/* <TableHead>Class No.</TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {classes.map((cls: IClass) => (
                  <TableRow key={cls.id}>
                    <TableCell>{cls.name}</TableCell>
                    <TableCell>{cls.description}</TableCell>
                    <TableCell>{cls.academicYear}</TableCell>
                    <TableCell>{cls.sectionCode}</TableCell>
                    {/* <TableCell>{cls.classNumber}</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="rounded-md border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-muted-foreground">
              No class data available for this organization.
            </div>
          )}
        </div>

        {hasLookups && (
          <div className="border-t px-4 py-4">
            <h4 className="text-lg font-semibold mb-3">Lookups</h4>
            <div className="space-y-2">
              {lookups.map((lookup: any, index: number) => (
                <div
                  key={lookup.id ?? index}
                  className="rounded-md border border-slate-200 bg-white p-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium">
                      {lookup.name || lookup.type || `Lookup ${index + 1}`}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {lookup.id ? lookup.id.slice(0, 8) : `#${index + 1}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Organizations</h2>
          <p className="text-muted-foreground">
            Manage all organizations
          </p>
        </div>

        <Link href="/admin/dashboard/organization-create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Organization
          </Button>
        </Link>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        searchColumn="name"
        searchPlaceholder="Search organizations..."
        renderSubComponent={renderSubComponent}
        enableExpand={enableExpand}
      />
    </div>
  );
}