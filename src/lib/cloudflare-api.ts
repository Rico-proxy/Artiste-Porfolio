import { getAdminSession } from "@/lib/admin-auth"
import type { Artwork } from "@/data"

const apiUrl = import.meta.env.VITE_CLOUDFLARE_API_URL?.replace(/\/$/, "")

function getApiUrl() {
  if (!apiUrl) throw new Error("Cloudflare API URL is not configured")
  return apiUrl
}

async function request<T>(path: string, options: RequestInit = {}) {
  const headers = new Headers(options.headers)
  const token = getAdminSession()
  if (token) headers.set("Authorization", `Bearer ${token}`)
  if (options.body && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json")
  }

  const response = await fetch(`${getApiUrl()}${path}`, { ...options, headers })
  const payload = (await response.json()) as T & { error?: string }
  if (!response.ok) throw new Error(payload.error || "Cloudflare request failed")
  return payload
}

export type ArtworkPayload = {
  id?: number | string
  slug?: string
  title: string
  year: string
  status: string
  category: string
  medium: string
  dimensions: string
  imageKey?: string
  alt: string
  excerpt: string
  story: string[]
  process: string[]
  published: boolean
}

export async function fetchDashboardArtworks() {
  const payload = await request<{ artworks: Artwork[] }>("/api/admin/artworks")
  return payload.artworks
}

export async function fetchPublicArtworks() {
  const payload = await request<{ artworks: Artwork[] }>("/api/artworks")
  return payload.artworks
}

export async function createArtwork(payload: ArtworkPayload) {
  return request<{ id: string; slug: string }>("/api/artworks", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export async function updateArtwork(id: number | string, payload: Partial<ArtworkPayload>) {
  return request<{ updated: boolean }>(`/api/artworks/${encodeURIComponent(String(id))}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  })
}

export async function deleteArtwork(id: number | string) {
  return request<{ deleted: boolean }>(`/api/artworks/${encodeURIComponent(String(id))}`, {
    method: "DELETE",
  })
}

export async function saveSiteContent(content: unknown) {
  return request<{ saved: boolean }>("/api/site-content", {
    method: "PUT",
    body: JSON.stringify({ content }),
  })
}

export async function fetchAdminPreferences() {
  return request<{ tourCompleted: boolean }>("/api/admin/preferences")
}

export async function saveAdminPreferences(preferences: { tourCompleted: boolean }) {
  return request<{ saved: boolean }>("/api/admin/preferences", {
    method: "PUT",
    body: JSON.stringify(preferences),
  })
}
