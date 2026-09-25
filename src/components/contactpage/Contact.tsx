import { useState, type FormEvent } from "react"

import {
  ArrowRight,
  Camera,
  Clock3,
  Mail,
  MapPin,
  ShieldCheck,
} from "lucide-react"

import { useSiteContent } from "@/components/site-content-provider"
import { toast } from "@/components/ui/toast"
import { useArtworkData } from "@/components/dashboard/artwork-data-provider"
const submitToastId = "contact-form-submit"

export default function Contact() {
  const { content } = useSiteContent()
  const { artworks } = useArtworkData()
  const { contact } = content
  const contactArtwork =
    artworks.find((artwork) => artwork.slug === "red-weather") ?? artworks[0]
  const [isSubmitting, setIsSubmitting] = useState(false)

  const contactDetails = [
    { icon: Mail, label: "Email", value: contact.email },
    { icon: Camera, label: "Instagram", value: contact.instagram },
    {
      icon: MapPin,
      label: "Studio Location",
      value: contact.location,
      note: contact.locationNote,
    },
    {
      icon: Clock3,
      label: "Availability",
      value: contact.availability,
      note: contact.availabilityNote,
    },
  ]

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

    if (!accessKey) {
      toast.add({
        id: submitToastId,
        title: "Message could not be sent",
        description: "The contact form is not configured yet.",
        type: "error",
      })
      return
    }

    setIsSubmitting(true)
    toast.add({
      id: submitToastId,
      title: "Sending message",
      description: "Your message is on its way.",
      type: "loading",
    })

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New enquiry from ${formData.get("name") || "website visitor"}`,
          from_name: "Akeni Art Website",
          replyto: formData.get("email"),
          ...Object.fromEntries(formData.entries()),
        }),
      })

      const result = (await response.json()) as {
        success?: boolean
        message?: string
      }

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Web3Forms rejected the submission.")
      }

      form.reset()
      toast.add({
        id: submitToastId,
        title: "Message sent",
        description:
          "Thank you. I will get back to you within 2-3 business days.",
        type: "success",
      })
    } catch (error) {
      toast.add({
        id: submitToastId,
        title: "Message could not be sent",
        description:
          error instanceof Error
            ? error.message
            : "Please try again in a moment.",
        type: "error",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative min-h-[calc(100svh-90px)] overflow-hidden bg-background px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_83%_40%,rgba(201,154,61,0.12),transparent_28%),radial-gradient(circle_at_14%_68%,rgba(201,154,61,0.08),transparent_24%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 opacity-20 [background:repeating-radial-gradient(ellipse_at_bottom_left,transparent_0,transparent_18px,rgba(247,243,234,0.25)_19px,transparent_20px)]" />

      <div className="relative mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.8fr_1.1fr_0.85fr] lg:gap-16">
        <div className="pt-4">
          <p className="text-sm font-medium tracking-[0.16em] text-secondary uppercase">
            {contact.eyebrow}
          </p>
          <span className="line mt-5 w-20" />

          <h1 className="head mt-8 max-w-[520px] text-4xl leading-[0.95] font-medium text-foreground">
            {contact.title}
            <span className="text-secondary">.</span>
          </h1>

          <p className="mt-10 max-w-[420px] text-lg leading-8 text-muted-foreground">
            {contact.description}
          </p>

          <p className="accent mt-14 max-w-[360px] text-4xl leading-tight text-secondary">
            &ldquo;{contact.quote}&rdquo;
          </p>
        </div>

        <form className="space-y-8 pt-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-base text-foreground">
              Your Name <span className="text-secondary">*</span>
            </span>
            <input
              type="text"
              name="name"
              placeholder="e.g. Alex Morgan"
              className="mt-3 h-16 w-full border border-border bg-card/40 px-6 text-base text-foreground transition-colors outline-none placeholder:text-muted-foreground/70 focus:border-secondary"
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
              className="mt-3 h-16 w-full border border-border bg-card/40 px-6 text-base text-foreground transition-colors outline-none placeholder:text-muted-foreground/70 focus:border-secondary"
            />
          </label>

          <label className="block">
            <span className="text-base text-foreground">
              Project / Commission Type{" "}
              <span className="text-secondary">*</span>
            </span>
            <select
              name="projectType"
              defaultValue=""
              className="mt-3 h-16 w-full border border-border bg-card/40 px-6 text-base text-muted-foreground transition-colors outline-none focus:border-secondary"
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
              Tell me about your project{" "}
              <span className="text-secondary">*</span>
            </span>
            <textarea
              name="message"
              placeholder="Share your ideas, vision, size, timeline, budget, or anything else that helps bring your concept to life..."
              className="mt-3 min-h-48 w-full resize-none border border-border bg-card/40 px-6 py-5 text-base leading-7 text-foreground transition-colors outline-none placeholder:text-muted-foreground/70 focus:border-secondary"
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-16 w-full items-center justify-center gap-7 border border-secondary/80 px-8 text-lg font-medium text-secondary transition-colors hover:border-secondary hover:text-foreground disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
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

        <aside className="border-border lg:border-l lg:pl-10">
          <div className="overflow-hidden border border-border">
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
                    <p className="text-xs font-semibold tracking-[0.22em] text-secondary uppercase">
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
