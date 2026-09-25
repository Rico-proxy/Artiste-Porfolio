import { BarChart3, Images, Plus } from "lucide-react"
import { Link } from "react-router-dom"

import { useArtworkData } from "@/components/dashboard/artwork-data-provider"
import {
  ArtworkTable,
  goldButtonClass,
  StatCard,
} from "@/components/dashboard/dashboard-shared"

export default function OverviewPage() {
  const { artworks, isLoading } = useArtworkData()
  const availableCount = artworks.filter((artwork) =>
    artwork.status.toLowerCase().includes("available")
  ).length

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="head text-5xl leading-none font-medium text-foreground">
            Overview
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            Manage artwork images, text, visibility, and gallery details from one place.
          </p>
        </div>
        <Link to="/dashboard/create" className={goldButtonClass}>
          <Plus className="size-4" strokeWidth={1.8} />
          New Artwork
        </Link>
      </div>

      <div className="grid max-w-3xl gap-4 md:grid-cols-2">
        <StatCard
          label="Artworks"
          value={String(artworks.length)}
          detail="Current pieces available to the dashboard."
          icon={Images}
        />
        <StatCard
          label="Available"
          value={String(availableCount)}
          detail="Pieces marked as available for public inquiry."
          icon={BarChart3}
        />
      </div>

      <section className="border border-border bg-card/40">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Recent Artworks
            </h2>
            <p className="text-sm text-muted-foreground">
              Quick access to view, edit, or remove pieces.
            </p>
          </div>
          <Link
            to="/dashboard/artworks"
            className="text-sm font-semibold text-secondary transition-colors hover:text-foreground"
          >
            View all
          </Link>
        </div>
        {isLoading ? (
          <p className="p-5 text-sm text-muted-foreground">Loading artworks...</p>
        ) : (
          <ArtworkTable works={artworks.slice(0, 6)} />
        )}
      </section>
    </div>
  )
}
