import { Brush, Building2, Gem, PenTool } from "lucide-react"

const services = [
  {
    icon: Brush,
    title: "Art & Design",
    text: "Original visual concepts, art direction, custom surface work, and studio-led creative development.",
  },
  {
    icon: Building2,
    title: "Corporate & Institutional Projects",
    text: "Commissioned identity pieces, sculptural installations, and art programs for organizations.",
  },
  {
    icon: PenTool,
    title: "Signage & Identity",
    text: "Cultural signage, landmark identity, exterior statements, and architectural graphic applications.",
  },
  {
    icon: Gem,
    title: "Commissioned Works",
    text: "Private and public commissions shaped from brief, site, material, story, and intended audience.",
  },
]

export default function UalStudios() {
  return (
    <section className="bg-[#080809] px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
      <div className="mx-auto max-w-[1440px]">
        <div className="max-w-4xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-secondary">
            UAL Studios
          </p>
          <h1 className="head mt-6 text-6xl font-medium leading-none text-foreground md:text-8xl">
            Studio Practice
            <span className="text-secondary">.</span>
          </h1>
          <p className="mt-8 text-lg leading-8 text-muted-foreground">
            UAL Studios operates as the creative engine for commissioned art,
            design development, cultural projects, and institutional creative
            direction.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon

            return (
              <article key={service.title} className="border border-white/10 p-7">
                <Icon className="size-8 text-secondary" strokeWidth={1.5} />
                <h2 className="head mt-8 text-3xl font-medium text-foreground">
                  {service.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {service.text}
                </p>
              </article>
            )
          })}
        </div>

        <div className="mt-14 grid gap-6 border-y border-white/10 py-10 md:grid-cols-3">
          {["Concept Development", "Fabrication Direction", "Installation Planning"].map(
            (step) => (
              <p key={step} className="text-lg text-foreground">
                {step}
              </p>
            )
          )}
        </div>
      </div>
    </section>
  )
}
