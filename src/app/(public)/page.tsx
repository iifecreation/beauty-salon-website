import AboutHomeSection from "@/components/AboutSection";
import AwardsSection from "@/components/AwardsSection";
import FAQSection from "@/components/FAQSection";
import AboutSection from "@/components/layouts/AboutSection";
import HeroSection from "@/components/layouts/HeroSection";
import CoursesSection from "@/components/CoursesSection";
import ServicesSection from "@/components/ServicesSection";
import SkincareInfoSection from "@/components/SkincareInfoSection";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutHomeSection />
      <AboutSection  />
      <SkincareInfoSection  />
      <CoursesSection  />
      <ServicesSection />
      <AwardsSection />
      <TestimonialsSection />
      <FAQSection />
    </main>
  );
}
