import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import MenuButton from "@/components/MenuButton";
import CartButton from "@/components/CartButton";
import AccountButton from "@/components/AccountButton";
import ShopNowButton from "@/components/ShopNowButton";
import logo from "@/assets/Frame_4.png";

const defaultContent = {
  hero_title: "Rebel Against the Ordinary. Game\nBeyond Limits",
  hero_subtitle: "Rebel Head offers bold fashion and lifestyle gear for rule-breakers, trendsetters, and fearless leaders.",
  hero_video: "/videos/hero-bg.mp4",
};

const HeroSection = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState(defaultContent);

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await supabase
        .from("site_content")
        .select("content_key, content_value")
        .eq("section", "hero")
        .eq("is_active", true);
      if (data && data.length > 0) {
        const mapped = { ...defaultContent };
        data.forEach((item) => {
          if (item.content_key in mapped && item.content_value) {
            (mapped as any)[item.content_key] = item.content_value;
          }
        });
        setContent(mapped);
      }
    };
    fetchContent();
  }, []);

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

  const titleLines = content.hero_title.split("\n");

  return (
    <section ref={sectionRef} className="relative w-full h-[280vh]">
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-black">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay muted loop playsInline
          key={content.hero_video}
        >
          <source src={content.hero_video} type="video/mp4" />
        </video>

        <div
          className="absolute inset-0 bg-black transition-opacity duration-700 ease-out"
          style={{ opacity: stage === 0 ? 0 : stage === 1 ? 0.55 : 0.8 }}
        />

        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-[1]">
          <span className="absolute top-[15%] right-[8%] text-red-500/[0.04] text-[12rem] font-jp leading-none">反</span>
          <span className="absolute bottom-[20%] left-[5%] text-red-500/[0.03] text-[18rem] font-jp leading-none">逆</span>
        </div>

        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-center px-6 md:px-10 py-5">
          <div
            className="transition-opacity duration-700"
            style={{ opacity: stage === 1 ? 1 : 0, pointerEvents: stage === 1 ? "auto" : "none" }}
          >
            <MenuButton className="border-white/30 bg-white/10" />
          </div>
        </div>

        <div className="absolute top-5 left-6 md:left-10 z-10">
          <img
            src={logo}
            alt="Rebel Head Logo"
            className="w-14 h-14 md:w-16 md:h-16"
            style={{
              filter: "drop-shadow(0 0 8px rgba(255,0,0,0.4)) drop-shadow(0 0 20px rgba(255,0,0,0.15))",
            }}
          />
        </div>

        <div
          className="absolute bottom-12 left-6 md:left-10 right-6 md:right-10 z-10 flex items-end justify-between transition-all duration-700"
          style={{
            opacity: stage === 1 ? 1 : 0,
            transform: stage === 1 ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div className="max-w-lg">
            <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-light leading-tight">
              {titleLines.map((line, i) => (
                <span key={i}>{line}{i < titleLines.length - 1 && <br />}</span>
              ))}
            </h1>
            <p className="text-white/70 text-sm md:text-base mt-4 leading-relaxed">
              {content.hero_subtitle}
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
