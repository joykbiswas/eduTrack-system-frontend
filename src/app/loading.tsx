import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function GlobalLoading() {
  return (
    <div className="w-full space-y-6 p-6 animate-in fade-in duration-500">
      {/* 🚀 Header & Breadcrumb area skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-5 w-32" /> {/* Breadcrumb */}
        <Skeleton className="h-10 w-48" /> {/* Page Title */}
      </div>

      {/* 🔍 Search & Filter Bar Skeleton */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between py-4">
        <Skeleton className="h-10 w-full max-w-sm" /> {/* Search Input */}
        <div className="flex gap-2">
          <Skeleton className="h-10 w-[100px]" /> {/* Filter Button */}
          <Skeleton className="h-10 w-[100px]" /> {/* Column Button */}
        </div>
      </div>

      {/* 📊 Data Table Mockup Skeleton */}
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-12"><Skeleton className="h-4 w-4" /></TableHead>
              <TableHead><Skeleton className="h-4 w-32" /></TableHead>
              <TableHead><Skeleton className="h-4 w-48" /></TableHead>
              <TableHead><Skeleton className="h-4 w-24" /></TableHead>
              <TableHead className="text-right"><Skeleton className="h-4 w-20 ml-auto" /></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* ৮টি রো তৈরি করা হচ্ছে আসল টেবিলের শেপ দিতে */}
            {[...Array(8)].map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-5 w-5 rounded" /></TableCell>
                <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                <TableCell><Skeleton className="h-5 w-56" /></TableCell>
                <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-8 w-8 rounded-full ml-auto" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 📄 Pagination Area Skeleton */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
        <Skeleton className="h-4 w-48" /> {/* Records Count info */}
        
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-24" /> {/* Rows per page text */}
            <Skeleton className="h-8 w-[70px]" /> {/* Select box */}
          </div>
          <Skeleton className="h-4 w-20" /> {/* Page index */}
          <div className="flex items-center space-x-2">
            <Skeleton className="h-9 w-20" /> {/* Prev button */}
            <Skeleton className="h-9 w-20" /> {/* Next button */}
          </div>
        </div>
      </div>
    </div>
  );
}