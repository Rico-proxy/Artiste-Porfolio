import { Award, BookOpen, GraduationCap } from "lucide-react"

import { artworks } from "@/data"

const profileArtwork = artworks[0]

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
  return (
    <section className="bg-[#080809] px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-secondary">
              About The Artist
            </p>
            <span className="line mt-5 w-20" />
            <h1 className="head mt-8 max-w-4xl text-6xl font-medium leading-none text-foreground md:text-8xl">
              Prince Akeni Prosper
              <span className="text-secondary">.</span>
            </h1>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
            Artist, sculptor, designer, and creative director creating art that
            transcends canvas, space, and time through a distinctly personal
            African visual language.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.8fr_1fr]">
          <div className="overflow-hidden border border-white/10">
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
                  <article key={item.label} className="border border-white/10 p-5">
                    <Icon className="size-7 text-secondary" strokeWidth={1.5} />
                    <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                      {item.label}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {item.title}
                    </p>
                  </article>
                )
              })}
            </div>

            <div className="mt-10 grid gap-8 border-y border-white/10 py-10 md:grid-cols-2">
              <div>
                <h2 className="head text-4xl font-medium text-foreground">
                  Biography
                </h2>
                <p className="mt-5 text-base leading-8 text-muted-foreground">
                  Prince Akeni Prosper builds a practice across painting,
                  sculpture, public art, architectural surfaces, and cultural
                  identity projects. His work moves between intimate studio
                  pieces and large-scale commissions, carrying a visual language
                  rooted in memory, material, and place.
                </p>
              </div>
              <div>
                <h2 className="head text-4xl font-medium text-foreground">
                  Artistic Philosophy
                </h2>
                <p className="mt-5 text-base leading-8 text-muted-foreground">
                  His philosophy centers on transformation: ordinary materials,
                  civic spaces, and inherited symbols become charged surfaces
                  for reflection. The work asks how African creativity can
                  occupy contemporary space with authority, beauty, and depth.
                </p>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="head text-4xl font-medium text-foreground">
                Awards & Recognition
              </h2>
              <div className="mt-6 divide-y divide-white/10 border-y border-white/10">
                {[
                  "Selected for regional public art beautification projects",
                  "Commissioned for institutional sculpture and identity work",
                  "Featured in cultural exhibitions and studio showcases",
                ].map((item) => (
                  <p key={item} className="py-4 text-base text-muted-foreground">
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
