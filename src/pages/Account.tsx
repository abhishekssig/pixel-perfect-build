import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, CreditCard, Bell, Package, ShoppingCart, MapPin } from "lucide-react";
import { useAuth, AVATARS } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import MenuButton from "@/components/MenuButton";
import CartButton from "@/components/CartButton";
import AccountButton from "@/components/AccountButton";
import ShopNowButton from "@/components/ShopNowButton";
import FooterSection from "@/components/FooterSection";
import logo from "@/assets/Frame_5.png";

type Section = "profile" | "addresses" | "pan" | "gift" | "upi" | "cards" | "notifications" | "orders" | "cart";

const sidebarItems = [
  {
    group: "ACCOUNT SETTING",
    icon: User,
    items: [
      { id: "profile" as Section, label: "Profile Information" },
      { id: "addresses" as Section, label: "Manage Addresses" },
      { id: "pan" as Section, label: "PAN Card Information" },
    ],
  },
  {
    group: "PAYMENTS",
    icon: CreditCard,
    items: [
      { id: "gift" as Section, label: "Gift Cards" },
      { id: "upi" as Section, label: "Manage Saved UPI" },
      { id: "cards" as Section, label: "Saved Cards" },
    ],
  },
];

const Account = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, loading, logout, setAvatar, supabaseUser } = useAuth();
  const [activeSection, setActiveSection] = useState<Section>("profile");
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({ full_name: "", phone: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (supabaseUser) {
      // Fetch profile from database
      supabase.from("profiles").select("*").eq("user_id", supabaseUser.id).maybeSingle().then(({ data }) => {
        if (data) {
          setProfileData({ full_name: data.full_name || "", phone: data.phone || "" });
        }
      });
    }
  }, [supabaseUser]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isLoggedIn) {
    navigate("/login");
    return null;
  }

  const handleSaveProfile = async () => {
    if (!supabaseUser) return;
    setSaving(true);
    await supabase.from("profiles").update({ full_name: profileData.full_name, phone: profileData.phone }).eq("user_id", supabaseUser.id);
    setSaving(false);
    setEditMode(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return editMode ? (
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">Account Setting</h2>
            <p className="text-white/60 text-sm mb-8">Personal Information</p>
            <div className="space-y-5 max-w-lg">
              <input value={profileData.full_name} onChange={(e) => setProfileData({ ...profileData, full_name: e.target.value })} placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm text-white outline-none focus:border-white/30" />
              <input value={user?.email || ""} disabled className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm text-white/40 outline-none cursor-not-allowed" />
              <div className="flex gap-2">
                <span className="bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm text-white/40">IN(+91)</span>
                <input value={profileData.phone} onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })} placeholder="Contact Number" className="flex-1 bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm text-white outline-none focus:border-white/30" />
              </div>
              <button onClick={handleSaveProfile} disabled={saving} className="w-full py-3 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors disabled:opacity-50">
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">Account Setting</h2>
            <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-6 max-w-lg">
              <h3 className="text-white font-semibold mb-4">Personal Information</h3>
              <div className="space-y-3 text-sm">
                <p className="text-white/80">{profileData.full_name || user?.name || "—"}</p>
                <p className="text-white/50">{user?.email || "—"}</p>
                <p className="text-white/50">{profileData.phone || "—"}</p>
              </div>
              <button onClick={() => setEditMode(true)} className="text-red-500 text-sm mt-4 hover:text-red-400">Edit</button>
            </div>
          </div>
        );

      case "addresses":
        return (
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">Manage Addresses</h2>
            <p className="text-white/60 text-sm mb-6">Shipping Address</p>
            <button className="text-red-500 text-sm mb-4 hover:text-red-400">ADD NEW ADDRESS</button>
            <div className="space-y-4 max-w-lg">
              <button className="w-full py-3 rounded-lg border border-white/20 text-white text-sm hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4" /> Use My Current Location
              </button>
              {["First Name", "Address Line", "apt, Suite, Building (Optional)", "Town/City"].map((ph) => (
                <input key={ph} placeholder={ph} className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm text-white outline-none focus:border-white/30" />
              ))}
              <div className="flex gap-4">
                <input placeholder="State/Province" className="flex-1 bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm text-white outline-none focus:border-white/30" />
                <input placeholder="Zip Code" className="flex-1 bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm text-white outline-none focus:border-white/30" />
              </div>
              <button className="w-full py-3 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors">Save</button>
            </div>
          </div>
        );

      case "pan":
        return (
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">PAN Card Information</h2>
            <p className="text-white/60 text-sm mb-6">Card Detail</p>
            <div className="space-y-4 max-w-lg">
              <input placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm text-white outline-none focus:border-white/30" />
              <input placeholder="PAN Card Number" className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm text-white outline-none focus:border-white/30" />
              <label className="flex items-start gap-3 text-white/50 text-xs leading-relaxed">
                <input type="checkbox" className="accent-white mt-0.5" />
                I hereby Declare That The Detail PAN Is Correct And Belongs To Me.
              </label>
              <button className="w-full py-3 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors">Save</button>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div>
            <h2 className="text-xl font-semibold text-white mb-6">Notification</h2>
            <div className="space-y-1">
              {["Today", "Yesterday", "Monday"].map((day) => (
                <div key={day}>
                  <p className="text-white/40 text-xs uppercase tracking-wider py-3">{day}</p>
                  {[1, 2].map((i) => (
                    <div key={i} className="flex items-start gap-4 py-4 border-b border-white/5">
                      <div className="w-10 h-10 rounded-full bg-red-900/50 flex items-center justify-center text-red-400 text-xs font-bold shrink-0">RH</div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">Your Order Has Been Shipped</p>
                        <p className="text-white/40 text-xs mt-1">We Have Shipped The Package Numbered 94775666....</p>
                      </div>
                      <span className="text-white/30 text-xs shrink-0">10:45 AM</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        );

      case "orders":
        return (
          <div>
            <h2 className="text-xl font-semibold text-white mb-6">Your Orders</h2>
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 py-5 border-b border-white/10">
                <div className="w-24 h-24 rounded-lg bg-neutral-900 shrink-0" />
                <div className="flex-1">
                  <h3 className="text-white text-sm font-medium">Rebel Head Pro Click R2</h3>
                  <p className="text-white/40 text-xs mt-1">Delivered on Jan {10 + i}th</p>
                  <p className="text-red-500 text-sm font-semibold mt-2">INR {2500 + i * 500}.93</p>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return <div className="text-white/40 text-sm">This section is coming soon.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4">
        <img src={logo} alt="Rebel Head" className="h-10 w-auto cursor-pointer" onClick={() => navigate("/")} style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.4)) drop-shadow(0 0 20px rgba(255,255,255,0.15))" }} />
        <MenuButton />
        <div className="flex items-center gap-3">
          <ShopNowButton />
          <CartButton />
          <AccountButton />
        </div>
      </div>

      <div className="pt-24 flex min-h-screen">
        <aside className="w-64 shrink-0 px-6 border-r border-white/5">
          <div className="flex items-center gap-3 mb-8">
            <button onClick={() => setShowAvatarPicker(!showAvatarPicker)} className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600/80 to-red-900/80 border border-white/20 flex items-center justify-center text-2xl hover:scale-105 transition-transform">
              {AVATARS[user?.avatarIndex ?? 0]}
            </button>
            <div>
              <p className="text-white text-sm font-medium">Hello {profileData.full_name?.split(" ")[0] || user?.name?.split(" ")[0] || "User"}</p>
            </div>
          </div>

          {showAvatarPicker && (
            <div className="mb-6 p-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-white/50 text-xs mb-3">Choose Avatar</p>
              <div className="grid grid-cols-6 gap-2">
                {AVATARS.map((av, i) => (
                  <button key={i} onClick={() => { setAvatar(i); setShowAvatarPicker(false); }} className={`w-8 h-8 rounded-full flex items-center justify-center text-lg hover:scale-110 transition-transform ${user?.avatarIndex === i ? "bg-red-600/40 ring-2 ring-red-500" : "bg-white/5"}`}>
                    {av}
                  </button>
                ))}
              </div>
            </div>
          )}

          {sidebarItems.map((group) => (
            <div key={group.group} className="mb-6">
              <div className="flex items-center gap-2 text-white/80 text-xs font-semibold tracking-wider mb-3">
                <group.icon className="w-4 h-4" />
                {group.group}
              </div>
              {group.items.map((item) => (
                <button key={item.id} onClick={() => setActiveSection(item.id)} className={`block w-full text-left pl-6 py-2 text-sm transition-colors rounded-r-lg ${activeSection === item.id ? "text-red-500 border-l-2 border-red-500 bg-gradient-to-r from-red-500/10 to-transparent" : "text-white/40 hover:text-white/60 border-l-2 border-transparent"}`}>
                  {item.label}
                </button>
              ))}
            </div>
          ))}

          <button onClick={() => setActiveSection("notifications")} className={`flex items-center gap-2 w-full py-3 text-sm ${activeSection === "notifications" ? "text-red-500" : "text-white/60 hover:text-white/80"}`}>
            <Bell className="w-4 h-4" /> NOTIFICATION
          </button>
          <button onClick={() => setActiveSection("orders")} className={`flex items-center gap-2 w-full py-3 text-sm ${activeSection === "orders" ? "text-red-500" : "text-white/60 hover:text-white/80"}`}>
            <Package className="w-4 h-4" /> MY ORDERS
          </button>
          <button onClick={() => navigate("/cart")} className="flex items-center gap-2 w-full py-3 text-sm text-white/60 hover:text-white/80">
            <ShoppingCart className="w-4 h-4" /> CART
          </button>

          <button onClick={handleLogout} className="mt-6 w-full py-3 rounded-lg border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-colors">
            Sign Out
          </button>
        </aside>

        <main className="flex-1 px-8 md:px-12 py-2">
          {renderContent()}
        </main>
      </div>

      <FooterSection />
    </div>
  );
};

export default Account;
