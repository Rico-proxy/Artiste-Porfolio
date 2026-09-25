import { useEffect, useState, type ReactNode } from "react"
import { Navigate, useLocation } from "react-router-dom"

import { hasValidAdminSession } from "@/lib/admin-auth"

export default function DashboardAuthGuard({ children }: { children: ReactNode }) {
  const location = useLocation()
  const [status, setStatus] = useState<"checking" | "allowed" | "denied">("checking")

  useEffect(() => {
    let cancelled = false
    hasValidAdminSession().then((valid) => {
      if (!cancelled) setStatus(valid ? "allowed" : "denied")
    })
    return () => {
      cancelled = true
    }
  }, [])

  if (status === "checking") {
    return <main className="grid min-h-svh place-items-center bg-background px-6 text-muted-foreground">Checking dashboard access...</main>
  }

  if (status === "denied") {
    return <Navigate to="/dashboard/login" replace state={{ from: location.pathname }} />
  }

  return children
}

