import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import katanaImg from "@/assets/katana.png";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleReset = async () => {
    if (!email) { setError("Please enter your email"); return; }
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/create-new-password`,
    });
    setLoading(false);
    if (error) { setError(error.message); } else { setSent(true); }
  };

  return (
    <div className="h-screen overflow-hidden bg-black flex">
      <div className="hidden md:flex w-[45%] relative items-center justify-center overflow-hidden">
        <img src={katanaImg} alt="Katana" className="h-[85%] w-auto object-contain" style={{ transform: "rotate(-15deg) translateX(-5%)" }} />
        <button onClick={() => navigate("/login")} className="absolute top-6 left-6 text-white/70 hover:text-white transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 md:px-16">
        <button onClick={() => navigate("/login")} className="md:hidden self-start mb-8 text-white/70 hover:text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="w-full max-w-md">
          <h1 className="text-white text-3xl font-light italic mb-10">Forget Password</h1>

          {sent ? (
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm text-center">
              Password reset link sent! Check your email.
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">{error}</div>
              )}
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
              <button onClick={handleReset} disabled={loading} className="mt-8 w-full py-3 rounded-full border border-white/30 text-white text-sm tracking-wider hover:bg-white/10 transition-colors disabled:opacity-50">
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
