import { useState, type FormEvent } from "react"
import { ArrowLeft, ArrowRight, Eye, EyeOff, LockKeyhole } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"

import { toast } from "@/components/ui/toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { loginAdmin } from "@/lib/admin-auth"

export default function DashboardLoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      await loginAdmin(username.trim(), password)
      toast.add({ title: "Welcome back", description: "Your dashboard is ready.", type: "success" })
      const from = (location.state as { from?: string } | null)?.from
      navigate(from || "/dashboard", { replace: true })
    } catch (error) {
      toast.add({
        title: "Could not sign in",
        description: error instanceof Error ? error.message : "Check your login details.",
        type: "error",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="grid min-h-svh place-items-center bg-background px-5 py-10 text-foreground">
      <section className="w-full max-w-md border border-border bg-card/55 p-6 shadow-sm sm:p-8">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-secondary uppercase">Akeni Studio</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">Dashboard login</h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Sign in to manage artworks, images, and site text.</p>
          </div>
          <span className="grid size-10 shrink-0 place-items-center border border-secondary/50 text-secondary">
            <LockKeyhole className="size-5" strokeWidth={1.7} />
          </span>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-sm font-semibold">Username</span>
            <Input value={username} onChange={(event) => setUsername(event.currentTarget.value)} autoComplete="username" placeholder="admin" required className="mt-2 h-12 text-base" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Password</span>
            <span className="relative mt-2 block">
              <Input type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.currentTarget.value)} autoComplete="current-password" required className="h-12 pr-12 text-base" />
              <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} className="absolute inset-y-0 right-0 grid w-12 place-items-center text-muted-foreground transition-colors hover:text-secondary" onClick={() => setShowPassword((visible) => !visible)}>
                {showPassword ? <EyeOff className="size-4" strokeWidth={1.8} /> : <Eye className="size-4" strokeWidth={1.8} />}
              </button>
            </span>
          </label>
          <Button type="submit" disabled={isSubmitting} className="h-12 w-full bg-secondary text-secondary-foreground hover:bg-secondary/85">
            {isSubmitting ? "Signing in..." : "Sign in"}
            <ArrowRight className="size-4" strokeWidth={1.8} />
          </Button>
        </form>

        <Button
          type="button"
          variant="outline"
          className="mt-4 h-11 w-full"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="size-4" strokeWidth={1.8} />
          Back to site
        </Button>
      </section>
    </main>
  )
}
