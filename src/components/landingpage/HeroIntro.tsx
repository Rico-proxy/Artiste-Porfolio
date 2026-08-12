import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

import HeroNeatBackground from "@/components/landingpage/HeroNeatBackground"

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
  return (
    <div className="relative z-10 flex min-w-0 items-center overflow-hidden bg-[#0b0b0d] px-6 py-14 sm:px-10 lg:bg-transparent lg:px-14 lg:py-10">
      <div className="absolute inset-0 lg:hidden">
        <HeroNeatBackground />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_42%_66%,rgba(240,184,79,0.2),transparent_36%),linear-gradient(180deg,rgba(11,11,13,0.9)_0%,rgba(11,11,13,0.72)_42%,rgba(11,11,13,0.9)_100%)]" />
      </div>

      <div className="relative z-10 w-full max-w-[620px]">
        <div className="mb-10 lg:mb-8">
          <p className="font-medium text-secondary text-xl">
            Visual Artist
          </p>
          <span className="block bg-secondary mt-5 lg:mt-4 w-16 h-px" />
        </div>

        <h1 className="max-w-[600px] font-medium text-foreground text-2xl md:text-4xl xl:text-6xl leading-[0.98] head">
          Art Speaks Where Words Are Unable
          <span className="text-secondary">.</span>
        </h1>

        <span className="block bg-secondary mt-12 lg:mt-9 w-10 h-px" />

        <p className="mt-10 lg:mt-8 max-w-[520px] text-muted-foreground text-lg md:text-xl leading-9">
          I create paintings that explore emotion, humanity and the beauty of
          the everyday.
        </p>

        <Link
          to="/artworks"
          className="inline-flex items-center gap-8 mt-10 lg:mt-8 px-6 border border-secondary/80 hover:border-secondary h-12 font-medium text-foreground text-md hover:text-secondary transition-colors"
        >
          View Artworks
          <ArrowRight className="size-6 text-secondary" strokeWidth={1.6} />
        </Link>

        <div className="mt-16 flex items-center justify-between gap-8 lg:mt-12">
          <div className="flex items-end gap-4 text-center">
            <span className="font-semibold text-secondary text-6xl leading-none head">
              {formatSlideNumber(currentSlide)}
            </span>
            <span className="pb-2 text-muted-foreground text-3xl">/</span>
            <span className="pb-2 text-muted-foreground text-3xl">
              {formatSlideNumber(slideCount)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous artwork"
              className="place-items-center grid bg-primary/30 border border-white/10 hover:border-secondary size-14 text-secondary transition-colors cursor-pointer"
              onClick={onPreviousSlide}
            >
              <ChevronLeft className="size-5" strokeWidth={1.7} />
            </button>
            <button
              type="button"
              aria-label="Next artwork"
              className="place-items-center grid bg-primary/30 border border-white/10 hover:border-secondary size-14 text-secondary transition-colors cursor-pointer"
              onClick={onNextSlide}
            >
              <ChevronRight className="size-5" strokeWidth={1.7} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
