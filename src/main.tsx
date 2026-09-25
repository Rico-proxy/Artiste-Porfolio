import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import "@reactour/tour/dist/index.css"

import DashboardTourProvider from "@/components/dashboard/DashboardTour"
import { ThemeProvider } from "@/components/theme-provider"
import { ArtworkDataProvider } from "@/components/dashboard/artwork-data-provider"
import { SiteContentProvider } from "@/components/site-content-provider"
import { Toaster } from "@/components/ui/toast"

import "./index.css"
import App from "./App.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="akeni-theme">
      <SiteContentProvider>
        <ArtworkDataProvider>
          <Toaster>
            <BrowserRouter>
              <DashboardTourProvider>
                <App />
              </DashboardTourProvider>
            </BrowserRouter>
          </Toaster>
        </ArtworkDataProvider>
      </SiteContentProvider>
    </ThemeProvider>
  </StrictMode>
)
