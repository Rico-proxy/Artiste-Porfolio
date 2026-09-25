import { Navigate, Route, Routes } from "react-router-dom"

import DashboardAuthGuard from "@/components/dashboard/DashboardAuthGuard"
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
import DashboardLayout from "@/layout/DashboardLayout"
import DashboardLoginPage from "@/pages/Dashboard/LoginPage"
import DashboardArtworksPage from "@/pages/Dashboard/ArtworksPage"
import ArtworkDetailPage from "@/pages/Dashboard/ArtworkDetailPage"
import CreateArtworkPage from "@/pages/Dashboard/CreateArtworkPage"
import DashboardOverviewPage from "@/pages/Dashboard/OverviewPage"
import DashboardHomepagePage from "@/pages/Dashboard/HomepagePage"
import SiteTextPage from "@/pages/Dashboard/SiteTextPage"
import ImportStaticPage from "@/pages/Dashboard/ImportStaticPage"

export function App() {
  return (
    <Routes>
      <Route path="dashboard/login" element={<DashboardLoginPage />} />
      <Route
        path="dashboard"
        element={
          <DashboardAuthGuard>
            <DashboardLayout />
          </DashboardAuthGuard>
        }
      >
        <Route index element={<DashboardOverviewPage />} />
        <Route path="homepage" element={<DashboardHomepagePage />} />
        <Route path="artworks" element={<DashboardArtworksPage />} />
        <Route
          path="artworks/:slug"
          element={<ArtworkDetailPage mode="view" />}
        />
        <Route
          path="artworks/:slug/edit"
          element={<ArtworkDetailPage mode="edit" />}
        />
        <Route path="create" element={<CreateArtworkPage />} />
        <Route path="content" element={<SiteTextPage />} />
        <Route path="import-static" element={<ImportStaticPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
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
