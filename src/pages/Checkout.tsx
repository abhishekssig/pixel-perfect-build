import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import FooterSection from "@/components/FooterSection";
import logo from "@/assets/Frame_5.png";

type Step = 1 | 2 | 3;

const Checkout = () => {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<Step>(1);
  const [billingSame, setBillingSame] = useState(true);

  const localTaxes = subtotal * 0.18;
  const shipping = 50;
  const total = subtotal + localTaxes + shipping;

  const stepLabels = ["Address", "Shipping", "Payment"];

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <p className="text-white/50 text-lg mb-4">No items to checkout</p>
        <button onClick={() => navigate("/store")} className="px-6 py-3 rounded-lg border border-white/20 text-white text-sm hover:bg-white/10 transition-colors">
          Browse Store
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 md:px-10 py-5">
        <img
          src={logo}
          alt="Rebel Head"
          className="h-10 w-auto cursor-pointer"
          onClick={() => navigate("/")}
          style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.4)) drop-shadow(0 0 20px rgba(255,255,255,0.15))" }}
        />
        {/* Step Indicators */}
        <div className="flex items-center gap-2">
          {stepLabels.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <button
                onClick={() => setStep((i + 1) as Step)}
                className={`flex items-center gap-1.5 text-sm ${step === i + 1 ? "text-white font-medium" : "text-white/30"}`}
              >
                <span className={`w-6 h-6 rounded-full border text-xs flex items-center justify-center ${step === i + 1 ? "border-white" : "border-white/20"}`}>
                  {i + 1}
                </span>
                {label}
              </button>
              {i < 2 && <span className="text-white/20 mx-1">›</span>}
            </div>
          ))}
        </div>
        <div />
      </div>

      <div className="px-6 md:px-10 pb-16">
        {/* Step 1: Address */}
        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
            <div>
              <h2 className="text-lg font-semibold mb-1">Contact Detail</h2>
              <p className="text-white/40 text-xs mb-6">We'll Only Use This Information To Contact You About Your Order.</p>
              <div className="space-y-4 mb-8">
                <input placeholder="Email" className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm text-white outline-none focus:border-white/30" />
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="IND (+91)" className="bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm text-white outline-none focus:border-white/30" />
                  <input placeholder="Contact Number" className="bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm text-white outline-none focus:border-white/30" />
                </div>
              </div>

              <h2 className="text-lg font-semibold mb-1">Delivery Address</h2>
              <p className="text-white/40 text-xs mb-6">Please Fill In Your Information Fully In English Characters To Ensure Your Order Gets To You Smoothly.</p>
              <div className="space-y-4 mb-8">
                <input placeholder="First Name" className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm text-white outline-none focus:border-white/30" />
                <input placeholder="Last Name" className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm text-white outline-none focus:border-white/30" />
                <input placeholder="Address Line" className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm text-white outline-none focus:border-white/30" />
                <input placeholder="Apt, Suite, Building (Optional)" className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm text-white outline-none focus:border-white/30" />
                <input placeholder="Town/City" className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm text-white outline-none focus:border-white/30" />
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="State/Province" className="bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm text-white outline-none focus:border-white/30" />
                  <input placeholder="Zip Code" className="bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm text-white outline-none focus:border-white/30" />
                </div>
              </div>

              <h2 className="text-lg font-semibold mb-1">Billing Address</h2>
              <p className="text-white/40 text-xs mb-4">We'll Only Use This Information To Contact You About Your Billing.</p>
              <label className="flex items-center gap-2 text-sm text-white/70 mb-6 cursor-pointer">
                <input type="checkbox" checked={billingSame} onChange={() => setBillingSame(!billingSame)} className="accent-red-600" />
                My Billing Address Is The Same As My Delivery Address
              </label>

              <p className="text-white/40 text-xs mb-4">
                Do You Accept The <span className="text-red-500 underline cursor-pointer">Terms Of Service</span> And <span className="text-red-500 underline cursor-pointer">Privacy Policy</span>?
              </p>

              <button
                onClick={() => setStep(2)}
                className="w-full py-3.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-medium tracking-wider hover:bg-white/10 transition-colors"
              >
                ACCEPT & CONTINUE
              </button>
            </div>

            {/* Cart Summary */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 h-fit sticky top-24">
              <h3 className="text-white font-semibold mb-1">Your Cart</h3>
              <p className="text-white/40 text-xs mb-4">{items.length} Items</p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-white/60">Subtotal</span><span>INR {subtotal.toFixed(2)}</span></div>
                <p className="text-white/30 text-[10px]">Excludes Local Taxes</p>
                <div className="flex justify-between"><span className="text-white/60">Local Taxes</span><span>INR {localTaxes.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-white/60">Shipping Charges</span><span>INR {shipping.toFixed(2)}</span></div>
                <div className="border-t border-white/10 pt-3 flex justify-between font-semibold">
                  <span>Total</span><span>INR {total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Shipping */}
        {step === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
            <div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 mb-8">
                <p className="text-white/40 text-xs mb-1">Delivery Address</p>
                <p className="text-white text-sm">Your saved address will appear here</p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-green-500 text-xs">● Delivery By 11 PM, Tomorrow</span>
                  <button onClick={() => setStep(1)} className="ml-auto px-4 py-1.5 rounded-lg border border-white/20 text-white text-xs hover:bg-white/10 transition-colors">CHANGE</button>
                </div>
              </div>

              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 mb-6 rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="w-28 h-28 rounded-lg bg-neutral-900 flex items-center justify-center flex-shrink-0">
                    <img src={item.img} alt={item.name} className="w-full h-full object-contain p-2" />
                  </div>
                  <div>
                    <h3 className="text-white text-sm font-medium">{item.name}</h3>
                    <p className="text-white/40 text-xs mt-1">Qty: {item.quantity}</p>
                    <p className="text-red-500 text-sm font-semibold mt-2">INR {item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}

              <button
                onClick={() => setStep(3)}
                className="w-full max-w-md py-3.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-medium tracking-wider hover:bg-white/10 transition-colors"
              >
                CONTINUE
              </button>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-6 h-fit sticky top-24">
              <h3 className="text-white font-semibold mb-1">Price Detail</h3>
              <p className="text-white/40 text-xs mb-4">{items.length} Items</p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-white/60">Subtotal</span><span>INR {subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-white/60">Local Taxes</span><span>INR {localTaxes.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-white/60">Shipping Charges</span><span>INR {shipping.toFixed(2)}</span></div>
                <div className="border-t border-white/10 pt-3 flex justify-between font-semibold text-lg">
                  <span>Total Payable</span><span>INR {total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
            <div className="space-y-4">
              {[
                { label: "UPI", desc: "pay by any UPI app" },
                { label: "Credit / Debit / ATM Card", desc: "Add And Secure Cards As Per RBI Guidelines" },
                { label: "Net Banking", desc: "" },
                { label: "Cash On Delivery", desc: "" },
              ].map((method) => (
                <button key={method.label} className="w-full flex items-start gap-4 p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-left">
                  <div className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-white/40">
                    {method.label === "UPI" ? "₹" : method.label === "Net Banking" ? "🏦" : method.label === "Cash On Delivery" ? "💵" : "💳"}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{method.label}</p>
                    {method.desc && <p className="text-white/40 text-xs mt-0.5">{method.desc}</p>}
                  </div>
                </button>
              ))}

              <button
                onClick={() => { clearCart(); navigate("/"); }}
                className="w-full max-w-md py-3.5 mt-4 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-medium tracking-wider hover:bg-white/10 transition-colors"
              >
                Pay INR {total.toFixed(2)}
              </button>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-6 h-fit sticky top-24">
              <h3 className="text-white font-semibold mb-1">Price Detail</h3>
              <p className="text-white/40 text-xs mb-4">{items.length} Items</p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-white/60">Subtotal</span><span>INR {subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-white/60">Local Taxes</span><span>INR {localTaxes.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-white/60">Shipping Charges</span><span>INR {shipping.toFixed(2)}</span></div>
                <div className="border-t border-white/10 pt-3">
                  <div className="flex justify-between font-semibold text-lg"><span>Total Payable</span><span>INR {total.toFixed(2)}</span></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <FooterSection />
    </div>
  );
};

export default Checkout;
