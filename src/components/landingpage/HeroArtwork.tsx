import type { EmblaCarouselType } from "embla-carousel"
import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from "embla-carousel-react"
import { useEffect } from "react"

type HeroArtwork = {
  alt: string
  src: string
}

type HeroArtworkProps = {
  artworks: HeroArtwork[]
  onApiReady: (api: EmblaCarouselType) => void
}

export default function HeroArtwork({ artworks, onApiReady }: HeroArtworkProps) {
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
    <div className="relative z-10 flex items-center justify-center px-6 py-12 sm:px-10 lg:justify-end lg:px-8 lg:py-10 xl:pr-24">
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
      </div>
    </div>
  )
}
