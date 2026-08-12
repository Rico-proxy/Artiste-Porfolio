const exhibitions = [
  {
    year: "2026",
    title: "Surface, Memory, Monument",
    type: "Upcoming Solo Exhibition",
    location: "Lagos",
  },
  {
    year: "2025",
    title: "New African Materialities",
    type: "Group Exhibition",
    location: "Accra",
  },
  {
    year: "2024",
    title: "Public Form / Private Memory",
    type: "Cultural Art Fair",
    location: "Abuja",
  },
  {
    year: "2023",
    title: "Contemporary Studio Dialogues",
    type: "Group Presentation",
    location: "Benin City",
  },
]

export default function Exhibitions() {
  return (
    <section className="bg-[#080809] px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
      <div className="mx-auto max-w-[1200px]">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-secondary">
          Exhibitions
        </p>
        <h1 className="head mt-6 text-6xl font-medium leading-none text-foreground md:text-8xl">
          Exhibition History
          <span className="text-secondary">.</span>
        </h1>

        <div className="mt-14 divide-y divide-white/10 border-y border-white/10">
          {exhibitions.map((exhibition) => (
            <article
              key={`${exhibition.year}-${exhibition.title}`}
              className="grid gap-5 py-8 md:grid-cols-[120px_1fr_220px]"
            >
              <p className="head text-5xl text-secondary">{exhibition.year}</p>
              <div>
                <h2 className="head text-4xl font-medium text-foreground">
                  {exhibition.title}
                </h2>
                <p className="mt-3 text-sm uppercase tracking-[0.16em] text-secondary">
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
