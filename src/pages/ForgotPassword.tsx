import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import katanaImg from "@/assets/katana.png";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-black flex">
      {/* Left - Katana image */}
      <div className="hidden md:flex w-[45%] relative items-center justify-center overflow-hidden">
        <img
          src={katanaImg}
          alt="Katana"
          className="h-[85%] w-auto object-contain"
          style={{ transform: "rotate(-15deg) translateX(-5%)" }}
        />
        <button
          onClick={() => navigate("/login")}
          className="absolute top-6 left-6 text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 md:px-16">
        <button
          onClick={() => navigate("/login")}
          className="md:hidden self-start mb-8 text-white/70 hover:text-white"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="w-full max-w-md">
          <h1 className="text-white text-3xl font-light italic mb-10">Forget Password</h1>

          <div>
            <label className="text-white/40 text-xs tracking-wider uppercase block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-white/20 text-white py-3 outline-none focus:border-white/60 transition-colors placeholder:text-white/20"
              placeholder="your@email.com"
            />
          </div>

          <button className="mt-8 w-full py-3 rounded-full border border-white/30 text-white text-sm tracking-wider hover:bg-white/10 transition-colors">
            Get OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
