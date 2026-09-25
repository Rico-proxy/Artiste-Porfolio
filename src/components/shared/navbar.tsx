import { Menu } from "lucide-react"
import { useState } from "react"
import { Link, NavLink } from "react-router-dom"

import ThemeToggle from "@/components/shared/theme-toggle"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const mainNavItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Artworks", to: "/artworks" },
  { label: "Projects", to: "/projects" },
  { label: "Kulukism", to: "/kulukism" },
  { label: "UAL Studios", to: "/ual-studios" },
  { label: "Exhibitions", to: "/exhibitions" },
  { label: "Press", to: "/press" },
]

const contactNavItem = { label: "Contact", to: "/contact" }

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="relative z-50 border-b border-border bg-background">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
        <nav className="flex h-20 w-full items-center justify-between md:h-[88px]">
          <Link
            to="/"
            className="head text-2xl font-bold uppercase tracking-[0.28em] text-foreground md:text-3xl"
            aria-label="Akeni home"
          >
            AKENI<span className="text-secondary">.</span>
          </Link>

          <div className="hidden items-center gap-6 lg:flex xl:gap-7">
            {mainNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  [
                    "relative py-2 text-sm font-medium tracking-wide transition-colors",
                    isActive
                      ? "text-secondary"
                      : "text-muted-foreground hover:text-foreground",
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive ? (
                      <span className="absolute bottom-0 left-0 h-px w-full bg-secondary" />
                    ) : null}
                  </>
                )}
              </NavLink>
            ))}

            <NavLink
              to={contactNavItem.to}
              className={({ isActive }) =>
                [
                  "rounded-full border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] transition-all",
                  isActive
                    ? "border-secondary bg-secondary text-secondary-foreground"
                    : "border-secondary/60 text-foreground hover:border-secondary hover:bg-secondary hover:text-secondary-foreground",
                ].join(" ")
              }
            >
              {contactNavItem.label}
            </NavLink>
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <ThemeToggle />

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger
                aria-label="Open navigation menu"
                className="grid size-11 place-items-center rounded-full bg-foreground/5 text-foreground transition-colors hover:bg-foreground/10 hover:text-secondary"
              >
                <Menu className="size-6" strokeWidth={1.7} />
              </SheetTrigger>
              <SheetContent side="right" className="flex flex-col overflow-hidden">
                <SheetHeader className="pr-10">
                  <SheetTitle>
                    AKENI<span className="text-secondary">.</span>
                  </SheetTitle>
                  <SheetDescription>
                    Prince Akeni Prosper studio navigation.
                  </SheetDescription>
                </SheetHeader>

                <div className="mt-12 min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-contain pr-1 pb-8">
                  {[...mainNavItems, contactNavItem].map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.to === "/"}
                      className={({ isActive }) =>
                        [
                          "block border-b border-border py-4 text-lg font-medium transition-colors",
                          isActive
                            ? "text-secondary"
                            : "text-muted-foreground hover:text-foreground",
                        ].join(" ")
                      }
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  )
}
