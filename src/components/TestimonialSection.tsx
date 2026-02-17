import katanaImg from "@/assets/katana.png";

const testimonials = [
  {
    name: "Amelia Li",
    role: "Co-Founder & CEO",
    avatar: "https://i.pravatar.cc/80?img=1",
    quote:
      "Working with the team at Root Developer Solutions has been an absolute pleasure! Their team of developers is incredibly skilled and experienced. They took our requirements and turned them into a cutting-edge software solution that has revolutionized our internal processes.",
  },
  {
    name: "Ethan Anderson",
    role: "Operations Manager",
    avatar: "https://i.pravatar.cc/80?img=3",
    quote:
      "Working with the team at Root Developer Solutions has been an absolute pleasure! Their team of developers is incredibly skilled and experienced.",
  },
  {
    name: "Natasha Hiren",
    role: "Product Designer",
    avatar: "https://i.pravatar.cc/80?img=5",
    quote:
      "Working with the team at Root Developer Solutions has been an absolute pleasure! Their team of developers is incredibly skilled and experienced. They took our requirements and turned them into a cutting-edge software solution.",
  },
  {
    name: "Aria Rodriguez",
    role: "Lead Developer",
    avatar: "https://i.pravatar.cc/80?img=9",
    quote:
      "Working with the team at Root Developer Solutions has been an absolute pleasure! Their team of developers is incredibly skilled and experienced. They turned them into a cutting-edge software solution that has revolutionized our internal processes and experience.",
  },
];

const TestimonialSection = () => {
  return (
    <section className="relative z-20 bg-black min-h-screen py-24 px-6 md:px-16 lg:px-24 overflow-hidden">
      {/* Katana image - left side */}
      <div className="absolute left-0 bottom-0 w-[300px] md:w-[400px] lg:w-[500px] z-0 pointer-events-none">
        <img
          src={katanaImg}
          alt="Katana"
          className="w-full h-auto object-contain opacity-80"
          style={{
            transform: "rotate(-15deg) translate(-20%, 10%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Testimonial grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm p-6 md:p-8 flex flex-col gap-4"
            >
              {/* Header */}
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-white text-sm font-medium">{t.name}</p>
                  <p className="text-white/50 text-xs">{t.role}</p>
                </div>
              </div>
              {/* Quote */}
              <p className="text-white/70 text-sm leading-relaxed">
                "{t.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
