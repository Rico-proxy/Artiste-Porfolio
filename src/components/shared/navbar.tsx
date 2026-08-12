import { Menu } from "lucide-react"
import { useState } from "react"
import { Link, NavLink } from "react-router-dom"

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
    <header className="border-b border-white/5 bg-black">
      <div className="mx-5">
        <nav className="mx-auto flex h-20 w-full items-center justify-between px-4 md:h-[90px] md:px-8 xl:px-14">
          <Link
            to="/"
            className="head text-2xl font-semibold uppercase tracking-[0.42em] text-foreground md:text-3xl"
            aria-label="Akeni home"
          >
            AKENI<span className="text-secondary">.</span>
          </Link>

          <div className="hidden items-center gap-5 xl:flex 2xl:gap-8">
            {mainNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  [
                    "relative py-2 text-sm font-medium transition-colors",
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
                  "border px-5 py-3 text-sm font-medium transition-colors",
                  isActive
                    ? "border-secondary text-secondary"
                    : "border-secondary/70 text-foreground hover:border-secondary hover:text-secondary",
                ].join(" ")
              }
            >
              {contactNavItem.label}
            </NavLink>
          </div>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger
              aria-label="Open navigation menu"
              className="grid size-11 place-items-center border border-secondary/70 text-secondary transition-colors hover:border-secondary hover:text-foreground xl:hidden"
            >
              <Menu className="size-6" strokeWidth={1.7} />
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col">
              <SheetHeader className="pr-10">
                <SheetTitle>
                  AKENI<span className="text-secondary">.</span>
                </SheetTitle>
                <SheetDescription>
                  Prince Akeni Prosper studio navigation.
                </SheetDescription>
              </SheetHeader>

              <div className="mt-12 flex flex-col gap-1">
                {[...mainNavItems, contactNavItem].map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      [
                        "block border-b border-white/10 py-4 text-lg font-medium transition-colors",
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
        </nav>
      </div>
    </header>
  )
}
