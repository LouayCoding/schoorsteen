"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PHONE_NUMBER, PHONE_HREF, COMPANY_NAME, NAV_LINKS } from "@/lib/constants";
import { useTheme } from "@/components/ThemeProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslation } from "@/lib/i18n-context";

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-divider"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-12 lg:px-20 flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="relative block h-10 w-auto">
          <Image
            src="/logo.png"
            alt={COMPANY_NAME}
            width={160}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-5">
          <button
            onClick={toggle}
            aria-label="Wissel thema"
            className="w-9 h-9 flex items-center justify-center text-muted hover:text-foreground transition-colors duration-200"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <LanguageSwitcher />
          <a
            href={PHONE_HREF}
            className="text-sm font-medium text-foreground tracking-wide"
          >
            {PHONE_NUMBER}
          </a>
          <Link
            href="/afspraak"
            className="text-sm font-medium bg-accent text-foreground px-5 py-2.5 rounded hover:bg-accent-hover transition-colors duration-200"
          >
            {t("hero.appointmentButton")}
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-1">
          <LanguageSwitcher iconOnly />
          <button
            onClick={toggle}
            aria-label="Wissel thema"
            className="w-11 h-11 flex items-center justify-center text-muted hover:text-foreground transition-colors"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative w-11 h-11 flex flex-col justify-center items-center gap-1.5"
            aria-label="Menu"
          >
            <span
              className={`block w-5 h-[1.5px] bg-foreground transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[3.5px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-foreground transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[2.5px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 top-16 bg-background z-[60] overflow-y-auto"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            <nav className="flex flex-col px-6 pt-8 gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-2xl font-heading font-semibold py-3 text-foreground hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-8 pt-8 border-t border-divider flex flex-col gap-4">
                <LanguageSwitcher />
                <a href={PHONE_HREF} className="text-lg font-medium text-accent">
                  {PHONE_NUMBER}
                </a>
                <Link
                  href="/afspraak"
                  onClick={() => setMenuOpen(false)}
                  className="text-center bg-accent text-foreground font-medium px-6 py-3 rounded hover:bg-accent-hover transition-colors"
                >
                  {t("hero.appointmentButton")}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
