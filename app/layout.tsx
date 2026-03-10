import type { Metadata, Viewport } from "next";
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

export const metadata: Metadata = {
  title: "Schoorsteenservice | Schoorsteen vegen door heel Nederland",
  description:
    "Professionele schoorsteen-, luchtkanaal- en ventilatieservice door heel Nederland. Schoorsteen vegen vanaf €39,50. Bel direct: 085 060 47 02.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={`${poppins.variable} ${montserrat.variable} antialiased`}>
        <ThemeProvider>
          <I18nProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <StickyCTA />
          </I18nProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
