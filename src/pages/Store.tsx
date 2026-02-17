import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import logo from "@/assets/Frame_4.png";
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
  { id: 1, img: mouseImg, className: "col-span-1 row-span-1" },
  { id: 2, img: keyboardImg, className: "col-span-1 row-span-2" },
  { id: 3, img: gamepadImg, className: "col-span-1 row-span-1" },
  { id: 4, img: headphonesImg, className: "col-span-2 row-span-1" },
  { id: 5, img: speakerImg, className: "col-span-1 row-span-1" },
  { id: 6, img: chargerImg, className: "col-span-1 row-span-2" },
  { id: 7, img: accessoriesImg, className: "col-span-1 row-span-1" },
  { id: 8, img: numpadImg, className: "col-span-2 row-span-1" },
  { id: 9, img: webcamImg, className: "col-span-1 row-span-1" },
];

const Store = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("New");

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Nav */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4">
        <img
          src={logo}
          alt="Rebel Head"
          className="w-10 h-10 cursor-pointer"
          onClick={() => navigate("/")}
          style={{ filter: "brightness(0) invert(1) drop-shadow(0 0 6px rgba(255,0,0,0.3))" }}
        />
        <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-black/80 backdrop-blur-sm text-white text-sm tracking-wide">
          <span className="text-base">☰</span>
          <span>MENU</span>
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-black/80 backdrop-blur-sm text-white text-sm tracking-wide"
        >
          <span className="text-base">👤</span>
          <span>Account</span>
        </button>
      </div>

      {/* Header */}
      <div className="pt-24 px-6 md:px-10">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-light leading-tight mb-8">
          <span className="font-semibold">Store.</span>{" "}
          <span className="text-white/50 italic">
            The Best Way To Buy The
            <br />
            Product You Love.
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
              className={`${product.className} rounded-2xl overflow-hidden cursor-pointer group relative bg-neutral-900`}
            >
              <img
                src={product.img}
                alt="Product"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Store;
