import { useNavigate } from "react-router-dom";
import { Download, Mouse, Gamepad2, Headphones, Keyboard, Monitor, Cpu } from "lucide-react";
import MenuButton from "@/components/MenuButton";
import CartButton from "@/components/CartButton";
import AccountButton from "@/components/AccountButton";
import FooterSection from "@/components/FooterSection";
import logo from "@/assets/Frame_5.png";

const drivers = [
  {
    category: "Mouse",
    icon: Mouse,
    products: [
      { name: "Rebel Click Pro R2", version: "3.2.1", date: "2026-01-15", size: "24 MB" },
      { name: "Rebel Click Lite", version: "2.1.0", date: "2025-11-08", size: "18 MB" },
    ],
  },
  {
    category: "Gamepad",
    icon: Gamepad2,
    products: [
      { name: "Rebel Pad Pro", version: "4.0.3", date: "2026-02-01", size: "32 MB" },
      { name: "Rebel Pad Core", version: "3.1.2", date: "2025-12-20", size: "28 MB" },
    ],
  },
  {
    category: "Headphone",
    icon: Headphones,
    products: [
      { name: "Rebel Head Pro", version: "2.5.0", date: "2026-01-28", size: "15 MB" },
      { name: "Rebel Head Wireless", version: "1.8.4", date: "2025-10-12", size: "12 MB" },
    ],
  },
  {
    category: "Keyboard",
    icon: Keyboard,
    products: [
      { name: "Rebel Keys Dark", version: "5.0.1", date: "2026-02-10", size: "40 MB" },
      { name: "Rebel Keys Compact", version: "3.3.0", date: "2025-09-30", size: "35 MB" },
    ],
  },
  {
    category: "Webcam",
    icon: Monitor,
    products: [
      { name: "Rebel Eye 4K", version: "1.2.0", date: "2025-12-05", size: "20 MB" },
    ],
  },
  {
    category: "Accessories",
    icon: Cpu,
    products: [
      { name: "Rebel Dock Pro", version: "2.0.0", date: "2026-01-20", size: "10 MB" },
      { name: "Rebel Charger Hub", version: "1.1.0", date: "2025-11-15", size: "8 MB" },
    ],
  },
];

const Drivers = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Nav */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4">
        <img src={logo} alt="Rebel Head" className="h-10 w-auto cursor-pointer" onClick={() => navigate("/")} style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.4))" }} />
        <MenuButton />
        <div className="flex items-center gap-3">
          <CartButton />
          <AccountButton />
        </div>
      </div>

      <div className="pt-24 px-6 md:px-10 max-w-5xl mx-auto pb-20">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-center italic text-white/80 mb-4">Driver Downloads</h1>
        <p className="text-white/40 text-sm text-center mb-14 max-w-xl mx-auto">Download the latest drivers and software for your Rebel products to ensure peak performance and compatibility.</p>

        <div className="space-y-10">
          {drivers.map((cat) => (
            <div key={cat.category}>
              <div className="flex items-center gap-3 mb-4">
                <cat.icon className="w-5 h-5 text-red-500" />
                <h2 className="text-lg font-semibold tracking-wide">{cat.category}</h2>
              </div>
              <div className="border border-white/10 rounded-xl overflow-hidden">
                {cat.products.map((p, i) => (
                  <div key={p.name} className={`flex items-center justify-between px-6 py-4 ${i > 0 ? "border-t border-white/10" : ""} hover:bg-white/5 transition-colors`}>
                    <div>
                      <p className="text-white text-sm font-medium">{p.name}</p>
                      <p className="text-white/40 text-xs mt-0.5">v{p.version} · {p.date} · {p.size}</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-medium tracking-wider transition-colors">
                      <Download className="w-3.5 h-3.5" />
                      DOWNLOAD
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <FooterSection />
    </div>
  );
};

export default Drivers;
