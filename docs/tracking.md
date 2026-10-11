# Tracking & conversies (directschoorsteenvegen.nl)

## Wat de site doet
- `app/layout.tsx` zet in `<head>` (vóór GTM) Consent Mode v2 **default = denied**
  (`ad_storage`, `ad_user_data`, `ad_personalization`, `analytics_storage`,
  `wait_for_update: 500`), past een opgeslagen keuze (`localStorage["cookie-consent"]`)
  direct opnieuw toe en laadt daarna altijd gtag.js (`G-PHQN1MJ0FY`) en GTM (`GTM-P8ZGLMP`).
- De cookiebanner roept `gtag('consent','update', …)` aan (granted bij Accepteren,
  denied bij Weigeren) en pusht `consent_update`.
- dataLayer-events:

| event | wanneer | velden |
|---|---|---|
| `lead_form_success` | alleen na `ok` van `/api/afspraak`, 1× per verzending | `form_id` (`afspraak_card`/`afspraak_page`), `lead_city`, `event_id`, `user_data.email`, `user_data.phone_number` (E.164), `user_data.address.postal_code`, `user_data.address.country` (`NL`) |
| `phone_click` | klik op elke `tel:`-link | `phone_number`, `click_location`, `page_path` |
| `consent_update` | keuze in banner | `consent_choice` |

`user_data` is alleen voor Google Ads enhanced conversions. **Nooit** als GA4-eventparameter
meesturen (PII in GA4 is verboden).

Optioneel: `NEXT_PUBLIC_GOOGLE_ADS_ID=AW-…` (build-variabele) laadt ook een directe
`gtag('config', AW-…)`. Niet nodig als de Ads-tag in GTM staat (aanbevolen) — niet allebei
conversies laten versturen.

## Handmatige stappen in GTM (GTM-P8ZGLMP)
1. **Variabelen** (Data Layer Variable, versie 2): `dlv - form_id` → `form_id`,
   `dlv - event_id` → `event_id`, `dlv - phone_number` → `phone_number`,
   `dlv - user_data.email`, `dlv - user_data.phone_number`,
   `dlv - user_data.address.postal_code`, `dlv - user_data.address.country`.
2. **Variabele "Door gebruiker verstrekte gegevens"** (User-Provided Data), handmatige
   configuratie: E-mail = `{{dlv - user_data.email}}`, Telefoon = `{{dlv - user_data.phone_number}}`,
   Postcode = `{{dlv - user_data.address.postal_code}}`, Land = `{{dlv - user_data.address.country}}`.
3. **Triggers** (Aangepaste gebeurtenis): `CE - lead_form_success`, `CE - phone_click`.
4. **Oude triggers weg**: de klik-trigger op tekst "Afspraak aanvragen" (→ `contactformulier_verzonden`)
   en de tel-trigger op `tel:0850605517` verwijderen/ontkoppelen.
5. **GA4-eventtags**: `contactformulier_verzonden` laten vuren op `CE - lead_form_success`
   (zelfde eventnaam houden, dan blijft de bestaande GA4-import in Ads werken) met
   parameter `form_id`; `telnr_klik` laten vuren op `CE - phone_click`. Geen `user_data` meesturen.
6. **Google Ads**: in Ads een conversieactie "Website – Afspraakformulier" (categorie
   *Lead indienen / Submit lead form*, Telling: Eén, primair) aanmaken via
   *Handmatig met code* → Conversie-ID (AW-…) + label noteren. Zet enhanced conversions
   voor leads aan (via GTM). Optioneel ook een secundaire actie "Website – Klik om te bellen".
7. **GTM-tags**: *Conversielinker* (All Pages); *Google-tag* met tag-ID `AW-…` (Initialisatie);
   *Google Ads-conversietracking* met ID/label, trigger `CE - lead_form_success`,
   Transactie-ID = `{{dlv - event_id}}`, *Door gebruiker verstrekte gegevens opnemen* aan →
   variabele uit stap 2. Idem (zonder user data) voor `CE - phone_click`.
8. **Consent**: in GTM Beheer → Containerinstellingen "Overzicht van toestemming" aanzetten;
   Google-tags hebben ingebouwde consent checks, geen extra trigger op "Accepteren" nodig.
   Eventuele oude triggers die alleen na Accepteren vuren weghalen.
9. **Testen** met Tag Assistant (Preview): weiger → tags met consent denied; accepteer →
   granted; verstuur testformulier → één `lead_form_success`, Ads-tag 1× met user data.
10. **Ads-doelen opschonen**: nieuwe formulieractie primair; GA4-imports
    `contactformulier_verzonden` / `telnr_klik`, UA "tel tag" en "Schoorsteenexpert (web) Telefoon_klik"
    op secundair zetten zodra de nieuwe actie data heeft (voorkomt dubbel tellen).
