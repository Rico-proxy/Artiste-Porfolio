import { Navigate, Route, Routes } from "react-router-dom"

import BaseLayout from "@/layout/BaseLayout"
import AboutPage from "@/pages/AboutPage"
import ArtworkPage from "@/pages/ArtworkPage"
import ArtworksPage from "@/pages/ArtworksPage"
import ContactPage from "@/pages/ContactPage"
import ExhibitionsPage from "@/pages/ExhibitionsPage"
import KulukismPage from "@/pages/KulukismPage"
import LandingPage from "@/pages/LandingPage"
import LegacyArtworkRedirect from "@/pages/LegacyArtworkRedirect"
import PressPage from "@/pages/PressPage"
import ProjectsPage from "@/pages/ProjectsPage"
import UalStudiosPage from "@/pages/UalStudiosPage"

export function App() {
  return (
    <Routes>
      <Route element={<BaseLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="artworks" element={<ArtworksPage />} />
        <Route path="artworks/:slug" element={<ArtworkPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="kulukism" element={<KulukismPage />} />
        <Route path="ual-studios" element={<UalStudiosPage />} />
        <Route path="exhibitions" element={<ExhibitionsPage />} />
        <Route path="press" element={<PressPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="gallery" element={<Navigate to="/artworks" replace />} />
        <Route path="gallery/:slug" element={<LegacyArtworkRedirect />} />
      </Route>
    </Routes>
  )
}

export default App
