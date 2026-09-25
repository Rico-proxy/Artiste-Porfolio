import {
  FileText,
  Home,
  Images,
  LayoutDashboard,
  LogOut,
  Plus,
} from "lucide-react"
import { Link, NavLink, useNavigate } from "react-router-dom"

import { logoutAdmin } from "@/lib/admin-auth"

const navItems = [
  { label: "Overview", to: "/dashboard", icon: LayoutDashboard, end: true },
  { label: "Homepage", to: "/dashboard/homepage", icon: Home },
  { label: "Artworks", to: "/dashboard/artworks", icon: Images },
  { label: "Create", to: "/dashboard/create", icon: Plus },
  { label: "Site Text", to: "/dashboard/content", icon: FileText },
]

export default function DashboardSidebar({
  onNavigate,
}: {
  onNavigate?: () => void
}) {
  const navigate = useNavigate()

  function handleLogout() {
    onNavigate?.()
    logoutAdmin()
    navigate("/dashboard/login", { replace: true })
  }

  return (
    <div className="flex h-full flex-col bg-[#111113] text-[#f7f3ea]">
      <div className="border-b border-white/10 px-6 py-6">
        <Link
          to="/dashboard"
          className="head text-2xl font-bold tracking-[0.28em] uppercase"
          onClick={onNavigate}
        >
          AKENI<span className="text-secondary">.</span>
        </Link>
        <p className="mt-2 text-xs tracking-[0.18em] text-white/45 uppercase">
          Studio Admin
        </p>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-5">
        {navItems.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              data-dashboard-tour={item.label.toLowerCase().replaceAll(" ", "-")}
              onClick={onNavigate}
              className={({ isActive }) =>
                [
                  "flex h-11 items-center gap-3 px-3 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-secondary text-secondary-foreground"
                    : "text-white/68 hover:bg-white/5 hover:text-white",
                ].join(" ")
              }
            >
              <Icon className="size-4" strokeWidth={1.8} />
              {item.label}
            </NavLink>
          )
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        <Link
          to="/"
          className="flex h-10 items-center gap-3 px-3 text-sm text-white/60 transition-colors hover:text-secondary"
          onClick={onNavigate}
        >
          <Home className="size-4" strokeWidth={1.8} />
          Public Site
        </Link>
        <button
          type="button"
          className="mt-1 flex h-10 w-full items-center gap-3 px-3 text-sm text-white/60 transition-colors hover:text-secondary"
          onClick={handleLogout}
        >
          <LogOut className="size-4" strokeWidth={1.8} />
          Sign out
        </button>
      </div>
    </div>
  )
}
