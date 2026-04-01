import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Loading() {
  return (
    <div className="w-full space-y-4 p-6">
      {/* 🔍 Top Bar Skeleton (Search & Column Toggle) */}
      <div className="flex items-center justify-between py-4">
        <Skeleton className="h-10 w-full max-w-sm" />
        <Skeleton className="h-10 w-25 ml-auto" />
      </div>

      {/* 📊 Table Skeleton */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {/* টেবিল হেডার কলামগুলো (সাধারণত ৪-৫টি থাকে) */}
              <TableHead><Skeleton className="h-6 w-8" /></TableHead>
              <TableHead><Skeleton className="h-6 w-32" /></TableHead>
              <TableHead><Skeleton className="h-6 w-40" /></TableHead>
              <TableHead><Skeleton className="h-6 w-24" /></TableHead>
              <TableHead className="text-right"><Skeleton className="h-6 w-20 ml-auto" /></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* ৫ থেকে ৮টি রো জেনারেট করা হচ্ছে */}
            {[...Array(8)].map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-5 w-5 rounded-sm" /></TableCell>
                <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-8 w-8 rounded-full ml-auto" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 📄 Pagination Skeleton */}
      <div className="flex items-center justify-between py-4">
        {/* Selected rows info */}
        <Skeleton className="h-4 w-40" />
        
        <div className="flex items-center space-x-6 lg:space-x-8">
          {/* Rows per page */}
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-[70px]" />
          </div>
          {/* Page info */}
          <Skeleton className="h-4 w-20" />
          {/* Next/Prev buttons */}
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      </div>
    </div>
  );
}