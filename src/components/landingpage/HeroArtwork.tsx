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
    <div className="z-10 relative flex justify-center lg:justify-end items-center px-6 sm:px-10 lg:px-8 lg:py-10 pt-2 xl:pr-24 pb-12">
      <div className="relative w-full max-w-[620px] lg:translate-y-20 xl:translate-y-0">
        <div className="relative p-3">
          <div className="rounded-lg overflow-hidden" ref={carouselRef}>
            <div className="flex">
              {artworks.map((artwork) => (
                <div className="flex-[0_0_100%] min-w-0" key={artwork.src}>
                  <img
                    src={artwork.src}
                    alt={artwork.alt}
                    className="brightness-115 saturate-115 border border-white/10 w-full h-[48svh] lg:h-[calc(100svh-400px)] xl:h-[calc(100svh-210px)] min-h-[340px] lg:min-h-0 object-cover contrast-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:hidden flex justify-center items-center gap-4 mt-5">
          <button
            type="button"
            aria-label="Previous artwork"
            className="place-items-center grid bg-primary/30 border border-white/10 hover:border-secondary size-14 text-secondary transition-colors"
            onClick={onPreviousSlide}
          >
            <ChevronLeft className="size-5" strokeWidth={1.7} />
          </button>
          <button
            type="button"
            aria-label="Next artwork"
            className="place-items-center grid bg-primary/30 border border-white/10 hover:border-secondary size-14 text-secondary transition-colors"
            onClick={onNextSlide}
          >
            <ChevronRight className="size-5" strokeWidth={1.7} />
          </button>
        </div>
      </div>
    </div>
  )
}
