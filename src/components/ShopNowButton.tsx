import { useNavigate } from "react-router-dom";

interface ShopNowButtonProps {
  className?: string;
}

const ShopNowButton = ({ className = "" }: ShopNowButtonProps) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/store")}
      className={`px-5 py-2 rounded-full border border-white/20 bg-black/80 backdrop-blur-sm text-white text-sm font-medium tracking-wide hover:bg-white/10 transition-colors ${className}`}
    >
      Shop Now
    </button>
  );
};

export default ShopNowButton;
