import { useState, useEffect } from "react";
import logo from "@/assets/Frame_4.png";

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [stage, setStage] = useState(1);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(2), 800);
    const t2 = setTimeout(() => setStage(3), 1600);
    const t3 = setTimeout(() => setStage(4), 2200);
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

  const getLogoFilter = () => {
    switch (stage) {
      case 1:
        return "drop-shadow(0 0 4px rgba(255,0,0,0.15)) drop-shadow(0 0 60px rgba(0,0,0,1)) drop-shadow(0 0 80px rgba(0,0,0,1))";
      case 2:
        return "drop-shadow(0 0 20px rgba(255,0,0,0.6)) drop-shadow(0 0 40px rgba(255,0,0,0.4)) drop-shadow(0 0 50px rgba(0,0,0,0.9))";
      case 3:
        return "drop-shadow(0 0 18px rgba(255,0,0,0.5)) drop-shadow(0 0 35px rgba(255,0,0,0.3)) drop-shadow(0 0 10px rgba(0,0,0,0.3))";
      case 4:
        return "drop-shadow(0 0 12px rgba(255,0,0,0.4)) drop-shadow(0 0 25px rgba(255,0,0,0.2))";
      default:
        return "";
    }
  };

  const getTransition = () => {
    switch (stage) {
      case 2:
        return "filter 0.8s ease-in";
      case 3:
        return "filter 0.6s ease-out";
      case 4:
        return "filter 0.4s ease-out";
      default:
        return "filter 0.8s ease-in";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      <img
        src={logo}
        alt="R Logo"
        className="w-24 h-24 md:w-32 md:h-32"
        style={{
          filter: getLogoFilter(),
          transition: getTransition(),
        }}
      />
      <span
        className="mt-6 text-white text-xl md:text-2xl font-semibold tracking-widest uppercase"
        style={{
          opacity: showText ? 1 : 0,
          transition: "opacity 0.5s ease-in",
        }}
      >
        SUSPENDED
      </span>
    </div>
  );
};

export default SplashScreen;
