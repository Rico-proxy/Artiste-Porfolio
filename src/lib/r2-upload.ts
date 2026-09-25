export type R2UploadResult = {
  key: string
  imageUrl: string
}

export async function uploadImageToR2(file: File): Promise<R2UploadResult> {
  const apiUrl = import.meta.env.VITE_CLOUDFLARE_API_URL?.replace(/\/$/, "")
  const token = window.sessionStorage.getItem("akeni-admin-session")

  if (!apiUrl || !token) {
    throw new Error("You must be signed in before uploading an image")
  }

  const formData = new FormData()
  formData.append("file", file)

  const uploadResponse = await fetch(`${apiUrl}/api/uploads`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  })

  const payload = (await uploadResponse.json()) as {
    error?: string
    key?: string
  }

  if (!uploadResponse.ok || !payload.key) {
    throw new Error("Cloudflare could not store the image")
  }

  return {
    key: payload.key,
    imageUrl: `${apiUrl}/images/${payload.key}`,
  }
}
