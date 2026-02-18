import { useEffect, useRef, useState } from "react";
import MenuButton from "@/components/MenuButton";
import AccountButton from "@/components/AccountButton";
import mouseTopView from "@/assets/mouse-top-view.png";
import mouseSideView from "@/assets/mouse-side-view.png";
import mouseXrayRed from "@/assets/mouse-xray-red.png";
import mouseXraySensor from "@/assets/mouse-xray-sensor.png";
import mouseBottomView from "@/assets/mouse-bottom-view.png";

const SLIDES = [
  { img: mouseTopView, title: "Sakura Edition", desc: "Custom printed shells with premium cherry blossom artwork." },
  { img: mouseSideView, title: "Ergonomic Profile", desc: "Sculpted for hours of competitive gameplay without fatigue." },
  { img: mouseXraySensor, title: "PixArt 9832 Sensor", desc: "The most advanced optical sensor — 32,000 DPI, zero smoothing." },
  { img: mouseXrayRed, title: "Haptic Motor Inside", desc: "In-game tactile feedback reacts to recoil, hits, and cooldowns." },
  { img: mouseBottomView, title: "Precision Glide", desc: "PTFE feet and PixArt sensor for effortless tracking on any surface." },
];

const MouseSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [expandProgress, setExpandProgress] = useState(0);
  const [imageProgress, setImageProgress] = useState(0);
  const [shrinkProgress, setShrinkProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const sectionH = sectionRef.current.offsetHeight;
      const scrolledInto = vh - rect.top;

      // Phase 1: Box expands to fullscreen (5%-25%)
      const expandStart = sectionH * 0.05;
      const expandEnd = sectionH * 0.2;
      setExpandProgress(Math.min(Math.max((scrolledInto - expandStart) / (expandEnd - expandStart), 0), 1));

      // Phase 2: Image transitions (20%-75%)
      const imgStart = sectionH * 0.2;
      const imgEnd = sectionH * 0.75;
      setImageProgress(Math.min(Math.max((scrolledInto - imgStart) / (imgEnd - imgStart), 0), 1));

      // Phase 3: Box shrinks back (80%-95%)
      const shrinkStart = sectionH * 0.8;
      const shrinkEnd = sectionH * 0.95;
      setShrinkProgress(Math.min(Math.max((scrolledInto - shrinkStart) / (shrinkEnd - shrinkStart), 0), 1));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Box sizing
  const boxWidth = 45 + expandProgress * 55;
  const boxHeight = 40 + expandProgress * 60;
  const boxRadius = Math.max(0, 24 * (1 - expandProgress));

  const shrinkW = shrinkProgress > 0 ? 100 - shrinkProgress * 55 : boxWidth;
  const shrinkH = shrinkProgress > 0 ? 100 - shrinkProgress * 65 : boxHeight;
  const shrinkR = shrinkProgress > 0 ? shrinkProgress * 20 : boxRadius;
  const overlayFade = shrinkProgress > 0 ? Math.max(0, 1 - shrinkProgress * 3) : 1;

  const rawW = shrinkProgress > 0 ? shrinkW : boxWidth;
  const rawH = shrinkProgress > 0 ? shrinkH : boxHeight;
  const finalW = rawW > 85 ? 100 : rawW;
  const finalH = rawH > 85 ? 100 : rawH;
  const finalR = (finalW >= 100 && finalH >= 100) ? 0 : (shrinkProgress > 0 ? shrinkR : boxRadius);

  // Current slide index (0-4)
  const slideIndex = Math.min(Math.floor(imageProgress * SLIDES.length), SLIDES.length - 1);
  const slideLocalProgress = (imageProgress * SLIDES.length) - slideIndex;

  const overlayOpacity = (expandProgress > 0.7 ? Math.min((expandProgress - 0.7) * 3.3, 1) : 0) * overlayFade;

  return (
    <section
      ref={sectionRef}
      className="relative z-20 bg-black"
      style={{ minHeight: "600vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          className="absolute overflow-hidden"
          style={{
            left: `${(100 - finalW) / 2}%`,
            right: `${(100 - finalW) / 2}%`,
            top: `${(100 - finalH) / 2}%`,
            bottom: `${(100 - finalH) / 2}%`,
            borderRadius: `${finalR}px`,
            background: "linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 50%, #1a1a1a 100%)",
            zIndex: 2,
          }}
        >
          {/* All images stacked, crossfade */}
          {SLIDES.map((slide, i) => {
            let opacity = 0;
            if (i === slideIndex) {
              opacity = i === SLIDES.length - 1 ? 1 : 1 - Math.max(0, slideLocalProgress - 0.6) / 0.4;
            } else if (i === slideIndex + 1) {
              opacity = Math.max(0, slideLocalProgress - 0.6) / 0.4;
            }
            // Scale effect for current image
            const scale = i === slideIndex ? 1 + slideLocalProgress * 0.05 : 1;

            return (
              <img
                key={i}
                src={slide.img}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-contain"
                style={{
                  opacity,
                  transform: `scale(${scale})`,
                  transition: "opacity 0.1s linear",
                  padding: "10%",
                }}
              />
            );
          })}

          {/* Radial glow behind mouse */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(220,40,40,0.15) 0%, transparent 60%)",
              opacity: overlayOpacity,
            }}
          />

          {/* Nav overlay */}
          <div
            className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 md:px-10 py-5"
            style={{ opacity: overlayOpacity }}
          >
            <div />
            <MenuButton />
            <AccountButton />
          </div>

          {/* Bottom content - slide title + desc */}
          <div
            className="absolute bottom-12 left-6 md:left-10 right-6 md:right-10 z-10 flex items-end justify-between"
            style={{ opacity: overlayOpacity }}
          >
            <div className="max-w-lg">
              <p className="text-red-500/80 text-xs uppercase tracking-widest mb-2">
                {String(slideIndex + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
              </p>
              <h2 className="text-white text-2xl md:text-4xl lg:text-5xl font-light leading-tight">
                {SLIDES[slideIndex].title}
              </h2>
              <p className="text-white/70 text-sm md:text-base mt-3 leading-relaxed">
                {SLIDES[slideIndex].desc}
              </p>
            </div>
            <button className="hidden md:flex flex-col items-start gap-0 px-5 py-4 rounded-md bg-white/10 backdrop-blur-sm text-white text-sm leading-snug tracking-wide hover:bg-white/20 transition-colors relative border border-white/20">
              <span>Discover</span>
              <span>Our</span>
              <span>Collection</span>
              <span className="absolute bottom-2 right-2 text-white/50 text-xs">↗</span>
            </button>
          </div>

          {/* Progress dots */}
          <div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex gap-2"
            style={{ opacity: overlayOpacity }}
          >
            {SLIDES.map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: i === slideIndex ? "rgb(220,40,40)" : "rgba(255,255,255,0.2)",
                  transform: i === slideIndex ? "scale(1.3)" : "scale(1)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MouseSection;
