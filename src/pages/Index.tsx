import { useState, useCallback } from "react";
import SplashScreen from "@/components/SplashScreen";
import HeroSection from "@/components/HeroSection";
import ShowcaseSection from "@/components/ShowcaseSection";
import GyroSection from "@/components/GyroSection";

const Index = () => {
  const [splashDone, setSplashDone] = useState(false);
  const handleSplashComplete = useCallback(() => setSplashDone(true), []);

  return (
    <>
      {!splashDone && <SplashScreen onComplete={handleSplashComplete} />}
      <HeroSection />
      <ShowcaseSection />
      <GyroSection />
    </>
  );
};

export default Index;
