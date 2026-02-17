import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/Frame_5.png";
import mouseHero from "@/assets/mouse-hero.png";

const ProductMouse = () => {
  const navigate = useNavigate();
  const [showDesc, setShowDesc] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowDesc(window.scrollY > window.innerHeight * 0.15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-[200vh] bg-[#1a1a1a] text-white">
      {/* Top Nav */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4">
        <img
          src={logo}
          alt="Rebel Head"
          className="h-10 w-auto cursor-pointer"
          onClick={() => navigate("/")}
          style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.4)) drop-shadow(0 0 20px rgba(255,255,255,0.15))" }}
        />
        <button
          onClick={() => navigate("/store")}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-black/80 backdrop-blur-sm text-white text-sm tracking-wide"
        >
          <span className="text-base">☰</span>
          <span>MENU</span>
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-black/80 backdrop-blur-sm text-white text-sm tracking-wide"
        >
          <span className="text-base">👤</span>
          <span>Account</span>
        </button>
      </div>

      {/* Hero Section - sticky */}
      <div className="sticky top-0 h-screen px-6 md:px-10 flex flex-col md:flex-row items-center pt-20 relative">
        {/* Left Content */}
        <div className="flex-1 z-10 pt-10 md:pt-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-6">
            Rebel head Pro click<br />R2
          </h1>
          <div
            className="transition-all duration-700 ease-out"
            style={{
              opacity: showDesc ? 1 : 0,
              transform: showDesc ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <p className="text-red-500/80 text-xs uppercase tracking-widest mb-3">Product Description</p>
            <p className="text-white/70 text-sm md:text-base max-w-sm leading-relaxed">
              A haptic feedback mouse featuring personalized body printing for enhanced tactile response and ergonomic user experience.
            </p>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex items-center justify-center relative">
          <img
            src={mouseHero}
            alt="Rebel Head Pro Click R2"
            className="w-[300px] md:w-[420px] lg:w-[500px] object-contain drop-shadow-2xl"
          />
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center">
          <div className="flex items-center gap-1 w-[200px]">
            <div className="h-[3px] flex-1 bg-red-500 rounded-full" />
            <div className="h-[3px] flex-[2] bg-white/20 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductMouse;
