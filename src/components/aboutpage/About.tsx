import { Award, BookOpen, GraduationCap } from "lucide-react"

import { useSiteContent } from "@/components/site-content-provider"
import { useArtworkData } from "@/components/dashboard/artwork-data-provider"

const milestones = [
  {
    icon: BookOpen,
    label: "Practice",
    title: "Artist, sculptor, designer, and creative director",
  },
  {
    icon: GraduationCap,
    label: "Foundation",
    title: "Fine art training shaped by African material culture",
  },
  {
    icon: Award,
    label: "Recognition",
    title: "Public commissions, institutional works, and cultural projects",
  },
]

export default function About() {
  const { content } = useSiteContent()
  const { artworks } = useArtworkData()
  const profileArtwork = artworks[0]

  return (
    <section className="bg-background px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-medium tracking-[0.18em] text-secondary uppercase">
              {content.about.eyebrow}
            </p>
            <span className="line mt-5 w-20" />
            <h1 className="head mt-8 max-w-4xl text-6xl leading-none font-medium text-foreground md:text-8xl">
              {content.about.title}
              <span className="text-secondary">.</span>
            </h1>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
            {content.about.summary}
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.8fr_1fr]">
          <div className="overflow-hidden">
            <img
              src={profileArtwork.src}
              alt={profileArtwork.alt}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>

          <div>
            <div className="grid gap-4 sm:grid-cols-3">
              {milestones.map((item) => {
                const Icon = item.icon

                return (
                  <article
                    key={item.label}
                    className="border border-border p-5"
                  >
                    <Icon className="size-7 text-secondary" strokeWidth={1.5} />
                    <p className="mt-5 text-xs font-semibold tracking-[0.18em] text-secondary uppercase">
                      {item.label}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {item.title}
                    </p>
                  </article>
                )
              })}
            </div>

            <div className="mt-10 grid gap-8 border-y border-border py-10 md:grid-cols-2">
              <div>
                <h2 className="head text-4xl font-medium text-foreground">
                  {content.about.biographyTitle}
                </h2>
                <p className="mt-5 text-base leading-8 text-muted-foreground">
                  {content.about.biography}
                </p>
              </div>
              <div>
                <h2 className="head text-4xl font-medium text-foreground">
                  {content.about.philosophyTitle}
                </h2>
                <p className="mt-5 text-base leading-8 text-muted-foreground">
                  {content.about.philosophy}
                </p>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="head text-4xl font-medium text-foreground">
                Awards & Recognition
              </h2>
              <div className="mt-6 divide-y divide-white/10 border-y border-border">
                {[
                  "Selected for regional public art beautification projects",
                  "Commissioned for institutional sculpture and identity work",
                  "Featured in cultural exhibitions and studio showcases",
                ].map((item) => (
                  <p
                    key={item}
                    className="py-4 text-base text-muted-foreground"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
