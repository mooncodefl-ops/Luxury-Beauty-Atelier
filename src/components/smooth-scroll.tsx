import * as React from "react"
import Lenis from "lenis"

import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion()

  React.useEffect(() => {
    if (reduced) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    })

    let raf = 0
    function loop(time: number) {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [reduced])

  return <>{children}</>
}
