/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useState } from "react"
import type { ReactNode } from "react"

import { saveSiteContent as saveRemoteSiteContent } from "@/lib/cloudflare-api"

export type SiteContent = {
  hero: {
    eyebrow: string
    title: string
    description: string
    ctaLabel: string
    artworkSlugs: string[]
  }
  about: {
    eyebrow: string
    title: string
    summary: string
    biographyTitle: string
    biography: string
    philosophyTitle: string
    philosophy: string
  }
  contact: {
    eyebrow: string
    title: string
    description: string
    quote: string
    email: string
    instagram: string
    location: string
    locationNote: string
    availability: string
    availabilityNote: string
  }
  exhibitions: {
    eyebrow: string
    title: string
    items: Array<{
      year: string
      title: string
      type: string
      location: string
    }>
  }
  ualStudios: {
    eyebrow: string
    title: string
    description: string
    services: Array<{ title: string; text: string }>
    steps: string[]
  }
  kulukism: {
    eyebrow: string
    title: string
    description: string
    artworkId: number | string
    principles: string[]
    sections: Array<{ title: string; text: string }>
  }
  projects: {
    eyebrow: string
    title: string
    description: string
    categories: string[]
    items: Array<{
      title: string
      category: string
      location: string
      summary: string
      artworkId: number | string
    }>
  }
}

export const defaultSiteContent: SiteContent = {
  hero: {
    eyebrow: "Artist • Sculptor • Designer",
    title: "Creating Art That Transcends Canvas, Space and Time",
    description:
      "Exploring African creativity through painting, sculpture, public art, and cultural projects shaped by a distinct visual language.",
    ctaLabel: "View Artworks",
    artworkSlugs: [
      "shattered-resilience",
      "red-weather",
      "after-the-thaw",
      "ashen-figure",
      "ceremonial-ascent",
      "white-noise-body",
      "akeni-study-20",
    ],
  },
  about: {
    eyebrow: "About The Artist",
    title: "Prince Akeni Prosper",
    summary:
      "Artist, sculptor, designer, and creative director creating art that transcends canvas, space, and time through a distinctly personal African visual language.",
    biographyTitle: "Biography",
    biography:
      "Prince Akeni Prosper builds a practice across painting, sculpture, public art, architectural surfaces, and cultural identity projects. His work moves between intimate studio pieces and large-scale commissions, carrying a visual language rooted in memory, material, and place.",
    philosophyTitle: "Artistic Philosophy",
    philosophy:
      "His philosophy centers on transformation: ordinary materials, civic spaces, and inherited symbols become charged surfaces for reflection. The work asks how African creativity can occupy contemporary space with authority, beauty, and depth.",
  },
  contact: {
    eyebrow: "Get In Touch",
    title: "Let's Talk About Your Next Piece",
    description:
      "I'm always open to new ideas, collaborations, and commissions that challenge and inspire. Whether you have a clear vision or just the beginning of one, I'd love to hear about it.",
    quote: "Great art starts with a conversation.",
    email: "hello@artist.studio",
    instagram: "@artist.studio",
    location: "Brooklyn, New York, USA",
    locationNote: "By appointment only",
    availability: "Taking on new commissions",
    availabilityNote: "for Fall 2026",
  },
  exhibitions: {
    eyebrow: "Exhibitions",
    title: "Exhibition History",
    items: [
      {
        year: "2026",
        title: "Surface, Memory, Monument",
        type: "Upcoming Solo Exhibition",
        location: "Lagos",
      },
      {
        year: "2025",
        title: "New African Materialities",
        type: "Group Exhibition",
        location: "Accra",
      },
      {
        year: "2024",
        title: "Public Form / Private Memory",
        type: "Cultural Art Fair",
        location: "Abuja",
      },
      {
        year: "2023",
        title: "Contemporary Studio Dialogues",
        type: "Group Presentation",
        location: "Benin City",
      },
    ],
  },
  ualStudios: {
    eyebrow: "UAL Studios",
    title: "Studio Practice",
    description:
      "UAL Studios operates as the creative engine for commissioned art, design development, cultural projects, and institutional creative direction.",
    services: [
      {
        title: "Art & Design",
        text: "Original visual concepts, art direction, custom surface work, and studio-led creative development.",
      },
      {
        title: "Corporate & Institutional Projects",
        text: "Commissioned identity pieces, sculptural installations, and art programs for organizations.",
      },
      {
        title: "Signage & Identity",
        text: "Cultural signage, landmark identity, exterior statements, and architectural graphic applications.",
      },
      {
        title: "Commissioned Works",
        text: "Private and public commissions shaped from brief, site, material, story, and intended audience.",
      },
    ],
    steps: [
      "Concept Development",
      "Fabrication Direction",
      "Installation Planning",
    ],
  },
  kulukism: {
    eyebrow: "Kulukism",
    title: "The Concept",
    description:
      "KULUKISM is a visual philosophy that studies fractured surfaces, layered materials, and symbolic form as a way to speak about identity, endurance, and African imagination.",
    artworkId: 1,
    principles: [
      "Surface as archive",
      "Material as memory",
      "African form as contemporary language",
      "Public space as cultural text",
    ],
    sections: [
      {
        title: "Technique",
        text: "Layering, scoring, burnishing, and relief-building create surfaces that feel excavated rather than simply painted.",
      },
      {
        title: "Materials & Surface",
        text: "Oil, acrylic, pigment, leaf, plaster, found texture, and sculptural mass work together as expressive matter.",
      },
      {
        title: "Selected Works",
        text: "KULUKISM pieces may appear as paintings, sculptural forms, architectural surfaces, or civic installations.",
      },
    ],
  },
  projects: {
    eyebrow: "Projects",
    title: "Public Art & Commissions",
    description:
      "Large-scale cultural projects, sculptural installations, architectural integration, public beautification, signage, and institutional commissions.",
    categories: [
      "Monumental Sculptures",
      "Military & Institutional Projects",
      "Architectural Art",
      "Signage & Identity",
      "Public Art & Beautification",
      "Interior & Exterior Art",
      "Special Commissions",
    ],
    items: [
      {
        title: "Civic Memory Monument",
        category: "Monumental Sculptures",
        location: "Abuja, Nigeria",
        summary:
          "A public sculpture concept honoring collective service, resilience, and national memory.",
        artworkId: 6,
      },
      {
        title: "Institutional Arrival Wall",
        category: "Architectural Art",
        location: "Lagos, Nigeria",
        summary:
          "Integrated relief, signage, and surface storytelling for a contemporary institutional entrance.",
        artworkId: 3,
      },
      {
        title: "Heritage Court Beautification",
        category: "Public Art & Beautification",
        location: "Benin City, Nigeria",
        summary:
          "A cultural placemaking project combining color, sculpture, and symbolic spatial identity.",
        artworkId: 2,
      },
    ],
  },
}

const storageKey = "akeni-site-content"
const cloudflareApiUrl = import.meta.env.VITE_CLOUDFLARE_API_URL?.replace(/\/$/, "")

function mergeSiteContent(parsed: Partial<SiteContent>): SiteContent {
  return {
    hero: { ...defaultSiteContent.hero, ...parsed.hero },
    about: { ...defaultSiteContent.about, ...parsed.about },
    contact: { ...defaultSiteContent.contact, ...parsed.contact },
    exhibitions: {
      ...defaultSiteContent.exhibitions,
      ...parsed.exhibitions,
      items: Array.isArray(parsed.exhibitions?.items)
        ? parsed.exhibitions.items
        : defaultSiteContent.exhibitions.items,
    },
    ualStudios: {
      ...defaultSiteContent.ualStudios,
      ...parsed.ualStudios,
      services: Array.isArray(parsed.ualStudios?.services)
        ? parsed.ualStudios.services
        : defaultSiteContent.ualStudios.services,
      steps: Array.isArray(parsed.ualStudios?.steps)
        ? parsed.ualStudios.steps
        : defaultSiteContent.ualStudios.steps,
    },
    kulukism: {
      ...defaultSiteContent.kulukism,
      ...parsed.kulukism,
      principles: Array.isArray(parsed.kulukism?.principles)
        ? parsed.kulukism.principles
        : defaultSiteContent.kulukism.principles,
      sections: Array.isArray(parsed.kulukism?.sections)
        ? parsed.kulukism.sections
        : defaultSiteContent.kulukism.sections,
    },
    projects: {
      ...defaultSiteContent.projects,
      ...parsed.projects,
      categories: Array.isArray(parsed.projects?.categories)
        ? parsed.projects.categories
        : defaultSiteContent.projects.categories,
      items: Array.isArray(parsed.projects?.items)
        ? parsed.projects.items
        : defaultSiteContent.projects.items,
    },
  }
}

function loadSiteContent(): SiteContent {
  if (typeof window === "undefined") {
    return defaultSiteContent
  }

  try {
    const stored = window.localStorage.getItem(storageKey)

    if (!stored) {
      return defaultSiteContent
    }

    const parsed = JSON.parse(stored) as Partial<SiteContent>

    return mergeSiteContent(parsed)
  } catch {
    return defaultSiteContent
  }
}

type SiteContentContextValue = {
  content: SiteContent
  saveContent: (nextContent: SiteContent) => Promise<void>
  resetContent: () => Promise<void>
}

const SiteContentContext = createContext<SiteContentContextValue | null>(null)

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(loadSiteContent)

  useEffect(() => {
    if (!cloudflareApiUrl) return

    let cancelled = false

    fetch(`${cloudflareApiUrl}/api/site-content`)
      .then(async (response) => {
        if (!response.ok) return null
        const payload = (await response.json()) as {
          content?: Partial<SiteContent>
        }
        return payload.content ?? null
      })
      .then((remoteContent) => {
        if (!cancelled && remoteContent) {
          setContent(mergeSiteContent(remoteContent))
        }
      })
      .catch(() => {
        // Keep the local/static content when the remote content is unavailable.
      })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(content))
  }, [content])

  async function saveContent(nextContent: SiteContent) {
    setContent(nextContent)
    if (cloudflareApiUrl) {
      await saveRemoteSiteContent(nextContent)
    }
  }

  async function resetContent() {
    setContent(defaultSiteContent)
    if (cloudflareApiUrl) {
      await saveRemoteSiteContent(defaultSiteContent)
    }
  }

  return (
    <SiteContentContext.Provider value={{ content, saveContent, resetContent }}>
      {children}
    </SiteContentContext.Provider>
  )
}

export function useSiteContent() {
  const context = useContext(SiteContentContext)

  if (!context) {
    throw new Error("useSiteContent must be used inside SiteContentProvider")
  }

  return context
}
