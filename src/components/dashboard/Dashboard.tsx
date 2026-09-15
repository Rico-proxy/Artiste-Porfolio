import type * as React from "react"
import {
  ArrowLeft,
  BarChart3,
  Eye,
  FileText,
  Home,
  ImagePlus,
  Images,
  LayoutDashboard,
  Menu,
  Pencil,
  Plus,
  Save,
  Search,
  Settings,
  Trash2,
  Upload,
} from "lucide-react"
import { Link, NavLink, Navigate, Route, Routes, useParams } from "react-router-dom"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ThemeToggle from "@/components/shared/theme-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import {
  artworkCategories,
  artworks,
  getArtworkBySlug,
  type Artwork,
  type ArtworkCategory,
} from "@/data"

const navItems = [
  { label: "Overview", to: "/dashboard", icon: LayoutDashboard, end: true },
  { label: "Artworks", to: "/dashboard/artworks", icon: Images },
  { label: "Create", to: "/dashboard/create", icon: Plus },
  { label: "Site Text", to: "/dashboard/content", icon: FileText },
  { label: "Settings", to: "/dashboard/settings", icon: Settings },
]

const categoryOptions = artworkCategories.filter(
  (category): category is { label: string; value: ArtworkCategory } =>
    category.value !== "all"
)

const goldButtonClass =
  "inline-flex h-8 items-center justify-center gap-1.5 rounded-lg bg-secondary px-2.5 text-sm font-semibold text-secondary-foreground transition-all hover:bg-secondary/85"

const goldSwitchClass =
  "data-checked:bg-secondary focus-visible:ring-secondary/40"

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col bg-[#111113] text-[#f7f3ea]">
      <div className="border-b border-white/10 px-6 py-6">
        <Link
          to="/dashboard"
          className="head text-2xl font-bold uppercase tracking-[0.28em]"
          onClick={onNavigate}
        >
          AKENI<span className="text-secondary">.</span>
        </Link>
        <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/45">
          Studio Admin
        </p>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-5">
        {navItems.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onNavigate}
              className={({ isActive }) =>
                [
                  "flex h-11 items-center gap-3 px-3 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-secondary text-secondary-foreground"
                    : "text-white/68 hover:bg-white/5 hover:text-white",
                ].join(" ")
              }
            >
              <Icon className="size-4" strokeWidth={1.8} />
              {item.label}
            </NavLink>
          )
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        <Link
          to="/"
          className="flex h-10 items-center gap-3 px-3 text-sm text-white/60 transition-colors hover:text-secondary"
          onClick={onNavigate}
        >
          <Home className="size-4" strokeWidth={1.8} />
          Public Site
        </Link>
      </div>
    </div>
  )
}

function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-border lg:block">
        <SidebarContent />
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
          <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <Sheet>
                <SheetTrigger
                  aria-label="Open dashboard sidebar"
                  className="grid size-10 place-items-center border border-border text-foreground transition-colors hover:border-secondary hover:text-secondary lg:hidden"
                >
                  <Menu className="size-5" strokeWidth={1.8} />
                </SheetTrigger>
                <SheetContent
                  side="left"
                  showCloseButton={false}
                  className="w-72 max-w-[calc(100vw-1rem)] p-0"
                >
                  <SheetHeader className="sr-only">
                    <SheetTitle>Dashboard Navigation</SheetTitle>
                    <SheetDescription>
                      Navigate between dashboard sections.
                    </SheetDescription>
                  </SheetHeader>
                  <SidebarContent />
                </SheetContent>
              </Sheet>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                  Dashboard
                </p>
                <p className="text-sm text-muted-foreground">
                  Manage artworks, text, images, and publishing.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-foreground">Hi, Admin</p>
                <p className="text-xs text-muted-foreground">
                  Prince Akeni Studio
                </p>
              </div>
              <Avatar size="lg">
                <AvatarImage src={artworks[0].src} alt="Admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
  detail,
  icon: Icon,
}: {
  label: string
  value: string
  detail: string
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
}) {
  return (
    <article className="border border-border bg-card/45 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
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

function DashboardOverview() {
  const availableCount = artworks.filter((artwork) =>
    artwork.status.toLowerCase().includes("available")
  ).length

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="head text-5xl font-medium leading-none text-foreground">
            Overview
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            A Firebase-ready admin interface for updating artwork images, text,
            visibility, and gallery details.
          </p>
        </div>
        <Link
          to="/dashboard/create"
          className={goldButtonClass}
        >
          <Plus className="size-4" strokeWidth={1.8} />
          New Artwork
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="Artworks"
          value={String(artworks.length)}
          detail="Current pieces in the local mock collection."
          icon={Images}
        />
        <StatCard
          label="Available"
          value={String(availableCount)}
          detail="Pieces marked as available for public inquiry."
          icon={BarChart3}
        />
        <StatCard
          label="Storage"
          value="Firebase"
          detail="Future image and text updates will sync from Firebase."
          icon={Upload}
        />
      </div>

      <section className="border border-border bg-card/40">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Recent Artworks
            </h2>
            <p className="text-sm text-muted-foreground">
              Quick access to view, edit, or remove pieces.
            </p>
          </div>
          <Link
            to="/dashboard/artworks"
            className="text-sm font-semibold text-secondary transition-colors hover:text-foreground"
          >
            View all
          </Link>
        </div>
        <ArtworkTable works={artworks.slice(0, 6)} />
      </section>
    </div>
  )
}

function ArtworkTable({ works }: { works: Artwork[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="border-b border-border text-xs uppercase tracking-[0.14em] text-muted-foreground">
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
            <tr key={artwork.slug} className="transition-colors hover:bg-card/70">
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
                  defaultChecked
                  aria-label={`Publish ${artwork.title}`}
                  className={goldSwitchClass}
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
                  <button
                    type="button"
                    className="grid size-9 place-items-center border border-border text-muted-foreground transition-colors hover:border-destructive hover:text-destructive"
                    aria-label={`Delete ${artwork.title}`}
                  >
                    <Trash2 className="size-4" strokeWidth={1.7} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function DashboardArtworks() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="head text-5xl font-medium leading-none text-foreground">
            Artworks
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            View artwork records, then open a piece to edit or delete it.
          </p>
        </div>
        <div className="flex gap-3">
          <label className="flex h-11 min-w-0 items-center gap-3 border border-border bg-card/40 px-3 text-muted-foreground sm:w-72">
            <Search className="size-4" strokeWidth={1.7} />
            <span className="text-sm">Search artworks</span>
          </label>
          <Link
            to="/dashboard/create"
            className={goldButtonClass}
          >
            <Plus className="size-4" strokeWidth={1.8} />
            Create
          </Link>
        </div>
      </div>
      <section className="border border-border bg-card/40">
        <ArtworkTable works={artworks} />
      </section>
    </div>
  )
}

function FormField({
  label,
  description,
  value,
}: {
  label: string
  description?: string
  value?: string
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-foreground">{label}</span>
      {description ? (
        <span className="mt-1 block text-xs leading-5 text-muted-foreground">
          {description}
        </span>
      ) : null}
      <Input value={value ?? ""} readOnly className="mt-2 h-11 rounded-none" />
    </label>
  )
}

function ArtworkForm({ artwork }: { artwork?: Artwork }) {
  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <section className="border border-border bg-card/40 p-5">
        <div className="grid gap-5 md:grid-cols-2">
          <FormField
            label="Artwork title"
            description="Shown across the public gallery and detail page."
            value={artwork?.title}
          />
          <FormField
            label="Slug"
            description="Used in the public artwork URL."
            value={artwork?.slug}
          />
          <FormField label="Year" value={artwork?.year} />
          <FormField label="Status" value={artwork?.status} />
          <label className="block">
            <span className="text-sm font-semibold text-foreground">
              Category
            </span>
            <span className="mt-1 block text-xs leading-5 text-muted-foreground">
              Controls where the piece appears in filtered collections.
            </span>
            <select
              value={artwork?.category ?? "paintings"}
              onChange={() => undefined}
              className="mt-2 h-11 w-full border border-input bg-background px-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {categoryOptions.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </label>
          <FormField label="Medium" value={artwork?.medium} />
        </div>

        <label className="mt-5 block">
          <span className="text-sm font-semibold text-foreground">
            Short description
          </span>
          <span className="mt-1 block text-xs leading-5 text-muted-foreground">
            A concise summary used in gallery previews.
          </span>
          <textarea
            value={artwork?.excerpt ?? ""}
            readOnly
            className="mt-2 min-h-28 w-full resize-none border border-input bg-background px-3 py-3 text-sm leading-7 text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
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
            value={artwork?.story.join("\n\n") ?? ""}
            readOnly
            className="mt-2 min-h-44 w-full resize-none border border-input bg-background px-3 py-3 text-sm leading-7 text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          />
        </label>
      </section>

      <aside className="space-y-6">
        <section className="border border-border bg-card/40 p-5">
          <div className="overflow-hidden border border-border bg-background">
            {artwork ? (
              <img
                src={artwork.src}
                alt={artwork.alt}
                className="aspect-[4/5] w-full object-cover"
              />
            ) : (
              <div className="grid aspect-[4/5] place-items-center text-center text-muted-foreground">
                <div>
                  <ImagePlus className="mx-auto size-8" strokeWidth={1.5} />
                  <p className="mt-3 text-sm">Upload artwork image</p>
                </div>
              </div>
            )}
          </div>
          <Button variant="outline" className="mt-4 w-full">
            <ImagePlus className="size-4" strokeWidth={1.7} />
            Replace Image
          </Button>
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
              defaultChecked
              aria-label="Published"
              className={goldSwitchClass}
            />
          </div>
          <Button className="mt-5 w-full bg-secondary text-secondary-foreground hover:bg-secondary/85">
            <Save className="size-4" strokeWidth={1.8} />
            Save Artwork
          </Button>
        </section>
      </aside>
    </div>
  )
}

function PageBack({ to, label }: { to: string; label: string }) {
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

function DashboardCreate() {
  return (
    <div className="space-y-6">
      <PageBack to="/dashboard/artworks" label="Back to artworks" />
      <div>
        <h1 className="head text-5xl font-medium leading-none text-foreground">
          Create Artwork
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          UI-only for now. Later this form will upload images and save text to
          Firebase.
        </p>
      </div>
      <ArtworkForm />
    </div>
  )
}

function DashboardArtworkDetail({ mode }: { mode: "view" | "edit" }) {
  const { slug } = useParams()
  const artwork = getArtworkBySlug(slug)

  if (!artwork) {
    return <Navigate to="/dashboard/artworks" replace />
  }

  const isEdit = mode === "edit"

  return (
    <div className="space-y-6">
      <PageBack to="/dashboard/artworks" label="Back to artworks" />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="head text-5xl font-medium leading-none text-foreground">
            {isEdit ? "Edit Artwork" : "View Artwork"}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {artwork.title}, {artwork.year}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to={`/artworks/${artwork.slug}`}
            className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-2.5 text-sm font-medium transition-all hover:bg-muted hover:text-foreground"
          >
            <Eye className="size-4" strokeWidth={1.7} />
            Public Preview
          </Link>
          {isEdit ? (
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/85">
              <Save className="size-4" strokeWidth={1.8} />
              Save
            </Button>
          ) : (
            <Link
              to={`/dashboard/artworks/${artwork.slug}/edit`}
              className={goldButtonClass}
            >
              <Pencil className="size-4" strokeWidth={1.8} />
              Edit
            </Link>
          )}
          <Button variant="outline">
            <Trash2 className="size-4" strokeWidth={1.8} />
            Delete
          </Button>
        </div>
      </div>
      <ArtworkForm artwork={artwork} />
    </div>
  )
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="border border-border bg-card/40 p-8">
      <h1 className="head text-5xl font-medium leading-none text-foreground">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
        Placeholder UI for future Firebase-backed site text and account
        settings.
      </p>
    </div>
  )
}

export default function Dashboard() {
  return (
    <DashboardShell>
      <Routes>
        <Route index element={<DashboardOverview />} />
        <Route path="artworks" element={<DashboardArtworks />} />
        <Route
          path="artworks/:slug"
          element={<DashboardArtworkDetail mode="view" />}
        />
        <Route
          path="artworks/:slug/edit"
          element={<DashboardArtworkDetail mode="edit" />}
        />
        <Route path="create" element={<DashboardCreate />} />
        <Route path="content" element={<PlaceholderPage title="Site Text" />} />
        <Route path="settings" element={<PlaceholderPage title="Settings" />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </DashboardShell>
  )
}
