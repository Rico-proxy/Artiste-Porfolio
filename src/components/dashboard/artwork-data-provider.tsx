/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import type { ReactNode } from "react"

import { artworks as staticArtworks, type Artwork } from "@/data"
import {
  createArtwork as createRemoteArtwork,
  deleteArtwork as deleteRemoteArtwork,
  fetchDashboardArtworks,
  fetchPublicArtworks,
  updateArtwork as updateRemoteArtwork,
  type ArtworkPayload,
} from "@/lib/cloudflare-api"

const cloudflareApiUrl = import.meta.env.VITE_CLOUDFLARE_API_URL?.replace(/\/$/, "")

type ArtworkDataContextValue = {
  artworks: Artwork[]
  isLoading: boolean
  refresh: () => Promise<void>
  createArtwork: (payload: ArtworkPayload) => Promise<void>
  updateArtwork: (id: number | string, payload: Partial<ArtworkPayload>) => Promise<void>
  deleteArtwork: (id: number | string) => Promise<void>
  togglePublished: (id: number | string, published: boolean) => Promise<void>
}

const ArtworkDataContext = createContext<ArtworkDataContextValue | null>(null)

function mergeArtworkData(remote: Artwork[], hiddenSlugs: Set<string>) {
  const remoteBySlug = new Map(remote.map((artwork) => [artwork.slug, artwork]))
  const merged = staticArtworks.filter((artwork) => !hiddenSlugs.has(artwork.slug)).map((artwork) => {
    const remoteArtwork = remoteBySlug.get(artwork.slug)
    if (!remoteArtwork) return artwork

    return {
      ...artwork,
      ...remoteArtwork,
      src: remoteArtwork.src || artwork.src,
    }
  })
  const staticSlugs = new Set(staticArtworks.map((artwork) => artwork.slug))
  return [
    ...merged,
    ...remote.filter((artwork) => !staticSlugs.has(artwork.slug) && !hiddenSlugs.has(artwork.slug)),
  ]
}

function toPayload(artwork: Artwork, overrides: Partial<ArtworkPayload> = {}): ArtworkPayload {
  return {
    id: artwork.id,
    slug: artwork.slug,
    title: artwork.title,
    year: artwork.year,
    status: artwork.status,
    category: artwork.category,
    medium: artwork.medium,
    dimensions: artwork.dimensions,
    imageKey: "",
    alt: artwork.alt,
    excerpt: artwork.excerpt,
    story: artwork.story,
    process: artwork.process,
    published: true,
    ...overrides,
  }
}

export function ArtworkDataProvider({ children }: { children: ReactNode }) {
  const [remoteArtworks, setRemoteArtworks] = useState<Artwork[]>([])
  const [hiddenSlugs, setHiddenSlugs] = useState<Set<string>>(
    () => new Set(JSON.parse(localStorage.getItem("akeni-hidden-artworks") || "[]"))
  )
  const [isLoading, setIsLoading] = useState(true)

  async function refresh() {
    try {
      const hasAdminSession = Boolean(window.sessionStorage.getItem("akeni-admin-session"))
      const nextArtworks = await (hasAdminSession
        ? fetchDashboardArtworks()
        : fetchPublicArtworks())
      setRemoteArtworks(nextArtworks)
    } catch {
      setRemoteArtworks([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    queueMicrotask(() => {
      void refresh()
    })

    const handleAuthChange = () => {
      void refresh()
    }
    window.addEventListener("akeni-auth-changed", handleAuthChange)

    return () => {
      window.removeEventListener("akeni-auth-changed", handleAuthChange)
    }
  }, [])

  const value = useMemo<ArtworkDataContextValue>(
    () => ({
      artworks: cloudflareApiUrl
        ? remoteArtworks.filter((artwork) => !hiddenSlugs.has(artwork.slug))
        : mergeArtworkData(remoteArtworks, hiddenSlugs),
      isLoading,
      refresh,
      async createArtwork(payload) {
        await createRemoteArtwork(payload)
        await refresh()
      },
      async updateArtwork(id, payload) {
        const artwork = mergeArtworkData(remoteArtworks, hiddenSlugs).find((item) => item.id === id)
        if (!artwork) throw new Error("Artwork not found")

        const remoteId = remoteArtworks.some((item) => item.id === id)
        if (remoteId) {
          await updateRemoteArtwork(id, payload)
        } else {
          await createRemoteArtwork(toPayload(artwork, payload))
        }
        await refresh()
      },
      async deleteArtwork(id) {
        const artwork = mergeArtworkData(remoteArtworks, hiddenSlugs).find((item) => item.id === id)
        if (!artwork) throw new Error("Artwork not found")

        const remoteId = remoteArtworks.some((item) => item.id === id)
        if (remoteId) {
          await deleteRemoteArtwork(id)
        } else {
          await createRemoteArtwork(toPayload(artwork, { published: false }))
          setHiddenSlugs((current) => {
            const next = new Set(current).add(artwork.slug)
            localStorage.setItem("akeni-hidden-artworks", JSON.stringify([...next]))
            return next
          })
        }
        await refresh()
      },
      async togglePublished(id, published) {
        const artwork = mergeArtworkData(remoteArtworks, hiddenSlugs).find((item) => item.id === id)
        if (!artwork) throw new Error("Artwork not found")
        const remoteId = remoteArtworks.some((item) => item.id === id)
        if (remoteId) {
          await updateRemoteArtwork(id, { published })
        } else {
          await createRemoteArtwork(toPayload(artwork, { published }))
        }
        await refresh()
      },
    }),
    [hiddenSlugs, isLoading, remoteArtworks]
  )

  return <ArtworkDataContext.Provider value={value}>{children}</ArtworkDataContext.Provider>
}

export function useArtworkData() {
  const context = useContext(ArtworkDataContext)
  if (!context) throw new Error("useArtworkData must be used inside ArtworkDataProvider")
  return context
}
