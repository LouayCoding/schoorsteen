"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { readConsent, updateConsent } from "@/lib/tracking";

/*
 * gtag.js en GTM worden altijd geladen (zie app/layout.tsx) met Consent Mode v2
 * op "denied". Deze banner zet alleen de toestemming bij via
 * gtag('consent','update', …) en bewaart de keuze; bij herladen past de
 * bootstrap in <head> de opgeslagen keuze opnieuw toe.
 */

const noopSubscribe = () => () => {};

export default function CookieConsent() {
  // Server: "unknown" (geen banner); client: opgeslagen keuze uit localStorage.
  const stored = useSyncExternalStore(
    noopSubscribe,
    () => readConsent() ?? "none",
    () => "unknown",
  );
  const [dismissed, setDismissed] = useState(false);
  const visible = stored === "none" && !dismissed;

  function decide(accepted: boolean) {
    updateConsent(accepted ? "accepted" : "declined");
    setDismissed(true);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookievoorkeuren"
      className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-sm z-[70] bg-elevated border border-divider rounded-2xl p-5 shadow-none"
    >
      <p className="text-sm font-semibold mb-1">Cookies</p>
      <p className="text-sm text-muted leading-relaxed mb-4">
        Wij gebruiken analytische en advertentiecookies (Google) om de website en onze advertenties te verbeteren. Zie ons{" "}
        <Link href="/privacy" className="underline hover:text-foreground">
          privacybeleid
        </Link>
        .
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => decide(true)}
          className="flex-1 bg-accent text-accent-ink text-sm font-semibold py-2.5 rounded-full hover:bg-accent-hover transition-colors"
        >
          Accepteren
        </button>
        <button
          onClick={() => decide(false)}
          className="flex-1 border border-divider text-sm font-semibold py-2.5 rounded-full hover:border-muted transition-colors"
        >
          Weigeren
        </button>
      </div>
    </div>
  );
}
