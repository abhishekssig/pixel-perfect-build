import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import MenuButton from "@/components/MenuButton";
import CartButton from "@/components/CartButton";
import AccountButton from "@/components/AccountButton";
import ShopNowButton from "@/components/ShopNowButton";
import FooterSection from "@/components/FooterSection";
import logo from "@/assets/Frame_5.png";
import { format } from "date-fns";

interface EventItem {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  end_date: string | null;
  location: string | null;
  cover_image: string | null;
  registration_url: string | null;
}

const formatEventDate = (start: string, end: string | null) => {
  const s = new Date(start);
  if (end) {
    const e = new Date(end);
    if (s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()) {
      return `${format(s, "MMMM d")}–${format(e, "d, yyyy")}`;
    }
    return `${format(s, "MMMM d, yyyy")} – ${format(e, "MMMM d, yyyy")}`;
  }
  return format(s, "MMMM d, yyyy");
};

const Events = () => {
  const navigate = useNavigate();
  const [upcoming, setUpcoming] = useState<EventItem[]>([]);
  const [past, setPast] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await supabase
        .from("events")
        .select("id, title, description, event_date, end_date, location, cover_image, registration_url")
        .eq("is_published", true)
        .order("event_date", { ascending: false });

      if (data) {
        const now = new Date();
        setUpcoming(data.filter((e) => new Date(e.event_date) >= now));
        setPast(data.filter((e) => new Date(e.event_date) < now));
      }
      setLoading(false);
    };
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4">
        <img src={logo} alt="Rebel Head" className="h-10 w-auto cursor-pointer" onClick={() => navigate("/")} style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.4))" }} />
        <MenuButton />
        <div className="flex items-center gap-3">
          <ShopNowButton />
          <CartButton />
          <AccountButton />
        </div>
      </div>

      <div className="pt-24 px-6 md:px-10 max-w-5xl mx-auto pb-20">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-center italic text-white/80 mb-4">Events</h1>
        <p className="text-white/40 text-sm text-center mb-16 max-w-xl mx-auto">Meet the Rebel team, try our latest products, and join the community at events worldwide.</p>

        {loading ? (
          <p className="text-white/40 text-center">Loading events...</p>
        ) : (
          <>
            {/* Upcoming */}
            {upcoming.length > 0 && (
              <>
                <h2 className="text-xs font-medium tracking-widest text-white/30 uppercase mb-6">Upcoming Events</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
                  {upcoming.map((e) => (
                    <div key={e.id} className="group border border-white/10 rounded-xl p-6 hover:bg-white/5 transition-colors">
                      <h3 className="text-white text-base font-semibold mb-2">{e.title}</h3>
                      {e.description && (
                        <p className="text-white/50 text-sm leading-relaxed mb-4">{e.description}</p>
                      )}
                      <div className="flex items-center gap-4 text-white/40 text-xs">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{formatEventDate(e.event_date, e.end_date)}</span>
                        {e.location && <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{e.location}</span>}
                      </div>
                      {e.registration_url && (
                        <a href={e.registration_url} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-red-400 text-xs hover:text-red-300 transition-colors">
                          Register →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Past */}
            {past.length > 0 && (
              <>
                <h2 className="text-xs font-medium tracking-widest text-white/30 uppercase mb-6">Past Events</h2>
                <div className="border border-white/10 rounded-xl overflow-hidden">
                  {past.map((e, i) => (
                    <div key={e.id} className={`flex items-center justify-between px-6 py-4 ${i > 0 ? "border-t border-white/10" : ""} hover:bg-white/5 transition-colors`}>
                      <div>
                        <p className="text-white text-sm font-medium">{e.title}</p>
                        <p className="text-white/40 text-xs mt-0.5">{formatEventDate(e.event_date, e.end_date)}{e.location ? ` · ${e.location}` : ""}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-white/20" />
                    </div>
                  ))}
                </div>
              </>
            )}

            {upcoming.length === 0 && past.length === 0 && (
              <p className="text-white/40 text-center">No events available yet.</p>
            )}
          </>
        )}
      </div>

      <FooterSection />
    </div>
  );
};

export default Events;
