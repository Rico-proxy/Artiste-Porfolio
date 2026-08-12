import { Outlet } from "react-router-dom"

import Navbar from "@/components/shared/navbar"

export default function BaseLayout() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
