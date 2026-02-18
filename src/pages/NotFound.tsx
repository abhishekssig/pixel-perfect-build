import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import logo from "@/assets/Frame_5.png";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-6">
      {/* Decorative kanji */}
      <p className="text-[12rem] md:text-[16rem] font-bold text-white/[0.03] leading-none select-none absolute">
        404
      </p>

      <img
        src={logo}
        alt="Rebel Head"
        className="h-12 w-auto mb-10 cursor-pointer"
        onClick={() => navigate("/")}
        style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.4))" }}
      />

      <h1 className="text-6xl md:text-8xl font-light text-white mb-4">404</h1>
      <p className="text-white/40 text-lg md:text-xl mb-2">Page Not Found</p>
      <p className="text-white/30 text-sm mb-10">The path you seek does not exist.</p>

      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/")}
          className="px-8 py-3 rounded-full border border-white/20 text-white text-sm tracking-wider hover:bg-white/10 transition-colors"
        >
          Return Home
        </button>
        <button
          onClick={() => navigate("/store")}
          className="px-8 py-3 rounded-full border border-red-500/30 text-red-400 text-sm tracking-wider hover:bg-red-500/10 transition-colors"
        >
          Visit Store
        </button>
      </div>
    </div>
  );
};

export default NotFound;
