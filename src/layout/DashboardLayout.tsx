import { Outlet } from "react-router-dom"

import DashboardNavbar from "@/components/dashboard/DashboardNavbar"
import DashboardSidebar from "@/components/dashboard/DashboardSidebar"

export default function DashboardLayout() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-border lg:block">
        <DashboardSidebar />
      </aside>

      <div className="lg:pl-64">
        <DashboardNavbar />
        <main data-dashboard-tour="content" className="px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
