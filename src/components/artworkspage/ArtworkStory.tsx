import { ArrowLeft, ArrowRight } from "lucide-react"
import { Link, Navigate, useParams } from "react-router-dom"

import { artworks, getArtworkBySlug } from "@/data"

export default function ArtworkStory() {
  const { slug } = useParams()
  const artwork = getArtworkBySlug(slug)

  if (!artwork) {
    return <Navigate to="/artworks" replace />
  }

  const currentIndex = artworks.findIndex((item) => item.slug === artwork.slug)
  const previousArtwork =
    artworks[(currentIndex - 1 + artworks.length) % artworks.length]
  const nextArtwork = artworks[(currentIndex + 1) % artworks.length]
  const detailViews = [
    previousArtwork,
    nextArtwork,
    artworks[(currentIndex + 2) % artworks.length],
  ]

  return (
    <section className="min-h-[calc(100svh-90px)] bg-[#080809] px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
      <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[minmax(0,1fr)_420px]">
        <div>
          <Link
            to="/artworks"
            className="mb-8 inline-flex items-center gap-3 text-sm uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-secondary"
          >
            <ArrowLeft className="size-4" strokeWidth={1.6} />
            Artworks
          </Link>
          <h1 className="head max-w-4xl text-5xl font-medium leading-none text-foreground md:text-7xl">
            Artwork Story:
            <span className="block">{artwork.title}</span>
          </h1>

          <div className="mt-8 max-w-[760px] overflow-hidden border border-white/10 bg-black/40">
            <img
              src={artwork.src}
              alt={artwork.alt}
              className="h-[420px] w-full object-cover sm:h-[500px] lg:h-[560px]"
            />
          </div>

          <div className="mt-5 grid max-w-[760px] grid-cols-3 gap-3">
            {detailViews.map((view) => (
              <Link
                key={view.slug}
                to={`/artworks/${view.slug}`}
                className="group block overflow-hidden border border-white/10"
              >
                <img
                  src={view.src}
                  alt={view.alt}
                  className="aspect-square w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </Link>
            ))}
          </div>
        </div>

        <aside className="self-start border-l border-white/10 pl-0 lg:pl-8">
          <div className="border-l border-white/10 pl-8 lg:border-l-0 lg:pl-0">
            <p className="text-lg text-secondary">Art is not what you see,</p>
            <p className="accent mt-2 text-3xl text-secondary">
              but what you make others feel.
            </p>
          </div>

          <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
            <div className="py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                Title:
              </p>
              <p className="mt-2 text-xl text-foreground">
                {artwork.title}, {artwork.year}
              </p>
            </div>
            <div className="py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                Status:
              </p>
              <p className="mt-2 text-lg text-foreground">
                {artwork.status} / Dimensions: {artwork.dimensions}
              </p>
            </div>
            <div className="py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                A Narrative:
              </p>
              <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground">
                {artwork.story.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                Material & Process Specifications
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
                {artwork.process.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                Call To Action:
              </p>
              <Link
                to="/contact"
                className="mt-4 inline-flex h-12 w-full items-center justify-center border border-secondary/70 px-5 text-sm font-medium uppercase tracking-[0.08em] text-secondary transition-colors hover:border-secondary hover:text-foreground"
              >
                Inquire About This Piece
              </Link>
            </div>
            <div className="flex items-center justify-between gap-6 py-5 text-sm text-muted-foreground">
              <Link
                to={`/artworks/${previousArtwork.slug}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-secondary"
              >
                <ArrowLeft className="size-4" strokeWidth={1.6} />
                Previous Piece
              </Link>
              <Link
                to={`/artworks/${nextArtwork.slug}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-secondary"
              >
                Next Piece
                <ArrowRight className="size-4" strokeWidth={1.6} />
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
