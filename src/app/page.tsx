import HeroSection from "../sections/HeroSection";
import AboutSection from "../sections/AboutSection";
import BatchNetworkSection from "../sections/BatchNetworkSection";
import AlumniSpotlightSection from "../sections/AlumniSpotlightSection";
import MemoryQuoteSection from "../sections/MemoryQuoteSection";
import CTASection from "../sections/CTASection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <BatchNetworkSection />
      <AlumniSpotlightSection />
      <MemoryQuoteSection />
      <CTASection />
    </main>
  );
}