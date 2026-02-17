import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import katanaImg from "@/assets/katana.png";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-black flex">
      {/* Left - Katana image */}
      <div className="hidden md:flex w-[45%] relative items-center justify-center overflow-hidden">
        <img
          src={katanaImg}
          alt="Katana"
          className="h-[85%] w-auto object-contain"
          style={{ transform: "rotate(-15deg) translateX(-5%)" }}
        />
        <button
          onClick={() => navigate("/forgot-password")}
          className="absolute top-6 left-6 text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Right - OTP Form */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 md:px-16">
        <button
          onClick={() => navigate("/forgot-password")}
          className="md:hidden self-start mb-8 text-white/70 hover:text-white"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="w-full max-w-lg">
          <h1 className="text-white text-3xl font-light italic mb-16">Forget Password</h1>

          <div className="flex justify-center gap-8 mb-3">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="w-20 bg-transparent border-b-2 border-white/20 text-white text-center text-2xl py-3 outline-none focus:border-white/60 transition-colors"
              />
            ))}
          </div>
          <p className="text-white/30 text-xs text-center tracking-wider uppercase mb-10">OTP</p>

          <button className="w-full py-3 rounded-full border border-white/30 text-white text-sm tracking-wider hover:bg-white/10 transition-colors">
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
