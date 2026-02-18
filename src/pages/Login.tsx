import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import katanaImg from "@/assets/katana.png";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    setError("");
    const result = await login(formData.email, formData.password);
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      // Check if user is admin
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: roleData } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id)
          .eq("role", "admin")
          .maybeSingle();
        if (roleData) {
          navigate("/admin");
          return;
        }
      }
      navigate("/");
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
          onClick={() => navigate("/")}
          className="absolute top-6 left-6 text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        {/* Not a member */}
        <div className="absolute bottom-8 left-8">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-4">
            <p className="text-white/50 text-xs mb-1">Not A Member Yet</p>
            <button
              onClick={() => navigate("/signup")}
              className="text-white text-lg font-semibold flex items-center gap-2"
            >
              Sign Up <span>➔</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 md:px-16">
        <button
          onClick={() => navigate("/")}
          className="md:hidden self-start mb-8 text-white/70 hover:text-white"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="w-full max-w-md">
          <h1 className="text-white text-3xl font-light italic mb-10 text-center">Log In</h1>

          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="text-white/40 text-xs tracking-wider uppercase block mb-2">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 text-white py-3 outline-none focus:border-white/60 transition-colors placeholder:text-white/20"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="text-white/40 text-xs tracking-wider uppercase block mb-2">Password</label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 text-white py-3 outline-none focus:border-white/60 transition-colors placeholder:text-white/20"
                placeholder="••••••••••"
              />
            </div>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="mt-10 w-full py-3 rounded-full border border-white/30 text-white text-sm tracking-wider hover:bg-white/10 transition-colors disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          <p className="text-white/30 text-sm text-center mt-8">Or Sign Up With</p>

          <div className="flex justify-center gap-4 mt-5">
            {["G", "🍎", "f"].map((icon, i) => (
              <button
                key={i}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white text-lg hover:bg-white/10 transition-colors"
              >
                {icon}
              </button>
            ))}
          </div>

          <button onClick={() => navigate("/forgot-password")} className="text-white/30 text-sm text-center mt-8 hover:text-white/60 transition-colors w-full">Having Issues With Your Password?</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
