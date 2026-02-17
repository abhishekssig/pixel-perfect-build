import { useState, useEffect } from "react";
import logo from "@/assets/Frame_4.png";

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [stage, setStage] = useState(1);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Stage 1: Black silhouette with faint red glow behind (0–0.8s)
    const t1 = setTimeout(() => setStage(2), 800);
    // Stage 2: Red glow intensifies behind the black silhouette (0.8–1.6s)
    const t2 = setTimeout(() => setStage(3), 1600);
    // Stage 3: Logo transitions from black silhouette to normal colors (1.6–2.2s)
    const t3 = setTimeout(() => setStage(4), 2200);
    // Stage 4: Final polished state, text fades in (2.2–3.7s)
    const t4 = setTimeout(() => setShowText(true), 2200);
    const t5 = setTimeout(() => onComplete(), 3700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  const getLogoStyle = (): React.CSSProperties => {
    switch (stage) {
      case 1:
        // Whole logo is black silhouette, very faint red glow behind
        return {
          filter:
            "brightness(0) drop-shadow(0 0 6px rgba(255,0,0,0.2)) drop-shadow(0 0 30px rgba(255,0,0,0.1))",
          transition: "filter 0.8s ease-in",
        };
      case 2:
        // Still black silhouette, red glow intensifies
        return {
          filter:
            "brightness(0) drop-shadow(0 0 20px rgba(255,0,0,0.7)) drop-shadow(0 0 40px rgba(255,0,0,0.5)) drop-shadow(0 0 60px rgba(255,0,0,0.3))",
          transition: "filter 0.8s ease-in",
        };
      case 3:
        // Logo reveals its true colors, glow stays active
        return {
          filter:
            "brightness(1) drop-shadow(0 0 15px rgba(255,0,0,0.5)) drop-shadow(0 0 30px rgba(255,0,0,0.3))",
          transition: "filter 0.6s ease-out",
        };
      case 4:
        // Final crisp state with subtle living glow
        return {
          filter:
            "brightness(1) drop-shadow(0 0 10px rgba(255,0,0,0.35)) drop-shadow(0 0 20px rgba(255,0,0,0.15))",
          transition: "filter 0.4s ease-out",
        };
      default:
        return {};
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      <img
        src={logo}
        alt="R Logo"
        className="w-24 h-24 md:w-32 md:h-32"
        style={getLogoStyle()}
      />
      <span
        className="mt-6 text-white text-xl md:text-2xl font-semibold tracking-widest uppercase"
        style={{
          opacity: showText ? 1 : 0,
          transition: "opacity 0.5s ease-in",
        }}
      >
        REBEL HEAD
      </span>
    </div>
  );
};

export default SplashScreen;
