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
    description: `Professionele schoorsteenveger in ${stad}. Schoorsteen vegen, inspectie en reparatie in ${stad} en omgeving. Vakkundig, snel en eerlijk geprijsd. Direct online plannen.`,
    alternates: {
      canonical: `/werkgebied/${stadSlug}`,
    },
    openGraph: {
      title: `Schoorsteenveger ${stad} | Schoorsteenservice`,
      description: `Professionele schoorsteenveger in ${stad} en omgeving. Schoorsteen vegen vanaf €39,50. Snel geholpen.`,
      url: `/werkgebied/${stadSlug}`,
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
