import type { EmblaCarouselType } from "embla-carousel"
import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from "embla-carousel-react"
import {
  ArrowRight,
  Camera,
  ChevronLeft,
  ChevronRight,
  CircleDot,
} from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"

import { heroArtworks } from "@/assets/images"

const socialLinks = [
  {
    href: "https://instagram.com",
    icon: Camera,
    label: "Instagram",
  },
  {
    href: "https://behance.net",
    label: "Be",
  },
  {
    href: "https://dribbble.com",
    icon: CircleDot,
    label: "Dribbble",
  },
]

function formatSlideNumber(value: number) {
  return value.toString().padStart(2, "0")
}

export default function HeroMobile() {
  const carouselApiRef = useRef<EmblaCarouselType>(null)
  const [currentSlide, setCurrentSlide] = useState(1)
  const slideCount = heroArtworks.length

  const [carouselRef, api] = useEmblaCarousel(
    {
      align: "start",
      containScroll: false,
      loop: true,
    },
    [
      Autoplay({
        delay: 4500,
        stopOnInteraction: false,
      }),
    ]
  )

  const handleSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setCurrentSlide(emblaApi.selectedScrollSnap() + 1)
  }, [])

  useEffect(() => {
    if (!api) {
      return undefined
    }

    carouselApiRef.current = api
    queueMicrotask(() => handleSelect(api))
    api.on("select", handleSelect)
    api.on("reInit", handleSelect)

    return () => {
      api.off("select", handleSelect)
      api.off("reInit", handleSelect)
      carouselApiRef.current = null
    }
  }, [api, handleSelect])

  return (
    <section className="relative bg-[#0b0b0d] px-3 pt-6 pb-5 min-h-[calc(100svh-90px)] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,rgba(201,154,61,0.1),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_30%)]" />

      <div className="relative flex flex-col justify-center mx-auto max-w-[420px] min-h-[calc(100svh-121px)]">
        <p className="font-semibold text-muted-foreground text-sm text-center">
          Artist • Sculptor • Designer
        </p>

        <h1 className="mx-auto mt-4 max-w-[360px] md:max-w-[560px] font-semibold text-[2.35rem] text-foreground text-center leading-[0.96] head">
          Creating Art That Transcends Canvas, Space and Time
          <span className="text-secondary">.</span>
        </h1>

        <div className="flex justify-center items-center gap-4 mt-6">
          <div className="items-center grid grid-cols-[2.4rem_0.9rem_2.4rem] text-center">
            <span className="font-semibold text-secondary text-3xl leading-none head">
              {formatSlideNumber(currentSlide)}
            </span>
            <span className="text-muted-foreground text-2xl leading-none">
              /
            </span>
            <span className="text-muted-foreground text-2xl leading-none">
              {formatSlideNumber(slideCount)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous artwork"
              className="place-items-center grid bg-primary/35 border border-white/10 hover:border-secondary size-11 text-secondary transition-colors"
              onClick={() => carouselApiRef.current?.scrollPrev()}
            >
              <ChevronLeft className="size-4" strokeWidth={1.7} />
            </button>
            <button
              type="button"
              aria-label="Next artwork"
              className="place-items-center grid bg-primary/35 border border-white/10 hover:border-secondary size-11 text-secondary transition-colors"
              onClick={() => carouselApiRef.current?.scrollNext()}
            >
              <ChevronRight className="size-4" strokeWidth={1.7} />
            </button>
          </div>
        </div>

        <div
          className="mt-6 border border-white/15 rounded overflow-hidden"
          ref={carouselRef}
        >
          <div className="flex">
            {heroArtworks.map((artwork) => (
              <div className="flex-[0_0_100%] min-w-0" key={artwork.src}>
                <img
                  src={artwork.src}
                  alt={artwork.alt}
                  className="brightness-110 saturate-110 w-full object-cover aspect-[1.12/1] contrast-105"
                />
              </div>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-5 max-w-[340px] font-medium text-muted-foreground text-sm text-center leading-7">
          Exploring African creativity through painting, sculpture, public art,
          and cultural projects shaped by a distinct visual language.
        </p>

        <Link
          to="/artworks"
          className="inline-flex justify-center items-center gap-3 mt-5 px-6 border border-secondary/80 hover:border-secondary h-12 font-semibold text-foreground hover:text-secondary text-sm transition-colors"
        >
          View Artworks
          <ArrowRight className="size-5 text-secondary" strokeWidth={1.6} />
        </Link>

        <div className="flex justify-center items-center gap-5 mt-5 pt-4 border-white/10 border-t">
          {socialLinks.map((item) => {
            const Icon = item.icon

            return (
              <a
                key={item.label}
                href={item.href}
                aria-label={item.label}
                className="place-items-center grid size-9 md:size-12 text-muted-foreground hover:text-secondary transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                {Icon ? (
                  <Icon className="size-4 md:size-6" strokeWidth={1.6} />
                ) : (
                  <span className="font-bold text-sm md:text-lg tracking-tight">
                    Be
                  </span>
                )}
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
