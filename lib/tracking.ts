/**
 * Centrale tracking-helpers (GTM dataLayer + Google Consent Mode v2).
 *
 * - Consent default (alles "denied") wordt in app/layout.tsx gezet vóórdat
 *   gtag.js / GTM laden (zie buildTrackingBootstrap hieronder).
 * - De cookiebanner roept updateConsent() aan en bewaart de keuze in
 *   localStorage; bij een volgende pageload past de bootstrap die keuze
 *   direct opnieuw toe.
 * - Conversies gaan via de dataLayer naar GTM: `lead_form_success`
 *   (primair, alleen na bevestigde verzending) en `phone_click` (secundair).
 */

export const GA_ID = "G-PHQN1MJ0FY";
export const GTM_ID = "GTM-P8ZGLMP";
/** Optioneel: Google Ads tag-ID (AW-XXXXXXXXX). Leeg = niet direct laden, alles via GTM. */
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "";

export const CONSENT_STORAGE_KEY = "cookie-consent";
export type ConsentChoice = "accepted" | "declined";

type DataLayerEvent = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") {
    // Fallback als de bootstrap uit layout.tsx (nog) niet gedraaid heeft.
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      // gtag verwacht het arguments-object, geen array.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
  }
  window.gtag(...args);
}

export function pushDataLayer(event: DataLayerEvent) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

/* ------------------------------------------------------------------ */
/* Consent Mode v2                                                     */
/* ------------------------------------------------------------------ */

export function consentState(granted: boolean) {
  const v = granted ? "granted" : "denied";
  return {
    ad_storage: v,
    ad_user_data: v,
    ad_personalization: v,
    analytics_storage: v,
  } as const;
}

export function readConsent(): ConsentChoice | null {
  try {
    const v = localStorage.getItem(CONSENT_STORAGE_KEY);
    return v === "accepted" || v === "declined" ? v : null;
  } catch {
    return null;
  }
}

export function updateConsent(choice: ConsentChoice) {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    /* private mode e.d. — keuze geldt dan alleen voor deze pagina */
  }
  gtag("consent", "update", consentState(choice === "accepted"));
  pushDataLayer({ event: "consent_update", consent_choice: choice });
}

/**
 * Inline script voor <head>: draait vóór alles. Zet dataLayer + gtag-stub,
 * Consent Mode v2 default (denied), past een opgeslagen keuze opnieuw toe en
 * laadt daarna pas gtag.js (GA4 / optioneel Ads) en GTM.
 */
export function buildTrackingBootstrap() {
  const denied = JSON.stringify({ ...consentState(false), wait_for_update: 500 });
  const granted = JSON.stringify(consentState(true));
  const ids = [GA_ID, GOOGLE_ADS_ID].filter(Boolean);
  const configs = ids.map((id) => `gtag('config',${JSON.stringify(id)});`).join("");
  return (
    `(function(w,d){w.dataLayer=w.dataLayer||[];function gtag(){w.dataLayer.push(arguments);}w.gtag=gtag;` +
    `gtag('consent','default',${denied});` +
    `gtag('set','ads_data_redaction',true);` +
    `try{if(localStorage.getItem(${JSON.stringify(CONSENT_STORAGE_KEY)})==='accepted'){gtag('consent','update',${granted});}}catch(e){}` +
    `gtag('js',new Date());${configs}` +
    `var s=d.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=${GA_ID}';d.head.appendChild(s);` +
    `w.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});` +
    `var g=d.createElement('script');g.async=true;g.src='https://www.googletagmanager.com/gtm.js?id=${GTM_ID}';d.head.appendChild(g);` +
    `})(window,document);`
  );
}

/* ------------------------------------------------------------------ */
/* Events                                                              */
/* ------------------------------------------------------------------ */

/** Nederlands nummer → E.164 (+31…). Geeft undefined bij onbruikbare invoer. */
export function toE164NL(raw: string): string | undefined {
  let d = raw.replace(/[^\d+]/g, "");
  if (d.startsWith("00")) d = "+" + d.slice(2);
  if (d.startsWith("+")) {
    const digits = d.slice(1).replace(/\D/g, "");
    return digits.length >= 8 ? `+${digits}` : undefined;
  }
  d = d.replace(/\D/g, "");
  if (d.startsWith("31")) return `+${d}`;
  if (d.startsWith("0")) d = d.slice(1);
  return d.length === 9 ? `+31${d}` : undefined;
}

export function normalizePostcode(raw: string) {
  return raw.replace(/\s+/g, "").toUpperCase();
}

export interface LeadData {
  email: string;
  telefoon: string;
  postcode: string;
  stad?: string;
}

/**
 * Alleen aanroepen na een bevestigd succesvolle verzending (API ok).
 * `user_data` is bedoeld voor de GTM-variabele "Door gebruiker verstrekte
 * gegevens" (enhanced conversions). Stuur deze NIET mee als GA4-parameter.
 */
export function trackLeadSuccess(formId: string, lead: LeadData) {
  const eventId = `lead_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  const phone = toE164NL(lead.telefoon);
  pushDataLayer({
    event: "lead_form_success",
    form_id: formId,
    lead_city: lead.stad || undefined,
    event_id: eventId,
    user_data: {
      email: lead.email.trim().toLowerCase(),
      ...(phone ? { phone_number: phone } : {}),
      address: {
        postal_code: normalizePostcode(lead.postcode),
        country: "NL",
      },
    },
  });
  return eventId;
}

/** Klik op een tel:-link (secundaire conversie). */
export function trackPhoneClick(href: string, location?: string) {
  const number = href.replace(/^tel:/i, "").trim();
  pushDataLayer({
    event: "phone_click",
    phone_number: toE164NL(number) ?? number,
    click_location: location,
    page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
  });
}
