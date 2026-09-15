import { Camera, CircleDot } from "lucide-react"

export default function HeroSocialRail() {
  return (
    <aside className="absolute inset-y-0 left-0 z-20 hidden w-[116px] flex-col items-center justify-center bg-black/75 px-8 backdrop-blur-sm lg:flex">
      <div className="flex flex-col items-center gap-8 text-[#d7cfbd]">
        <a
          href="/"
          aria-label="Instagram"
          className="hover:text-secondary transition-colors"
        >
          <Camera className="size-6" strokeWidth={1.8} />
        </a>
        <a
          href="/"
          aria-label="Behance"
          className="font-semibold hover:text-secondary text-xl transition-colors"
        >
          Be
        </a>
        <a
          href="/"
          aria-label="Dribbble"
          className="hover:text-secondary transition-colors"
        >
          <CircleDot className="size-6" strokeWidth={1.8} />
        </a>
      </div>
      <span className="mt-12 h-32 w-px bg-[#d7cfbd]/35" />
    </aside>
  )
}
