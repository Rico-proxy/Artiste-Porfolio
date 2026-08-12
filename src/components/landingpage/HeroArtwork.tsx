import type { EmblaCarouselType } from "embla-carousel"
import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect } from "react"

type HeroArtwork = {
  alt: string
  src: string
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
    <div className="relative z-10 flex items-center justify-center px-6 pb-12 pt-2 sm:px-10 lg:justify-end lg:px-8 lg:py-10 xl:pr-24">
      <div className="relative w-full max-w-[620px]">
        <div className="relative p-3">
          <div className="overflow-hidden rounded-lg" ref={carouselRef}>
            <div className="flex">
              {artworks.map((artwork) => (
                <div className="min-w-0 flex-[0_0_100%]" key={artwork.src}>
                  <img
                    src={artwork.src}
                    alt={artwork.alt}
                    className="h-[48svh] min-h-[340px] w-full border border-white/10 object-cover brightness-115 contrast-105 saturate-115 lg:h-[calc(100svh-220px)] lg:min-h-0"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-center gap-4 lg:hidden">
          <button
            type="button"
            aria-label="Previous artwork"
            className="grid size-14 place-items-center border border-white/10 bg-primary/30 text-secondary transition-colors hover:border-secondary"
            onClick={onPreviousSlide}
          >
            <ChevronLeft className="size-5" strokeWidth={1.7} />
          </button>
          <button
            type="button"
            aria-label="Next artwork"
            className="grid size-14 place-items-center border border-white/10 bg-primary/30 text-secondary transition-colors hover:border-secondary"
            onClick={onNextSlide}
          >
            <ChevronRight className="size-5" strokeWidth={1.7} />
          </button>
        </div>
      </div>
    </div>
  )
}
