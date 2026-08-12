import { Outlet } from "react-router-dom"

import ScrollToTop from "@/components/shared/ScrollToTop"
import Navbar from "@/components/shared/navbar"

export default function BaseLayout() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
