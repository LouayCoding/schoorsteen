"use client";

import { useTranslation, type Locale } from "@/lib/i18n-context";

const LOCALES: Locale[] = ["nl", "en"];

const labels: Record<Locale, string> = {
  nl: "NL",
  en: "EN",
};

export default function LanguageSwitcher({ iconOnly = false }: { iconOnly?: boolean }) {
  const { locale, setLocale } = useTranslation();

  const nextLocale: Locale = locale === "nl" ? "en" : "nl";

  if (iconOnly) {
    return (
      <button
        onClick={() => setLocale(nextLocale)}
        aria-label={`Switch to ${labels[nextLocale]}`}
        className="w-11 h-11 flex items-center justify-center hover:opacity-70 transition-opacity duration-200"
      >
        {locale === "nl" ? (
          <img src="https://flagcdn.com/w40/nl.png" alt="NL" width={20} height={15} className="rounded-sm" />
        ) : (
          <img src="https://flagcdn.com/w40/gb.png" alt="EN" width={20} height={15} className="rounded-sm" />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={() => setLocale(nextLocale)}
      aria-label={`Switch to ${labels[nextLocale]}`}
      className="flex items-center gap-2 px-2 py-2 text-sm font-medium text-muted hover:text-foreground transition-colors duration-200"
    >
      <img
        src={`https://flagcdn.com/w40/${locale === "en" ? "gb" : locale}.png`}
        alt={labels[locale]}
        width={16}
        height={12}
        className="rounded-sm"
      />
      <span>{labels[locale]}</span>
    </button>
  );
}
