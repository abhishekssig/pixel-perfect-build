import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2, Tag } from "lucide-react";

interface Coupon {
  id: string;
  code: string;
  discount_type: string;
  discount_value: number;
  min_order_amount: number | null;
  max_uses: number | null;
  used_count: number;
  is_active: boolean;
  expires_at: string | null;
  created_at: string;
}

const emptyCoupon = { code: "", discount_type: "percentage", discount_value: 0, min_order_amount: 0, max_uses: null as number | null, is_active: true, expires_at: "" };

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Coupon | null>(null);
  const [form, setForm] = useState(emptyCoupon);
  const [showForm, setShowForm] = useState(false);

  const fetchCoupons = async () => {
    const { data } = await supabase.from("coupons").select("*").order("created_at", { ascending: false });
    setCoupons((data as Coupon[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchCoupons(); }, []);

  const handleSave = async () => {
    const payload = {
      code: form.code.toUpperCase().trim(),
      discount_type: form.discount_type,
      discount_value: form.discount_value,
      min_order_amount: form.min_order_amount || 0,
      max_uses: form.max_uses || null,
      is_active: form.is_active,
      expires_at: form.expires_at || null,
    };
    if (editing) {
      await supabase.from("coupons").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("coupons").insert(payload);
    }
    setShowForm(false);
    setEditing(null);
    setForm(emptyCoupon);
    fetchCoupons();
  };

  const handleEdit = (c: Coupon) => {
    setEditing(c);
    setForm({
      code: c.code, discount_type: c.discount_type, discount_value: c.discount_value,
      min_order_amount: c.min_order_amount || 0, max_uses: c.max_uses,
      is_active: c.is_active, expires_at: c.expires_at ? new Date(c.expires_at).toISOString().slice(0, 16) : "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    await supabase.from("coupons").delete().eq("id", id);
    fetchCoupons();
  };

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Coupons</h1>
        <button onClick={() => { setEditing(null); setForm(emptyCoupon); setShowForm(true); }} className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" /> New Coupon
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-white/10 rounded-xl p-6 w-full max-w-lg space-y-4">
            <h2 className="text-lg font-semibold">{editing ? "Edit Coupon" : "New Coupon"}</h2>
            <input placeholder="Coupon Code (e.g. REBEL20)" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none uppercase tracking-wider" />
            <div className="grid grid-cols-2 gap-3">
              <select value={form.discount_type} onChange={(e) => setForm({ ...form, discount_type: e.target.value })} className="bg-neutral-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none">
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (₹)</option>
              </select>
              <input type="number" placeholder="Discount Value" value={form.discount_value} onChange={(e) => setForm({ ...form, discount_value: Number(e.target.value) })} className="bg-neutral-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input type="number" placeholder="Min Order Amount" value={form.min_order_amount || ""} onChange={(e) => setForm({ ...form, min_order_amount: Number(e.target.value) })} className="bg-neutral-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none" />
              <input type="number" placeholder="Max Uses (blank = unlimited)" value={form.max_uses ?? ""} onChange={(e) => setForm({ ...form, max_uses: e.target.value ? Number(e.target.value) : null })} className="bg-neutral-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none" />
            </div>
            <div>
              <label className="text-white/40 text-xs mb-1 block">Expires At (optional)</label>
              <input type="datetime-local" value={form.expires_at} onChange={(e) => setForm({ ...form, expires_at: e.target.value })} className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none" />
            </div>
            <label className="flex items-center gap-2 text-sm text-white/60">
              <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="rounded" />
              Active
            </label>
            <div className="flex gap-3 pt-2">
              <button onClick={handleSave} className="flex-1 bg-red-600 hover:bg-red-700 rounded-lg py-2.5 text-sm font-medium transition-colors">Save</button>
              <button onClick={() => { setShowForm(false); setEditing(null); }} className="flex-1 bg-neutral-800 hover:bg-neutral-700 rounded-lg py-2.5 text-sm transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-white/40">Loading...</p>
      ) : coupons.length === 0 ? (
        <p className="text-white/40">No coupons created yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-wider">
                <th className="text-left py-3 px-4">Code</th>
                <th className="text-left py-3 px-4">Discount</th>
                <th className="text-left py-3 px-4">Min Order</th>
                <th className="text-left py-3 px-4">Uses</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Expires</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 font-mono font-medium tracking-wider">{c.code}</td>
                  <td className="py-3 px-4">
                    {c.discount_type === "percentage" ? `${c.discount_value}%` : `₹${c.discount_value}`}
                  </td>
                  <td className="py-3 px-4 text-white/60">₹{c.min_order_amount || 0}</td>
                  <td className="py-3 px-4 text-white/60">{c.used_count}{c.max_uses ? `/${c.max_uses}` : ""}</td>
                  <td className="py-3 px-4">
                    <span className={`w-2 h-2 rounded-full inline-block ${c.is_active ? "bg-green-400" : "bg-red-400"}`} />
                  </td>
                  <td className="py-3 px-4 text-white/60 text-xs">{c.expires_at ? new Date(c.expires_at).toLocaleDateString() : "Never"}</td>
                  <td className="py-3 px-4 flex gap-2">
                    <button onClick={() => handleEdit(c)} className="p-1.5 rounded-md hover:bg-white/10 text-white/60 hover:text-white transition-colors">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(c.id)} className="p-1.5 rounded-md hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminCoupons;
