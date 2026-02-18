import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface MenuButtonProps {
  className?: string;
}

const MenuButton = ({ className = "" }: MenuButtonProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const links = [
    { label: "Home", path: "/" },
    { label: "Discover", path: "/discover" },
    { label: "Store", path: "/store" },
    { label: "Support", path: "/support" },
  ];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-black/80 backdrop-blur-sm text-white text-sm tracking-wide ${className}`}
      >
        <span className="text-base">☰</span>
        <span>MENU</span>
      </button>
      {open && (
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 min-w-[140px] rounded-xl border border-white/10 bg-black/90 backdrop-blur-xl shadow-2xl overflow-hidden z-[100]">
          {links.map((link) => (
            <button
              key={link.path}
              onClick={() => { navigate(link.path); setOpen(false); }}
              className="w-full text-left px-5 py-3 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuButton;
