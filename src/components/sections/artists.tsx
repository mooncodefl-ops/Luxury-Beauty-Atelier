import * as React from "react"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

import { stylists, type Stylist } from "@/data/content"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

export function Artists() {
  const reduced = useReducedMotion()

  return (
    <section id="artists" className="relative bg-background py-24 md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex items-end justify-between"
        >
          <p className="text-meta text-gold">02 — The Artists</p>
          <p className="hidden text-sm text-muted-foreground md:block">
            {stylists.length} stylists
          </p>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-display fluid-h1 mb-20 max-w-2xl text-balance text-foreground"
        >
          Each artist brings a distinct philosophy to their craft
        </motion.h2>

        <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:gap-x-12">
          {stylists.map((stylist, i) => (
            <ArtistCard key={stylist.id} stylist={stylist} index={i} reduced={reduced} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ArtistCard({
  stylist,
  index,
  reduced,
}: {
  stylist: Stylist
  index: number
  reduced: boolean
}) {
  const [hovered, setHovered] = React.useState(false)
  const offsetClass = index % 2 === 1 ? "md:mt-24" : ""

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: (index % 2) * 0.15 }}
      className={cn("group", offsetClass)}
      data-cursor="explore"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Portrait */}
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <div
          className={cn(
            "size-full bg-cover bg-center transition-all duration-700",
            reduced ? "" : "group-hover:scale-105"
          )}
          style={{
            backgroundImage: `url(${stylist.image})`,
            filter: hovered ? "grayscale(0)" : "grayscale(1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

        {/* Specialty label */}
        <div className="absolute top-6 left-6">
          <p className="text-meta text-foreground/80 backdrop-blur-sm">{stylist.specialty}</p>
        </div>

        {/* Book action */}
        <a
          href="#booking"
          className="absolute right-6 bottom-6 flex items-center gap-2 text-meta text-foreground transition-colors hover:text-gold"
        >
          Book <ArrowUpRight className="size-3" />
        </a>
      </div>

      {/* Info */}
      <div className="mt-6 flex items-start justify-between">
        <div>
          <h3 className="text-display text-2xl text-foreground md:text-3xl">{stylist.name}</h3>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">{stylist.philosophy}</p>
        </div>
        <span className="text-meta text-muted-foreground">
          0{index + 1}
        </span>
      </div>
    </motion.article>
  )
}
