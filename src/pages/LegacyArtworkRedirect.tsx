import { Navigate, useParams } from "react-router-dom"

export default function LegacyArtworkRedirect() {
  const { slug } = useParams()

  return <Navigate to={slug ? `/artworks/${slug}` : "/artworks"} replace />
}
