import { ChevronLeft, ChevronRight, Search } from "lucide-react"
import { useMemo, useRef, useState } from "react"
import { Link } from "react-router-dom"

import PixelImage from "@/components/artworkspage/PixelImage"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  artworkCategories,
  getArtworksByCategory,
  type Artwork,
} from "@/data"

const INITIAL_VISIBLE_COUNT = 8
const LOAD_STEP = 4

function ArtworksPanel({ works }: { works: Artwork[] }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT)
  const visibleWorks = works.slice(0, visibleCount)
  const hasMore = visibleCount < works.length

  return (
    <div>
      <div className="grid grid-cols-1 gap-x-4 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleWorks.map((artwork) => (
          <article key={artwork.slug} className="min-w-0">
            <PixelImage artwork={artwork} />
            <Link
              to={`/artworks/${artwork.slug}`}
              className="mt-4 block text-sm font-semibold uppercase tracking-[0.08em] text-secondary transition-colors hover:text-foreground"
            >
              {artwork.title}, {artwork.year}
            </Link>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
              {artwork.excerpt}
            </p>
          </article>
        ))}
      </div>

      {hasMore ? (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            className="border border-secondary/70 px-8 py-3 text-sm font-medium text-secondary transition-colors hover:border-secondary hover:text-foreground"
            onClick={() =>
              setVisibleCount((count) => Math.min(count + LOAD_STEP, works.length))
            }
          >
            Load More Works
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default function Artworks() {
  const tabsScrollRef = useRef<HTMLDivElement | null>(null)
  const panels = useMemo(
    () =>
      artworkCategories.map((category) => ({
        ...category,
        works: getArtworksByCategory(category.value),
      })),
    []
  )

  function scrollTabs(direction: "left" | "right") {
    tabsScrollRef.current?.scrollBy({
      left: direction === "left" ? -220 : 220,
      behavior: "smooth",
    })
  }

  return (
    <section className="min-h-[calc(100svh-90px)] bg-[#080809] px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div>
            <h1 className="head text-6xl font-medium leading-none text-foreground md:text-7xl lg:text-8xl">
              Artworks
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground">
              Paintings, sculptures, mixed media works, portraits, public art,
              and contemporary collections by Prince Akeni Prosper.
            </p>
          </div>
          <div className="border-l border-white/10 pl-8">
            <p className="text-lg text-secondary">Art is not what you see,</p>
            <p className="accent mt-2 text-3xl text-secondary">
              but what you make others feel.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex flex-col gap-6 border-b border-white/10 pb-2 xl:flex-row xl:items-end xl:justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <button
                  type="button"
                  aria-label="Scroll categories left"
                  className="grid size-10 shrink-0 place-items-center border border-white/10 text-secondary transition-colors hover:border-secondary hover:text-foreground"
                  onClick={() => scrollTabs("left")}
                >
                  <ChevronLeft className="size-5" strokeWidth={1.7} />
                </button>

                <div
                  ref={tabsScrollRef}
                  className="min-w-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  <TabsList variant="line" className="min-w-max border-b-0">
                    {artworkCategories.map((category) => (
                      <TabsTrigger key={category.value} value={category.value}>
                        {category.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                <button
                  type="button"
                  aria-label="Scroll categories right"
                  className="grid size-10 shrink-0 place-items-center border border-white/10 text-secondary transition-colors hover:border-secondary hover:text-foreground"
                  onClick={() => scrollTabs("right")}
                >
                  <ChevronRight className="size-5" strokeWidth={1.7} />
                </button>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <label className="flex h-12 min-w-0 items-center gap-3 border border-white/10 px-4 text-muted-foreground sm:w-80">
                  <Search className="size-5 shrink-0" strokeWidth={1.6} />
                  <span className="text-sm">Search artwork...</span>
                </label>
                <div className="flex h-12 items-center gap-12 border-l border-white/10 pl-6 text-sm text-muted-foreground">
                  <span>Sort by</span>
                  <span className="text-foreground">Newest</span>
                </div>
              </div>
            </div>

            {panels.map((panel) => (
              <TabsContent key={panel.value} value={panel.value}>
                <ArtworksPanel works={panel.works} />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  )
}
