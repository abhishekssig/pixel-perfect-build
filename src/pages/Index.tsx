import { useState, useCallback } from "react";
import SplashScreen from "@/components/SplashScreen";
import HeroSection from "@/components/HeroSection";
import ShowcaseSection from "@/components/ShowcaseSection";
import KeyboardSection from "@/components/KeyboardSection";
import TestimonialSection from "@/components/TestimonialSection";

const Index = () => {
  const [splashDone, setSplashDone] = useState(false);
  const handleSplashComplete = useCallback(() => setSplashDone(true), []);

  return (
    <>
      {!splashDone && <SplashScreen onComplete={handleSplashComplete} />}
      <HeroSection />
      <ShowcaseSection />
      <KeyboardSection />
      <TestimonialSection />
    </>
  );
};

export default Index;
