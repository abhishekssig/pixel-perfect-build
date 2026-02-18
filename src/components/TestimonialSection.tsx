import { useRef, useEffect, useState, useCallback } from "react";
import katanaImg from "@/assets/katana.png";

const testimonials = [
  { name: "Amelia Li", company: "Quantum Ware", role: "Co-Founder & CEO", avatar: "https://i.pravatar.cc/80?img=1", quote: "The Pro Click R2 completely changed my workflow. The haptic feedback is unlike anything I've used before — it's precise, responsive, and addictive." },
  { name: "Ethan Anderson", company: "Nexus Labs", role: "Operations Manager", avatar: "https://i.pravatar.cc/80?img=3", quote: "Rebel Head's build quality is insane. The gasket-mounted keyboard feels premium and the sound profile is chef's kiss. Worth every rupee." },
  { name: "Natasha Hiren", company: "Velocity Inc", role: "Product Designer", avatar: "https://i.pravatar.cc/80?img=5", quote: "I've tried every gaming mouse on the market. The PixArt 9832 sensor in the R2 tracks flawlessly — zero smoothing, zero acceleration. Pure precision." },
  { name: "Aria Rodriguez", company: "Orbit Systems", role: "Lead Developer", avatar: "https://i.pravatar.cc/80?img=9", quote: "The sakura edition prints are gorgeous. Finally a gaming brand that understands aesthetics aren't just RGB rainbows. Japanese design done right." },
  { name: "Kenji Tanaka", company: "Sakura Studios", role: "Creative Director", avatar: "https://i.pravatar.cc/80?img=11", quote: "The Rebel Pad Pro's gyroscope is a game changer for aim-assisted shooters. Hall Effect triggers seal the deal. The design philosophy is incredible." },
  { name: "Sofia Chen", company: "Dragon Gate", role: "Esports Coach", avatar: "https://i.pravatar.cc/80?img=16", quote: "Our entire team switched to Rebel peripherals last season. The 8K polling rate on the mouse gives a tangible competitive edge at the pro level." },
  { name: "Marcus Webb", company: "Pixel Forge", role: "Game Designer", avatar: "https://i.pravatar.cc/80?img=12", quote: "The Rebel Head Pro headset's spatial audio is unreal. I can pinpoint footsteps in Valorant with surgical accuracy. 60-hour battery is just overkill." },
  { name: "Yuki Sato", company: "Kaze Tech", role: "Hardware Engineer", avatar: "https://i.pravatar.cc/80?img=15", quote: "No compromise on quality. As an engineer, I appreciate the internal design. Clean PCB layout, quality components, and the haptic motor integration is clever." },
  { name: "Priya Sharma", company: "Nova Gaming", role: "Pro Player", avatar: "https://i.pravatar.cc/80?img=20", quote: "Switched from Logitech to Rebel Click Pro mid-tournament. My reaction time improved noticeably. The 52g weight makes flick shots effortless." },
  { name: "James O'Neill", company: "Thunder Esports", role: "Team Captain", avatar: "https://i.pravatar.cc/80?img=33", quote: "Rebel Head isn't just a peripheral brand — it's a statement. The Japanese-inspired design language sets them apart from everything else in the market." },
  { name: "Mei Lin", company: "Blossom Interactive", role: "UX Lead", avatar: "https://i.pravatar.cc/80?img=25", quote: "The keyboard's PBT keycaps feel incredible. Dye-sub legends are crisp even after months of daily use. Hot-swap makes switch testing a breeze." },
  { name: "Ravi Patel", company: "Apex Arena", role: "Streamer", avatar: "https://i.pravatar.cc/80?img=52", quote: "My viewers always ask about my setup. The sakura mouse and dark keyboard combo looks stunning on camera. Rebel Head just gets aesthetics." },
  { name: "Hana Kimura", company: "Ronin Labs", role: "Sound Engineer", avatar: "https://i.pravatar.cc/80?img=44", quote: "The sound quality is phenomenal. The planar magnetic drivers in the headset deliver audiophile-grade sound. LDAC codec support is rare at this price point." },
  { name: "Alex Turner", company: "Grid Gaming", role: "Content Creator", avatar: "https://i.pravatar.cc/80?img=53", quote: "Rebel's tri-mode connectivity is seamless. I switch between my PC, Switch, and phone without missing a beat. The gamepad just works everywhere." },
  { name: "Sakura Ito", company: "Neon Drift", role: "Art Director", avatar: "https://i.pravatar.cc/80?img=47", quote: "Every product feels like a piece of art. The attention to detail in the packaging alone tells you this brand cares. A perfect embodiment of design spirit." },
];

const TestimonialSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrolledToEnd, setScrolledToEnd] = useState(false);
  const [centerProgress, setCenterProgress] = useState(0);

  const handleInnerScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 20;
    setScrolledToEnd(atBottom);
  }, []);

  useEffect(() => {
    if (scrolledToEnd) {
      let frame: number;
      const start = performance.now();
      const duration = 800;
      const animate = (now: number) => {
        const elapsed = now - start;
        const p = Math.min(1, elapsed / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setCenterProgress(eased);
        if (p < 1) frame = requestAnimationFrame(animate);
      };
      frame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(frame);
    } else {
      setCenterProgress(0);
    }
  }, [scrolledToEnd]);

  const katanaTranslateX = centerProgress * 55;
  const katanaScale = 1 + centerProgress * 0.3;
  const testimonialOpacity = 1 - centerProgress;

  return (
    <section className="relative z-20 bg-black h-screen flex items-center overflow-hidden">
      {/* Left side - Katana */}
      <div
        className="hidden md:flex w-[35%] h-screen items-center justify-center relative flex-shrink-0 z-10"
        style={{
          transform: `translateX(${katanaTranslateX}vw) scale(${katanaScale})`,
          transition: "transform 0.1s linear",
        }}
      >
        <img
          src={katanaImg}
          alt="Katana"
          className="h-[85%] w-auto object-contain"
          style={{ transform: "rotate(-15deg) translateX(-5%)" }}
        />
      </div>

      {/* Right side - Scrollable 2-column testimonials */}
      <div
        className="flex-1 relative h-screen flex flex-col justify-center py-16 px-6 md:px-0 md:pr-12"
        style={{
          opacity: testimonialOpacity,
          pointerEvents: centerProgress > 0.5 ? "none" : "auto",
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          onScroll={handleInnerScroll}
          className="overflow-y-auto h-[70vh] pr-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-6 flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                  />
                  <div>
                    <p className="text-red-400 text-[10px] font-medium tracking-wider uppercase">
                      {t.company}
                    </p>
                    <p className="text-white text-sm font-semibold">{t.name}</p>
                    <p className="text-white/40 text-xs">{t.role}</p>
                  </div>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">
                  "{t.quote}"
                </p>
              </div>
            ))}
          </div>
          <div className="h-16" />
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
