import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react"
import type * as React from "react"
import { ImagePlus, Save, X } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { toast } from "@/components/ui/toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { artworkCategories, type Artwork, type ArtworkCategory } from "@/data"
import { goldSwitchClass } from "@/components/dashboard/dashboard-shared"
import { uploadImageToR2 } from "@/lib/r2-upload"
import { useArtworkData } from "@/components/dashboard/artwork-data-provider"

const categoryOptions = artworkCategories.filter(
  (category): category is { label: string; value: ArtworkCategory } =>
    category.value !== "all"
)

const statusOptions = [
  "Available",
  "Editioned",
  "Concept",
  "Private collection",
  "Studio archive",
]

function FormField({
  label,
  description,
  value,
  onChange,
  placeholder,
  required = false,
  type = "text",
}: {
  label: string
  description?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  type?: React.HTMLInputTypeAttribute
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-foreground">{label}</span>
      {description ? (
        <span className="mt-1 block text-xs leading-5 text-muted-foreground">
          {description}
        </span>
      ) : null}
      <Input
        type={type}
        value={value}
        onChange={(event) => onChange(event.currentTarget.value)}
        placeholder={placeholder}
        required={required}
        className="mt-2 h-11 rounded-none text-base md:text-sm"
      />
    </label>
  )
}

type ArtworkFormValues = {
  title: string
  year: string
  status: string
  category: ArtworkCategory
  medium: string
  excerpt: string
  story: string
}

function getInitialArtworkValues(artwork?: Artwork): ArtworkFormValues {
  return {
    title: artwork?.title ?? "",
    year: artwork?.year ?? String(new Date().getFullYear()),
    status: artwork?.status ?? "Available",
    category: artwork?.category ?? "paintings",
    medium: artwork?.medium ?? "",
    excerpt: artwork?.excerpt ?? "",
    story: artwork?.story.join("\n\n") ?? "",
  }
}

function slugifyTitle(title: string) {
  return title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export default function ArtworkForm({ artwork }: { artwork?: Artwork }) {
  const navigate = useNavigate()
  const { createArtwork, updateArtwork } = useArtworkData()
  const [values, setValues] = useState(() => getInitialArtworkValues(artwork))
  const [imagePreview, setImagePreview] = useState(artwork?.src ?? "")
  const [imageName, setImageName] = useState("")
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [published, setPublished] = useState(artwork?.published !== false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    return () => {
      if (imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview)
      }
    }
  }, [imagePreview])

  function updateField<Key extends keyof ArtworkFormValues>(
    field: Key,
    value: ArtworkFormValues[Key]
  ) {
    setValues((current) => ({ ...current, [field]: value }))
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    if (!file.type.startsWith("image/")) {
      toast.add({
        title: "Unsupported file",
        description: "Please choose an image file.",
        type: "error",
      })
      event.target.value = ""
      return
    }

    setImagePreview(URL.createObjectURL(file))
    setImageName(file.name)
    setSelectedImage(file)
  }

  function clearImage() {
    setImagePreview(artwork?.src ?? "")
    setImageName("")
    setSelectedImage(null)

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const generatedSlug = slugifyTitle(values.title)

    if (!generatedSlug) {
      toast.add({
        title: "Artwork title required",
        description: "Add a title before saving this artwork.",
        type: "error",
      })
      return
    }

    setIsSaving(true)

    try {
      let imageKey = artwork?.imageKey || ""

      if (selectedImage) {
        setIsUploading(true)
        const upload = await uploadImageToR2(selectedImage)
        imageKey = upload.key
      }

      const payload = {
        id: artwork?.id,
        slug: generatedSlug,
        title: values.title.trim(),
        year: values.year,
        status: values.status,
        category: values.category,
        medium: values.medium,
        dimensions: artwork?.dimensions ?? "",
        imageKey,
        alt: artwork?.alt || values.title.trim(),
        excerpt: values.excerpt,
        story: values.story
          .split(/\n\s*\n/)
          .map((paragraph) => paragraph.trim())
          .filter(Boolean),
        process: artwork?.process ?? [],
        published,
      }

      if (artwork) {
        await updateArtwork(artwork.id, payload)
      } else {
        await createArtwork(payload)
      }

      toast.add({
        title: artwork ? "Artwork updated" : "Artwork created",
        description: `${values.title.trim()} was saved successfully.`,
        type: "success",
      })
      navigate(`/dashboard/artworks/${generatedSlug}`)
    } catch (error) {
      toast.add({
        title: artwork ? "Update failed" : "Create failed",
        description:
          error instanceof Error
            ? error.message
            : "Could not save this artwork.",
        type: "error",
      })
    } finally {
      setIsUploading(false)
      setIsSaving(false)
    }
  }

  return (
    <form
      id="artwork-form"
      className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]"
      onSubmit={handleSubmit}
    >
      <section className="border border-border bg-card/40 p-5">
        <div className="grid gap-5 md:grid-cols-2">
          <FormField
            label="Artwork title"
            description="Shown across the public gallery and detail page."
            value={values.title}
            onChange={(value) => updateField("title", value)}
            placeholder="e.g. Veiled Figure"
            required
          />
          <FormField
            label="Year"
            type="number"
            value={values.year}
            onChange={(value) =>
              updateField("year", value.replace(/\D/g, "").slice(0, 4))
            }
            placeholder="e.g. 2026"
          />
          <label className="block">
            <span className="text-sm font-semibold text-foreground">
              Status
            </span>
            <span className="mt-1 block text-xs leading-5 text-muted-foreground">
              Controls how the piece is presented to visitors.
            </span>
            <select
              value={values.status}
              onChange={(event) =>
                updateField("status", event.currentTarget.value)
              }
              className="mt-2 h-11 w-full border border-input bg-background px-3 text-base text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-foreground">
              Category
            </span>
            <span className="mt-1 block text-xs leading-5 text-muted-foreground">
              Controls where the piece appears in filtered collections.
            </span>
            <select
              value={values.category}
              onChange={(event) =>
                updateField(
                  "category",
                  event.currentTarget.value as ArtworkCategory
                )
              }
              className="mt-2 h-11 w-full border border-input bg-background px-3 text-base text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
            >
              {categoryOptions.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </label>
          <div className="md:col-span-2">
            <FormField
              label="Medium"
              value={values.medium}
              onChange={(value) => updateField("medium", value)}
              placeholder="e.g. Acrylic and mineral pigment"
            />
          </div>
        </div>

        <label className="mt-5 block">
          <span className="text-sm font-semibold text-foreground">
            Short description
          </span>
          <span className="mt-1 block text-xs leading-5 text-muted-foreground">
            A concise summary used in gallery previews.
          </span>
          <textarea
            value={values.excerpt}
            onChange={(event) =>
              updateField("excerpt", event.currentTarget.value)
            }
            placeholder="Write a concise summary for gallery previews."
            className="mt-2 min-h-28 w-full resize-none border border-input bg-background px-3 py-3 text-base leading-7 text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
          />
        </label>

        <label className="mt-5 block">
          <span className="text-sm font-semibold text-foreground">
            Story text
          </span>
          <span className="mt-1 block text-xs leading-5 text-muted-foreground">
            Longer writing displayed on the artwork detail page.
          </span>
          <textarea
            value={values.story}
            onChange={(event) =>
              updateField("story", event.currentTarget.value)
            }
            placeholder="Write the longer story for the artwork detail page."
            className="mt-2 min-h-44 w-full resize-none border border-input bg-background px-3 py-3 text-base leading-7 text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
          />
        </label>
      </section>

      <aside className="space-y-6">
        <section className="border border-border bg-card/40 p-5">
          <button
            type="button"
            aria-label={
              imagePreview ? "Replace artwork image" : "Upload artwork image"
            }
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
            className="mx-auto block w-full max-w-[280px] overflow-hidden border border-border bg-background text-left transition-colors hover:border-secondary focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 sm:max-w-[320px] lg:max-w-[340px] xl:max-w-none"
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt={values.title || artwork?.alt || "Artwork preview"}
                className="aspect-[4/5] w-full object-cover"
              />
            ) : (
              <div className="grid aspect-[4/5] place-items-center text-center text-muted-foreground">
                <div>
                  <ImagePlus className="mx-auto size-8" strokeWidth={1.5} />
                  <p className="mt-3 text-sm">Upload artwork image</p>
                  <p className="mt-1 text-xs">Click to choose a picture</p>
                </div>
              </div>
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="sr-only"
          />
          <Button
            type="button"
            variant="outline"
            className="mt-4 w-full"
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
          >
            <ImagePlus className="size-4" strokeWidth={1.7} />
            {isUploading
              ? "Uploading..."
              : imagePreview
                ? "Replace Image"
                : "Upload Image"}
          </Button>
          {imageName ? (
            <div className="mt-3 flex items-center justify-between gap-3 text-xs text-muted-foreground">
              <span className="min-w-0 truncate">{imageName}</span>
              <button
                type="button"
                onClick={clearImage}
                className="inline-flex shrink-0 items-center gap-1 text-secondary transition-colors hover:text-foreground"
              >
                <X className="size-3.5" strokeWidth={1.8} />
                Remove
              </button>
            </div>
          ) : null}
        </section>

        <section className="border border-border bg-card/40 p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-foreground">Published</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Show this piece on the public site.
              </p>
            </div>
            <Switch
              checked={published}
              aria-label="Published"
              className={goldSwitchClass}
              onCheckedChange={setPublished}
            />
          </div>
          <Button
            type="submit"
            className="mt-5 w-full bg-secondary text-secondary-foreground hover:bg-secondary/85"
            disabled={isUploading || isSaving}
          >
            <Save className="size-4" strokeWidth={1.8} />
            {isUploading
              ? "Uploading Image..."
              : isSaving
                ? "Saving..."
                : "Save Artwork"}
          </Button>
        </section>
      </aside>
    </form>
  )
}
