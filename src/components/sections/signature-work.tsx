import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

import { portfolio } from "@/data/content"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

const aspectClass = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
}

export function SignatureWork() {
  const reduced = useReducedMotion()
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null)

  const openLightbox = (i: number) => setLightboxIndex(i)
  const closeLightbox = () => setLightboxIndex(null)
  const next = () => setLightboxIndex((p) => (p === null ? null : (p + 1) % portfolio.length))
  const prev = () => setLightboxIndex((p) => (p === null ? null : (p - 1 + portfolio.length) % portfolio.length))

  React.useEffect(() => {
    if (lightboxIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowRight") next()
      if (e.key === "ArrowLeft") prev()
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [lightboxIndex])

  return (
    <section id="work" className="relative bg-foreground py-24 text-background md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-meta text-gold">06 — Signature Work</p>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-display fluid-h1 mb-20 max-w-3xl text-balance"
        >
          Selected transformations from the atelier
        </motion.h2>

        {/* Editorial gallery — mixed proportions */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-12 md:gap-6">
          {portfolio.map((item, i) => {
            const layout = getLayout(i)
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                onClick={() => openLightbox(i)}
                className={cn(
                  "group relative overflow-hidden bg-muted",
                  aspectClass[item.aspect],
                  layout
                )}
                data-cursor="view"
              >
                <div
                  className={cn(
                    "size-full bg-cover bg-center transition-transform duration-700",
                    reduced ? "" : "group-hover:scale-110"
                  )}
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <p className="text-meta text-gold">{item.category}</p>
                  <p className="text-display mt-1 text-xl">{item.title}</p>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-background/95 backdrop-blur-md"
            onClick={closeLightbox}
          >
            <button
              className="absolute right-6 top-6 text-foreground transition-colors hover:text-gold"
              onClick={closeLightbox}
              aria-label="Close"
            >
              <X className="size-8" />
            </button>

            <button
              className="absolute left-6 top-1/2 -translate-y-1/2 text-foreground/60 transition-colors hover:text-gold"
              onClick={(e) => { e.stopPropagation(); prev() }}
              aria-label="Previous"
            >
              <ChevronLeft className="size-10" />
            </button>

            <button
              className="absolute right-6 top-1/2 -translate-y-1/2 text-foreground/60 transition-colors hover:text-gold"
              onClick={(e) => { e.stopPropagation(); next() }}
              aria-label="Next"
            >
              <ChevronRight className="size-10" />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative max-h-[85vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="bg-cover bg-center"
                style={{
                  backgroundImage: `url(${portfolio[lightboxIndex].image})`,
                  height: "80vh",
                  width: "auto",
                  aspectRatio: portfolio[lightboxIndex].aspect === "portrait" ? "3/4" : portfolio[lightboxIndex].aspect === "landscape" ? "4/3" : "1/1",
                }}
              />
              <div className="absolute bottom-4 left-4">
                <p className="text-meta text-gold">{portfolio[lightboxIndex].category}</p>
                <p className="text-display mt-1 text-2xl">{portfolio[lightboxIndex].title}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function getLayout(i: number): string {
  const layouts = [
    "md:col-span-5 md:row-span-2",
    "md:col-span-4",
    "md:col-span-3",
    "md:col-span-4",
    "md:col-span-3 md:row-span-2",
    "md:col-span-5",
    "md:col-span-4",
    "md:col-span-4",
    "md:col-span-4",
  ]
  return layouts[i % layouts.length]
}
