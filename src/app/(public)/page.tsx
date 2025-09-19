import AboutHomeSection from "@/components/AboutSection";
import AwardsSection from "@/components/AwardsSection";
import ContactSection from "@/components/ContactSection";
import AboutSection from "@/components/layouts/AboutSection";
import HeroSection from "@/components/layouts/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import SkincareInfoSection from "@/components/SkincareInfoSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutHomeSection />
      <AboutSection  />
      <SkincareInfoSection  />
      <ProductsSection  />
      <AwardsSection />
      <ContactSection />
    </main>
  );
}
