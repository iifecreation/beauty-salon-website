// components/ChooseAcademy.tsx
import React from "react";

export default function ChooseAcademy() {
  const reasons = [
    {
      title: "Accredited Training",
      desc: "Our academy is recognized and accredited, giving you certifications that are respected in the beauty industry worldwide.",
      icon: (
        <>
          <path d="M4 6l8-4 8 4v6c0 5-4 9-8 10-4-1-8-5-8-10V6z" />
          <path d="M12 22V12" />
        </>
      ),
    },
    {
      title: "Expert Instructors",
      desc: "Learn from seasoned makeup artists, nail technicians, and beauty experts with years of hands-on industry experience.",
      icon: (
        <>
          <circle cx="12" cy="7" r="4" />
          <path d="M6 21v-2a6 6 0 0 1 12 0v2" />
        </>
      ),
    },
    {
      title: "Hands-On Learning",
      desc: "We combine theory with real-world practice so you graduate confident, skilled, and industry-ready.",
      icon: (
        <>
          <rect x="3" y="4" width="18" height="14" rx="2" />
          <path d="M3 10h18" />
        </>
      ),
    },
    {
      title: "Career Support",
      desc: "From internships to job placements, we guide you with career mentorship and business skills to thrive after graduation.",
      icon: (
        <>
          <path d="M16 21v-2a4 4 0 0 0-8 0v2" />
          <circle cx="12" cy="7" r="4" />
        </>
      ),
    },
  ];

  return (
    <section className="text-center py-12 md:py-20">
      <h2 className="text-[32px] md:text-[48px] mb-8 text-center font-sentient font-light leading-tight tracking-[-3.2px] text-foreground ">
        Why Choose Beauty Kept Academy?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-0">
        {reasons.map((item, idx) => (
          <div
            key={idx}
            className="group rounded-xl p-6 shadow-sm bg-white text-gray-900 transition-transform transform hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg hover:bg-test-brown-800 hover:text-white cursor-pointer space-y-4"
          >
            <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center bg-test-brown-800 transition-colors group-hover:bg-white">
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
