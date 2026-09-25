import { Lightbulb, Menu } from "lucide-react"
import { useTour } from "@reactour/tour"
import { useState } from "react"

import DashboardSidebar from "@/components/dashboard/DashboardSidebar"
import ThemeToggle from "@/components/shared/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function DashboardNavbar() {
  const { currentStep, isOpen: isTourOpen, setCurrentStep, setIsOpen } = useTour()
  const [manualMobileNavOpen, setManualMobileNavOpen] = useState(false)
  const isMobile = window.matchMedia("(max-width: 1023px)").matches
  const isSidebarTourStep = currentStep >= 1 && currentStep <= 5
  const mobileNavOpen =
    isMobile && isTourOpen ? isSidebarTourStep : manualMobileNavOpen

  return (
    <header
      data-dashboard-tour="navbar"
      className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur"
    >
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
            <Sheet open={mobileNavOpen} onOpenChange={setManualMobileNavOpen}>
              <SheetTrigger
                aria-label="Open dashboard sidebar"
                className="grid size-12 place-items-center border border-border text-foreground transition-colors hover:border-secondary hover:text-secondary lg:hidden"
              >
              <Menu className="size-6" strokeWidth={1.8} />
            </SheetTrigger>
            <SheetContent
              side="left"
              showCloseButton={false}
              className="w-72 max-w-[calc(100vw-1rem)] p-0"
            >
              <SheetHeader className="sr-only">
                <SheetTitle>Dashboard Navigation</SheetTitle>
                <SheetDescription>
                  Navigate between dashboard sections.
                </SheetDescription>
              </SheetHeader>
              <DashboardSidebar onNavigate={() => setManualMobileNavOpen(false)} />
            </SheetContent>
          </Sheet>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold tracking-[0.18em] text-secondary uppercase">
              Dashboard
            </p>
            <p className="text-sm text-muted-foreground">
              Manage artworks, text, images, and publishing.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Replay dashboard tour"
            title="Replay dashboard tour"
            data-dashboard-tour="tour-replay"
            className="grid size-9 place-items-center border border-border text-muted-foreground transition-colors hover:border-secondary hover:text-secondary"
            onClick={() => {
              setCurrentStep(0)
              setIsOpen(true)
            }}
          >
            <Lightbulb className="size-4" strokeWidth={1.8} />
          </button>
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-foreground">Hi, Admin</p>
            <p className="text-xs text-muted-foreground">Prince Akeni Studio</p>
          </div>
          <Avatar size="lg">
            <AvatarImage src="/image.png" alt="Admin profile" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
