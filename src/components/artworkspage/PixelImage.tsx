import { Link } from "react-router-dom"

import { PixelImage as MagicPixelImage } from "@/components/ui/pixel-image"
import type { Artwork } from "@/data"
import { cn } from "@/lib/utils"

type PixelImageProps = {
  artwork: Artwork
  className?: string
}

export default function PixelImage({ artwork, className }: PixelImageProps) {
  return (
    <Link
      to={`/artworks/${artwork.slug}`}
      className={cn(
        "group block overflow-hidden border border-white/10 bg-black/40",
        className
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <MagicPixelImage
          src={artwork.src}
          alt={artwork.alt}
          grid="8x8"
          className="h-full w-full"
          imageClassName="h-full w-full"
          pixelFadeInDuration={650}
          maxAnimationDelay={450}
          colorRevealDelay={500}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 translate-y-4 p-4 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-secondary">
            View Story
          </p>
        </div>
      </div>
    </Link>
  )
}
