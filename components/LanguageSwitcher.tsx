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
    <div className="flex items-center gap-2">
      {LOCALES.map((loc) => (
        <button
          key={loc}
          onClick={() => setLocale(loc)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-colors duration-200 ${
            locale === loc
              ? "bg-accent text-foreground"
              : "text-muted hover:text-foreground hover:bg-surface"
          }`}
          aria-label={`Switch to ${labels[loc]}`}
        >
          <img
            src={`https://flagcdn.com/w40/${loc === "en" ? "gb" : loc}.png`}
            alt={labels[loc]}
            width={16}
            height={12}
            className="rounded-sm"
          />
          <span>{labels[loc]}</span>
        </button>
      ))}
    </div>
  );
}
