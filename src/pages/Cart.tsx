import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Eye, Minus, Plus } from "lucide-react";
import MenuButton from "@/components/MenuButton";
import CartButton from "@/components/CartButton";
import FooterSection from "@/components/FooterSection";
import logo from "@/assets/Frame_5.png";
import { useCart } from "@/contexts/CartContext";

const Cart = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, subtotal } = useCart();
  const [promoOpen, setPromoOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Nav */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4">
        <img
          src={logo}
          alt="Rebel Head"
          className="h-10 w-auto cursor-pointer"
          onClick={() => navigate("/")}
          style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.4)) drop-shadow(0 0 20px rgba(255,255,255,0.15))" }}
        />
        <MenuButton />
        <div className="flex items-center gap-3">
          <CartButton />
          <button
            onClick={() => navigate("/signup")}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-black/80 backdrop-blur-sm text-white text-sm tracking-wide"
          >
            <span className="text-base">👤</span>
            <span>Account</span>
          </button>
        </div>
      </div>

      <div className="pt-24 px-6 md:px-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl md:text-3xl font-semibold">
            Your Cart Total In INR {subtotal.toFixed(2)}
          </h1>
          <button
            onClick={() => navigate("/checkout")}
            className="px-6 py-2.5 rounded-lg border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-colors"
          >
            Checkout
          </button>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/50 text-lg mb-4">Your cart is empty</p>
            <button
              onClick={() => navigate("/store")}
              className="px-6 py-3 rounded-lg border border-white/20 text-white text-sm hover:bg-white/10 transition-colors"
            >
              Browse Store
            </button>
          </div>
        ) : (
          <>
            {/* Product Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {items.map((item) => (
                <div key={item.id} className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
                  <div className="aspect-square bg-neutral-900 flex items-center justify-center p-6">
                    <img src={item.img} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-white text-sm font-medium">{item.name}</h3>
                    <p className="text-red-500 text-sm font-semibold mt-1">INR {item.price.toFixed(2)}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => removeFromCart(item.id)} className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <div className="flex items-center border border-white/10 rounded-lg overflow-hidden">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 h-8 flex items-center justify-center text-white text-xs">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pb-16">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm font-medium">Subtotal</p>
                    <p className="text-white/30 text-xs">Excludes Local Taxes</p>
                  </div>
                  <p className="text-white text-sm font-medium">INR {subtotal.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-white text-sm font-medium">Shipping</p>
                  <p className="text-white/50 text-sm">Calculated After Address Entry</p>
                </div>
                <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                  <p className="text-white font-semibold">Your Total</p>
                  <p className="text-white font-semibold text-lg">INR {total.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => navigate("/checkout")}
                  className="px-8 py-3 rounded-lg border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  Checkout
                </button>
              </div>

              {/* Promo Code */}
              <div>
                <button
                  onClick={() => setPromoOpen(!promoOpen)}
                  className="text-red-500 text-sm flex items-center gap-1 mb-3"
                >
                  Have a promo code? <span className={`transition-transform ${promoOpen ? "rotate-180" : ""}`}>▼</span>
                </button>
                {promoOpen && (
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-sm text-white outline-none focus:border-white/30"
                    />
                    <button className="px-5 py-2.5 rounded-lg border border-white/20 text-white text-xs font-medium tracking-wider hover:bg-white/10 transition-colors">
                      APPLY
                    </button>
                  </div>
                )}
                <p className="text-white/30 text-xs mt-4 leading-relaxed">
                  Actual sales tax will be calculated later upon entry of your billing/shipping address.
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      <FooterSection />
    </div>
  );
};

export default Cart;
