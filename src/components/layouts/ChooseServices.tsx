// components/ChooseServices.tsx
import React from "react";

export default function ChooseServices() {
  const reasons = [
    {
      title: "Certified Professionals",
      desc: "Our makeup artists, nail technicians and estheticians are certified, experienced, and follow strict hygiene standards to deliver safe, consistent, and beautiful results.",
      icon: (
        <>
          <path d="M12 2l2.9 6.3L21 9l-4.5 3.4L18.2 19 12 15.9 5.8 19l1.7-6.6L3 9l6.1-.7L12 2z" />
        </>
      ),
    },
    {
      title: "Premium, Skin-Safe Products",
      desc: "We use professional-grade, dermatologist-tested products and sterile tools so your skin and nails get luxurious care — with lasting, healthy results.",
      icon: (
        <>
          <path d="M6 2h12l-1.5 6H7.5L6 2z" />
          <path d="M8 10v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V10" />
        </>
      ),
    },
    {
      title: "Flexible Booking & Mobile Options",
      desc: "Easy online booking, flexible appointment times, and on-site/mobile services for events — we work around your schedule to make beauty effortless.",
      icon: (
        <>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </>
      ),
    },
    {
      title: "Satisfaction + Aftercare",
      desc: "We stand behind our work — complimentary minor touch-ups and clear aftercare instructions help your makeup and nail looks stay flawless longer.",
      icon: (
        <>
          <path d="M12 2a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
          <path d="M9.5 12l1.5 1.5 3.5-3.5" />
        </>
      ),
    },
  ];

  return (
    <section className="text-center mb-20 mx-auto max-w-[1440px] lg:px-16 py-7 px-4 sm:px-10">
      <h2 className="text-[32px] md:text-[48px] font-sentient  font-light mb-12">
        Why Choose Beauty Kept Services?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-0">
        {reasons.map((item, idx) => (
          <div
            key={idx}
            className="group rounded-xl p-6 shadow-sm bg-white text-gray-900 transition-transform transform hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg hover:bg-warm-brown-700 hover:text-white cursor-pointer space-y-4"
          >
            <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center bg-warm-brown-700 transition-colors group-hover:bg-white">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                className="text-primary-foreground group-hover:text-warm-brown-700"
                aria-hidden="true"
              >
                {item.icon}
              </svg>
            </div>

            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-sm leading-relaxed text-gray-600 group-hover:text-gray-100">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
