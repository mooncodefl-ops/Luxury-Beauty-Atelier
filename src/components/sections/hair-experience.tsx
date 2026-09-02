import { motion } from "framer-motion"

import { hairCategories, beautyCategories, type ServiceCategory } from "@/data/content"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

export function HairExperience() {
  const reduced = useReducedMotion()

  return (
    <section id="hair" className="relative bg-foreground py-24 text-background md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-meta text-gold">03 — Hair Experience</p>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-display fluid-h1 mb-20 max-w-3xl text-balance"
        >
          A visual journey through the craft
        </motion.h2>

        <div className="space-y-32 md:space-y-40">
          {hairCategories.map((cat, i) => (
            <CategoryRow key={cat.id} category={cat} index={i} reduced={reduced} dark />
          ))}
        </div>
      </div>
    </section>
  )
}

export function BeautyExperience() {
  const reduced = useReducedMotion()

  return (
    <section id="beauty" className="relative bg-background py-24 md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-meta text-gold">04 — Beauty Extension</p>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-display fluid-h1 mb-20 max-w-3xl text-balance text-foreground"
        >
          Beyond hair — the complete expression
        </motion.h2>

        <div className="space-y-32 md:space-y-40">
          {beautyCategories.map((cat, i) => (
            <CategoryRow key={cat.id} category={cat} index={i} reduced={reduced} dark={false} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CategoryRow({
  category,
  index,
  reduced,
  dark,
}: {
  category: ServiceCategory
  index: number
  reduced: boolean
  dark: boolean
}) {
  const flip = index % 2 === 1

  return (
    <div
      className={cn(
        "grid items-center gap-8 lg:grid-cols-2 lg:gap-16",
        flip && "lg:[&>*:first-child]:order-2"
      )}
    >
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: reduced ? 0 : 1.2 }}
        className="relative aspect-[4/3] overflow-hidden"
        data-cursor="view"
      >
        <div
          className={cn(
            "size-full bg-cover bg-center transition-transform duration-1000 hover:scale-105"
          )}
          style={{ backgroundImage: `url(${category.image})` }}
        />
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={cn(flip && "lg:pr-8", !flip && "lg:pl-8")}
      >
        <p className={cn("text-meta mb-4", dark ? "text-gold" : "text-gold")}>
          {category.label}
        </p>
        <h3 className={cn("text-display fluid-h2 mb-6 text-balance", dark ? "text-background" : "text-foreground")}>
          {category.title}
        </h3>
        <p className={cn("mb-10 max-w-md text-pretty", dark ? "text-background/60" : "text-muted-foreground")}>
          {category.description}
        </p>

        {/* Services list */}
        <div className="space-y-px border-t border-border/30">
          {category.services.map((service) => (
            <div
              key={service.name}
              className="flex items-baseline justify-between gap-4 border-b border-border/30 py-4"
            >
              <div>
                <p className={cn("text-sm font-medium", dark ? "text-background" : "text-foreground")}>
                  {service.name}
                </p>
                <p className={cn("mt-1 text-xs", dark ? "text-background/50" : "text-muted-foreground")}>
                  {service.description}
                </p>
              </div>
              <div className="text-right">
                <p className={cn("text-sm", dark ? "text-background/80" : "text-foreground/80")}>
                  {service.price}
                </p>
                <p className={cn("text-meta mt-1", dark ? "text-background/40" : "text-muted-foreground")}>
                  {service.duration}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
