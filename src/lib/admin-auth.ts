const apiUrl = import.meta.env.VITE_CLOUDFLARE_API_URL?.replace(/\/$/, "")
const sessionStorageKey = "akeni-admin-session"
const verificationCacheKey = "akeni-admin-session-verified"

function getSessionExpiry(token: string) {
  try {
    const encodedPayload = token.split(".")[0]
    if (!encodedPayload) return null

    const paddedPayload = encodedPayload.replace(/-/g, "+").replace(/_/g, "/")
    const payload = window.atob(paddedPayload.padEnd(Math.ceil(paddedPayload.length / 4) * 4, "="))
    const expiresAt = Number(payload.split(".").at(-1))
    return Number.isFinite(expiresAt) ? expiresAt : null
  } catch {
    return null
  }
}

function cacheSessionVerification(token: string) {
  window.sessionStorage.setItem(
    verificationCacheKey,
    JSON.stringify({ token, verifiedAt: Date.now(), expiresAt: getSessionExpiry(token) })
  )
}

function getApiUrl() {
  if (!apiUrl) throw new Error("Cloudflare API URL is not configured")
  return apiUrl
}

export function getAdminSession() {
  return window.sessionStorage.getItem(sessionStorageKey)
}

export async function loginAdmin(username: string, password: string) {
  const response = await fetch(`${getApiUrl()}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
  const payload = (await response.json()) as { token?: string; error?: string }

  if (!response.ok || !payload.token) {
    throw new Error(payload.error || "Unable to sign in")
  }

  window.sessionStorage.setItem(sessionStorageKey, payload.token)
  cacheSessionVerification(payload.token)
  window.dispatchEvent(new Event("akeni-auth-changed"))
}

export async function hasValidAdminSession() {
  const token = getAdminSession()
  if (!token) return false
  const expiresAt = getSessionExpiry(token)

  if (expiresAt !== null && expiresAt <= Date.now()) {
    logoutAdmin()
    return false
  }

  try {
    const cached = JSON.parse(
      window.sessionStorage.getItem(verificationCacheKey) || "null"
    ) as { token?: string; verifiedAt?: number; expiresAt?: number | null } | null

    if (cached?.token === token && typeof cached.verifiedAt === "number" &&
      (cached.expiresAt ?? expiresAt ?? 0) > Date.now()) {
      return true
    }
  } catch {
    window.sessionStorage.removeItem(verificationCacheKey)
  }

  try {
    const response = await fetch(`${getApiUrl()}/api/auth/session`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!response.ok) {
      window.sessionStorage.removeItem(sessionStorageKey)
      window.sessionStorage.removeItem(verificationCacheKey)
      return false
    }
    const payload = (await response.json()) as { authenticated?: boolean }
    if (!payload.authenticated) {
      window.sessionStorage.removeItem(sessionStorageKey)
      window.sessionStorage.removeItem(verificationCacheKey)
      return false
    }

    cacheSessionVerification(token)
    return Boolean(payload.authenticated)
  } catch {
    return false
  }
}

export function logoutAdmin() {
  window.sessionStorage.removeItem(sessionStorageKey)
  window.sessionStorage.removeItem(verificationCacheKey)
  window.dispatchEvent(new Event("akeni-auth-changed"))
}
