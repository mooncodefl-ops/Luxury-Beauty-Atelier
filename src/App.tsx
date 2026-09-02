import { SmoothScroll } from "@/components/smooth-scroll"
import { CustomCursor } from "@/components/custom-cursor"
import { Navigation } from "@/components/sections/navigation"
import { Hero } from "@/components/sections/hero"
import { Atelier } from "@/components/sections/atelier"
import { Artists } from "@/components/sections/artists"
import { HairExperience, BeautyExperience } from "@/components/sections/hair-experience"
import { Transformation } from "@/components/sections/transformation"
import { SignatureWork } from "@/components/sections/signature-work"
import { Booking } from "@/components/sections/booking"
import { Footer } from "@/components/sections/footer"
import { Toaster } from "@/components/ui/sonner"

export function App() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navigation />
      <Toaster position="top-center" />
      <main>
        <Hero />
        <Atelier />
        <Artists />
        <HairExperience />
        <Transformation />
        <BeautyExperience />
        <SignatureWork />
        <Booking />
      </main>
      <Footer />
    </SmoothScroll>
  )
}

export default App
