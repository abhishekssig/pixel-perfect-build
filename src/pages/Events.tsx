import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import MenuButton from "@/components/MenuButton";
import CartButton from "@/components/CartButton";
import AccountButton from "@/components/AccountButton";
import FooterSection from "@/components/FooterSection";
import logo from "@/assets/Frame_5.png";

const upcomingEvents = [
  {
    title: "Rebel Launch Event 2026",
    date: "March 15, 2026",
    location: "Los Angeles Convention Center",
    description: "Join us for the unveiling of our next-generation gaming peripherals. Live demos, exclusive first looks, and limited-edition merch.",
    tag: "LAUNCH",
  },
  {
    title: "PAX East — Rebel Booth",
    date: "April 10–12, 2026",
    location: "Boston Convention Center",
    description: "Visit us at PAX East for hands-on demos, pro player meet-and-greets, and tournament sign-ups with prizes.",
    tag: "EXPO",
  },
  {
    title: "Rebel Community Tournament",
    date: "May 3, 2026",
    location: "Online",
    description: "A community-driven FPS tournament using Rebel peripherals. Open to all skill levels with a $10,000 prize pool.",
    tag: "TOURNAMENT",
  },
  {
    title: "Gamescom 2026",
    date: "August 20–24, 2026",
    location: "Cologne, Germany",
    description: "Experience Rebel Head at the world's largest gaming event. Exclusive product reveals and collaborations announced live.",
    tag: "EXPO",
  },
];

const pastEvents = [
  { title: "CES 2026 — Innovation Award", date: "January 7–10, 2026", location: "Las Vegas, NV" },
  { title: "Rebel Pop-Up Store Tokyo", date: "December 12, 2025", location: "Shibuya, Tokyo" },
  { title: "TwitchCon San Diego", date: "October 18, 2025", location: "San Diego, CA" },
];

const Events = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4">
        <img src={logo} alt="Rebel Head" className="h-10 w-auto cursor-pointer" onClick={() => navigate("/")} style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.4))" }} />
        <MenuButton />
        <div className="flex items-center gap-3">
          <CartButton />
          <AccountButton />
        </div>
      </div>

      <div className="pt-24 px-6 md:px-10 max-w-5xl mx-auto pb-20">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-center italic text-white/80 mb-4">Events</h1>
        <p className="text-white/40 text-sm text-center mb-16 max-w-xl mx-auto">Meet the Rebel team, try our latest products, and join the community at events worldwide.</p>

        {/* Upcoming */}
        <h2 className="text-xs font-medium tracking-widest text-white/30 uppercase mb-6">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
          {upcomingEvents.map((e) => (
            <div key={e.title} className="group border border-white/10 rounded-xl p-6 hover:bg-white/5 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <span className="text-[10px] font-bold tracking-widest bg-red-600 text-white px-2.5 py-1 rounded-full">{e.tag}</span>
              </div>
              <h3 className="text-white text-base font-semibold mb-2">{e.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-4">{e.description}</p>
              <div className="flex items-center gap-4 text-white/40 text-xs">
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{e.date}</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{e.location}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Past */}
        <h2 className="text-xs font-medium tracking-widest text-white/30 uppercase mb-6">Past Events</h2>
        <div className="border border-white/10 rounded-xl overflow-hidden">
          {pastEvents.map((e, i) => (
            <div key={e.title} className={`flex items-center justify-between px-6 py-4 ${i > 0 ? "border-t border-white/10" : ""} hover:bg-white/5 transition-colors`}>
              <div>
                <p className="text-white text-sm font-medium">{e.title}</p>
                <p className="text-white/40 text-xs mt-0.5">{e.date} · {e.location}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-white/20" />
            </div>
          ))}
        </div>
      </div>

      <FooterSection />
    </div>
  );
};

export default Events;
