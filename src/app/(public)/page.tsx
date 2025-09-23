import AboutHomeSection from "@/components/AboutSection";
import AwardsSection from "@/components/AwardsSection";
import ContactSection from "@/components/ContactSection";
import FAQSection from "@/components/FAQSection";
import AboutSection from "@/components/layouts/AboutSection";
import HeroSection from "@/components/layouts/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import SkincareInfoSection from "@/components/SkincareInfoSection";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutHomeSection />
      <AboutSection  />
      <SkincareInfoSection  />
      <ProductsSection  />
      <AwardsSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
    </main>
  );
}
