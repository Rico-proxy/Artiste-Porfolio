import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

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
    <div className="z-10 relative flex items-center px-6 sm:px-10 lg:px-14 py-10 sm:py-12 lg:py-10 min-w-0 overflow-hidden">
      <div className="z-10 relative w-full max-w-[620px]">
        <div className="mb-7 lg:mb-7">
          <p className="font-medium text-secondary text-xl">
            Artist • Sculptor • Designer
          </p>
          <span className="mt-4 w-16 line" />
        </div>

        <h1 className="max-w-[600px] font-bold text-foreground text-2xl md:text-4xl xl:text-5xl leading-[0.98] head">
          Creating Art That Transcends Canvas, Space and Time
          <span className="text-secondary">.</span>
        </h1>

        <span className="mt-4 w-14 line" />

        <p className="mt-6 lg:mt-6 max-w-[520px] text-muted-foreground text-lg md:text-xl leading-8 md:leading-9">
          Exploring African creativity through painting, sculpture, public art,
          and cultural projects shaped by a distinct visual language.
        </p>

        <Link
          to="/artworks"
          className="inline-flex items-center gap-8 mt-7 lg:mt-7 px-6 border border-secondary/80 hover:border-secondary h-12 font-medium text-foreground text-md hover:text-secondary transition-colors"
        >
          View Artworks
          <ArrowRight className="size-6 text-secondary" strokeWidth={1.6} />
        </Link>

        <div className="flex justify-between items-center gap-8 mt-9 lg:mt-10">
          <div className="flex items-end gap-4 text-center">
            <span className="font-semibold text-secondary text-6xl leading-none head">
              {formatSlideNumber(currentSlide)}
            </span>
            <span className="pb-2 text-muted-foreground text-3xl">/</span>
            <span className="pb-2 text-muted-foreground text-3xl">
              {formatSlideNumber(slideCount)}
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-2">
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
