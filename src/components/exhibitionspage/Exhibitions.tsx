import { useSiteContent } from "@/components/site-content-provider"

export default function Exhibitions() {
  const { content } = useSiteContent()

  return (
    <section className="bg-background px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
      <div className="mx-auto max-w-[1200px]">
        <p className="text-sm font-medium tracking-[0.18em] text-secondary uppercase">
          {content.exhibitions.eyebrow}
        </p>
        <h1 className="head mt-6 text-6xl leading-none font-medium text-foreground md:text-8xl">
          {content.exhibitions.title}
          <span className="text-secondary">.</span>
        </h1>

        <div className="mt-14 divide-y divide-white/10 border-y border-border">
          {content.exhibitions.items.map((exhibition) => (
            <article
              key={`${exhibition.year}-${exhibition.title}`}
              className="grid gap-5 py-8 md:grid-cols-[120px_1fr_220px]"
            >
              <p className="head text-5xl text-secondary">{exhibition.year}</p>
              <div>
                <h2 className="head text-4xl font-medium text-foreground">
                  {exhibition.title}
                </h2>
                <p className="mt-3 text-sm tracking-[0.16em] text-secondary uppercase">
                  {exhibition.type}
                </p>
              </div>
              <p className="text-lg text-muted-foreground md:text-right">
                {exhibition.location}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
