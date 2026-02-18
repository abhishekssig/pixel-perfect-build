import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

interface CartButtonProps {
  className?: string;
}

const CartButton = ({ className = "" }: CartButtonProps) => {
  const navigate = useNavigate();
  const { totalItems } = useCart();

  return (
    <button
      onClick={() => navigate("/cart")}
      className={`relative flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-black/80 backdrop-blur-sm text-white text-sm tracking-wide hover:bg-white/10 transition-colors ${className}`}
    >
      <ShoppingCart className="w-4 h-4" />
      {totalItems > 0 && (
        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">
          {totalItems > 9 ? "9+" : totalItems}
        </span>
      )}
    </button>
  );
};

export default CartButton;
