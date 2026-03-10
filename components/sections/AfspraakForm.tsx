"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { fadeUp, viewportConfig } from "@/lib/animations";
import SectionHeader from "@/components/SectionHeader";

export default function AfspraakForm() {
  const [formData, setFormData] = useState({
    naam: "",
    email: "",
    telefoon: "",
    postcode: "",
    huisnummer: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          naam: "",
          email: "",
          telefoon: "",
          postcode: "",
          huisnummer: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Submit error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="py-20 md:py-28 border-t border-divider">
      <div className="mx-auto max-w-[1400px] px-6">
        <SectionHeader
          eyebrow="Direct plannen"
          title="Maak een afspraak."
          subtitle="Vul het formulier in en wij nemen binnen 24 uur contact met u op."
        />

        <motion.form
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          onSubmit={handleSubmit}
          className="max-w-[600px] mx-auto"
        >
          <motion.div variants={fadeUp} className="flex flex-col gap-6">
            <div>
              <label htmlFor="naam" className="block text-sm text-muted mb-2">
                Naam *
              </label>
              <input
                type="text"
                id="naam"
                name="naam"
                required
                value={formData.naam}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-surface border border-divider rounded text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors duration-200"
                placeholder="Uw naam"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm text-muted mb-2">
                E-mailadres *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-surface border border-divider rounded text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors duration-200"
                placeholder="uw@email.nl"
              />
            </div>

            <div>
              <label htmlFor="telefoon" className="block text-sm text-muted mb-2">
                Telefoonnummer *
              </label>
              <input
                type="tel"
                id="telefoon"
                name="telefoon"
                required
                value={formData.telefoon}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-surface border border-divider rounded text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors duration-200"
                placeholder="06 12345678"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="postcode" className="block text-sm text-muted mb-2">
                  Postcode *
                </label>
                <input
                  type="text"
                  id="postcode"
                  name="postcode"
                  required
                  value={formData.postcode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-surface border border-divider rounded text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors duration-200"
                  placeholder="1234 AB"
                />
              </div>

              <div>
                <label htmlFor="huisnummer" className="block text-sm text-muted mb-2">
                  Huisnummer *
                </label>
                <input
                  type="text"
                  id="huisnummer"
                  name="huisnummer"
                  required
                  value={formData.huisnummer}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-surface border border-divider rounded text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors duration-200"
                  placeholder="123"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-accent text-foreground font-medium text-sm px-6 py-3 rounded hover:bg-accent-hover transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Verzenden..." : "Afspraak aanvragen"}
            </button>

            {submitStatus === "success" && (
              <p className="text-sm text-accent text-center">
                ✓ Bedankt! We nemen binnen 24 uur contact met u op.
              </p>
            )}

            {submitStatus === "error" && (
              <p className="text-sm text-red-500 text-center">
                Er is iets misgegaan. Probeer het opnieuw of bel ons direct.
              </p>
            )}

            {submitStatus === "idle" && (
              <p className="text-xs text-muted text-center">
                We nemen binnen 24 uur contact met u op
              </p>
            )}
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
}
