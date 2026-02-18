import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Download, Mouse, Gamepad2, Headphones, Keyboard, Monitor, Cpu } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import MenuButton from "@/components/MenuButton";
import CartButton from "@/components/CartButton";
import AccountButton from "@/components/AccountButton";
import ShopNowButton from "@/components/ShopNowButton";
import FooterSection from "@/components/FooterSection";
import logo from "@/assets/Frame_5.png";

const categoryIcons: Record<string, React.ElementType> = {
  Mouse, Gamepad: Gamepad2, Headphone: Headphones, Keyboard, Webcam: Monitor, Accessories: Cpu,
};

const categoryOrder = ["Mouse", "Gamepad", "Headphone", "Keyboard", "Webcam", "Accessories"];

interface DriverRow {
  id: string;
  name: string;
  version: string;
  category: string;
  file_size: string | null;
  file_url: string | null;
  release_date: string | null;
}

const Drivers = () => {
  const navigate = useNavigate();
  const [grouped, setGrouped] = useState<Record<string, DriverRow[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("drivers")
        .select("id, name, version, category, file_size, file_url, release_date")
        .order("created_at", { ascending: false });

      if (data) {
        const g: Record<string, DriverRow[]> = {};
        data.forEach((d) => {
          if (!g[d.category]) g[d.category] = [];
          g[d.category].push(d);
        });
        setGrouped(g);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  const sortedCategories = categoryOrder.filter((c) => grouped[c]?.length);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Nav */}
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
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-center italic text-white/80 mb-4">Driver Downloads</h1>
        <p className="text-white/40 text-sm text-center mb-14 max-w-xl mx-auto">Download the latest drivers and software for your Rebel products to ensure peak performance and compatibility.</p>

        {loading ? (
          <p className="text-white/40 text-center">Loading drivers...</p>
        ) : sortedCategories.length === 0 ? (
          <p className="text-white/40 text-center">No drivers available yet.</p>
        ) : (
          <div className="space-y-10">
            {sortedCategories.map((cat) => {
              const Icon = categoryIcons[cat] || Cpu;
              return (
                <div key={cat}>
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="w-5 h-5 text-red-500" />
                    <h2 className="text-lg font-semibold tracking-wide">{cat}</h2>
                  </div>
                  <div className="border border-white/10 rounded-xl overflow-hidden">
                    {grouped[cat].map((p, i) => (
                      <div key={p.id} className={`flex items-center justify-between px-6 py-4 ${i > 0 ? "border-t border-white/10" : ""} hover:bg-white/5 transition-colors`}>
                        <div>
                          <p className="text-white text-sm font-medium">{p.name}</p>
                          <p className="text-white/40 text-xs mt-0.5">v{p.version} · {p.release_date || "—"} · {p.file_size || "—"}</p>
                        </div>
                        <a
                          href={p.file_url || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-medium tracking-wider transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                          DOWNLOAD
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <FooterSection />
    </div>
  );
};

export default Drivers;
