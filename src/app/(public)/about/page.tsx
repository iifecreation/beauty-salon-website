
import AwardsBanner from "@/components/layouts/AwardsSection";
import HeroBannerThree from "@/components/layouts/HeroBannerThree";
import OurValues from "@/components/layouts/OurValues";
import TeamSection from "@/components/layouts/TeamSection";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function Home() {
  return (
    <main>
      <HeroBannerThree image="" />

      <section className="mx-auto max-w-[1440px] lg:px-16 py-7 px-4 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          
          {/* Left Column - Short About Us */}
          <div className="md:col-span-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              About Us
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Delivering excellence in <span className="font-semibold">beauty services </span> 
              and <span className="font-semibold">professional training</span> 
              since 2024.
            </p>
          </div>

          {/* Right Column - Long Content */}
          <div className="md:col-span-2 text-gray-700 leading-relaxed space-y-4">
            <p>
              We are an outstanding, committed, poise, exceptional and excellent institution that 
              assures instilling the best knowledge, style and approach towards the make up world.
            </p>
            <p>
              Our projects are top class and also our tutors are one of the best in the world. 
              We are glad to have them transfer great skills and knowledge on the products and 
              services of the beauty makeup industry. 
            </p>
            <p className="font-semibold text-warm-brown-700">
              Let’s make it happen. We are ready.
            </p>
          </div>
        </div>
      </section>

      <TeamSection />

      <div>

        <OurValues />

        <AwardsBanner />

        <TestimonialsSection />

      </div>


    </main>
  );
}
