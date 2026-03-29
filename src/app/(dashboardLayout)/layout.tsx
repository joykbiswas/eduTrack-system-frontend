import DashboardNavbar from "@/components/modules/Dashboord/DashboardNavbar"
import DashboardSidebar from "@/components/modules/Dashboord/DashboardSidebar"
import React from "react"

const RootDashboardLayout = async ({children, commonLayout, dashboardLayout} : {children: React.ReactNode, commonLayout?: React.ReactNode, dashboardLayout?: React.ReactNode}) => {
  return (
    <div className="flex h-screen overflow-hidden">
        {/* Dashboard Sidebar */}
        <DashboardSidebar />

        <div className="flex flex-1 flex-col overflow-hidden">
            {/* Dashboard Navbar */}
            <DashboardNavbar />
            {/* Dashboard Content */}
            <main className="flex-1 overflow-y-auto bg-muted/10 p-4 md:p-6">
                <div>
                    {commonLayout}
                    {dashboardLayout}
                    {children}
                </div>
            </main>
        </div>
    </div>
  )
}

export default RootDashboardLayout