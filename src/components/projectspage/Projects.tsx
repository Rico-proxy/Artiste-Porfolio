import { ArrowRight, MapPinned } from "lucide-react"
import { Link } from "react-router-dom"

import { useSiteContent } from "@/components/site-content-provider"
import { useArtworkData } from "@/components/dashboard/artwork-data-provider"

export default function Projects() {
  const { content } = useSiteContent()
  const { artworks } = useArtworkData()

  return (
    <section className="bg-background px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-8 border-b border-border pb-10 lg:grid-cols-[1fr_0.75fr] lg:items-end">
          <div>
            <p className="text-sm font-medium tracking-[0.18em] text-secondary uppercase">
              {content.projects.eyebrow}
            </p>
            <h1 className="head mt-6 max-w-4xl text-6xl leading-none font-medium text-foreground md:text-8xl">
              {content.projects.title}
              <span className="text-secondary">.</span>
            </h1>
          </div>
          <p className="text-lg leading-8 text-muted-foreground">
            {content.projects.description}
          </p>
        </div>

        <div className="mt-10 flex gap-3 overflow-x-auto pb-3">
          {content.projects.categories.map((category) => (
            <span
              key={category}
              className="shrink-0 border border-border px-4 py-3 text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase"
            >
              {category}
            </span>
          ))}
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {content.projects.items.map((project) => {
            const artwork =
              artworks.find((item) => String(item.id) === String(project.artworkId)) ??
              artworks[0]

            return (
              <article
                key={project.title}
                className="group border border-border"
              >
                <div className="overflow-hidden">
                  <img
                    src={artwork.src}
                    alt={project.title}
                    className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold tracking-[0.16em] text-secondary uppercase">
                    {project.category}
                  </p>
                  <h2 className="head mt-4 text-4xl font-medium text-foreground">
                    {project.title}
                  </h2>
                  <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPinned
                      className="size-4 text-secondary"
                      strokeWidth={1.6}
                    />
                    {project.location}
                  </p>
                  <p className="mt-5 text-sm leading-7 text-muted-foreground">
                    {project.summary}
                  </p>
                  <Link
                    to="/contact"
                    className="mt-6 inline-flex items-center gap-3 text-sm font-medium tracking-[0.12em] text-secondary uppercase"
                  >
                    Discuss similar project
                    <ArrowRight className="size-4" strokeWidth={1.6} />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
