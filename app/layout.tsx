import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Poppins, Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import ThemeProvider from "@/components/ThemeProvider";
import { I18nProvider } from "@/lib/i18n-context";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

const BASE_URL = "https://www.directschoorsteenvegen.nl";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Schoorsteenservice | Schoorsteen vegen door heel Nederland",
  description:
    "Professionele schoorsteen-, luchtkanaal- en ventilatieservice door heel Nederland. Schoorsteen vegen vanaf €39,50. Bel direct: 085 060 47 02.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    siteName: "Schoorsteenservice",
    locale: "nl_NL",
    title: "Schoorsteenservice | Schoorsteen vegen door heel Nederland",
    description:
      "Professionele schoorsteen-, luchtkanaal- en ventilatieservice door heel Nederland. Schoorsteen vegen vanaf €39,50.",
    images: [{ url: "/heropc.png", width: 1200, height: 630, alt: "Schoorsteenservice Nederland" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Schoorsteenservice | Schoorsteen vegen door heel Nederland",
    description:
      "Professionele schoorsteen-, luchtkanaal- en ventilatieservice door heel Nederland. Schoorsteen vegen vanaf €39,50.",
    images: ["/heropc.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PHQN1MJ0FY"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PHQN1MJ0FY');
          `}
        </Script>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-P8ZGLMP');
          `}
        </Script>
      </head>
      <body className={`${poppins.variable} ${montserrat.variable} antialiased`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P8ZGLMP"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <ThemeProvider>
          <I18nProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <StickyCTA />
          </I18nProvider>
        </ThemeProvider>
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Schoorsteenservice",
              url: BASE_URL,
              telephone: "085 060 47 02",
              email: "info@directschoorsteenvegen.nl",
              image: `${BASE_URL}/heropc.png`,
              priceRange: "€€",
              areaServed: {
                "@type": "Country",
                name: "Nederland",
              },
              sameAs: [BASE_URL],
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                opens: "08:00",
                closes: "18:00",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
