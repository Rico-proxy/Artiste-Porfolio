import { artworks } from "@/data"

const principles = [
  "Surface as archive",
  "Material as memory",
  "African form as contemporary language",
  "Public space as cultural text",
]

export default function Kulukism() {
  return (
    <section className="bg-[#080809] px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-secondary">
              Kulukism
            </p>
            <h1 className="head mt-6 text-6xl font-medium leading-none text-foreground md:text-8xl">
              The Concept
              <span className="text-secondary">.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
              KULUKISM is a visual philosophy that studies fractured surfaces,
              layered materials, and symbolic form as a way to speak about
              identity, endurance, and African imagination.
            </p>
          </div>
          <div className="overflow-hidden border border-white/10">
            <img
              src={artworks[0].src}
              alt={artworks[0].alt}
              className="aspect-[1.25/1] w-full object-cover"
            />
          </div>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-4">
          {principles.map((principle, index) => (
            <article key={principle} className="border border-white/10 p-6">
              <p className="head text-5xl text-secondary">
                {(index + 1).toString().padStart(2, "0")}
              </p>
              <p className="mt-8 text-lg text-foreground">{principle}</p>
            </article>
          ))}
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {[
            {
              title: "Technique",
              text: "Layering, scoring, burnishing, and relief-building create surfaces that feel excavated rather than simply painted.",
            },
            {
              title: "Materials & Surface",
              text: "Oil, acrylic, pigment, leaf, plaster, found texture, and sculptural mass work together as expressive matter.",
            },
            {
              title: "Selected Works",
              text: "KULUKISM pieces may appear as paintings, sculptural forms, architectural surfaces, or civic installations.",
            },
          ].map((item) => (
            <article key={item.title} className="border-t border-white/10 pt-6">
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
