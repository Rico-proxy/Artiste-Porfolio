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

import { useSiteContent } from "@/components/site-content-provider"

type HeroArtwork = {
  alt: string
  medium: string
  slug: string
  src: string
  title: string
}

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

export default function HeroMobile({ artworks }: { artworks: HeroArtwork[] }) {
  const { content } = useSiteContent()
  const carouselApiRef = useRef<EmblaCarouselType>(null)
  const [currentSlide, setCurrentSlide] = useState(1)
  const slideCount = artworks.length

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
    <section className="relative min-h-[calc(100svh-90px)] overflow-hidden bg-background px-4 pt-5 pb-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(201,154,61,0.2),transparent_34%),linear-gradient(180deg,rgba(11,11,13,0.82)_0%,rgba(11,11,13,0.58)_52%,rgba(11,11,13,0.82)_100%)]" />

      <div className="relative mx-auto flex min-h-[calc(100svh-121px)] max-w-[460px] flex-col justify-center">
        <p className="text-center text-xs font-semibold tracking-[0.22em] text-secondary uppercase">
          {content.hero.eyebrow}
        </p>

        <h1 className="head mx-auto mt-4 max-w-[390px] text-center text-[2.85rem] leading-[0.98] font-semibold text-[#f7f3ea]">
          {content.hero.title}
          <span className="text-secondary">.</span>
        </h1>

        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="head flex items-end gap-2 tracking-widest">
            <span className="text-4xl leading-none font-semibold text-secondary">
              {formatSlideNumber(currentSlide)}
            </span>
            <span className="pb-1 text-2xl leading-none text-[#d7cfbd]/70">
              / {formatSlideNumber(slideCount)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous artwork"
              className="grid size-12 place-items-center rounded-full border border-[#d7cfbd]/35 text-[#f7f3ea] transition-colors hover:border-secondary hover:text-secondary"
              onClick={() => carouselApiRef.current?.scrollPrev()}
            >
              <ChevronLeft className="size-5" strokeWidth={1.8} />
            </button>
            <button
              type="button"
              aria-label="Next artwork"
              className="grid size-12 place-items-center rounded-full border border-[#d7cfbd]/35 text-[#f7f3ea] transition-colors hover:border-secondary hover:text-secondary"
              onClick={() => carouselApiRef.current?.scrollNext()}
            >
              <ChevronRight className="size-5" strokeWidth={1.8} />
            </button>
          </div>
        </div>

        <div
          className="mt-5 overflow-hidden rounded-xl bg-[#1a1a1f]/70 p-2 shadow-2xl"
          ref={carouselRef}
        >
          <div className="flex">
            {artworks.map((artwork) => (
              <div className="min-w-0 flex-[0_0_100%]" key={artwork.src}>
                <Link
                  to={`/artworks/${artwork.slug}`}
                  className="relative block overflow-hidden rounded-lg"
                  aria-label={`View ${artwork.title}`}
                >
                  <img
                    src={artwork.src}
                    alt={artwork.alt}
                    className="aspect-[1.08/1] w-full object-cover brightness-110 contrast-105 saturate-110"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
                  <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-lg bg-black/50 p-3 text-white backdrop-blur-md">
                    <div className="min-w-0">
                      <h2 className="head truncate text-base font-medium">
                        {artwork.title}
                      </h2>
                      <p className="mt-1 truncate text-xs text-white/70">
                        {artwork.medium}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-[#1a1a1f]">
                      Featured
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-5 max-w-[370px] text-center text-sm leading-7 font-light text-[#d7cfbd]">
          {content.hero.description}
        </p>

        <Link
          to="/artworks"
          className="mx-auto mt-5 inline-flex h-13 items-center justify-center gap-4 rounded-full border border-secondary/80 px-7 text-xs font-semibold tracking-[0.18em] text-[#f7f3ea] uppercase transition-all hover:border-secondary hover:bg-secondary hover:text-[#1a1a1f]"
        >
          {content.hero.ctaLabel}
          <ArrowRight className="size-5" strokeWidth={1.7} />
        </Link>

        <div className="mt-5 flex items-center justify-center gap-5 border-t border-[#d7cfbd]/20 pt-4">
          {socialLinks.map((item) => {
            const Icon = item.icon

            return (
              <a
                key={item.label}
                href={item.href}
                aria-label={item.label}
                className="grid size-9 place-items-center text-[#d7cfbd] transition-colors hover:text-secondary md:size-12"
                target="_blank"
                rel="noreferrer"
              >
                {Icon ? (
                  <Icon className="size-4 md:size-6" strokeWidth={1.6} />
                ) : (
                  <span className="text-sm font-bold tracking-tight md:text-lg">
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
