import { useArtworkData } from "@/components/dashboard/artwork-data-provider"
import { useSiteContent } from "@/components/site-content-provider"

export default function Kulukism() {
  const { content } = useSiteContent()
  const { artworks } = useArtworkData()
  const featuredArtwork =
    artworks.find((artwork) => String(artwork.id) === String(content.kulukism.artworkId)) ??
    artworks[0]

  return (
    <section className="bg-background px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-medium tracking-[0.18em] text-secondary uppercase">
              {content.kulukism.eyebrow}
            </p>
            <h1 className="head mt-6 text-6xl leading-none font-medium text-foreground md:text-8xl">
              {content.kulukism.title}
              <span className="text-secondary">.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
              {content.kulukism.description}
            </p>
          </div>
          <div className="overflow-hidden border border-border">
            <img
              src={featuredArtwork.src}
              alt={featuredArtwork.alt}
              className="aspect-[1.25/1] w-full object-cover"
            />
          </div>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-4">
          {content.kulukism.principles.map((principle, index) => (
            <article key={principle} className="border border-border p-6">
              <p className="head text-5xl text-secondary">
                {(index + 1).toString().padStart(2, "0")}
              </p>
              <p className="mt-8 text-lg text-foreground">{principle}</p>
            </article>
          ))}
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {content.kulukism.sections.map((item) => (
            <article key={item.title} className="border-t border-border pt-6">
              <h2 className="head text-4xl font-medium text-foreground">
                {item.title}
              </h2>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
