import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import type { VercelRequest, VercelResponse } from "@vercel/node"

const maxFileSize = 25 * 1024 * 1024

function getRequiredEnv(name: string) {
  const value = process.env[name]

  if (!value) {
    throw new Error(`Missing ${name} environment variable`)
  }

  return value
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST")
    return response.status(405).json({ error: "Method not allowed" })
  }

  try {
    const body =
      typeof request.body === "string" ? JSON.parse(request.body) : request.body
    const fileName = typeof body?.fileName === "string" ? body.fileName : ""
    const contentType =
      typeof body?.contentType === "string" ? body.contentType : ""
    const fileSize = typeof body?.fileSize === "number" ? body.fileSize : 0

    if (!fileName || !contentType.startsWith("image/")) {
      return response
        .status(400)
        .json({ error: "An image file name and content type are required" })
    }

    if (!fileSize || fileSize > maxFileSize) {
      return response.status(400).json({
        error: "Images must be larger than 0 bytes and no bigger than 25 MB",
      })
    }

    const bucket = getRequiredEnv("R2_BUCKET_NAME")
    const endpoint = getRequiredEnv("R2_ENDPOINT")
    const accessKeyId = getRequiredEnv("R2_ACCESS_KEY_ID")
    const secretAccessKey = getRequiredEnv("R2_SECRET_ACCESS_KEY")
    const safeFileName = fileName
      .normalize("NFKD")
      .replace(/[^a-zA-Z0-9._-]+/g, "-")
      .replace(/^-+|-+$/g, "")

    const key = `artworks/${crypto.randomUUID()}-${safeFileName || "image"}`
    const client = new S3Client({
      region: "auto",
      endpoint,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    })
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: contentType,
    })
    const uploadUrl = await getSignedUrl(client, command, { expiresIn: 900 })

    return response.status(200).json({
      key,
      uploadUrl,
      expiresIn: 900,
    })
  } catch (error) {
    console.error("R2 upload URL error", error)
    return response
      .status(500)
      .json({ error: "Could not prepare image upload" })
  }
}
