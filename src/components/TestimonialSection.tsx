import { useRef, useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import katanaImg from "@/assets/katana.png";

const fallbackTestimonials = [
  { author_name: "Amelia Li", author_title: "Co-Founder & CEO, Quantum Ware", author_avatar: "https://i.pravatar.cc/80?img=1", content: "The Pro Click R2 completely changed my workflow. The haptic feedback is unlike anything I've used before — it's precise, responsive, and addictive." },
  { author_name: "Ethan Anderson", author_title: "Operations Manager, Nexus Labs", author_avatar: "https://i.pravatar.cc/80?img=3", content: "Rebel Head's build quality is insane. The gasket-mounted keyboard feels premium and the sound profile is chef's kiss. Worth every rupee." },
  { author_name: "Natasha Hiren", author_title: "Product Designer, Velocity Inc", author_avatar: "https://i.pravatar.cc/80?img=5", content: "I've tried every gaming mouse on the market. The PixArt 9832 sensor in the R2 tracks flawlessly — zero smoothing, zero acceleration. Pure precision." },
  { author_name: "Aria Rodriguez", author_title: "Lead Developer, Orbit Systems", author_avatar: "https://i.pravatar.cc/80?img=9", content: "The sakura edition prints are gorgeous. Finally a gaming brand that understands aesthetics aren't just RGB rainbows. Japanese design done right." },
  { author_name: "Kenji Tanaka", author_title: "Creative Director, Sakura Studios", author_avatar: "https://i.pravatar.cc/80?img=11", content: "The Rebel Pad Pro's gyroscope is a game changer for aim-assisted shooters. Hall Effect triggers seal the deal. The design philosophy is incredible." },
  { author_name: "Sofia Chen", author_title: "Esports Coach, Dragon Gate", author_avatar: "https://i.pravatar.cc/80?img=16", content: "Our entire team switched to Rebel peripherals last season. The 8K polling rate on the mouse gives a tangible competitive edge at the pro level." },
  { author_name: "Marcus Webb", author_title: "Game Designer, Pixel Forge", author_avatar: "https://i.pravatar.cc/80?img=12", content: "The Rebel Head Pro headset's spatial audio is unreal. I can pinpoint footsteps in Valorant with surgical accuracy. 60-hour battery is just overkill." },
  { author_name: "Yuki Sato", author_title: "Hardware Engineer, Kaze Tech", author_avatar: "https://i.pravatar.cc/80?img=15", content: "No compromise on quality. As an engineer, I appreciate the internal design. Clean PCB layout, quality components, and the haptic motor integration is clever." },
  { author_name: "Priya Sharma", author_title: "Pro Player, Nova Gaming", author_avatar: "https://i.pravatar.cc/80?img=20", content: "Switched from Logitech to Rebel Click Pro mid-tournament. My reaction time improved noticeably. The 52g weight makes flick shots effortless." },
  { author_name: "James O'Neill", author_title: "Team Captain, Thunder Esports", author_avatar: "https://i.pravatar.cc/80?img=33", content: "Rebel Head isn't just a peripheral brand — it's a statement. The Japanese-inspired design language sets them apart from everything else in the market." },
  { author_name: "Mei Lin", author_title: "UX Lead, Blossom Interactive", author_avatar: "https://i.pravatar.cc/80?img=25", content: "The keyboard's PBT keycaps feel incredible. Dye-sub legends are crisp even after months of daily use. Hot-swap makes switch testing a breeze." },
  { author_name: "Ravi Patel", author_title: "Streamer, Apex Arena", author_avatar: "https://i.pravatar.cc/80?img=52", content: "My viewers always ask about my setup. The sakura mouse and dark keyboard combo looks stunning on camera. Rebel Head just gets aesthetics." },
  { author_name: "Hana Kimura", author_title: "Sound Engineer, Ronin Labs", author_avatar: "https://i.pravatar.cc/80?img=44", content: "The sound quality is phenomenal. The planar magnetic drivers in the headset deliver audiophile-grade sound. LDAC codec support is rare at this price point." },
  { author_name: "Alex Turner", author_title: "Content Creator, Grid Gaming", author_avatar: "https://i.pravatar.cc/80?img=53", content: "Rebel's tri-mode connectivity is seamless. I switch between my PC, Switch, and phone without missing a beat. The gamepad just works everywhere." },
  { author_name: "Sakura Ito", author_title: "Art Director, Neon Drift", author_avatar: "https://i.pravatar.cc/80?img=47", content: "Every product feels like a piece of art. The attention to detail in the packaging alone tells you this brand cares. A perfect embodiment of design spirit." },
];

type TestimonialData = {
  author_name: string;
  author_title: string | null;
  author_avatar: string | null;
  content: string;
};

const TestimonialSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrolledToEnd, setScrolledToEnd] = useState(false);
  const [centerProgress, setCenterProgress] = useState(0);
  const [testimonials, setTestimonials] = useState<TestimonialData[]>(fallbackTestimonials);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data } = await supabase
        .from("testimonials")
        .select("author_name, author_title, author_avatar, content")
        .eq("is_active", true)
        .order("sort_order");
      if (data && data.length > 0) {
        setTestimonials(data);
      }
    };
    fetchTestimonials();
  }, []);

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
                  {t.author_avatar && (
                    <img
                      src={t.author_avatar}
                      alt={t.author_name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                    />
                  )}
                  <div>
                    <p className="text-white text-sm font-semibold">{t.author_name}</p>
                    {t.author_title && (
                      <p className="text-white/40 text-xs">{t.author_title}</p>
                    )}
                  </div>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">
                  "{t.content}"
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
