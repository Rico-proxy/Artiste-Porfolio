import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { X } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"

type SheetContentProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Popup
> & {
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
}

const sideClasses = {
  top: "inset-x-0 top-0 border-b data-[ending-style]:-translate-y-full data-[starting-style]:-translate-y-full",
  right:
    "inset-y-0 right-0 h-full w-80 max-w-[calc(100vw-2rem)] border-l data-[ending-style]:translate-x-full data-[starting-style]:translate-x-full",
  bottom:
    "inset-x-0 bottom-0 border-t data-[ending-style]:translate-y-full data-[starting-style]:translate-y-full",
  left: "inset-y-0 left-0 h-full w-80 max-w-[calc(100vw-2rem)] border-r data-[ending-style]:-translate-x-full data-[starting-style]:-translate-x-full",
}

function Sheet(props: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root {...props} />
}

function SheetTrigger({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>) {
  return (
    <DialogPrimitive.Trigger
      data-slot="sheet-trigger"
      className={className}
      {...props}
    />
  )
}

function SheetClose({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>) {
  return (
    <DialogPrimitive.Close
      data-slot="sheet-close"
      className={className}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: SheetContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-300 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
      <DialogPrimitive.Popup
        data-slot="sheet-content"
        className={cn(
          "fixed z-50 border-white/10 bg-[#080809] p-6 text-foreground shadow-2xl transition duration-300 ease-out focus:outline-none",
          sideClasses[side],
          className
        )}
        {...props}
      >
        {showCloseButton ? (
          <DialogPrimitive.Close
            aria-label="Close menu"
            className="absolute right-5 top-5 grid size-10 place-items-center border border-white/10 text-muted-foreground transition-colors hover:border-secondary hover:text-secondary"
          >
            <X className="size-5" strokeWidth={1.7} />
          </DialogPrimitive.Close>
        ) : null}
        {children}
      </DialogPrimitive.Popup>
    </DialogPrimitive.Portal>
  )
}

function SheetHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-2 text-left", className)}
      {...props}
    />
  )
}

function SheetFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-3", className)}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="sheet-title"
      className={cn("head text-3xl font-medium text-foreground", className)}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm leading-6 text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
}
