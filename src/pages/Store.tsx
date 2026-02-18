import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import MenuButton from "@/components/MenuButton";
import CartButton from "@/components/CartButton";
import AccountButton from "@/components/AccountButton";
import ShopNowButton from "@/components/ShopNowButton";
import FooterSection from "@/components/FooterSection";
import logo from "@/assets/Frame_5.png";
import mouseImg from "@/assets/mouse.png";
import keyboardImg from "@/assets/keyboard-store.png";
import gamepadImg from "@/assets/gamepad.png";
import headphonesImg from "@/assets/headphones.png";
import speakerImg from "@/assets/speaker.png";
import chargerImg from "@/assets/charger.png";
import accessoriesImg from "@/assets/accessories-flatlay.png";
import numpadImg from "@/assets/numpad.png";
import webcamImg from "@/assets/webcam.png";

const categories = ["New", "Keyboard", "Printed Mouse", "Headphone Stand", "Gamepad"];

const products = [
  { id: 1, img: mouseImg, name: "Rebel Head Pro Click R2", price: "INR 3500.93", className: "col-span-1 row-span-1", link: "/product/mouse" },
  { id: 2, img: keyboardImg, name: "Rebel Head Mech K1", price: "INR 5999.00", className: "col-span-1 row-span-2", link: "/product/keyboard" },
  { id: 3, img: gamepadImg, name: "Rebel Head Gyro Pad", price: "INR 4299.00", className: "col-span-1 row-span-1", link: "/product/gamepad" },
  { id: 4, img: headphonesImg, name: "Rebel Head Audio X", price: "INR 2999.00", className: "col-span-2 row-span-1", link: "/product/headphone" },
  { id: 5, img: speakerImg, name: "Rebel Head Boom S1", price: "INR 1899.00", className: "col-span-1 row-span-1" },
  { id: 6, img: chargerImg, name: "Rebel Head Power Hub", price: "INR 1499.00", className: "col-span-1 row-span-2" },
  { id: 7, img: accessoriesImg, name: "Rebel Head Essentials Kit", price: "INR 2499.00", className: "col-span-1 row-span-1" },
  { id: 8, img: numpadImg, name: "Rebel Head Num Pad N1", price: "INR 1799.00", className: "col-span-2 row-span-1" },
  { id: 9, img: webcamImg, name: "Rebel Head Cam Pro", price: "INR 3299.00", className: "col-span-1 row-span-1" },
];

const Store = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("New");

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Decorative kanji watermarks */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <span className="absolute top-[10%] right-[3%] text-red-500/[0.03] text-[16rem] font-jp leading-none">武</span>
        <span className="absolute top-[55%] left-[2%] text-red-500/[0.025] text-[14rem] font-jp leading-none">器</span>
      </div>
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
        <div className="flex items-center gap-3">
          <ShopNowButton />
          <CartButton />
          <AccountButton />
        </div>
      </div>

      {/* Header */}
      <div className="pt-24 px-6 md:px-10">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-light leading-tight mb-8">
          <span className="font-semibold">Store.</span>{" "}
          <span className="text-white/50 italic">
            Get the best gear for your setup.
          </span>
        </h1>

        {/* Categories + Search */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-6 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-sm whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? "text-white font-medium"
                    : "text-white/40 hover:text-white/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 ml-4">
            <div className="relative">
              <input
                type="text"
                placeholder=""
                className="w-32 md:w-48 bg-white/5 border border-white/10 rounded-full py-2 px-4 pr-9 text-sm text-white outline-none focus:border-white/30 transition-colors"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            </div>
            <button className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/40 hover:text-white/60 transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="9" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="1" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/></svg>
            </button>
            <button className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/40 hover:text-white/60 transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="14" height="3" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="1" y="6.5" width="14" height="3" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="1" y="12" width="14" height="3" rx="1" stroke="currentColor" strokeWidth="1.5"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="px-6 md:px-10 pb-16">
        <div className="grid grid-cols-3 auto-rows-[220px] md:auto-rows-[280px] gap-3">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => product.link ? navigate(product.link) : undefined}
              className={`${product.className} rounded-2xl overflow-hidden cursor-pointer group relative bg-neutral-900`}
            >
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <div>
                  <p className="text-white text-sm font-medium leading-tight">{product.name}</p>
                  <p className="text-red-400 text-sm font-semibold mt-1">{product.price}</p>
                </div>
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white text-xs whitespace-nowrap hover:bg-white/20 transition-colors">
                  View Product <span className="text-sm">↗</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <FooterSection />
    </div>
  );
};

export default Store;
