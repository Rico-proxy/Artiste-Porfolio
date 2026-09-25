import { CheckCircle2, Database, ImageUp, LoaderCircle } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { migrateStaticContent } from "@/lib/static-migration"
import type { MigrationProgress } from "@/lib/static-migration"

export default function ImportStaticPage() {
  const [isImporting, setIsImporting] = useState(false)
  const [progress, setProgress] = useState<MigrationProgress | null>(null)
  const [finished, setFinished] = useState(false)

  async function handleImport() {
    setIsImporting(true)
    setFinished(false)

    try {
      const result = await migrateStaticContent({ onProgress: setProgress })
      setFinished(true)
      toast.add({
        title: "Content imported",
        description: `${result.saved} artworks and their images were added. Nothing was deleted.`,
        type: "success",
      })
    } catch (error) {
      toast.add({
        title: "Import failed",
        description: error instanceof Error ? error.message : "Could not import the existing content.",
        type: "error",
      })
    } finally {
      setIsImporting(false)
    }
  }

  const percentage = progress
    ? Math.round((progress.completed / progress.total) * 100)
    : 0

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <p className="text-xs font-semibold tracking-[0.2em] text-secondary uppercase">
          One-time setup
        </p>
        <h1 className="head mt-3 text-5xl leading-none font-medium text-foreground">
          Import Existing Content
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
          Copy the current static artwork catalog, bundled images, and site text into Cloudflare. This is repeatable and only creates or updates matching records.
        </p>
      </div>

      <section className="border border-border bg-card/40 p-5 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="border border-border bg-background p-4">
            <ImageUp className="size-5 text-secondary" strokeWidth={1.7} />
            <p className="mt-4 text-sm font-semibold">49 images</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">Uploaded to R2 when missing.</p>
          </div>
          <div className="border border-border bg-background p-4">
            <Database className="size-5 text-secondary" strokeWidth={1.7} />
            <p className="mt-4 text-sm font-semibold">49 artworks</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">Saved to the D1 catalog.</p>
          </div>
          <div className="border border-border bg-background p-4">
            <CheckCircle2 className="size-5 text-secondary" strokeWidth={1.7} />
            <p className="mt-4 text-sm font-semibold">Site text</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">Initialized only if it is empty.</p>
          </div>
        </div>

        {progress ? (
          <div className="mt-6 border border-border bg-background p-4">
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="truncate text-foreground">{progress.current}</span>
              <span className="shrink-0 text-muted-foreground">{percentage}%</span>
            </div>
            <div className="mt-3 h-2 bg-muted">
              <div className="h-full bg-secondary transition-all" style={{ width: `${percentage}%` }} />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              {progress.saved} saved · {progress.uploaded} images uploaded
            </p>
          </div>
        ) : null}

        <Button
          type="button"
          disabled={isImporting}
          onClick={() => void handleImport()}
          className="mt-6 bg-secondary text-secondary-foreground hover:bg-secondary/85"
        >
          {isImporting ? <LoaderCircle className="size-4 animate-spin" strokeWidth={1.8} /> : <Database className="size-4" strokeWidth={1.8} />}
          {isImporting ? "Importing..." : finished ? "Import Again" : "Import Existing Content"}
        </Button>
      </section>
    </div>
  )
}
