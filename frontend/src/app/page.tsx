import HeroSection from "../sections/HeroSection";
import AboutSection from "../sections/AboutSection";
import BatchNetworkSection from "../sections/BatchNetworkSection";
import FestSection from "../sections/FestSection";
import AlumniSpotlightSection from "../sections/AlumniSpotlightSection";
import MemoryQuoteSection from "../sections/MemoryQuoteSection";
import CTASection from "../sections/CTASection";

const alumni = [
  {
    name: "Rahul Sharma",
    role: "Senior Software Engineer",
    image: "/memories/Acer_Wallpaper_01_3840x2400.jpg",
    batch: "2015",
  },
  {
    name: "Priya Patel",
    role: "Product Manager",
    image: "/memories/Acer_Wallpaper_02_3840x2400.jpg",
    batch: "2016",
  },
  {
    name: "Arun Kumar",
    role: "Entrepreneur",
    image: "/memories/Acer_Wallpaper_03_3840x2400.jpg",
    batch: "2017",
  },
  {
    name: "Sneha Reddy",
    role: "Data Scientist",
    image: "/memories/Acer_Wallpaper_04_3840x2400.jpg",
    batch: "2018",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <FestSection />
      <AlumniSpotlightSection alumni={alumni} />
      <MemoryQuoteSection />
      <CTASection />
    </main>
  );
}