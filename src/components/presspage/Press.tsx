import { ArrowUpRight } from "lucide-react"

const pressItems = [
  {
    type: "Interview",
    title: "On African creativity, public space, and material memory",
    source: "Studio Journal",
  },
  {
    type: "Publication",
    title: "KULUKISM and the new language of contemporary surface",
    source: "Art & Culture Review",
  },
  {
    type: "Feature",
    title: "Designing monuments for civic identity and institutional memory",
    source: "Creative Africa",
  },
  {
    type: "Award",
    title: "Recognition for public art and beautification contribution",
    source: "Cultural Works Digest",
  },
]

export default function Press() {
  return (
    <section className="bg-[#080809] px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-end">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-secondary">
              Press & Media
            </p>
            <h1 className="head mt-6 text-6xl font-medium leading-none text-foreground md:text-8xl">
              Press
              <span className="text-secondary">.</span>
            </h1>
          </div>
          <p className="text-lg leading-8 text-muted-foreground">
            News, interviews, publications, articles, awards, and media features
            documenting the artist&apos;s studio practice and public work.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {pressItems.map((item) => (
            <article
              key={item.title}
              className="group flex min-h-64 flex-col justify-between border border-white/10 p-7 transition-colors hover:border-secondary/70"
            >
              <div className="flex items-start justify-between gap-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                  {item.type}
                </p>
                <ArrowUpRight
                  className="size-5 text-muted-foreground transition-colors group-hover:text-secondary"
                  strokeWidth={1.6}
                />
              </div>
              <div>
                <h2 className="head text-4xl font-medium leading-tight text-foreground">
                  {item.title}
                </h2>
                <p className="mt-5 text-sm uppercase tracking-[0.16em] text-muted-foreground">
                  {item.source}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
