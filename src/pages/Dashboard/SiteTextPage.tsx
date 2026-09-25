import { ChevronDown, RotateCcw, Save } from "lucide-react"
import { useEffect, useState, type FormEvent } from "react"

import {
  defaultSiteContent,
  useSiteContent,
  type SiteContent,
} from "@/components/site-content-provider"
import { useArtworkData } from "@/components/dashboard/artwork-data-provider"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/toast"

function SiteTextField({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  multiline?: boolean
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-foreground">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.currentTarget.value)}
          className="mt-2 min-h-28 w-full resize-y border border-input bg-background px-3 py-3 text-base leading-7 text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
        />
      ) : (
        <Input
          value={value}
          onChange={(event) => onChange(event.currentTarget.value)}
          className="mt-2 h-11 rounded-none text-base md:text-sm"
        />
      )}
    </label>
  )
}

export default function SiteTextPage() {
  const { content, saveContent, resetContent } = useSiteContent()
  const { artworks } = useArtworkData()
  const [draft, setDraft] = useState<SiteContent>(content)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    queueMicrotask(() => setDraft(content))
  }, [content])
  const selectedKulukismArtwork =
    artworks.find((artwork) => String(artwork.id) === String(draft.kulukism.artworkId)) ??
    artworks[0]

  function updateDraft<Section extends keyof SiteContent>(
    section: Section,
    field: keyof SiteContent[Section],
    value: string
  ) {
    setDraft((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [field]: value,
      },
    }))
  }

  function updateExhibition(
    index: number,
    field: keyof SiteContent["exhibitions"]["items"][number],
    value: string
  ) {
    setDraft((current) => ({
      ...current,
      exhibitions: {
        ...current.exhibitions,
        items: current.exhibitions.items.map((item, itemIndex) =>
          itemIndex === index ? { ...item, [field]: value } : item
        ),
      },
    }))
  }

  function updateService(
    index: number,
    field: "title" | "text",
    value: string
  ) {
    setDraft((current) => ({
      ...current,
      ualStudios: {
        ...current.ualStudios,
        services: current.ualStudios.services.map((item, itemIndex) =>
          itemIndex === index ? { ...item, [field]: value } : item
        ),
      },
    }))
  }

  function updateKulukismSection(
    index: number,
    field: "title" | "text",
    value: string
  ) {
    setDraft((current) => ({
      ...current,
      kulukism: {
        ...current.kulukism,
        sections: current.kulukism.sections.map((item, itemIndex) =>
          itemIndex === index ? { ...item, [field]: value } : item
        ),
      },
    }))
  }

  function updateKulukismArtwork(value: number | string) {
    setDraft((current) => ({
      ...current,
      kulukism: {
        ...current.kulukism,
        artworkId: value,
      },
    }))
  }

  function updateProject(
    index: number,
    field: "title" | "category" | "location" | "summary" | "artworkId",
    value: string | number
  ) {
    setDraft((current) => ({
      ...current,
      projects: {
        ...current.projects,
        items: current.projects.items.map((item, itemIndex) =>
          itemIndex === index ? { ...item, [field]: value } : item
        ),
      },
    }))
  }

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSaving(true)
    try {
      await saveContent(draft)
      toast.add({
        title: "Saved",
        description: "Your site text was saved.",
        type: "success",
      })
    } catch (error) {
      toast.add({
        title: "Site text save failed",
        description: error instanceof Error ? error.message : "Could not save the site text.",
        type: "error",
      })
    } finally {
      setIsSaving(false)
    }
  }

  async function handleReset() {
    setDraft(defaultSiteContent)
    try {
      await resetContent()
      toast.add({
        title: "Site text reset",
        description: "The original website copy has been restored.",
        type: "success",
      })
    } catch (error) {
      toast.add({
        title: "Reset failed",
        description: error instanceof Error ? error.message : "Could not reset the site text.",
        type: "error",
      })
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSave}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="head text-5xl leading-none font-medium text-secondary">
            Site Text
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            Edit the shared copy used across the public website.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button type="button" variant="outline" onClick={handleReset} disabled={isSaving}>
            <RotateCcw className="size-4" strokeWidth={1.8} />
            Reset
          </Button>
          <Button
            type="submit"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/85"
            disabled={isSaving}
          >
            <Save className="size-4" strokeWidth={1.8} />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="border border-border bg-card/40 p-5">
          <div className="border-b border-border pb-4">
            <h2 className="text-lg font-semibold text-foreground">Hero</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Homepage introduction and primary call to action.
            </p>
          </div>
          <div className="mt-5 space-y-5">
            <SiteTextField
              label="Eyebrow"
              value={draft.hero.eyebrow}
              onChange={(value) => updateDraft("hero", "eyebrow", value)}
            />
            <SiteTextField
              label="Headline"
              value={draft.hero.title}
              onChange={(value) => updateDraft("hero", "title", value)}
            />
            <SiteTextField
              label="Description"
              value={draft.hero.description}
              onChange={(value) => updateDraft("hero", "description", value)}
              multiline
            />
            <SiteTextField
              label="Button label"
              value={draft.hero.ctaLabel}
              onChange={(value) => updateDraft("hero", "ctaLabel", value)}
            />
          </div>
        </section>

        <section className="border border-border bg-card/40 p-5">
          <div className="border-b border-border pb-4">
            <h2 className="text-lg font-semibold text-foreground">About</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              The artist introduction and long-form profile copy.
            </p>
          </div>
          <div className="mt-5 space-y-5">
            <SiteTextField
              label="Eyebrow"
              value={draft.about.eyebrow}
              onChange={(value) => updateDraft("about", "eyebrow", value)}
            />
            <SiteTextField
              label="Artist name"
              value={draft.about.title}
              onChange={(value) => updateDraft("about", "title", value)}
            />
            <SiteTextField
              label="Summary"
              value={draft.about.summary}
              onChange={(value) => updateDraft("about", "summary", value)}
              multiline
            />
            <div className="grid gap-5 md:grid-cols-2">
              <SiteTextField
                label="Biography heading"
                value={draft.about.biographyTitle}
                onChange={(value) =>
                  updateDraft("about", "biographyTitle", value)
                }
              />
              <SiteTextField
                label="Philosophy heading"
                value={draft.about.philosophyTitle}
                onChange={(value) =>
                  updateDraft("about", "philosophyTitle", value)
                }
              />
            </div>
            <SiteTextField
              label="Biography"
              value={draft.about.biography}
              onChange={(value) => updateDraft("about", "biography", value)}
              multiline
            />
            <SiteTextField
              label="Artistic philosophy"
              value={draft.about.philosophy}
              onChange={(value) => updateDraft("about", "philosophy", value)}
              multiline
            />
          </div>
        </section>

        <section className="border border-border bg-card/40 p-5 xl:col-span-2">
          <div className="border-b border-border pb-4">
            <h2 className="text-lg font-semibold text-foreground">Contact</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Introductory copy and studio details shown on the contact page.
            </p>
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <SiteTextField
              label="Eyebrow"
              value={draft.contact.eyebrow}
              onChange={(value) => updateDraft("contact", "eyebrow", value)}
            />
            <SiteTextField
              label="Heading"
              value={draft.contact.title}
              onChange={(value) => updateDraft("contact", "title", value)}
            />
            <div className="md:col-span-2">
              <SiteTextField
                label="Description"
                value={draft.contact.description}
                onChange={(value) =>
                  updateDraft("contact", "description", value)
                }
                multiline
              />
            </div>
            <SiteTextField
              label="Quote"
              value={draft.contact.quote}
              onChange={(value) => updateDraft("contact", "quote", value)}
            />
            <SiteTextField
              label="Email"
              value={draft.contact.email}
              onChange={(value) => updateDraft("contact", "email", value)}
            />
            <SiteTextField
              label="Instagram"
              value={draft.contact.instagram}
              onChange={(value) => updateDraft("contact", "instagram", value)}
            />
            <SiteTextField
              label="Studio location"
              value={draft.contact.location}
              onChange={(value) => updateDraft("contact", "location", value)}
            />
            <SiteTextField
              label="Location note"
              value={draft.contact.locationNote}
              onChange={(value) =>
                updateDraft("contact", "locationNote", value)
              }
            />
            <SiteTextField
              label="Availability"
              value={draft.contact.availability}
              onChange={(value) =>
                updateDraft("contact", "availability", value)
              }
            />
            <SiteTextField
              label="Availability note"
              value={draft.contact.availabilityNote}
              onChange={(value) =>
                updateDraft("contact", "availabilityNote", value)
              }
            />
          </div>
        </section>

        <section className="border border-border bg-card/40 p-5 xl:col-span-2">
          <div className="border-b border-border pb-4">
            <h2 className="text-lg font-semibold text-foreground">
              Exhibitions
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Update the exhibition history shown on the public page.
            </p>
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <SiteTextField
              label="Eyebrow"
              value={draft.exhibitions.eyebrow}
              onChange={(value) => updateDraft("exhibitions", "eyebrow", value)}
            />
            <SiteTextField
              label="Heading"
              value={draft.exhibitions.title}
              onChange={(value) => updateDraft("exhibitions", "title", value)}
            />
          </div>
          <div className="mt-6 space-y-5">
            {draft.exhibitions.items.map((item, index) => (
              <div
                key={`${item.year}-${index}`}
                className="grid gap-4 border-t border-border pt-5 md:grid-cols-[120px_1.3fr_1fr_180px]"
              >
                <SiteTextField
                  label="Year"
                  value={item.year}
                  onChange={(value) => updateExhibition(index, "year", value)}
                />
                <SiteTextField
                  label="Title"
                  value={item.title}
                  onChange={(value) => updateExhibition(index, "title", value)}
                />
                <SiteTextField
                  label="Type"
                  value={item.type}
                  onChange={(value) => updateExhibition(index, "type", value)}
                />
                <SiteTextField
                  label="Location"
                  value={item.location}
                  onChange={(value) =>
                    updateExhibition(index, "location", value)
                  }
                />
              </div>
            ))}
          </div>
        </section>

        <section className="border border-border bg-card/40 p-5">
          <div className="border-b border-border pb-4">
            <h2 className="text-lg font-semibold text-foreground">
              UAL Studios
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Edit the studio practice introduction, services, and process.
            </p>
          </div>
          <div className="mt-5 space-y-5">
            <SiteTextField
              label="Eyebrow"
              value={draft.ualStudios.eyebrow}
              onChange={(value) => updateDraft("ualStudios", "eyebrow", value)}
            />
            <SiteTextField
              label="Heading"
              value={draft.ualStudios.title}
              onChange={(value) => updateDraft("ualStudios", "title", value)}
            />
            <SiteTextField
              label="Introduction"
              value={draft.ualStudios.description}
              onChange={(value) =>
                updateDraft("ualStudios", "description", value)
              }
              multiline
            />
            {draft.ualStudios.services.map((service, index) => (
              <div key={index} className="border-t border-border pt-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <SiteTextField
                    label="Service title"
                    value={service.title}
                    onChange={(value) => updateService(index, "title", value)}
                  />
                  <SiteTextField
                    label="Service description"
                    value={service.text}
                    onChange={(value) => updateService(index, "text", value)}
                    multiline
                  />
                </div>
              </div>
            ))}
            <SiteTextField
              label="Process steps"
              value={draft.ualStudios.steps.join("\n")}
              onChange={(value) =>
                updateDraft(
                  "ualStudios",
                  "steps",
                  value.split("\n").filter((step) => step.trim()) as never
                )
              }
              multiline
            />
          </div>
        </section>

        <section className="border border-border bg-card/40 p-5">
          <div className="border-b border-border pb-4">
            <h2 className="text-lg font-semibold text-foreground">Kulukism</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Edit the concept introduction, principles, and selected sections.
            </p>
          </div>
          <div className="mt-5 space-y-5">
            <SiteTextField
              label="Eyebrow"
              value={draft.kulukism.eyebrow}
              onChange={(value) => updateDraft("kulukism", "eyebrow", value)}
            />
            <SiteTextField
              label="Heading"
              value={draft.kulukism.title}
              onChange={(value) => updateDraft("kulukism", "title", value)}
            />
            <SiteTextField
              label="Introduction"
              value={draft.kulukism.description}
              onChange={(value) =>
                updateDraft("kulukism", "description", value)
              }
              multiline
            />
            <label className="block">
              <span className="text-sm font-semibold text-foreground">
                Featured image
              </span>
              <select
                value={String(draft.kulukism.artworkId)}
                onChange={(event) =>
                  updateKulukismArtwork(
                    artworks.find(
                      (artwork) => String(artwork.id) === event.currentTarget.value
                    )?.id ?? event.currentTarget.value
                  )
                }
                className="mt-2 h-11 w-full border border-input bg-background px-3 text-base text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
              >
                {artworks.map((artwork) => (
                  <option key={artwork.id} value={artwork.id}>
                    {artwork.title}
                  </option>
                ))}
              </select>
              <div className="mt-3 flex items-center gap-3 border border-border bg-background p-2">
                <img
                  src={selectedKulukismArtwork.src}
                  alt={selectedKulukismArtwork.alt}
                  className="size-16 shrink-0 object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {selectedKulukismArtwork.title}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Selected Kulukism image
                  </p>
                </div>
              </div>
            </label>
            {draft.kulukism.principles.map((principle, index) => (
              <SiteTextField
                key={index}
                label={`Principle ${index + 1}`}
                value={principle}
                onChange={(value) => {
                  const principles = [...draft.kulukism.principles]
                  principles[index] = value
                  updateDraft("kulukism", "principles", principles as never)
                }}
              />
            ))}
            {draft.kulukism.sections.map((section, index) => (
              <div key={index} className="border-t border-border pt-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <SiteTextField
                    label="Section heading"
                    value={section.title}
                    onChange={(value) =>
                      updateKulukismSection(index, "title", value)
                    }
                  />
                  <SiteTextField
                    label="Section text"
                    value={section.text}
                    onChange={(value) =>
                      updateKulukismSection(index, "text", value)
                    }
                    multiline
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="border border-border bg-card/40 p-5 xl:col-span-2">
          <div className="border-b border-border pb-4">
            <h2 className="text-lg font-semibold text-foreground">Projects</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Edit project details and choose an existing artwork for each
              project image.
            </p>
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <SiteTextField
              label="Eyebrow"
              value={draft.projects.eyebrow}
              onChange={(value) => updateDraft("projects", "eyebrow", value)}
            />
            <SiteTextField
              label="Heading"
              value={draft.projects.title}
              onChange={(value) => updateDraft("projects", "title", value)}
            />
            <div className="md:col-span-2">
              <SiteTextField
                label="Introduction"
                value={draft.projects.description}
                onChange={(value) =>
                  updateDraft("projects", "description", value)
                }
                multiline
              />
            </div>
            <div className="md:col-span-2">
              <SiteTextField
                label="Categories"
                value={draft.projects.categories.join("\n")}
                onChange={(value) =>
                  updateDraft(
                    "projects",
                    "categories",
                    value
                      .split("\n")
                      .filter((category) => category.trim()) as never
                  )
                }
                multiline
              />
            </div>
          </div>
          <div className="mt-6 space-y-6">
            {draft.projects.items.map((project, index) => {
              const selectedArtwork =
                artworks.find((artwork) => String(artwork.id) === String(project.artworkId)) ??
                artworks[0]

              return (
                <Collapsible
                  key={index}
                  defaultOpen={index === 0}
                  className="border-t border-border pt-5"
                >
                  <CollapsibleTrigger className="group flex w-full items-center justify-between gap-4 text-left">
                    <span>
                      <span className="block text-xs font-semibold tracking-[0.16em] text-secondary uppercase">
                        Project {index + 1}
                      </span>
                      <span className="mt-1 block text-lg font-semibold text-foreground">
                        {project.title || "Untitled project"}
                      </span>
                    </span>
                    <ChevronDown
                      className="size-5 shrink-0 text-muted-foreground transition-transform group-data-open:rotate-180"
                      strokeWidth={1.7}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-5">
                    <div className="grid gap-5 md:grid-cols-2">
                      <SiteTextField
                        label="Project title"
                        value={project.title}
                        onChange={(value) =>
                          updateProject(index, "title", value)
                        }
                      />
                      <SiteTextField
                        label="Category"
                        value={project.category}
                        onChange={(value) =>
                          updateProject(index, "category", value)
                        }
                      />
                      <SiteTextField
                        label="Location"
                        value={project.location}
                        onChange={(value) =>
                          updateProject(index, "location", value)
                        }
                      />
                      <label className="block">
                        <span className="text-sm font-semibold text-foreground">
                          Artwork image
                        </span>
                        <select
                          value={String(project.artworkId)}
                          onChange={(event) =>
                            updateProject(
                              index,
                              "artworkId",
                              artworks.find(
                                (artwork) =>
                                  String(artwork.id) === event.currentTarget.value
                              )?.id ?? event.currentTarget.value
                            )
                          }
                          className="mt-2 h-11 w-full border border-input bg-background px-3 text-base text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
                        >
                          {artworks.map((artwork) => (
                            <option key={artwork.id} value={artwork.id}>
                              {artwork.title}
                            </option>
                          ))}
                        </select>
                        <div className="mt-3 flex items-center gap-3 border border-border bg-background p-2">
                          <img
                            src={selectedArtwork.src}
                            alt={selectedArtwork.alt}
                            className="size-16 shrink-0 object-cover"
                          />
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-foreground">
                              {selectedArtwork.title}
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              Selected project image
                            </p>
                          </div>
                        </div>
                      </label>
                      <div className="md:col-span-2">
                        <SiteTextField
                          label="Project introduction"
                          value={project.summary}
                          onChange={(value) =>
                            updateProject(index, "summary", value)
                          }
                          multiline
                        />
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )
            })}
          </div>
        </section>
      </div>
    </form>
  )
}
