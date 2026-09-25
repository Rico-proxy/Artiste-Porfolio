import { Plus, Search } from "lucide-react"
import { useMemo, useState } from "react"
import { Link } from "react-router-dom"

import {
  ArtworkTable,
  goldButtonClass,
} from "@/components/dashboard/dashboard-shared"
import { useArtworkData } from "@/components/dashboard/artwork-data-provider"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const PAGE_SIZE = 10

export default function ArtworksPage() {
  const { artworks, isLoading } = useArtworkData()
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)
  const visibleArtworks = useMemo(
    () => artworks.filter((artwork) => artwork.title.toLowerCase().includes(query.toLowerCase())),
    [artworks, query]
  )
  const pageCount = Math.max(1, Math.ceil(visibleArtworks.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const pageArtworks = visibleArtworks.slice(
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
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="head text-5xl leading-none font-medium text-foreground">
            Artworks
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            View artwork records, then open a piece to edit or delete it.
          </p>
        </div>
        <div className="flex gap-3">
          <label className="flex h-11 min-w-0 items-center gap-3 border border-border bg-card/40 px-3 text-muted-foreground sm:w-72">
            <Search className="size-4" strokeWidth={1.7} />
            <Input
              value={query}
              onChange={(event) => {
                setQuery(event.currentTarget.value)
                setPage(1)
              }}
              placeholder="Search artworks"
              className="h-full border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
            />
          </label>
          <Link to="/dashboard/create" className={goldButtonClass}>
            <Plus className="size-4" strokeWidth={1.8} />
            Create
          </Link>
        </div>
      </div>
      <section className="border border-border bg-card/40">
        {isLoading ? (
          <p className="p-5 text-sm text-muted-foreground">Loading artworks...</p>
        ) : (
          <>
            <ArtworkTable works={pageArtworks} />
            {pageCount > 1 ? (
              <Pagination className="border-t border-border px-5 py-4">
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
          </>
        )}
      </section>
    </div>
  )
}
