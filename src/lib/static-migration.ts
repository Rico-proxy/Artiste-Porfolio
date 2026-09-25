import { artworks as staticArtworks, type Artwork } from "@/data"
import { defaultSiteContent } from "@/components/site-content-provider"
import { getAdminSession } from "@/lib/admin-auth"
import {
  createArtwork,
  fetchDashboardArtworks,
  saveSiteContent,
  updateArtwork,
  type ArtworkPayload,
} from "@/lib/cloudflare-api"
import { uploadImageToR2 } from "@/lib/r2-upload"

export type MigrationProgress = {
  completed: number
  total: number
  current: string
  uploaded: number
  saved: number
}

type MigrationOptions = {
  onProgress?: (progress: MigrationProgress) => void
}

function toPayload(artwork: Artwork, imageKey: string): ArtworkPayload {
  return {
    id: artwork.id,
    slug: artwork.slug,
    title: artwork.title,
    year: artwork.year,
    status: artwork.status,
    category: artwork.category,
    medium: artwork.medium,
    dimensions: artwork.dimensions,
    imageKey,
    alt: artwork.alt,
    excerpt: artwork.excerpt,
    story: artwork.story,
    process: artwork.process,
    published: artwork.published !== false,
  }
}

async function fetchImageFile(artwork: Artwork) {
  const response = await fetch(artwork.src)
  if (!response.ok) {
    throw new Error(`Could not read the image for ${artwork.title}.`)
  }

  const blob = await response.blob()
  const extension = artwork.src.split(".").pop()?.split("?")[0] || "jpg"
  return new File([blob], `${artwork.slug}.${extension}`, {
    type: blob.type || "image/jpeg",
  })
}

export async function migrateStaticContent({ onProgress }: MigrationOptions = {}) {
  if (!getAdminSession()) {
    throw new Error("Sign in to the dashboard before importing the existing content.")
  }

  const apiUrl = import.meta.env.VITE_CLOUDFLARE_API_URL?.replace(/\/$/, "")
  if (!apiUrl) throw new Error("Cloudflare API URL is not configured.")

  const existing = await fetchDashboardArtworks()
  const existingBySlug = new Map(existing.map((artwork) => [artwork.slug, artwork]))
  let uploaded = 0
  let saved = 0

  for (const [index, artwork] of staticArtworks.entries()) {
    const current = existingBySlug.get(artwork.slug)
    let imageKey = current?.imageKey || ""

    onProgress?.({
      completed: index,
      total: staticArtworks.length,
      current: artwork.title,
      uploaded,
      saved,
    })

    if (!imageKey) {
      imageKey = (await uploadImageToR2(await fetchImageFile(artwork))).key
      uploaded += 1
    }

    const payload = toPayload(artwork, imageKey)
    if (current) {
      await updateArtwork(current.id, payload)
    } else {
      await createArtwork(payload)
    }
    saved += 1
  }

  onProgress?.({
    completed: staticArtworks.length,
    total: staticArtworks.length,
    current: "Saving site text",
    uploaded,
    saved,
  })

  const contentResponse = await fetch(`${apiUrl}/api/site-content`)
  if (contentResponse.status === 404) {
    await saveSiteContent(defaultSiteContent)
  }

  return { uploaded, saved }
}
