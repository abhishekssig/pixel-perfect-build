import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import katanaImg from "@/assets/katana.png";

const CreateNewPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);

  useEffect(() => {
    // Check for recovery event from URL hash
    const hash = window.location.hash;
    if (hash.includes("type=recovery")) {
      setIsRecovery(true);
    }
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setIsRecovery(true);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (formData.password.length < 6) { setError("Password must be at least 6 characters"); return; }
    if (formData.password !== formData.confirm) { setError("Passwords do not match"); return; }
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.updateUser({ password: formData.password });
    setLoading(false);
    if (error) { setError(error.message); } else { setSuccess(true); }
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
          <h1 className="text-white text-3xl font-light italic mb-10">Create New Password</h1>

          {success ? (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm text-center">
                Password updated successfully!
              </div>
              <button onClick={() => navigate("/login")} className="w-full py-3 rounded-full border border-white/30 text-white text-sm tracking-wider hover:bg-white/10 transition-colors">
                Go to Login
              </button>
            </div>
          ) : !isRecovery ? (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              Invalid or expired reset link. Please request a new one.
              <button onClick={() => navigate("/forgot-password")} className="block mt-3 text-white/60 hover:text-white underline mx-auto text-xs">
                Request new link
              </button>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">{error}</div>
              )}
              <div className="space-y-6">
                <div>
                  <label className="text-white/40 text-xs tracking-wider uppercase block mb-2">New Password</label>
                  <input name="password" type="password" value={formData.password} onChange={handleChange} className="w-full bg-transparent border-b border-white/20 text-white py-3 outline-none focus:border-white/60 transition-colors placeholder:text-white/20" placeholder="••••••••••" />
                </div>
                <div>
                  <label className="text-white/40 text-xs tracking-wider uppercase block mb-2">Re - Enter</label>
                  <input name="confirm" type="password" value={formData.confirm} onChange={handleChange} className="w-full bg-transparent border-b border-white/20 text-white py-3 outline-none focus:border-white/60 transition-colors placeholder:text-white/20" placeholder="••••••••••" />
                </div>
              </div>
              <button onClick={handleSubmit} disabled={loading} className="mt-10 w-full py-3 rounded-full border border-white/30 text-white text-sm tracking-wider hover:bg-white/10 transition-colors disabled:opacity-50">
                {loading ? "Updating..." : "Proceed"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateNewPassword;
