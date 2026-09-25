import ArtworkForm from "@/pages/Dashboard/ArtworkForm"
import { PageBack } from "@/components/dashboard/dashboard-shared"

export default function CreateArtworkPage() {
  return (
    <div className="space-y-6">
      <PageBack to="/dashboard/artworks" label="Back to artworks" />
      <div>
        <h1 className="head text-5xl leading-none font-medium text-foreground">
          Create Artwork
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Upload an image and save its details to the Cloudflare-backed gallery.
        </p>
      </div>
      <ArtworkForm />
    </div>
  )
}
