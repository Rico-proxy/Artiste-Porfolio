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
    <section className="bg-[#080809] px-6 sm:px-10 lg:px-14 py-12 lg:py-16">
      <div className="mx-auto max-w-[1440px]">
        <div className="lg:items-end gap-12 grid lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="font-medium text-secondary text-sm uppercase tracking-[0.18em]">
              About The Artist
            </p>
            <span className="mt-5 w-20 line" />
            <h1 className="mt-8 max-w-4xl font-medium text-foreground text-6xl md:text-8xl leading-none head">
              Prince Akeni Prosper
              <span className="text-secondary">.</span>
            </h1>
          </div>
          <p className="max-w-2xl text-muted-foreground text-lg leading-8">
            Artist, sculptor, designer, and creative director creating art that
            transcends canvas, space, and time through a distinctly personal
            African visual language.
          </p>
        </div>

        <div className="gap-10 grid lg:grid-cols-[0.8fr_1fr] mt-14">
          <div className="overflow-hidden">
            <img
              src={profileArtwork.src}
              alt={profileArtwork.alt}
              className="w-full object-cover aspect-[4/5]"
            />
          </div>

          <div>
            <div className="gap-4 grid sm:grid-cols-3">
              {milestones.map((item) => {
                const Icon = item.icon

                return (
                  <article key={item.label} className="p-5 border border-white/10">
                    <Icon className="size-7 text-secondary" strokeWidth={1.5} />
                    <p className="mt-5 font-semibold text-secondary text-xs uppercase tracking-[0.18em]">
                      {item.label}
                    </p>
                    <p className="mt-3 text-muted-foreground text-sm leading-6">
                      {item.title}
                    </p>
                  </article>
                )
              })}
            </div>

            <div className="gap-8 grid md:grid-cols-2 mt-10 py-10 border-white/10 border-y">
              <div>
                <h2 className="font-medium text-foreground text-4xl head">
                  Biography
                </h2>
                <p className="mt-5 text-muted-foreground text-base leading-8">
                  Prince Akeni Prosper builds a practice across painting,
                  sculpture, public art, architectural surfaces, and cultural
                  identity projects. His work moves between intimate studio
                  pieces and large-scale commissions, carrying a visual language
                  rooted in memory, material, and place.
                </p>
              </div>
              <div>
                <h2 className="font-medium text-foreground text-4xl head">
                  Artistic Philosophy
                </h2>
                <p className="mt-5 text-muted-foreground text-base leading-8">
                  His philosophy centers on transformation: ordinary materials,
                  civic spaces, and inherited symbols become charged surfaces
                  for reflection. The work asks how African creativity can
                  occupy contemporary space with authority, beauty, and depth.
                </p>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="font-medium text-foreground text-4xl head">
                Awards & Recognition
              </h2>
              <div className="mt-6 border-white/10 border-y divide-y divide-white/10">
                {[
                  "Selected for regional public art beautification projects",
                  "Commissioned for institutional sculpture and identity work",
                  "Featured in cultural exhibitions and studio showcases",
                ].map((item) => (
                  <p key={item} className="py-4 text-muted-foreground text-base">
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
