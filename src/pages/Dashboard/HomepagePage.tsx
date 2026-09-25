import { Check, Save } from "lucide-react"
import { useEffect, useState } from "react"

import { useArtworkData } from "@/components/dashboard/artwork-data-provider"
import { useSiteContent } from "@/components/site-content-provider"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"

const HOMEPAGE_ARTWORK_COUNT = 7

export default function HomepagePage() {
  const { artworks, isLoading } = useArtworkData()
  const { content, saveContent } = useSiteContent()
  const [selectedSlugs, setSelectedSlugs] = useState(() => content.hero.artworkSlugs)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    queueMicrotask(() => setSelectedSlugs(content.hero.artworkSlugs))
  }, [content.hero.artworkSlugs])

  function toggleArtwork(slug: string) {
    setSelectedSlugs((current) => {
      if (current.includes(slug)) {
        return current.filter((item) => item !== slug)
      }

      if (current.length >= HOMEPAGE_ARTWORK_COUNT) return current
      return [...current, slug]
    })
  }

  async function handleSave() {
    setIsSaving(true)

    try {
      await saveContent({
        ...content,
        hero: {
          ...content.hero,
          artworkSlugs: selectedSlugs,
        },
      })
      toast.add({
        title: "Saved",
        description: "The homepage artworks were saved.",
        type: "success",
      })
    } catch (error) {
      toast.add({
        title: "Save failed",
        description:
          error instanceof Error ? error.message : "Could not save the homepage artworks.",
        type: "error",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-secondary uppercase">
            Homepage
          </p>
          <h1 className="head mt-3 text-5xl leading-none font-medium text-foreground">
            Hero artworks
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            Choose the 7 artworks shown in the homepage carousel. The number on each selected image sets its order.
          </p>
        </div>
        <Button
          type="button"
          disabled={
            isSaving ||
            isLoading ||
            selectedSlugs.length !== HOMEPAGE_ARTWORK_COUNT
          }
          onClick={() => void handleSave()}
          className="bg-secondary text-secondary-foreground hover:bg-secondary/85"
        >
          <Save className="size-4" strokeWidth={1.8} />
          {isSaving ? "Saving..." : "Save Homepage"}
        </Button>
      </div>

      <section className="border border-border bg-card/40 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Artwork selection
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Click an artwork to add or remove it from the homepage.
            </p>
          </div>
          <span className="shrink-0 text-sm font-semibold text-secondary">
            {selectedSlugs.length}/{HOMEPAGE_ARTWORK_COUNT}
          </span>
        </div>

        {isLoading ? (
          <p className="py-8 text-sm text-muted-foreground">Loading artworks...</p>
        ) : (
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {artworks.map((artwork) => {
              const selectedIndex = selectedSlugs.indexOf(artwork.slug)
              const isSelected = selectedIndex >= 0
              const isDisabled =
                !isSelected && selectedSlugs.length >= HOMEPAGE_ARTWORK_COUNT

              return (
                <button
                  key={artwork.slug}
                  type="button"
                  aria-pressed={isSelected}
                  disabled={isDisabled}
                  onClick={() => toggleArtwork(artwork.slug)}
                  className={[
                    "group relative overflow-hidden border text-left transition-colors",
                    isSelected ? "border-secondary" : "border-border hover:border-secondary/60",
                    isDisabled ? "cursor-not-allowed opacity-45" : "",
                  ].join(" ")}
                >
                  <img
                    src={artwork.src}
                    alt={artwork.alt}
                    className="aspect-[4/3] w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <span className="block truncate px-3 py-2 text-xs font-medium text-foreground">
                    {artwork.title}
                  </span>
                  {isSelected ? (
                    <span className="absolute right-2 top-2 grid size-7 place-items-center bg-secondary text-secondary-foreground">
                      {selectedIndex + 1}
                    </span>
                  ) : null}
                  {isSelected ? (
                    <span className="absolute left-2 top-2 grid size-7 place-items-center bg-[#111113]/80 text-secondary">
                      <Check className="size-4" strokeWidth={2.2} />
                    </span>
                  ) : null}
                </button>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
