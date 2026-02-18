import { useState, useCallback } from "react";
import SplashScreen from "@/components/SplashScreen";
import HeroSection from "@/components/HeroSection";
import ShowcaseSection from "@/components/ShowcaseSection";
import KeyboardSection from "@/components/KeyboardSection";
import MouseSection from "@/components/MouseSection";
import TestimonialSection from "@/components/TestimonialSection";
import FooterSection from "@/components/FooterSection";
import ShopNowButton from "@/components/ShopNowButton";
import CartButton from "@/components/CartButton";
import AccountButton from "@/components/AccountButton";

const Index = () => {
  const [splashDone, setSplashDone] = useState(false);
  const handleSplashComplete = useCallback(() => setSplashDone(true), []);

  return (
    <>
      {!splashDone && <SplashScreen onComplete={handleSplashComplete} />}
      {/* Fixed top-right nav - always accessible */}
      <div className="fixed top-5 right-6 md:right-10 z-[60] flex items-center gap-3">
        <ShopNowButton />
        <CartButton />
        <AccountButton />
      </div>
      <HeroSection />
      <ShowcaseSection />
      <KeyboardSection />
      <MouseSection />
      <TestimonialSection />
      <FooterSection overlap />
    </>
  );
};

export default Index;
