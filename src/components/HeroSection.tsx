import { useState, useEffect, useRef } from "react";
import logo from "@/assets/Frame_4.png";

const HeroSection = () => {
  const [scrolled, setScrolled] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-[200vh]">
      {/* Sticky hero container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-black">
        {/* Video background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Dark translucent overlay on scroll */}
        <div
          className="absolute inset-0 bg-black transition-opacity duration-700 ease-out"
          style={{ opacity: scrolled ? 0.55 : 0 }}
        />

        {/* Top navigation bar */}
        <div
          className="relative z-10 flex items-center justify-between px-6 md:px-10 py-5 transition-opacity duration-700"
          style={{ opacity: scrolled ? 1 : 0 }}
        >
          {/* Logo top-left - always visible */}
          <div />
          
          {/* Center menu */}
          <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white text-sm tracking-wide">
            <span className="text-base">☰</span>
            <span>MENU</span>
          </button>

          {/* Account top-right */}
          <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white text-sm tracking-wide">
            <span className="text-base">👤</span>
            <span>Account</span>
          </button>
        </div>

        {/* Logo top-left - always visible */}
        <div className="absolute top-5 left-6 md:left-10 z-10">
          <img
            src={logo}
            alt="Rebel Head Logo"
            className="w-14 h-14 md:w-16 md:h-16"
            style={{
              filter:
                "drop-shadow(0 0 8px rgba(255,0,0,0.4)) drop-shadow(0 0 20px rgba(255,0,0,0.15))",
            }}
          />
        </div>

        {/* Bottom content - appears on scroll */}
        <div
          className="absolute bottom-12 left-6 md:left-10 right-6 md:right-10 z-10 flex items-end justify-between transition-all duration-700"
          style={{
            opacity: scrolled ? 1 : 0,
            transform: scrolled ? "translateY(0)" : "translateY(20px)",
          }}
        >
          {/* Tagline */}
          <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-light leading-tight max-w-lg">
            Rebel Against the Ordinary. Game
            <br />
            Beyond Limits
          </h1>

          {/* CTA Box */}
          <button className="hidden md:flex flex-col items-start gap-0 px-5 py-4 rounded-md bg-neutral-800/80 backdrop-blur-sm text-white text-sm leading-snug tracking-wide hover:bg-neutral-700/80 transition-colors relative">
            <span>Discover</span>
            <span>Our</span>
            <span>Collection</span>
            <span className="absolute bottom-2 right-2 text-white/50 text-xs">↗</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
