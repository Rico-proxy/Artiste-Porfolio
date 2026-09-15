import type { EmblaCarouselType } from "embla-carousel"
import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect } from "react"
import { Link } from "react-router-dom"

type HeroArtwork = {
  alt: string
  medium?: string
  slug: string
  src: string
  title?: string
}

type HeroArtworkProps = {
  artworks: HeroArtwork[]
  onNextSlide: () => void
  onApiReady: (api: EmblaCarouselType) => void
  onPreviousSlide: () => void
}

export default function HeroArtwork({
  artworks,
  onApiReady,
  onNextSlide,
  onPreviousSlide,
}: HeroArtworkProps) {
  const [carouselRef, carouselApi] = useEmblaCarousel(
    {
      align: "start",
      containScroll: false,
      loop: true,
    },
    [
      Autoplay({
        delay: 4500,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  )

  useEffect(() => {
    if (!carouselApi) {
      return
    }

    onApiReady(carouselApi)
  }, [carouselApi, onApiReady])

  return (
    <div className="z-10 relative flex justify-center items-center">
      <div className="group isolate relative w-full max-w-[620px]">
       
        <div className="z-10 relative bg-[#1a1a1f]/70 shadow-2xl p-3 rounded-xl">
          <div className="rounded-lg overflow-hidden" ref={carouselRef}>
            <div className="flex">
              {artworks.map((artwork) => (
                <div className="flex-[0_0_100%] min-w-0" key={artwork.src}>
                  <Link
                    to={`/artworks/${artwork.slug}`}
                    className="relative block rounded-lg overflow-hidden"
                    aria-label={`View ${artwork.title ?? "featured artwork"}`}
                  >
                    <img
                      src={artwork.src}
                      alt={artwork.alt}
                      className="brightness-110 saturate-110 w-full lg:h-[clamp(360px,62svh,560px)] xl:h-[clamp(440px,72svh,660px)] min-h-[340px] lg:min-h-0 object-cover group-hover:scale-105 transition-transform duration-700 contrast-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent opacity-70 pointer-events-none" />
                    <div className="bottom-4 absolute inset-x-4 flex justify-between items-center gap-4 bg-black/45 backdrop-blur-md p-4 rounded-lg text-white">
                      <div className="min-w-0">
                        <h2 className="font-medium text-base truncate head">
                          {artwork.title ?? "Featured Artwork"}
                        </h2>
                        <p className="mt-1 text-white/70 text-xs truncate">
                          {artwork.medium ?? "Akeni studio work"}
                        </p>
                      </div>
                      <span className="bg-secondary px-3 py-1 rounded-full font-semibold text-[#1a1a1f] text-xs shrink-0">
                        Featured
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:hidden flex justify-center items-center gap-4 mt-5">
          <button
            type="button"
            aria-label="Previous artwork"
            className="place-items-center grid bg-primary/30 border border-border hover:border-secondary size-14 text-secondary transition-colors"
            onClick={onPreviousSlide}
          >
            <ChevronLeft className="size-5" strokeWidth={1.7} />
          </button>
          <button
            type="button"
            aria-label="Next artwork"
            className="place-items-center grid bg-primary/30 border border-border hover:border-secondary size-14 text-secondary transition-colors"
            onClick={onNextSlide}
          >
            <ChevronRight className="size-5" strokeWidth={1.7} />
          </button>
        </div>
      </div>
    </div>
  )
}
