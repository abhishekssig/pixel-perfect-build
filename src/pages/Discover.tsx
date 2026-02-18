import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import MenuButton from "@/components/MenuButton";
import FooterSection from "@/components/FooterSection";
import logo from "@/assets/Frame_5.png";
import mouseImg from "@/assets/mouse.png";
import mouse2Img from "@/assets/mouse-2.png";
import keyboardImg from "@/assets/keyboard-store.png";
import gamepadImg from "@/assets/gamepad.png";
import headphonesImg from "@/assets/headphones.png";
import speakerImg from "@/assets/speaker.png";
import chargerImg from "@/assets/charger.png";
import accessoriesImg from "@/assets/accessories-flatlay.png";
import numpadImg from "@/assets/numpad.png";
import webcamImg from "@/assets/webcam.png";
import keyboardDarkImg from "@/assets/keyboard-dark.png";

const categories = [
  { name: "Mouse", img: mouse2Img },
  { name: "Gamepad", img: gamepadImg },
  { name: "Keyboard", img: keyboardImg },
  { name: "Sound Bar", img: speakerImg },
  { name: "Web Cam", img: webcamImg },
  { name: "Stream Deck", img: numpadImg },
  { name: "Charging Deck", img: chargerImg },
  { name: "Seat Cushion", img: accessoriesImg },
];

const products = [
  { id: 1, img: mouseImg, name: "Rebel Click Pro R2", desc: "A haptic feedback mouse featuring personalized body printing", price: "INR 3500.93", link: "/product/mouse", category: "Mouse" },
  { id: 2, img: mouse2Img, name: "Rebel Click X1", desc: "Ergonomic wireless mouse with ultra-low latency", price: "INR 2999.00", link: "/product/mouse", category: "Mouse" },
  { id: 3, img: gamepadImg, name: "Rebel Pad Pro", desc: "Wireless controller with hall effect triggers", price: "INR 4500.93", category: "Gamepad" },
  { id: 4, img: gamepadImg, name: "Rebel Pad Lite", desc: "Compact gamepad for competitive gaming", price: "INR 3200.00", category: "Gamepad" },
  { id: 5, img: keyboardDarkImg, name: "Rebel Keys Dark", desc: "Mechanical keyboard with custom switches", price: "INR 5500.93", category: "Keyboard" },
  { id: 6, img: keyboardImg, name: "Rebel Keys RGB", desc: "Full-size mechanical keyboard with per-key RGB", price: "INR 4999.00", category: "Keyboard" },
  { id: 7, img: speakerImg, name: "Rebel Head Boom S1", desc: "Immersive surround sound bar for gaming", price: "INR 1899.00", category: "Sound Bar" },
  { id: 8, img: webcamImg, name: "Rebel Eye 4K", desc: "Ultra HD webcam with auto-focus and noise cancellation", price: "INR 2499.00", category: "Web Cam" },
  { id: 9, img: numpadImg, name: "Rebel Deck Mini", desc: "Programmable stream deck with LCD keys", price: "INR 3999.00", category: "Stream Deck" },
  { id: 10, img: chargerImg, name: "Rebel Power Hub", desc: "Multi-device wireless charging station", price: "INR 1499.00", category: "Charging Deck" },
  { id: 11, img: headphonesImg, name: "Rebel Head Pro", desc: "Premium over-ear headset with spatial audio", price: "INR 3500.93", category: "Sound Bar" },
  { id: 12, img: accessoriesImg, name: "Rebel Comfort Pad", desc: "Ergonomic seat cushion for extended sessions", price: "INR 999.00", category: "Seat Cushion" },
];

const Discover = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredProducts = activeCategory
    ? products.filter((p) => p.category === activeCategory)
    : products;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Nav */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4">
        <img
          src={logo}
          alt="Rebel Head"
          className="h-10 w-auto cursor-pointer"
          onClick={() => navigate("/")}
          style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.4)) drop-shadow(0 0 20px rgba(255,255,255,0.15))" }}
        />
        <MenuButton />
        <button
          onClick={() => navigate("/signup")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-black/80 backdrop-blur-sm text-white text-sm tracking-wide"
        >
          <span className="text-base">👤</span>
          <span>Account</span>
        </button>
      </div>

      {/* Category Icons */}
      <div className="pt-24 px-6 md:px-10">
        <div className="flex items-start justify-between gap-4 overflow-x-auto pb-6 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(activeCategory === cat.name ? null : cat.name)}
              className={`flex flex-col items-center gap-2 min-w-[80px] md:min-w-[100px] group transition-all ${
                activeCategory === cat.name ? "opacity-100" : "opacity-60 hover:opacity-90"
              }`}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center relative">
                <div
                  className={`absolute inset-0 rounded-full blur-xl transition-opacity duration-300 ${
                    activeCategory === cat.name ? 'opacity-60' : 'opacity-0 group-hover:opacity-30'
                  }`}
                  style={{ background: 'radial-gradient(circle, rgba(147,51,234,0.7) 0%, rgba(79,70,229,0.4) 50%, transparent 80%)' }}
                />
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110 relative z-10"
                />
              </div>
              <span className="text-xs text-white/60 group-hover:text-white/80 transition-colors whitespace-nowrap">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Header + Search */}
      <div className="px-6 md:px-10 mt-4">
        <div className="flex items-start justify-between gap-8 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white/40 leading-tight tracking-tight">
              Discover Gear For Gamers
            </h1>
            <p className="text-white/30 text-sm mt-2">
              Razer Mice, Keyboards, Headsets, Laptops & More
            </p>
          </div>
          <div className="flex items-center gap-2 mt-2 shrink-0">
            <div className="relative">
              <input
                type="text"
                placeholder=""
                className="w-36 md:w-48 bg-white/5 border border-white/10 rounded-full py-2.5 px-4 pr-10 text-sm text-white outline-none focus:border-white/30 transition-colors"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            </div>
            <button className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/40 hover:text-white/60 transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            <button className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/40 hover:text-white/60 transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="14" height="3" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="1" y="6.5" width="14" height="3" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="1" y="12" width="14" height="3" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="px-6 md:px-10 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer"
              onClick={() => product.link && navigate(product.link)}
            >
              <div className="aspect-[4/5] rounded-xl overflow-hidden bg-neutral-900 border border-white/5 relative">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-white text-sm font-medium leading-snug whitespace-pre-line">
                  {product.name}
                </h3>
                <p className="text-white/40 text-xs mt-1 leading-relaxed">
                  {product.desc}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-red-500 text-sm font-semibold">{product.price}</span>
                  <button
                    className="px-5 py-1.5 rounded-md border border-white/20 text-white text-xs font-medium tracking-wider hover:bg-white/10 transition-colors"
                    onClick={(e) => { e.stopPropagation(); }}
                  >
                    BUY
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FooterSection />
    </div>
  );
};

export default Discover;
