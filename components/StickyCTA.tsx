"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PHONE_HREF } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n-context";

export default function StickyCTA() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-divider px-4 pt-3 flex gap-3 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <a
        href={PHONE_HREF}
        className="flex-1 text-center bg-accent text-foreground font-medium text-sm py-3 rounded hover:bg-accent-hover transition-colors"
      >
        {t("stickyCta.call")}
      </a>
      <Link
        href="/afspraak"
        className="flex-1 text-center border border-divider text-foreground font-medium text-sm py-3 rounded hover:border-muted transition-colors"
      >
        {t("stickyCta.appointment")}
      </Link>
    </div>
  );
}
