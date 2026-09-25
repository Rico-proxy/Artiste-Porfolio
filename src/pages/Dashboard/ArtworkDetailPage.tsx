import { Pencil, Save } from "lucide-react"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { useArtworkData } from "@/components/dashboard/artwork-data-provider"
import ArtworkForm from "@/pages/Dashboard/ArtworkForm"
import {
  DeleteArtworkButton,
  goldButtonClass,
  PageBack,
} from "@/components/dashboard/dashboard-shared"

export default function ArtworkDetailPage({ mode }: { mode: "view" | "edit" }) {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { artworks } = useArtworkData()
  const artwork = artworks.find((item) => item.slug === slug)

  if (!artwork) {
    return <Navigate to="/dashboard/artworks" replace />
  }

  const isEdit = mode === "edit"

  return (
    <div className="space-y-6">
      <PageBack to="/dashboard/artworks" label="Back to artworks" />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="head text-5xl leading-none font-medium text-foreground">
            {isEdit ? "Edit Artwork" : "View Artwork"}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {artwork.title}, {artwork.year}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {isEdit ? (
            <Button type="submit" form="artwork-form" className="bg-secondary text-secondary-foreground hover:bg-secondary/85">
              <Save className="size-4" strokeWidth={1.8} />
              Save
            </Button>
          ) : (
            <Link
              to={`/dashboard/artworks/${artwork.slug}/edit`}
              className={goldButtonClass}
            >
              <Pencil className="size-4" strokeWidth={1.8} />
              Edit
            </Link>
          )}
          <DeleteArtworkButton artwork={artwork} onDeleted={() => navigate("/dashboard/artworks")} />
        </div>
      </div>
      <ArtworkForm artwork={artwork} />
    </div>
  )
}
