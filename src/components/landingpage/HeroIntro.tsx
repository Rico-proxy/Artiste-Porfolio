import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

import { useSiteContent } from "@/components/site-content-provider"

type HeroIntroProps = {
  currentSlide: number
  onNextSlide: () => void
  onPreviousSlide: () => void
  slideCount: number
}

function formatSlideNumber(value: number) {
  return value.toString().padStart(2, "0")
}

export default function HeroIntro({
  currentSlide,
  onNextSlide,
  onPreviousSlide,
  slideCount,
}: HeroIntroProps) {
  const { content } = useSiteContent()

  return (
    <div className="relative z-10 col-span-5 flex min-w-0 flex-col justify-center">
      <div className="relative z-10 w-full max-w-[560px]">
        <div className="mb-6">
          <p className="text-sm font-semibold tracking-[0.25em] text-secondary uppercase">
            {content.hero.eyebrow}
          </p>
        </div>

        <h1 className="head max-w-[620px] text-5xl leading-[1.04] font-semibold tracking-normal text-[#f7f3ea] xl:text-[3.95rem] 2xl:text-[4.35rem]">
          {content.hero.title}
          <span className="text-secondary">.</span>
        </h1>

        <p className="mt-6 max-w-[540px] text-lg leading-8 font-light text-[#d7cfbd]">
          {content.hero.description}
        </p>

        <Link
          to="/artworks"
          className="mt-8 inline-flex h-15 items-center gap-5 rounded-full border border-secondary/80 px-8 text-sm font-semibold tracking-[0.18em] text-[#f7f3ea] uppercase transition-all duration-300 hover:border-secondary hover:bg-secondary hover:text-[#1a1a1f]"
        >
          {content.hero.ctaLabel}
          <ArrowRight className="size-5" strokeWidth={1.7} />
        </Link>

        <div className="mt-9 flex items-center justify-between gap-8">
          <div className="head flex items-end gap-3 tracking-widest">
            <span className="text-5xl leading-none font-semibold text-secondary">
              {formatSlideNumber(currentSlide)}
            </span>
            <span className="pb-1 text-3xl text-[#d7cfbd]/65">
              / {formatSlideNumber(slideCount)}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous artwork"
              className="grid size-14 cursor-pointer place-items-center rounded-full border border-[#d7cfbd]/35 text-[#f7f3ea] transition-colors hover:border-secondary hover:text-secondary"
              onClick={onPreviousSlide}
            >
              <ChevronLeft className="size-5" strokeWidth={1.8} />
            </button>
            <button
              type="button"
              aria-label="Next artwork"
              className="grid size-14 cursor-pointer place-items-center rounded-full border border-[#d7cfbd]/35 text-[#f7f3ea] transition-colors hover:border-secondary hover:text-secondary"
              onClick={onNextSlide}
            >
              <ChevronRight className="size-5" strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
