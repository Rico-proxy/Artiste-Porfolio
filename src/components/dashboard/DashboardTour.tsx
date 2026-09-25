import { TourProvider, useTour } from "@reactour/tour"
import { useEffect, useRef, type ReactNode } from "react"
import { useLocation } from "react-router-dom"

import {
  fetchAdminPreferences,
  saveAdminPreferences,
} from "@/lib/cloudflare-api"
import { getAdminSession } from "@/lib/admin-auth"

const localTourKey = "akeni-dashboard-tour-completed"

const tourSteps = [
  {
    selector: '[data-dashboard-tour="navbar"]',
    content:
      "This is your dashboard header. It contains the theme switcher, your profile, and the lightbulb button for replaying this tour.",
  },
  {
    selector: '[data-dashboard-tour="overview"]',
    content:
      "Overview gives you a quick summary of the artwork collection and shortcuts to common actions.",
  },
  {
    selector: '[data-dashboard-tour="homepage"]',
    content:
      "Homepage is where you choose the 7 artworks shown in the homepage carousel and set their order.",
  },
  {
    selector: '[data-dashboard-tour="artworks"]',
    content:
      "Artworks is your full collection. Open a piece to edit it, change visibility, or delete it.",
  },
  {
    selector: '[data-dashboard-tour="create"]',
    content:
      "Create adds a new artwork. The image is only uploaded after you save the artwork.",
  },
  {
    selector: '[data-dashboard-tour="site-text"]',
    content:
      "Site Text controls the words used across the public pages, including the hero, About, Projects, and Contact pages.",
  },
  {
    selector: '[data-dashboard-tour="tour-replay"]',
    content: "You can open this tour again at any time from the lightbulb button.",
  },
]

async function markTourCompleted() {
  window.localStorage.setItem(localTourKey, "true")

  try {
    await saveAdminPreferences({ tourCompleted: true })
  } catch {
    // The local flag keeps the tour from repeating if the preference request is unavailable.
  }
}

function TourLifecycle() {
  const location = useLocation()
  const { setIsOpen } = useTour()
  const hasCheckedRef = useRef(false)
  const isDashboard =
    location.pathname.startsWith("/dashboard") &&
    location.pathname !== "/dashboard/login"

  useEffect(() => {
    if (!isDashboard || !getAdminSession() || hasCheckedRef.current) return
    hasCheckedRef.current = true

    void fetchAdminPreferences()
      .then(({ tourCompleted }) => {
        if (!tourCompleted && window.localStorage.getItem(localTourKey) !== "true") {
          setIsOpen(true)
        }
      })
      .catch(() => {
        if (window.localStorage.getItem(localTourKey) !== "true") {
          setIsOpen(true)
        }
      })
  }, [isDashboard, setIsOpen])

  return null
}

export default function DashboardTourProvider({ children }: { children: ReactNode }) {
  return (
    <TourProvider
      steps={tourSteps}
      defaultOpen={false}
      showCloseButton
      showBadge
      showDots
      styles={{
        popover: (base) => ({
          ...base,
          backgroundColor: "var(--card)",
          border: "1px solid var(--secondary)",
          borderRadius: 0,
          color: "var(--card-foreground)",
        }),
        badge: (base) => ({
          ...base,
          backgroundColor: "var(--secondary)",
          color: "var(--secondary-foreground)",
        }),
        button: (base) => ({
          ...base,
          color: "var(--secondary)",
        }),
      }}
      nextButton={({ Button, currentStep, stepsLength, setCurrentStep, setIsOpen }) => {
        const isLastStep = currentStep === stepsLength - 1

        return (
          <Button
            kind="next"
            hideArrow={isLastStep}
            onClick={() => {
              if (isLastStep) {
                setIsOpen(false)
                void markTourCompleted()
                return
              }

              setCurrentStep(currentStep + 1)
            }}
          >
            {isLastStep ? "Finish" : "Next"}
          </Button>
        )
      }}
    >
      <TourLifecycle />
      {children}
    </TourProvider>
  )
}
