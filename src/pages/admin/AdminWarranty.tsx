import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Claim {
  id: string;
  user_id: string;
  product_name: string;
  order_reference: string | null;
  reason: string;
  status: string;
  admin_notes: string | null;
  created_at: string;
}

const AdminWarranty = () => {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchClaims = async () => {
    const { data } = await supabase.from("warranty_claims").select("*").order("created_at", { ascending: false });
    setClaims((data as Claim[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchClaims(); }, []);

  const updateClaim = async (id: string, updates: Partial<Claim>) => {
    await supabase.from("warranty_claims").update(updates).eq("id", id);
    fetchClaims();
  };

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-500/20 text-yellow-400",
    approved: "bg-green-500/20 text-green-400",
    rejected: "bg-red-500/20 text-red-400",
    processing: "bg-blue-500/20 text-blue-400",
  };

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-semibold mb-6">Warranty Claims</h1>
      {loading ? (
        <p className="text-white/40">Loading...</p>
      ) : claims.length === 0 ? (
        <p className="text-white/40">No warranty claims.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-wider">
                <th className="text-left py-3 px-4">Product</th>
                <th className="text-left py-3 px-4">Order Ref</th>
                <th className="text-left py-3 px-4">Reason</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-left py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((c) => (
                <tr key={c.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 font-medium">{c.product_name}</td>
                  <td className="py-3 px-4 text-white/60 font-mono text-xs">{c.order_reference || "—"}</td>
                  <td className="py-3 px-4 text-white/60 max-w-[200px] truncate">{c.reason}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${statusColors[c.status] || "bg-white/10 text-white/40"}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-white/60">{new Date(c.created_at).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    <select
                      value={c.status}
                      onChange={(e) => updateClaim(c.id, { status: e.target.value })}
                      className="bg-neutral-800 border border-white/10 rounded-md text-xs px-2 py-1 text-white outline-none"
                    >
                      {["pending", "processing", "approved", "rejected"].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
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

export default AdminWarranty;
