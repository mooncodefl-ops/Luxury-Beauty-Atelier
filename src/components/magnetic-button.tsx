import * as React from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

import { cn } from "@/lib/utils"

type MagneticButtonProps = {
  children: React.ReactNode
  className?: string
  strength?: number
  onClick?: () => void
}

export function MagneticButton({ children, className, strength = 0.3, onClick }: MagneticButtonProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15 })
  const sy = useSpring(y, { stiffness: 200, damping: 15 })

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    x.set(relX * strength)
    y.set(relY * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}
