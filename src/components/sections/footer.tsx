import { motion } from "framer-motion"

import { brand } from "@/data/content"

export function Footer() {
  return (
    <footer id="contact" className="relative bg-foreground py-20 text-background md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        {/* Large brand name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="mb-16"
        >
          <h2 className="text-display text-[clamp(4rem,15vw,12rem)] leading-none tracking-tight">
            {brand.name}
          </h2>
          <p className="text-meta mt-4 text-background/50">{brand.tagline}</p>
        </motion.div>

        {/* Info grid */}
        <div className="grid gap-12 border-t border-background/10 pt-12 md:grid-cols-4">
          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-meta mb-4 text-gold">Visit</p>
            <p className="text-sm text-background/70">
              {brand.address.line1}
              <br />
              {brand.address.line2}
              <br />
              {brand.address.city}
              <br />
              {brand.address.postcode}
            </p>
          </motion.div>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-meta mb-4 text-gold">Hours</p>
            {brand.hours.map((h) => (
              <div key={h.day} className="mb-2">
                <p className="text-sm text-background/70">{h.day}</p>
                <p className="text-meta text-background/50">{h.time}</p>
              </div>
            ))}
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-meta mb-4 text-gold">Contact</p>
            <a href={`mailto:${brand.email}`} className="block text-sm text-background/70 transition-colors hover:text-gold">
              {brand.email}
            </a>
            <a href={`tel:${brand.phone}`} className="mt-2 block text-sm text-background/70 transition-colors hover:text-gold">
              {brand.phone}
            </a>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-meta mb-4 text-gold">Follow</p>
            {brand.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group mb-2 block text-sm text-background/70 transition-colors hover:text-gold"
              >
                {s.label}
                <span className="ml-1 inline-block opacity-0 transition-opacity group-hover:opacity-100">→</span>
              </a>
            ))}
          </motion.div>
        </div>

        {/* Booking CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 border-t border-background/10 pt-12"
        >
          <a
            href="#booking"
            className="text-display text-3xl text-background transition-colors hover:text-gold md:text-5xl"
          >
            Book an appointment →
          </a>
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-background/10 pt-8 sm:flex-row">
          <p className="text-meta text-background/40">
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <p className="text-meta text-background/40">
            Crafted with intention
          </p>
        </div>
      </div>
    </footer>
  )
}
