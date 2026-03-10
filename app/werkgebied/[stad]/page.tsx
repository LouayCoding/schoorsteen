import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSteden, getStadFromSlug, getStadSlug } from "@/lib/steden";
import StadContent from "./StadContent";

interface StadPageProps {
  params: Promise<{
    stad: string;
  }>;
}

export async function generateStaticParams() {
  const steden = getAllSteden();
  return steden.map((stad) => ({
    stad: getStadSlug(stad),
  }));
}

export async function generateMetadata({ params }: StadPageProps): Promise<Metadata> {
  const { stad: stadSlug } = await params;
  const stad = getStadFromSlug(stadSlug);

  if (!stad) {
    return { title: "Stad niet gevonden" };
  }

  return {
    title: `Schoorsteenveger ${stad} | Schoorsteenservice`,
    description: `Professionele schoorsteenveger in ${stad}. Schoorsteen vegen, inspectie en reparatie. Snel geholpen. Direct online plannen.`,
    openGraph: {
      title: `Schoorsteenveger ${stad}`,
      description: `Professionele schoorsteen service in ${stad} en omgeving.`,
    },
  };
}

export default async function StadPage({ params }: StadPageProps) {
  const { stad: stadSlug } = await params;
  const stad = getStadFromSlug(stadSlug);

  if (!stad) {
    notFound();
  }

  return <StadContent stad={stad} />;
}
