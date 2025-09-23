// app/components/OurValues.tsx
import { Sparkles, Leaf, Lightbulb, Scissors } from "lucide-react";

export default function OurValues() {
  const values = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Beauty & Care",
      desc: "Creating a welcoming space where every client feels pampered, valued, and connected through beauty.",
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Sustainable Beauty",
      desc: "Committed to safe, eco-friendly practices in our makeup, pedicure, and nail services.",
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Creative Artistry",
      desc: "Encouraging innovation and artistry in beauty techniques while teaching through our academy.",
    },
    {
      icon: <Scissors className="w-6 h-6" />,
      title: "Flexibility & Training",
      desc: "Offering personalized services and academy courses tailored to unique beauty needs and skills.",
    },
  ];

  return (
    <section className="w-full py-12 px-6 bg-[#f8f6f2] rounded-2xl">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-center items-center mb-8">
          <h2 className="text-2xl text-center md:text-3xl font-semibold text-gray-900">
            Our Values
          </h2>

        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, idx) => (
            <div
              key={idx}
              className="group rounded-xl p-6 shadow-sm bg-white text-gray-900 transition 
                         hover:bg-warm-brown-700 hover:text-white cursor-pointer"
            >
              <div className="mb-4 transition group-hover:text-white">
                {value.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600 group-hover:text-gray-100">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
