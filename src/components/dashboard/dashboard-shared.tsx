import { ArrowLeft, Eye, Pencil, Trash2, type LucideIcon } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

import { toast } from "@/components/ui/toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Switch } from "@/components/ui/switch"
import { useArtworkData } from "@/components/dashboard/artwork-data-provider"
import { type Artwork } from "@/data"

export const goldButtonClass =
  "inline-flex h-8 items-center justify-center gap-1.5 rounded-lg bg-secondary px-2.5 text-sm font-semibold text-secondary-foreground transition-all hover:bg-secondary/85"

export const goldSwitchClass =
  "data-checked:bg-secondary focus-visible:ring-secondary/40"

export function StatCard({
  label,
  value,
  detail,
  icon: Icon,
}: {
  label: string
  value: string
  detail: string
  icon: LucideIcon
}) {
  return (
    <article className="border border-border bg-card/45 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            {label}
          </p>
          <p className="mt-3 text-3xl font-semibold text-foreground">{value}</p>
        </div>
        <span className="grid size-10 place-items-center bg-secondary/12 text-secondary">
          <Icon className="size-5" strokeWidth={1.7} />
        </span>
      </div>
      <p className="mt-5 text-sm text-muted-foreground">{detail}</p>
    </article>
  )
}

export function ArtworkTable({ works }: { works: Artwork[] }) {
  const { togglePublished } = useArtworkData()

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="border-b border-border text-xs tracking-[0.14em] text-muted-foreground uppercase">
          <tr>
            <th className="px-5 py-3 font-semibold">Artwork</th>
            <th className="px-5 py-3 font-semibold">Category</th>
            <th className="px-5 py-3 font-semibold">Status</th>
            <th className="px-5 py-3 font-semibold">Published</th>
            <th className="px-5 py-3 text-right font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {works.map((artwork) => (
            <tr
              key={artwork.slug}
              className="transition-colors hover:bg-card/70"
            >
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <img
                    src={artwork.src}
                    alt={artwork.alt}
                    className="size-12 object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-foreground">
                      {artwork.title}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {artwork.year}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-4 text-muted-foreground">
                {artwork.category}
              </td>
              <td className="px-5 py-4">
                <span className="border border-border px-3 py-1 text-xs text-muted-foreground">
                  {artwork.status}
                </span>
              </td>
              <td className="px-5 py-4">
                <Switch
                  checked={artwork.published !== false}
                  aria-label={`Publish ${artwork.title}`}
                  className={goldSwitchClass}
                  onCheckedChange={async (published) => {
                    try {
                      await togglePublished(artwork.id, published)
                      toast.add({
                        title: published ? "Artwork published" : "Artwork unpublished",
                        description: `${artwork.title} visibility was updated.`,
                        type: "success",
                      })
                    } catch (error) {
                      toast.add({
                        title: "Visibility update failed",
                        description: error instanceof Error ? error.message : "Could not update this artwork.",
                        type: "error",
                      })
                    }
                  }}
                />
              </td>
              <td className="px-5 py-4">
                <div className="flex justify-end gap-2">
                  <Link
                    to={`/dashboard/artworks/${artwork.slug}`}
                    className="grid size-9 place-items-center border border-border text-muted-foreground transition-colors hover:border-secondary hover:text-secondary"
                    aria-label={`View ${artwork.title}`}
                  >
                    <Eye className="size-4" strokeWidth={1.7} />
                  </Link>
                  <Link
                    to={`/dashboard/artworks/${artwork.slug}/edit`}
                    className="grid size-9 place-items-center border border-border text-muted-foreground transition-colors hover:border-secondary hover:text-secondary"
                    aria-label={`Edit ${artwork.title}`}
                  >
                    <Pencil className="size-4" strokeWidth={1.7} />
                  </Link>
                  <DeleteArtworkButton artwork={artwork} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function DeleteArtworkButton({ artwork, onDeleted }: { artwork: Artwork; onDeleted?: () => void }) {
  const { deleteArtwork } = useArtworkData()
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  async function confirmDelete() {
    setIsDeleting(true)
    try {
      await deleteArtwork(artwork.id)
      setOpen(false)
      toast.add({
        title: "Artwork deleted",
        description: `${artwork.title} was removed successfully.`,
        type: "success",
      })
      onDeleted?.()
    } catch (error) {
      toast.add({
        title: "Delete failed",
        description: error instanceof Error ? error.message : "Could not delete this artwork.",
        type: "error",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <button
        type="button"
        className="grid size-9 place-items-center border border-border text-muted-foreground transition-colors hover:border-destructive hover:text-destructive"
        aria-label={`Delete ${artwork.title}`}
        onClick={() => setOpen(true)}
      >
        <Trash2 className="size-4" strokeWidth={1.7} />
      </button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this artwork?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove “{artwork.title}” from the dashboard and delete its stored R2 image when available.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="inline-flex h-10 items-center justify-center border border-border px-4 text-sm font-medium hover:bg-muted">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={isDeleting}
              onClick={confirmDelete}
              className="inline-flex h-10 items-center justify-center bg-destructive px-4 text-sm font-semibold text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : "Delete artwork"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export function PageBack({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-secondary"
    >
      <ArrowLeft className="size-4" strokeWidth={1.7} />
      {label}
    </Link>
  )
}
