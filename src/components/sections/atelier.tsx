import { motion } from "framer-motion"

import { atelierDetails, brand } from "@/data/content"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function Atelier() {
  const reduced = useReducedMotion()

  return (
    <section id="atelier" className="relative bg-background py-24 md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-meta text-gold">01 — The Atelier</p>
        </motion.div>

        {/* Large image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: reduced ? 0 : 1.2 }}
          className="relative mb-20 aspect-[16/9] w-full overflow-hidden md:aspect-[21/9]"
        >
          <div
            className="size-full bg-cover bg-center"
            style={{ backgroundImage: "url(/atelier-interior.webp)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
        </motion.div>

        {/* Title + philosophy */}
        <div className="grid gap-12 md:grid-cols-2 md:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-display fluid-h1 text-balance text-foreground">
              A space designed for transformation
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <p className="fluid-body text-pretty text-muted-foreground">
              {brand.philosophy}
            </p>
          </motion.div>
        </div>

        {/* Detail grid */}
        <div className="mt-24 grid gap-px border-t border-border sm:grid-cols-2 lg:grid-cols-4">
          {atelierDetails.map((detail, i) => (
            <motion.div
              key={detail.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="border-b border-border p-8 lg:border-r"
            >
              <p className="text-meta mb-4 text-gold">{detail.label}</p>
              <p className="text-sm text-muted-foreground">{detail.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
