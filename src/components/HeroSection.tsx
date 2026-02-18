import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MenuButton from "@/components/MenuButton";
import CartButton from "@/components/CartButton";
import AccountButton from "@/components/AccountButton";
import logo from "@/assets/Frame_4.png";

const HeroSection = () => {
  const navigate = useNavigate();
  // 0 = clean video, 1 = text/UI visible, 2 = dark translucent
  const [stage, setStage] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      if (scrollY > vh * 0.6) {
        setStage(2);
      } else if (scrollY > vh * 0.1) {
        setStage(1);
      } else {
        setStage(0);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-[280vh]">
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

        {/* Dark translucent overlay */}
        <div
          className="absolute inset-0 bg-black transition-opacity duration-700 ease-out"
          style={{ opacity: stage === 0 ? 0 : stage === 1 ? 0.55 : 0.8 }}
        />

        {/* Top navigation bar */}
        <div
          className="relative z-10 flex items-center justify-between px-6 md:px-10 py-5 transition-opacity duration-700"
          style={{ opacity: stage === 1 ? 1 : 0 }}
        >
          <div />
          <MenuButton className="border-white/30 bg-white/10" />
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/store")}
              className="px-5 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white text-sm font-medium tracking-wide hover:bg-white/20 transition-colors"
            >
              Shop Now
            </button>
            <CartButton className="border-white/30 bg-white/10" />
            <AccountButton className="border-white/30 bg-white/10" />
          </div>
        </div>

        {/* Logo top-left */}
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

        {/* Bottom content */}
        <div
          className="absolute bottom-12 left-6 md:left-10 right-6 md:right-10 z-10 flex items-end justify-between transition-all duration-700"
          style={{
            opacity: stage === 1 ? 1 : 0,
            transform: stage === 1 ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div className="max-w-lg">
            <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-light leading-tight">
              Rebel Against the Ordinary. Game
              <br />
              Beyond Limits
            </h1>
            <p className="text-white/70 text-sm md:text-base mt-4 leading-relaxed">
              Rebel Head offers bold fashion and lifestyle gear
              for rule-breakers, trendsetters, and fearless
              leaders.
            </p>
          </div>
          <button onClick={() => navigate("/store")} className="hidden md:flex flex-col items-start gap-0 px-5 py-4 rounded-md bg-neutral-800/80 backdrop-blur-sm text-white text-sm leading-snug tracking-wide hover:bg-neutral-700/80 transition-colors relative">
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
