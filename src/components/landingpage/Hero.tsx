import type { EmblaCarouselType } from "embla-carousel"
import { useCallback, useEffect, useState } from "react"

import { heroArtworks } from "@/assets/images"
import HeroArtwork from "@/components/landingpage/HeroArtwork"
import HeroIntro from "@/components/landingpage/HeroIntro"
import HeroMobile from "@/components/landingpage/HeroMobile"
import HeroNeatBackground from "@/components/landingpage/HeroNeatBackground"
import HeroSocialRail from "@/components/landingpage/HeroSocialRail"

const Hero = () => {
  const [carouselApi, setCarouselApi] = useState<EmblaCarouselType>()
  const [currentSlide, setCurrentSlide] = useState(1)
  const slideCount = heroArtworks.length

  const handleSelect = useCallback((api: EmblaCarouselType) => {
    setCurrentSlide(api.selectedScrollSnap() + 1)
  }, [])

  const scrollPrevious = useCallback(() => {
    carouselApi?.scrollPrev()
  }, [carouselApi])

  const scrollNext = useCallback(() => {
    carouselApi?.scrollNext()
  }, [carouselApi])

  useEffect(() => {
    if (!carouselApi) {
      return undefined
    }

    queueMicrotask(() => handleSelect(carouselApi))
    carouselApi.on("select", handleSelect)
    carouselApi.on("reInit", handleSelect)

    return () => {
      carouselApi.off("select", handleSelect)
      carouselApi.off("reInit", handleSelect)
    }
  }, [carouselApi, handleSelect])

  return (
    <>
      <div className="lg:hidden">
        <HeroMobile />
      </div>
      <section className="relative hidden min-h-[calc(100svh-90px)] overflow-hidden bg-[#0b0b0d] lg:block">
        <HeroNeatBackground />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_46%,rgba(240,184,79,0.2),transparent_32%),linear-gradient(90deg,rgba(11,11,13,0.9)_0%,rgba(11,11,13,0.48)_48%,rgba(11,11,13,0.72)_100%)]" />
        <div className="relative grid min-h-[calc(100svh-90px)] grid-cols-[116px_minmax(0,0.78fr)_minmax(420px,1.22fr)]">
          <HeroSocialRail />
          <HeroIntro
            currentSlide={currentSlide}
            onNextSlide={scrollNext}
            onPreviousSlide={scrollPrevious}
            slideCount={slideCount}
          />
          <div className="relative">
            <HeroArtwork
              artworks={heroArtworks}
              onApiReady={setCarouselApi}
              onNextSlide={scrollNext}
              onPreviousSlide={scrollPrevious}
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero
