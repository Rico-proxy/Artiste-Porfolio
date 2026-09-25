import { useEffect, useState } from "react"
import { LoaderCircle } from "lucide-react"
import { Outlet } from "react-router-dom"

import { useArtworkData } from "@/components/dashboard/artwork-data-provider"
import ScrollToTop from "@/components/shared/ScrollToTop"
import Navbar from "@/components/shared/navbar"

function LoadingOverlay() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsVisible(true), 240)
    return () => window.clearTimeout(timeout)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-background px-6 text-foreground">
      <div
        className="relative w-full max-w-sm border border-secondary/35 bg-card/45 px-6 py-7 shadow-2xl sm:px-8"
        role="status"
        aria-label="Loading Akeni Studio"
      >
        <div className="absolute inset-x-6 top-0 h-px overflow-hidden bg-secondary/20 sm:inset-x-8">
          <span className="loader-sweep block h-full w-1/3 bg-secondary" />
        </div>

        <div className="flex items-center justify-between gap-6">
          <div>
            <p className="head text-3xl font-semibold tracking-[0.2em]">
              AKENI<span className="text-secondary">.</span>
            </p>
            <p className="mt-2 text-[0.65rem] font-semibold tracking-[0.28em] text-secondary uppercase">
              Studio
            </p>
          </div>
          <div className="grid size-11 place-items-center border border-secondary/45 text-secondary">
            <LoaderCircle className="size-5 motion-safe:animate-spin" strokeWidth={1.5} />
          </div>
        </div>

        <div className="mt-7 h-px w-full overflow-hidden bg-foreground/15">
          <span className="loader-sweep block h-full w-1/2 bg-secondary" />
        </div>
        <p className="mt-3 text-[0.65rem] tracking-[0.18em] text-muted-foreground uppercase">
          Preparing the studio
        </p>
      </div>
    </div>
  )
}

export default function BaseLayout() {
  const { isLoading } = useArtworkData()

  return (
    <div className="min-h-svh bg-background text-foreground">
      <ScrollToTop />
      <Navbar />
      <main aria-busy={isLoading}>
        <Outlet />
      </main>
      {isLoading ? <LoadingOverlay /> : null}
    </div>
  )
}
