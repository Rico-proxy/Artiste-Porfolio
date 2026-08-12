import {
  ArrowRight,
  Camera,
  Clock3,
  Mail,
  MapPin,
  ShieldCheck,
} from "lucide-react"

import { artworks } from "@/data"

const contactArtwork =
  artworks.find((artwork) => artwork.slug === "red-weather") ?? artworks[0]

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@artist.studio",
  },
  {
    icon: Camera,
    label: "Instagram",
    value: "@artist.studio",
  },
  {
    icon: MapPin,
    label: "Studio Location",
    value: "Brooklyn, New York, USA",
    note: "By appointment only",
  },
  {
    icon: Clock3,
    label: "Availability",
    value: "Taking on new commissions",
    note: "for Fall 2026",
  },
]

export default function Contact() {
  return (
    <section className="relative min-h-[calc(100svh-90px)] overflow-hidden bg-[#080809] px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_83%_40%,rgba(201,154,61,0.12),transparent_28%),radial-gradient(circle_at_14%_68%,rgba(201,154,61,0.08),transparent_24%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 opacity-20 [background:repeating-radial-gradient(ellipse_at_bottom_left,transparent_0,transparent_18px,rgba(247,243,234,0.25)_19px,transparent_20px)]" />

      <div className="relative mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.8fr_1.1fr_0.85fr] lg:gap-16">
        <div className="pt-4">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-secondary">
            Get In Touch
          </p>
          <span className="mt-5 block h-px w-20 bg-secondary" />

          <h1 className="head mt-8 max-w-[520px] text-4xl font-medium leading-[0.95] text-foreground">
            Let&apos;s Talk About Your Next Piece
            <span className="text-secondary">.</span>
          </h1>

          <p className="mt-10 max-w-[420px] text-lg leading-8 text-muted-foreground">
            I&apos;m always open to new ideas, collaborations, and commissions
            that challenge and inspire. Whether you have a clear vision or just
            the beginning of one, I&apos;d love to hear about it.
          </p>

          <p className="accent mt-14 max-w-[360px] text-4xl leading-tight text-secondary">
            &ldquo;Great art starts with a conversation.&rdquo;
          </p>
        </div>

        <form
          className="space-y-8 pt-4"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="block">
            <span className="text-base text-foreground">
              Your Name <span className="text-secondary">*</span>
            </span>
            <input
              type="text"
              name="name"
              placeholder="e.g. Alex Morgan"
              className="mt-3 h-16 w-full border border-white/15 bg-black/20 px-6 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-secondary"
            />
          </label>

          <label className="block">
            <span className="text-base text-foreground">
              Email Address <span className="text-secondary">*</span>
            </span>
            <input
              type="email"
              name="email"
              placeholder="e.g. alex@morgan.com"
              className="mt-3 h-16 w-full border border-white/15 bg-black/20 px-6 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-secondary"
            />
          </label>

          <label className="block">
            <span className="text-base text-foreground">
              Project / Commission Type <span className="text-secondary">*</span>
            </span>
            <select
              name="projectType"
              defaultValue=""
              className="mt-3 h-16 w-full border border-white/15 bg-black/20 px-6 text-base text-muted-foreground outline-none transition-colors focus:border-secondary"
            >
              <option value="" disabled>
                Select project type
              </option>
              <option>Original Artwork</option>
              <option>Private Commission</option>
              <option>Gallery Collaboration</option>
              <option>Interior Placement</option>
            </select>
          </label>

          <label className="block">
            <span className="text-base text-foreground">
              Tell me about your project <span className="text-secondary">*</span>
            </span>
            <textarea
              name="message"
              placeholder="Share your ideas, vision, size, timeline, budget, or anything else that helps bring your concept to life..."
              className="mt-3 min-h-48 w-full resize-none border border-white/15 bg-black/20 px-6 py-5 text-base leading-7 text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-secondary"
            />
          </label>

          <button
            type="submit"
            className="inline-flex h-16 w-full items-center justify-center gap-7 border border-secondary/80 px-8 text-lg font-medium text-secondary transition-colors hover:border-secondary hover:text-foreground"
          >
            Send Message
            <ArrowRight className="size-6" strokeWidth={1.6} />
          </button>

          <p className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
            <ShieldCheck
              className="mt-0.5 size-5 shrink-0 text-foreground"
              strokeWidth={1.5}
            />
            Your information is safe and secure. I&apos;ll get back to you
            within 2-3 business days.
          </p>
        </form>

        <aside className="border-white/10 lg:border-l lg:pl-10">
          <div className="overflow-hidden border border-white/10">
            <img
              src={contactArtwork.src}
              alt={contactArtwork.alt}
              className="aspect-[1.2/1] w-full object-cover"
            />
          </div>

          <div className="mt-7 divide-y divide-white/10">
            {contactDetails.map((item) => {
              const Icon = item.icon

              return (
                <div key={item.label} className="flex gap-6 py-6">
                  <Icon
                    className="mt-1 size-7 shrink-0 text-secondary"
                    strokeWidth={1.6}
                  />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
                      {item.label}
                    </p>
                    <p className="mt-3 text-base leading-6 text-foreground">
                      {item.value}
                    </p>
                    {item.note ? (
                      <p className="text-base leading-6 text-muted-foreground">
                        {item.note}
                      </p>
                    ) : null}
                  </div>
                </div>
              )
            })}
          </div>
        </aside>
      </div>
    </section>
  )
}
