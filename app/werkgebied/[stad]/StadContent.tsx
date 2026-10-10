import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import ServicesGrid from "@/components/sections/ServicesGrid";
import HowItWorks from "@/components/sections/HowItWorks";
import PricingTeaser from "@/components/sections/PricingTeaser";
import Werkgebied from "@/components/sections/Werkgebied";
import Reviews from "@/components/sections/Reviews";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export default function StadContent({ stad }: { stad: string }) {
  return (
    <>
      <Hero stad={stad} />
      <TrustStrip />
      <ServicesGrid />
      <HowItWorks />
      <PricingTeaser />
      <Werkgebied />
      <Reviews />
      <FAQ />
      <FinalCTA stad={stad} />
    </>
  );
}
