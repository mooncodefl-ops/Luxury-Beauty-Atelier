import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { brand } from "@/data/content"

const navLinks = [
  { label: "Atelier", href: "#atelier" },
  { label: "Artists", href: "#artists" },
  { label: "Hair", href: "#hair" },
  { label: "Beauty", href: "#beauty" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
]

export function Navigation() {
  const [scrolled, setScrolled] = React.useState(false)
  const [menuOpen, setMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-700",
          scrolled ? "bg-background/80 backdrop-blur-md" : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10 md:py-6">
          <a
            href="#top"
            className={cn(
              "text-display text-xl tracking-[0.15em] transition-colors duration-500 md:text-2xl",
              scrolled ? "text-foreground" : "text-foreground"
            )}
          >
            {brand.name}
          </a>

          <div className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative text-meta text-foreground/70 transition-colors duration-300 hover:text-foreground"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <a
              href="#booking"
              className="text-meta border-b border-gold pb-1 text-foreground transition-all duration-300 hover:border-foreground hover:text-gold"
            >
              Book
            </a>
          </div>

          <button
            className="text-foreground md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="size-6" />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex flex-col bg-background md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="text-display text-2xl tracking-[0.15em]">{brand.name}</span>
              <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <X className="size-6" />
              </button>
            </div>

            <div className="flex flex-1 flex-col justify-center gap-2 px-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                  className="text-display text-4xl text-foreground/80 transition-colors hover:text-foreground"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#booking"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + navLinks.length * 0.08, duration: 0.5 }}
                className="text-display mt-8 text-4xl text-gold"
              >
                Book an Appointment
              </motion.a>
            </div>

            <div className="px-6 pb-10">
              <p className="text-meta text-muted-foreground">{brand.address.city}</p>
              <p className="text-meta mt-2 text-muted-foreground">{brand.phone}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
