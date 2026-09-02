import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ChevronLeft, ChevronRight } from "lucide-react"
import { toast } from "sonner"

import {
  hairCategories,
  beautyCategories,
  stylists,
  availableSlots,
} from "@/data/content"
import { supabase } from "@/lib/supabase"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Progress } from "@/components/ui/progress"

type BookingData = {
  category: string
  service: string
  stylist: string
  date: string
  time: string
  name: string
  email: string
  phone: string
  notes: string
}

const steps = ["Category", "Service", "Stylist", "Date", "Time", "Contact"] as const

export function Booking() {
  const [step, setStep] = React.useState(0)
  const [data, setData] = React.useState<BookingData>({
    category: "",
    service: "",
    stylist: "",
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    notes: "",
  })
  const [submitting, setSubmitting] = React.useState(false)
  const [done, setDone] = React.useState(false)

  const servicesForCategory = React.useMemo(() => {
    const cats = [...hairCategories, ...beautyCategories]
    const found = cats.find((c) => c.label === data.category)
    return found?.services ?? []
  }, [data.category])

  const canAdvance = React.useMemo(() => {
    switch (step) {
      case 0: return !!data.category
      case 1: return !!data.service
      case 2: return !!data.stylist
      case 3: return !!data.date
      case 4: return !!data.time
      case 5: return !!data.name && !!data.email
      default: return false
    }
  }, [step, data])

  const update = (field: keyof BookingData, value: string) => {
    setData((p) => ({ ...p, [field]: value }))
  }

  const next = () => {
    if (step < steps.length - 1 && canAdvance) setStep((s) => s + 1)
  }
  const prev = () => {
    if (step > 0) setStep((s) => s - 1)
  }

  const submit = async () => {
    if (!canAdvance) return
    setSubmitting(true)
    const stylist = stylists.find((s) => s.id === data.stylist)
    try {
      const { error } = await supabase.from("bookings").insert({
        category: data.category,
        service_name: data.service,
        stylist_id: data.stylist,
        stylist_name: stylist?.name ?? "",
        appointment_date: data.date,
        appointment_time: data.time,
        client_name: data.name,
        client_email: data.email,
        client_phone: data.phone || null,
        notes: data.notes || null,
      })
      if (error) throw error
      setDone(true)
      toast.success("Your appointment request has been received.")
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="booking" className="relative bg-background py-24 md:py-40">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <p className="text-meta text-gold">07 — Booking</p>
          <h2 className="text-display fluid-h1 mt-6 text-balance text-foreground">
            Reserve your transformation
          </h2>
        </motion.div>

        {done ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center py-20 text-center"
          >
            <div className="flex size-16 items-center justify-center rounded-full border border-gold">
              <Check className="size-6 text-gold" />
            </div>
            <h3 className="text-display mt-8 text-3xl text-foreground">Thank you, {data.name.split(" ")[0]}</h3>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              Your request for <span className="text-foreground">{data.service}</span> with{" "}
              <span className="text-foreground">{stylists.find((s) => s.id === data.stylist)?.name}</span> on{" "}
              <span className="text-foreground">{data.date}</span> at{" "}
              <span className="text-foreground">{data.time}</span> has been received.
              We'll confirm by email shortly.
            </p>
            <Button
              variant="outline"
              className="mt-10"
              onClick={() => {
                setDone(false)
                setStep(0)
                setData({ category: "", service: "", stylist: "", date: "", time: "", name: "", email: "", phone: "", notes: "" })
              }}
            >
              Book another appointment
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="border border-border p-8 md:p-12"
          >
            {/* Progress */}
            <div className="mb-10">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-meta text-muted-foreground">
                  Step {step + 1} of {steps.length}
                </span>
                <span className="text-meta text-gold">{steps[step]}</span>
              </div>
              <Progress value={((step + 1) / steps.length) * 100} className="h-px bg-border" />
            </div>

            <AnimatePresence mode="wait">
              {/* Step 0: Category */}
              {step === 0 && (
                <StepWrapper key="cat">
                  <StepTitle>Choose your experience</StepTitle>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {["Hair", "Beauty"].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => update("category", cat)}
                        className={cn(
                          "border p-6 text-left transition-all duration-300",
                          data.category === cat
                            ? "border-gold bg-gold/5"
                            : "border-border hover:border-foreground/30"
                        )}
                      >
                        <p className="text-display text-2xl text-foreground">{cat}</p>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {cat === "Hair" ? "Cut, colour, texture, and transformation" : "Brows, lashes, and makeup"}
                        </p>
                      </button>
                    ))}
                  </div>
                </StepWrapper>
              )}

              {/* Step 1: Service */}
              {step === 1 && (
                <StepWrapper key="svc">
                  <StepTitle>Select a service</StepTitle>
                  <div className="space-y-px">
                    {servicesForCategory.map((svc) => (
                      <button
                        key={svc.name}
                        onClick={() => update("service", svc.name)}
                        className={cn(
                          "flex w-full items-center justify-between border-b border-border py-4 text-left transition-colors",
                          data.service === svc.name ? "text-gold" : "text-foreground hover:text-gold"
                        )}
                      >
                        <div>
                          <p className="text-sm font-medium">{svc.name}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{svc.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">{svc.price}</p>
                          <p className="text-meta mt-1 text-muted-foreground">{svc.duration}</p>
                        </div>
                      </button>
                    ))}
                    {servicesForCategory.length === 0 && (
                      <p className="py-8 text-sm text-muted-foreground">Please go back and select a category first.</p>
                    )}
                  </div>
                </StepWrapper>
              )}

              {/* Step 2: Stylist */}
              {step === 2 && (
                <StepWrapper key="sty">
                  <StepTitle>Choose your artist</StepTitle>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {stylists.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => update("stylist", s.id)}
                        className={cn(
                          "flex items-center gap-4 border p-4 text-left transition-all duration-300",
                          data.stylist === s.id ? "border-gold bg-gold/5" : "border-border hover:border-foreground/30"
                        )}
                      >
                        <div
                          className="size-14 shrink-0 rounded-full bg-cover bg-center grayscale"
                          style={{ backgroundImage: `url(${s.image})` }}
                        />
                        <div>
                          <p className="text-sm font-medium text-foreground">{s.name}</p>
                          <p className="text-meta mt-1 text-muted-foreground">{s.specialty}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </StepWrapper>
              )}

              {/* Step 3: Date */}
              {step === 3 && (
                <StepWrapper key="date">
                  <StepTitle>Select a date</StepTitle>
                  <div className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={data.date ? new Date(data.date) : undefined}
                      onSelect={(d) => d && update("date", d.toISOString().split("T")[0])}
                      disabled={(d) => d < new Date() || d.getDay() === 0 || d.getDay() === 1}
                      className="rounded-md border border-border"
                    />
                  </div>
                </StepWrapper>
              )}

              {/* Step 4: Time */}
              {step === 4 && (
                <StepWrapper key="time">
                  <StepTitle>Choose a time</StepTitle>
                  <div className="grid grid-cols-3 gap-3">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot.time}
                        disabled={!slot.available}
                        onClick={() => update("time", slot.time)}
                        className={cn(
                          "border py-3 text-sm transition-all duration-300",
                          !slot.available
                            ? "cursor-not-allowed border-border/50 text-muted-foreground/40"
                            : data.time === slot.time
                              ? "border-gold bg-gold/5 text-gold"
                              : "border-border text-foreground hover:border-foreground/30"
                        )}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </StepWrapper>
              )}

              {/* Step 5: Contact */}
              {step === 5 && (
                <StepWrapper key="contact">
                  <StepTitle>Your details</StepTitle>
                  <div className="space-y-4">
                    <div>
                      <label className="text-meta mb-2 block text-muted-foreground">Full name</label>
                      <Input
                        value={data.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div>
                      <label className="text-meta mb-2 block text-muted-foreground">Email</label>
                      <Input
                        type="email"
                        value={data.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="jane@example.com"
                      />
                    </div>
                    <div>
                      <label className="text-meta mb-2 block text-muted-foreground">Phone (optional)</label>
                      <Input
                        value={data.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        placeholder="+44 7700 900000"
                      />
                    </div>
                    <div>
                      <label className="text-meta mb-2 block text-muted-foreground">Notes (optional)</label>
                      <Input
                        value={data.notes}
                        onChange={(e) => update("notes", e.target.value)}
                        placeholder="Any details we should know"
                      />
                    </div>
                  </div>
                </StepWrapper>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="mt-10 flex items-center justify-between">
              <button
                onClick={prev}
                disabled={step === 0}
                className={cn(
                  "flex items-center gap-2 text-meta transition-colors",
                  step === 0 ? "text-muted-foreground/30" : "text-foreground hover:text-gold"
                )}
              >
                <ChevronLeft className="size-4" /> Back
              </button>

              {step < steps.length - 1 ? (
                <button
                  onClick={next}
                  disabled={!canAdvance}
                  className={cn(
                    "flex items-center gap-2 text-meta transition-colors",
                    canAdvance ? "text-gold hover:text-foreground" : "text-muted-foreground/30"
                  )}
                >
                  Continue <ChevronRight className="size-4" />
                </button>
              ) : (
                <Button
                  onClick={submit}
                  disabled={!canAdvance || submitting}
                  className="bg-gold text-gold-foreground hover:bg-gold/90"
                >
                  {submitting ? "Sending..." : "Confirm Booking"}
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

function StepWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  )
}

function StepTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-display mb-8 text-2xl text-foreground">{children}</h3>
}
