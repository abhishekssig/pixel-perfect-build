import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import MenuButton from "@/components/MenuButton";
import CartButton from "@/components/CartButton";
import AccountButton from "@/components/AccountButton";
import logo from "@/assets/Frame_5.png";
import mouseHero from "@/assets/mouse-hero.png";
import backArrow from "@/assets/back-arrow.png";

const VARIANTS = [
  { id: 1, color: "#1a1a1a" },
  { id: 2, color: "#2a2a2a" },
  { id: 3, color: "#333333" },
  { id: 4, color: "#3a3a3a" },
  { id: 5, color: "#444444" },
  { id: 6, color: "#4a4a4a" },
];

const FEATURES = [
  { icon: "🔴", title: "52g", subtitle: "ULTRA WEIGHT", color: "text-red-500" },
  { icon: "🖐️", title: "ERGONOMIC", subtitle: "RIGHT HAND", color: "text-red-400" },
  { icon: "⚡", title: "OPTICAL SWITCH", subtitle: "DOUBLE CLICK FREE", color: "text-red-500" },
  { icon: "◎", title: "XS-1", subtitle: "FLAGSHIP SENSOR", color: "text-red-400" },
  { icon: "↑", title: "8000Hz", subtitle: "UP TO 8K POLLING RATE", color: "text-red-500" },
  { icon: "⫰", title: "FINE TUNE", subtitle: "ADJUSTABLE DPI IN 10-UNIT", color: "text-red-400" },
];

const ProductMouse = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const ratio = window.scrollY / (window.innerHeight * 0.5);
      setScrollProgress(ratio);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showDesc = scrollProgress > 0.3;
  const showVariants = scrollProgress > 0.5;
  const showPrice = scrollProgress > 0.7;

  // Features drawer: starts sliding up after scrollProgress > 1.2
  const drawerProgress = Math.min(1, Math.max(0, (scrollProgress - 1.2) / 0.8));

  // Specs drawer: starts sliding up after scrollProgress > 2.2
  const specsProgress = Math.min(1, Math.max(0, (scrollProgress - 2.2) / 0.8));

  return (
    <div className="min-h-[600vh] bg-[#1a1a1a] text-white">
      {/* Top Nav */}
      <div className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-6 md:px-10 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.history.length > 1 ? navigate(-1) : navigate("/store")}
            className="h-10 w-10 flex items-center justify-center"
          >
            <img src={backArrow} alt="Back" className="h-8 w-8 object-contain" />
          </button>
          <img
            src={logo}
            alt="Rebel Head"
            className="h-10 w-auto cursor-pointer"
            onClick={() => navigate("/")}
            style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.4)) drop-shadow(0 0 20px rgba(255,255,255,0.15))" }}
          />
        </div>
        <MenuButton />
        <div className="flex items-center gap-3">
          <CartButton />
          <AccountButton />
        </div>
      </div>

      {/* Hero Section - sticky */}
      <div className="sticky top-0 h-screen px-6 md:px-10 flex flex-col md:flex-row items-center pt-20 relative z-10">
        {/* Left Content */}
        <div className="flex-1 z-10 pt-10 md:pt-0 flex flex-col justify-center">
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

          <div
            className="mt-6 transition-all duration-700 ease-out"
            style={{
              opacity: showVariants ? 1 : 0,
              transform: showVariants ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <p className="text-red-500/80 text-xs uppercase tracking-widest mb-3">Select Variant</p>
            <div className="flex gap-3">
              {VARIANTS.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v.id)}
                  className={`w-10 h-10 rounded-md border-2 transition-all ${
                    selectedVariant === v.id
                      ? "border-red-500 scale-110"
                      : "border-white/10 hover:border-white/30"
                  }`}
                  style={{ backgroundColor: v.color }}
                />
              ))}
            </div>
          </div>

          <div
            className="mt-6 transition-all duration-700 ease-out"
            style={{
              opacity: showPrice ? 1 : 0,
              transform: showPrice ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <p className="text-red-500/80 text-xs uppercase tracking-widest mb-1">In Stock</p>
            <p className="text-2xl md:text-3xl font-light mb-4">INR 3500.93</p>
            <button
              onClick={() => addToCart({ id: 101, name: "Rebel Head Pro Click R2", price: 3500.93, img: mouseHero })}
              className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white text-sm tracking-wide hover:bg-white/10 transition-colors"
            >
              <span>Add to Cart</span>
              <span className="text-lg">🛒</span>
            </button>
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
            <div
              className="h-[3px] bg-red-500 rounded-full transition-all duration-300"
              style={{ flex: Math.max(0.2, Math.min(1, scrollProgress)) }}
            />
            <div
              className="h-[3px] bg-white/20 rounded-full transition-all duration-300"
              style={{ flex: Math.max(0.1, 1 - Math.min(1, scrollProgress)) }}
            />
          </div>
        </div>
      </div>

      {/* Features Drawer - slides up over the hero */}
      <div
        className="fixed inset-0 z-20 pointer-events-none"
        style={{
          transform: `translateY(${100 - drawerProgress * 100}%)`,
        }}
      >
        <div className="w-full h-full bg-[#0a0a0a] pointer-events-auto flex flex-col items-center justify-center px-6 md:px-16">
          <div className="grid grid-cols-2 gap-x-16 md:gap-x-32 gap-y-12 md:gap-y-16 max-w-3xl w-full">
            {FEATURES.map((feat, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center"
                style={{
                  opacity: drawerProgress > 0.5 ? 1 : 0,
                  transform: drawerProgress > 0.5 ? "translateY(0)" : "translateY(30px)",
                  transition: `all 0.6s ease-out ${i * 0.1}s`,
                }}
              >
                <span className={`text-3xl md:text-4xl mb-2 ${feat.color}`}>{feat.icon}</span>
                <h3 className="text-white text-lg md:text-xl font-semibold tracking-wide">{feat.title}</h3>
                <p className="text-white/50 text-xs uppercase tracking-widest mt-1">{feat.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Specs Drawer - slides up over the features */}
      <div
        className="fixed inset-0 z-30 pointer-events-none"
        style={{
          transform: `translateY(${100 - specsProgress * 100}%)`,
        }}
      >
        <div className="w-full h-full bg-[#0a0a0a] pointer-events-auto flex items-center justify-center px-6 md:px-16">
          <div className="grid grid-cols-2 gap-x-16 md:gap-x-32 max-w-4xl w-full">
            {/* Left Column */}
            <div
              style={{
                opacity: specsProgress > 0.5 ? 1 : 0,
                transform: specsProgress > 0.5 ? "translateY(0)" : "translateY(30px)",
                transition: "all 0.6s ease-out",
              }}
            >
              <h2 className="text-2xl md:text-3xl font-light italic mb-6">Package Content</h2>
              <ul className="space-y-3 text-white/70 text-sm mb-10">
                <li className="flex items-start gap-2"><span className="text-white/40 mt-1">•</span> Xlite v4 Wireless Mouse x 1</li>
                <li className="flex items-start gap-2"><span className="text-white/40 mt-1">•</span> 8K Dongle x 1</li>
                <li className="flex items-start gap-2"><span className="text-white/40 mt-1">•</span> USB-C Cable x 1</li>
              </ul>

              <h2 className="text-2xl md:text-3xl font-light italic mb-6">Dimensions</h2>
              <ul className="space-y-3 text-white/70 text-sm">
                <li className="flex items-start gap-2"><span className="text-white/40 mt-1">•</span> Length: 1.62in (41mm)</li>
                <li className="flex items-start gap-2"><span className="text-white/40 mt-1">•</span> Width: 1.62in (41mm)</li>
                <li className="flex items-start gap-2"><span className="text-white/40 mt-1">•</span> Height: 3.56in (90.4mm)</li>
              </ul>
            </div>

            {/* Right Column */}
            <div
              style={{
                opacity: specsProgress > 0.5 ? 1 : 0,
                transform: specsProgress > 0.5 ? "translateY(0)" : "translateY(30px)",
                transition: "all 0.6s ease-out 0.15s",
              }}
            >
              <h2 className="text-2xl md:text-3xl font-light italic mb-6">Sensors</h2>
              <ul className="space-y-3 text-white/70 text-sm">
                <li className="flex items-start gap-2"><span className="text-white/40 mt-1">•</span> XS-1 Flagship Sensor</li>
                <li className="flex items-start gap-2"><span className="text-white/40 mt-1">•</span> 32,000 DPI</li>
                <li className="flex items-start gap-2"><span className="text-white/40 mt-1">•</span> 750 IPS</li>
                <li className="flex items-start gap-2"><span className="text-white/40 mt-1">•</span> 50g Acceleration</li>
                <li className="flex items-start gap-2"><span className="text-white/40 mt-1">•</span> 1000Hz/1ms Polling Rate</li>
                <li className="flex items-start gap-2"><span className="text-white/40 mt-1">•</span> 32bit ARM Processor</li>
                <li className="flex items-start gap-2"><span className="text-white/40 mt-1">•</span> 3Up to 8K Polling Rate</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductMouse;
