import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ShieldCheck, Headphones, Package, Download, ArrowLeft, Mouse, Gamepad2, Headphones as HeadphoneIcon, Keyboard } from "lucide-react";
import MenuButton from "@/components/MenuButton";
import FooterSection from "@/components/FooterSection";
import logo from "@/assets/Frame_5.png";

type View = "main" | "warranty" | "contact" | "orders" | "manual";

const supportCards = [
  { id: "warranty" as View, icon: ShieldCheck, label: "Warranty\nInformation" },
  { id: "contact" as View, icon: Headphones, label: "Contact Us" },
  { id: "orders" as View, icon: Package, label: "Rebel.com\nOrders" },
  { id: "manual" as View, icon: Download, label: "Manual\nDownload" },
];

const orderOptions = [
  "GET ORDER STATUS", "RETURN PURCHASE", "FREQUENTLY ASKED QUESTION",
  "REFUND STATUS", "MISSING ITEM", "CANCEL ORDER",
];

const warrantyCategories = [
  { icon: Mouse, label: "MOUSE" },
  { icon: Gamepad2, label: "GAMEPAD" },
  { icon: HeadphoneIcon, label: "HEADPHONE" },
  { icon: Keyboard, label: "KEYBOARD" },
];

const Support = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<View>("main");
  const [search, setSearch] = useState("");

  const renderSubView = () => {
    if (view === "orders") return (
      <div className="px-6 md:px-10 py-12 max-w-4xl mx-auto">
        <button onClick={() => setView("main")} className="flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <h2 className="text-xl font-semibold text-white mb-3">Rebel Order Support</h2>
        <p className="text-white/50 text-sm mb-1">Note: All international shipments to United States may be delayed due to customs controls.</p>
        <p className="text-white/50 text-sm mb-10">Looking for information about your orders? Check out <span className="text-red-500 underline cursor-pointer">Rebel store FAQ</span>. Need specific help? Pick a topic from the options below.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {orderOptions.map((opt) => (
            <button key={opt} className="px-6 py-5 rounded-lg border border-white/10 text-white text-sm font-medium tracking-wider hover:bg-white/5 transition-colors">
              {opt}
            </button>
          ))}
        </div>
      </div>
    );

    if (view === "warranty") return (
      <div className="px-6 md:px-10 py-12 max-w-4xl mx-auto">
        <button onClick={() => setView("main")} className="flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <h2 className="text-xl font-semibold text-white mb-3">Warranty Information</h2>
        <p className="text-white/50 text-sm mb-10 leading-relaxed">
          This limited warranty covers any defects in materials or workmanship under normal use during the warranty period. During the warranty period, Rebel Head will repair or replace, at no charge, products or parts of a product that proves defective because of improper material or workmanship, under normal use and maintenance.
        </p>
        <h3 className="text-white font-semibold mb-6">Select The Product Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {warrantyCategories.map((cat) => (
            <button key={cat.label} className="flex flex-col items-center gap-4 p-8 rounded-xl border border-white/10 hover:bg-white/5 transition-colors">
              <cat.icon className="w-12 h-12 text-white" />
              <span className="text-white text-xs font-medium tracking-wider">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
    );

    if (view === "contact") return (
      <div className="px-6 md:px-10 py-12 max-w-2xl mx-auto">
        <button onClick={() => setView("main")} className="flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <h2 className="text-xl font-semibold text-white mb-6">Contact Us</h2>
        <div className="space-y-4">
          <input type="text" placeholder="Your Name" className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm text-white outline-none focus:border-white/30" />
          <input type="email" placeholder="Your Email" className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm text-white outline-none focus:border-white/30" />
          <textarea placeholder="Your Message" rows={5} className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm text-white outline-none focus:border-white/30 resize-none" />
          <button className="px-8 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium tracking-wider transition-colors">SUBMIT</button>
        </div>
      </div>
    );

    if (view === "manual") return (
      <div className="px-6 md:px-10 py-12 max-w-2xl mx-auto">
        <button onClick={() => setView("main")} className="flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <h2 className="text-xl font-semibold text-white mb-6">Manual Download</h2>
        <p className="text-white/50 text-sm mb-8">Select a product to download its user manual and quick start guide.</p>
        {["Rebel Click Pro R2 - Mouse", "Rebel Keys Dark - Keyboard", "Rebel Pad Pro - Gamepad", "Rebel Head Pro - Headphone"].map((item) => (
          <div key={item} className="flex items-center justify-between py-4 border-b border-white/10">
            <span className="text-white text-sm">{item}</span>
            <button className="flex items-center gap-2 text-red-500 text-xs font-medium hover:text-red-400 transition-colors">
              <Download className="w-4 h-4" /> PDF
            </button>
          </div>
        ))}
      </div>
    );

    return null;
  };

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

      {view === "main" ? (
        <div className="pt-24 px-6 md:px-10">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-center italic text-white/80 mb-8">
            Rebel Support
          </h1>

          {/* Search */}
          <div className="max-w-xl mx-auto mb-14">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                type="text"
                placeholder="Search Support"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full py-3.5 pl-12 pr-4 text-sm text-white outline-none focus:border-white/30 transition-colors"
              />
            </div>
          </div>

          {/* Support Cards */}
          <div className="flex items-start justify-center gap-8 md:gap-14 flex-wrap mb-16">
            {supportCards.map((card) => (
              <button
                key={card.id}
                onClick={() => setView(card.id)}
                className="flex flex-col items-center gap-3 group"
              >
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <card.icon className="w-10 h-10 md:w-12 md:h-12 text-white/60 group-hover:text-white transition-colors" />
                </div>
                <span className="text-white/60 text-xs text-center whitespace-pre-line leading-relaxed group-hover:text-white transition-colors">
                  {card.label}
                </span>
              </button>
            ))}
          </div>

          {/* Counterfeit Warning */}
          <div className="max-w-3xl mx-auto pb-16">
            <h2 className="text-white font-semibold text-base mb-4">Beware Of Counterfeit Part</h2>
            <p className="text-white/50 text-sm leading-relaxed mb-3">
              Some counterfeit and third-party power adapters and batteries may not be designed properly and could result in safety issues. To ensure you receive a genuine Rebel Head battery during a battery replacement, we recommend visiting an{" "}
              <span className="text-red-500 underline cursor-pointer">Rebel Head Authorised Service Provider</span>.
              {" "}If you need a replacement adapter to charge your Rebel Head device, we recommend getting a Rebel Head power adapter.
            </p>
            <p className="text-white/50 text-sm leading-relaxed">
              Also non-genuine replacement displays may have compromised visual quality and may fail to work correctly. Rebel Head-certified screen repairs are performed by trusted experts who use genuine Rebel Head parts.
            </p>
          </div>
        </div>
      ) : (
        renderSubView()
      )}

      <FooterSection />
    </div>
  );
};

export default Support;
