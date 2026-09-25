import { ChevronLeft, ChevronRight, Search } from "lucide-react"
import { useMemo, useRef, useState } from "react"
import { Link } from "react-router-dom"

import PixelImage from "@/components/artworkspage/PixelImage"
import { useArtworkData } from "@/components/dashboard/artwork-data-provider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  artworkCategories,
  type Artwork,
} from "@/data"

const PAGE_SIZE = 10

function ArtworksPanel({ works }: { works: Artwork[] }) {
  const [page, setPage] = useState(1)
  const pageCount = Math.max(1, Math.ceil(works.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const visibleWorks = works.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  function getPageItems() {
    if (pageCount <= 5) return Array.from({ length: pageCount }, (_, index) => index + 1)

    if (currentPage <= 3) return [1, 2, 3, "ellipsis", pageCount] as const
    if (currentPage >= pageCount - 2) {
      return [1, "ellipsis", pageCount - 2, pageCount - 1, pageCount] as const
    }
    return [1, "ellipsis", currentPage, "ellipsis", pageCount] as const
  }

  return (
    <div>
      {visibleWorks.length ? (
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
      ) : (
        <p className="border border-border px-5 py-10 text-center text-sm text-muted-foreground">
          No artworks in this collection yet.
        </p>
      )}

      {pageCount > 1 ? (
        <Pagination className="mt-12">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                disabled={currentPage === 1}
                onClick={() => setPage(Math.max(1, currentPage - 1))}
              />
            </PaginationItem>
            {getPageItems().map((item, index) => (
              <PaginationItem key={`${item}-${index}`}>
                {item === "ellipsis" ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    isActive={item === currentPage}
                    onClick={() => setPage(item)}
                  >
                    {item}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                disabled={currentPage === pageCount}
                onClick={() => setPage(Math.min(pageCount, currentPage + 1))}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      ) : null}
    </div>
  )
}

export default function Artworks() {
  const { artworks } = useArtworkData()
  const tabsScrollRef = useRef<HTMLDivElement | null>(null)
  const panels = useMemo(
    () =>
      artworkCategories.map((category) => ({
        ...category,
        works:
          category.value === "all"
            ? artworks
            : artworks.filter((artwork) => artwork.category === category.value),
      })),
    [artworks]
  )

  function scrollTabs(direction: "left" | "right") {
    tabsScrollRef.current?.scrollBy({
      left: direction === "left" ? -220 : 220,
      behavior: "smooth",
    })
  }

  return (
    <section className="min-h-[calc(100svh-90px)] bg-background px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-8 border-b border-border pb-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div>
            <h1 className="head text-6xl font-medium leading-none text-foreground md:text-7xl lg:text-8xl">
              Artworks
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground">
              Paintings, sculptures, mixed media works, portraits, public art,
              and contemporary collections by Prince Akeni Prosper.
            </p>
          </div>
          <div className="border-l border-border pl-8">
            <p className="text-lg text-secondary">Art is not what you see,</p>
            <p className="accent mt-2 text-3xl text-secondary">
              but what you make others feel.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex flex-col gap-6 border-b border-border pb-2 xl:flex-row xl:items-end xl:justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <button
                  type="button"
                  aria-label="Scroll categories left"
                  className="grid size-10 shrink-0 place-items-center border border-border text-secondary transition-colors hover:border-secondary hover:text-foreground"
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
                  className="grid size-10 shrink-0 place-items-center border border-border text-secondary transition-colors hover:border-secondary hover:text-foreground"
                  onClick={() => scrollTabs("right")}
                >
                  <ChevronRight className="size-5" strokeWidth={1.7} />
                </button>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <label className="flex h-12 min-w-0 items-center gap-3 border border-border px-4 text-muted-foreground sm:w-80">
                  <Search className="size-5 shrink-0" strokeWidth={1.6} />
                  <span className="text-sm">Search artwork...</span>
                </label>
                <div className="flex h-12 items-center gap-12 border-l border-border pl-6 text-sm text-muted-foreground">
                  <span>Sort by</span>
                  <span className="text-foreground">Newest</span>
                </div>
              </div>
            </div>

            {panels.map((panel) => (
              <TabsContent key={panel.value} value={panel.value}>
                <ArtworksPanel key={panel.value} works={panel.works} />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  )
}
