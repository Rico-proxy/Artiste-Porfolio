import { Brush, Building2, Gem, PenTool } from "lucide-react"

import { useSiteContent } from "@/components/site-content-provider"

const serviceIcons = [Brush, Building2, PenTool, Gem]

export default function UalStudios() {
  const { content } = useSiteContent()

  return (
    <section className="bg-background px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
      <div className="mx-auto max-w-[1440px]">
        <div className="max-w-4xl">
          <p className="text-sm font-medium tracking-[0.18em] text-secondary uppercase">
            {content.ualStudios.eyebrow}
          </p>
          <h1 className="head mt-6 text-6xl leading-none font-medium text-foreground md:text-8xl">
            {content.ualStudios.title}
            <span className="text-secondary">.</span>
          </h1>
          <p className="mt-8 text-lg leading-8 text-muted-foreground">
            {content.ualStudios.description}
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {content.ualStudios.services.map((service, index) => {
            const Icon = serviceIcons[index % serviceIcons.length]

            return (
              <article key={service.title} className="border border-border p-7">
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

        <div className="mt-14 grid gap-6 border-y border-border py-10 md:grid-cols-3">
          {content.ualStudios.steps.map((step) => (
            <p key={step} className="text-lg text-foreground">
              {step}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
