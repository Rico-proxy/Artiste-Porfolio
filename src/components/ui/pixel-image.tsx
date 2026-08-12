"use client"

import { useEffect, useMemo, useState } from "react"

import { cn } from "@/lib/utils"

type Grid = {
  rows: number
  cols: number
}

const DEFAULT_GRIDS: Record<string, Grid> = {
  "6x4": { rows: 4, cols: 6 },
  "8x8": { rows: 8, cols: 8 },
  "8x3": { rows: 3, cols: 8 },
  "4x6": { rows: 6, cols: 4 },
  "3x8": { rows: 8, cols: 3 },
}

type PredefinedGridKey = keyof typeof DEFAULT_GRIDS

interface PixelImageProps {
  src: string
  alt?: string
  grid?: PredefinedGridKey
  customGrid?: Grid
  grayscaleAnimation?: boolean
  pixelFadeInDuration?: number
  maxAnimationDelay?: number
  colorRevealDelay?: number
  className?: string
  imageClassName?: string
}

export function PixelImage({
  src,
  alt = "",
  grid = "6x4",
  grayscaleAnimation = true,
  pixelFadeInDuration = 1000,
  maxAnimationDelay = 1200,
  colorRevealDelay = 1300,
  customGrid,
  className,
  imageClassName,
}: PixelImageProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [showColor, setShowColor] = useState(false)

  const minGrid = 1
  const maxGrid = 16

  const { rows, cols } = useMemo(() => {
    const isValidGrid = (candidate?: Grid) => {
      if (!candidate) {
        return false
      }

      return (
        Number.isInteger(candidate.rows) &&
        Number.isInteger(candidate.cols) &&
        candidate.rows >= minGrid &&
        candidate.cols >= minGrid &&
        candidate.rows <= maxGrid &&
        candidate.cols <= maxGrid
      )
    }

    return isValidGrid(customGrid) ? customGrid! : DEFAULT_GRIDS[grid]
  }, [customGrid, grid])

  useEffect(() => {
    if (!isVisible) {
      return
    }

    const colorTimeout = window.setTimeout(() => {
      setShowColor(true)
    }, colorRevealDelay)

    return () => window.clearTimeout(colorTimeout)
  }, [colorRevealDelay, isVisible])

  const pieces = useMemo(() => {
    const total = rows * cols

    return Array.from({ length: total }, (_, index) => {
      const row = Math.floor(index / cols)
      const col = index % cols

      const clipPath = `polygon(
        ${col * (100 / cols)}% ${row * (100 / rows)}%,
        ${(col + 1) * (100 / cols)}% ${row * (100 / rows)}%,
        ${(col + 1) * (100 / cols)}% ${(row + 1) * (100 / rows)}%,
        ${col * (100 / cols)}% ${(row + 1) * (100 / rows)}%
      )`

      return {
        clipPath,
        delay: ((index * 137) % 1000) * (maxAnimationDelay / 1000),
      }
    })
  }, [cols, maxAnimationDelay, rows])

  return (
    <div className={cn("relative h-72 w-72 select-none md:h-96 md:w-96", className)}>
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsVisible(true)}
        className={cn(
          "absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity ease-out",
          showColor && "opacity-100",
          imageClassName
        )}
        style={{
          transitionDuration: `${pixelFadeInDuration}ms`,
        }}
        draggable={false}
      />
      {pieces.map((piece, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-all ease-out",
            isVisible && !showColor ? "opacity-100" : "opacity-0"
          )}
          style={{
            clipPath: piece.clipPath,
            transitionDelay: `${piece.delay}ms`,
            transitionDuration: `${pixelFadeInDuration}ms`,
          }}
        >
          <img
            src={src}
            alt=""
            aria-hidden="true"
            className={cn(
              "h-full w-full object-cover",
              grayscaleAnimation && (showColor ? "grayscale-0" : "grayscale"),
              imageClassName
            )}
            style={{
              transition: grayscaleAnimation
                ? `filter ${pixelFadeInDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
                : "none",
            }}
            draggable={false}
          />
        </div>
      ))}
    </div>
  )
}
