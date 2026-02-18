import { useState, useCallback } from "react";
import SplashScreen from "@/components/SplashScreen";
import HeroSection from "@/components/HeroSection";
import ShowcaseSection from "@/components/ShowcaseSection";
import KeyboardSection from "@/components/KeyboardSection";
import TestimonialSection from "@/components/TestimonialSection";
import FooterSection from "@/components/FooterSection";
import ShopNowButton from "@/components/ShopNowButton";

const Index = () => {
  const [splashDone, setSplashDone] = useState(false);
  const handleSplashComplete = useCallback(() => setSplashDone(true), []);

  return (
    <>
      {!splashDone && <SplashScreen onComplete={handleSplashComplete} />}
      {/* Fixed Shop Now button - always accessible */}
      <div className="fixed top-5 right-6 md:right-10 z-[60]">
        <ShopNowButton />
      </div>
      <HeroSection />
      <ShowcaseSection />
      <KeyboardSection />
      <TestimonialSection />
      <FooterSection overlap />
    </>
  );
};

export default Index;
