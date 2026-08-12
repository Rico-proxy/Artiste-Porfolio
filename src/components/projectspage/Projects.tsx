import { ArrowRight, MapPinned } from "lucide-react"
import { Link } from "react-router-dom"

import { artworks } from "@/data"

const projectCategories = [
  "Monumental Sculptures",
  "Military & Institutional Projects",
  "Architectural Art",
  "Signage & Identity",
  "Public Art & Beautification",
  "Interior & Exterior Art",
  "Special Commissions",
]

const projects = [
  {
    title: "Civic Memory Monument",
    category: "Monumental Sculptures",
    location: "Abuja, Nigeria",
    image: artworks[5].src,
    summary:
      "A public sculpture concept honoring collective service, resilience, and national memory.",
  },
  {
    title: "Institutional Arrival Wall",
    category: "Architectural Art",
    location: "Lagos, Nigeria",
    image: artworks[2].src,
    summary:
      "Integrated relief, signage, and surface storytelling for a contemporary institutional entrance.",
  },
  {
    title: "Heritage Court Beautification",
    category: "Public Art & Beautification",
    location: "Benin City, Nigeria",
    image: artworks[1].src,
    summary:
      "A cultural placemaking project combining color, sculpture, and symbolic spatial identity.",
  },
]

export default function Projects() {
  return (
    <section className="bg-[#080809] px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-[1fr_0.75fr] lg:items-end">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-secondary">
              Projects
            </p>
            <h1 className="head mt-6 max-w-4xl text-6xl font-medium leading-none text-foreground md:text-8xl">
              Public Art & Commissions
              <span className="text-secondary">.</span>
            </h1>
          </div>
          <p className="text-lg leading-8 text-muted-foreground">
            Large-scale cultural projects, sculptural installations,
            architectural integration, public beautification, signage, and
            institutional commissions.
          </p>
        </div>

        <div className="mt-10 flex gap-3 overflow-x-auto pb-3">
          {projectCategories.map((category) => (
            <span
              key={category}
              className="shrink-0 border border-white/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
            >
              {category}
            </span>
          ))}
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {projects.map((project) => (
            <article key={project.title} className="group border border-white/10">
              <div className="overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                  {project.category}
                </p>
                <h2 className="head mt-4 text-4xl font-medium text-foreground">
                  {project.title}
                </h2>
                <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPinned className="size-4 text-secondary" strokeWidth={1.6} />
                  {project.location}
                </p>
                <p className="mt-5 text-sm leading-7 text-muted-foreground">
                  {project.summary}
                </p>
                <Link
                  to="/contact"
                  className="mt-6 inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.12em] text-secondary"
                >
                  Discuss similar project
                  <ArrowRight className="size-4" strokeWidth={1.6} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
