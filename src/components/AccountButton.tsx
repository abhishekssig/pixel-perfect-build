import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { useAuth, AVATARS } from "@/contexts/AuthContext";

interface AccountButtonProps {
  className?: string;
}

const AccountButton = ({ className = "" }: AccountButtonProps) => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();

  if (isLoggedIn && user) {
    return (
      <button
        onClick={() => navigate("/account")}
        className={`w-10 h-10 rounded-full bg-gradient-to-br from-red-600/80 to-red-900/80 border border-white/20 flex items-center justify-center text-lg hover:scale-105 transition-transform ${className}`}
      >
        {AVATARS[user.avatarIndex]}
      </button>
    );
  }

  return (
    <button
      onClick={() => navigate("/signup")}
      className={`w-10 h-10 rounded-full border border-white/20 bg-black/80 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/10 transition-colors ${className}`}
    >
      <User className="w-4 h-4" />
    </button>
  );
};

export default AccountButton;
