import * as React from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

import { useIsMobile } from "@/hooks/use-mobile"

export function CustomCursor() {
  const isMobile = useIsMobile()
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const [variant, setVariant] = React.useState<"default" | "view" | "explore">("default")
  const [visible, setVisible] = React.useState(false)

  const x = useSpring(mouseX, { stiffness: 500, damping: 40, mass: 0.3 })
  const y = useSpring(mouseY, { stiffness: 500, damping: 40, mass: 0.3 })

  React.useEffect(() => {
    if (isMobile) return

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setVisible(true)

      const target = e.target as HTMLElement
      const cursorAttr = target.closest("[data-cursor]")?.getAttribute("data-cursor")
      if (cursorAttr === "view") setVariant("view")
      else if (cursorAttr === "explore") setVariant("explore")
      else setVariant("default")
    }

    const leave = () => setVisible(false)

    window.addEventListener("mousemove", move)
    document.addEventListener("mouseleave", leave)
    return () => {
      window.removeEventListener("mousemove", move)
      document.removeEventListener("mouseleave", leave)
    }
  }, [isMobile, mouseX, mouseY])

  if (isMobile) return null

  const size = variant === "default" ? 8 : 64
  const label = variant === "view" ? "VIEW" : variant === "explore" ? "EXPLORE" : ""

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
      style={{ x, y }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full border border-foreground/40 bg-foreground/5 backdrop-blur-sm"
        animate={{
          width: size,
          height: size,
          marginLeft: -size / 2,
          marginTop: -size / 2,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {label && (
          <span className="text-meta text-foreground/70" style={{ fontSize: "0.5rem" }}>
            {label}
          </span>
        )}
      </motion.div>
    </motion.div>
  )
}
