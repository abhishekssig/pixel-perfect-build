import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import katanaImg from "@/assets/katana.png";

const CreateNewPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ password: "", confirm: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="h-screen overflow-hidden bg-black flex">
      <div className="hidden md:flex w-[45%] relative items-center justify-center overflow-hidden">
        <img
          src={katanaImg}
          alt="Katana"
          className="h-[85%] w-auto object-contain"
          style={{ transform: "rotate(-15deg) translateX(-5%)" }}
        />
        <button
          onClick={() => navigate("/verify-otp")}
          className="absolute top-6 left-6 text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 md:px-16">
        <button
          onClick={() => navigate("/verify-otp")}
          className="md:hidden self-start mb-8 text-white/70 hover:text-white"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="w-full max-w-md">
          <h1 className="text-white text-3xl font-light italic mb-10">Create New Password</h1>

          <div className="space-y-6">
            <div>
              <label className="text-white/40 text-xs tracking-wider uppercase block mb-2">New Password</label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 text-white py-3 outline-none focus:border-white/60 transition-colors placeholder:text-white/20"
                placeholder="••••••••••"
              />
            </div>
            <div>
              <label className="text-white/40 text-xs tracking-wider uppercase block mb-2">Re - Enter</label>
              <input
                name="confirm"
                type="password"
                value={formData.confirm}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 text-white py-3 outline-none focus:border-white/60 transition-colors placeholder:text-white/20"
                placeholder="••••••••••"
              />
            </div>
          </div>

          <button className="mt-10 w-full py-3 rounded-full border border-white/30 text-white text-sm tracking-wider hover:bg-white/10 transition-colors">
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNewPassword;
