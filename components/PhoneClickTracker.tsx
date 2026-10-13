"use client";

import { useEffect } from "react";
import { trackPhoneClick } from "@/lib/tracking";

/**
 * Eén centrale listener voor alle tel:-links op de site (header, footer,
 * sticky CTA, formulier, …), zodat losse componenten niets hoeven te doen.
 * Pusht `phone_click` naar de dataLayer — secundaire conversie.
 */
export default function PhoneClickTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as Element | null;
      const link = target?.closest?.('a[href^="tel:"]') as HTMLAnchorElement | null;
      if (!link) return;
      const location =
        link.dataset.trackLocation ||
        link.closest("header, footer, form, [data-track-section]")?.tagName.toLowerCase() ||
        undefined;
      trackPhoneClick(link.getAttribute("href") || "", location);
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
