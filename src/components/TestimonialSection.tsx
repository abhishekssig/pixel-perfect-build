import { useRef } from "react";
import katanaImg from "@/assets/katana.png";

const testimonials = [
  {
    name: "Amelia Li",
    company: "Quantum Ware",
    role: "Co-Founder & CEO",
    avatar: "https://i.pravatar.cc/80?img=1",
    quote:
      "Working with the team at Root Development Solutions has been an absolute pleasure! Their team of developers is incredibly skilled and responsive.",
  },
  {
    name: "Ethan Anderson",
    company: "Nexus Labs",
    role: "Operations Manager",
    avatar: "https://i.pravatar.cc/80?img=3",
    quote:
      "Working with the team at Root Development Solutions has been an absolute pleasure! Their team of developers is incredibly skilled and experienced.",
  },
  {
    name: "Natasha Hiren",
    company: "Velocity Inc",
    role: "Product Designer",
    avatar: "https://i.pravatar.cc/80?img=5",
    quote:
      "Working with the team at Root Development Solutions has been an absolute pleasure! Their team of developers is incredibly skilled and experienced. They took our requirements and turned them into a cutting-edge software solution.",
  },
  {
    name: "Aria Rodriguez",
    company: "Orbit Systems",
    role: "Lead Developer",
    avatar: "https://i.pravatar.cc/80?img=9",
    quote:
      "Working with the team at Root Development Solutions has been an absolute pleasure! Their team of developers is incredibly skilled and experienced. They turned them into a cutting-edge software solution that has revolutionized our internal processes.",
  },
];

const TestimonialSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative z-20 bg-black min-h-screen flex items-center overflow-hidden">
      {/* Left side - Katana image (static) */}
      <div className="hidden md:flex w-[45%] h-screen items-center justify-center relative flex-shrink-0">
        <img
          src={katanaImg}
          alt="Katana"
          className="h-[85%] w-auto object-contain"
          style={{ transform: "rotate(-15deg) translateX(-5%)" }}
        />
      </div>

      {/* Right side - Scrollable testimonials */}
      <div className="flex-1 relative h-screen flex flex-col justify-center py-16 px-6 md:px-0 md:pr-12">
        {/* Top gradient fade */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          className="overflow-y-auto h-[70vh] space-y-6 pr-4 scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-8 flex flex-col gap-5"
            >
              {/* Header */}
              <div className="flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-white/20"
                />
                <div>
                  <p className="text-red-400 text-xs font-medium tracking-wider uppercase">
                    {t.company}
                  </p>
                  <p className="text-white text-base font-semibold">{t.name}</p>
                  <p className="text-white/40 text-sm">{t.role}</p>
                </div>
              </div>
              {/* Quote */}
              <p className="text-white/60 text-base leading-relaxed">
                "{t.quote}"
              </p>
            </div>
          ))}
          {/* Spacer for bottom gradient */}
          <div className="h-16" />
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
