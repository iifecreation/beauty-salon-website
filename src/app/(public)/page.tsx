import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import AboutSection from "@/components/layouts/AboutSection";
import Header from "@/components/layouts/Header";
import HeroSection from "@/components/layouts/HeroSection";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
