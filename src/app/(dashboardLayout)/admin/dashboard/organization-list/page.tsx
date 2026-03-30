// app/admin/dashboard/organization-list/page.tsx
import { Suspense } from "react";
import { getAllOrganizations } from "@/services/admin.services";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { OrganizationDataTable } from "@/components/admin/organization-data-table";

async function getOrganizationsData() {
  try {
    const response = await getAllOrganizations();
    const organizations = response?.data || [];
    console.log("Organizations :", organizations);
    return organizations;
  } catch (error) {
    console.error("Failed to fetch organizations:", error);
    return [];
  }
}

export default async function OrganizationListPage() {
  const organizations = await getOrganizationsData();

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Suspense fallback={<OrganizationListSkeleton />}>
        <OrganizationDataTable organizations={organizations} />
      </Suspense>
    </div>
  );
}

function OrganizationListSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </CardContent>
    </Card>
  );
}