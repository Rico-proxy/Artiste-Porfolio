import { Camera, CircleDot } from "lucide-react"

export default function HeroSocialRail() {
  return (
    <aside className="hidden bg-black/70 px-8 py-16 backdrop-blur-sm lg:flex lg:flex-col lg:items-center lg:justify-center">
      <div className="flex flex-col items-center gap-9 text-muted-foreground">
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
      <span className="bg-muted-foreground/35 mt-12 w-px h-28" />
    </aside>
  )
}
