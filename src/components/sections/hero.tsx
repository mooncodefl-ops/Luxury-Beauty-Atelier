import * as React from "react"
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"

import { heroNarrative, brand } from "@/data/content"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function Hero() {
  const ref = React.useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.3])
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -200])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.9])

  return (
    <section ref={ref} id="top" className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background image with scroll-driven scale */}
        <motion.div
          className="absolute inset-0"
          style={reduced ? undefined : { scale: imageScale, opacity: imageOpacity }}
        >
          <div
            className="size-full bg-cover bg-center"
            style={{ backgroundImage: "url(/hero-frame-1.webp)" }}
          />
        </motion.div>

        {/* Darkening overlay */}
        <motion.div
          className="absolute inset-0 bg-background"
          style={{ opacity: overlayOpacity }}
        />

        {/* Entrance logo + line */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="text-center"
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-meta mb-6 text-foreground/60"
            >
              {brand.tagline}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="text-display fluid-display text-foreground"
            >
              {brand.name}
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="mx-auto mt-8 h-px w-32 bg-gold"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="text-meta mt-8 max-w-md text-foreground/50"
            >
              Hair is identity. Form. Texture. Confidence.
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll-driven narrative words */}
        {!reduced && (
          <motion.div
            className="absolute bottom-20 left-1/2 -translate-x-1/2"
            style={{ y: textY }}
          >
            {heroNarrative.map((item, i) => (
              <NarrativeWord
                key={item.word}
                item={item}
                index={i}
                total={heroNarrative.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </motion.div>
        )}

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-meta text-foreground/40"
          >
            Scroll
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function NarrativeWord({
  item,
  index,
  total,
  scrollYProgress,
}: {
  item: { word: string; sub: string }
  index: number
  total: number
  scrollYProgress: MotionValue<number>
}) {
  const start = index / total
  const end = (index + 1) / total
  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.05, end - 0.05, end],
    [0, 1, 1, 0]
  )

  return (
    <motion.div
      style={{ opacity }}
      className="absolute left-1/2 top-0 -translate-x-1/2 text-center"
    >
      <p className="text-display fluid-h1 text-foreground">{item.word}</p>
      <p className="text-meta mt-2 text-gold">{item.sub}</p>
    </motion.div>
  )
}
