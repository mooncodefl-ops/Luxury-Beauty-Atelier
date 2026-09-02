import * as React from "react"
import { motion } from "framer-motion"

import { transformationImages } from "@/data/content"

export function Transformation() {
  const [position, setPosition] = React.useState(50)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const dragging = React.useRef(false)

  const updatePosition = (clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.max(0, Math.min(100, pct)))
  }

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true
    updatePosition(e.clientX)
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return
    updatePosition(e.clientX)
  }

  const onPointerUp = () => {
    dragging.current = false
  }

  return (
    <section className="relative bg-background py-24 md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="text-meta text-gold">05 — Transformation</p>
          <h2 className="text-display fluid-h1 mt-6 text-balance text-foreground">
            Drag to reveal the transformation
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">{transformationImages.label}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="relative mx-auto max-w-4xl"
        >
          <div
            ref={containerRef}
            className="relative aspect-[16/10] w-full cursor-ew-resize overflow-hidden select-none"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            data-cursor="explore"
          >
            {/* After image (full) */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${transformationImages.after})` }}
            />
            <span className="absolute right-6 top-6 text-meta bg-background/60 px-3 py-1.5 backdrop-blur-sm">
              After
            </span>

            {/* Before image (clipped) */}
            <div
              className="absolute inset-0 overflow-hidden bg-cover bg-center"
              style={{
                backgroundImage: `url(${transformationImages.before})`,
                clipPath: `inset(0 ${100 - position}% 0 0)`,
              }}
            />
            <span className="absolute left-6 top-6 text-meta bg-background/60 px-3 py-1.5 backdrop-blur-sm">
              Before
            </span>

            {/* Divider line */}
            <div
              className="absolute inset-y-0 z-10 w-px bg-gold"
              style={{ left: `${position}%` }}
            >
              <div className="absolute top-1/2 left-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold bg-background/80 backdrop-blur-sm">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gold">
                  <path d="M6 3L3 8L6 13M10 3L13 8L10 13" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
