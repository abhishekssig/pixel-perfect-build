import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Ticket {
  id: string;
  user_id: string;
  subject: string;
  message: string;
  status: string;
  priority: string | null;
  admin_response: string | null;
  created_at: string;
}

const AdminSupport = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [responding, setResponding] = useState<string | null>(null);
  const [response, setResponse] = useState("");

  const fetchTickets = async () => {
    const { data } = await supabase.from("support_tickets").select("*").order("created_at", { ascending: false });
    setTickets((data as Ticket[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchTickets(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("support_tickets").update({ status }).eq("id", id);
    fetchTickets();
  };

  const submitResponse = async (id: string) => {
    await supabase.from("support_tickets").update({ admin_response: response, status: "resolved" }).eq("id", id);
    setResponding(null);
    setResponse("");
    fetchTickets();
  };

  const statusColors: Record<string, string> = {
    open: "bg-yellow-500/20 text-yellow-400",
    "in-progress": "bg-blue-500/20 text-blue-400",
    resolved: "bg-green-500/20 text-green-400",
    closed: "bg-white/10 text-white/40",
  };

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-semibold mb-6">Support Tickets</h1>
      {loading ? (
        <p className="text-white/40">Loading...</p>
      ) : tickets.length === 0 ? (
        <p className="text-white/40">No support tickets.</p>
      ) : (
        <div className="space-y-3">
          {tickets.map((t) => (
            <div key={t.id} className="bg-neutral-900 border border-white/10 rounded-xl p-5">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="text-white font-medium">{t.subject}</h3>
                  <p className="text-white/40 text-xs mt-0.5">
                    {new Date(t.created_at).toLocaleDateString()} · User: {t.user_id.slice(0, 8)}...
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${statusColors[t.status] || "bg-white/10 text-white/40"}`}>
                    {t.status}
                  </span>
                  <select
                    value={t.status}
                    onChange={(e) => updateStatus(t.id, e.target.value)}
                    className="bg-neutral-800 border border-white/10 rounded-md text-xs px-2 py-1 text-white outline-none"
                  >
                    {["open", "in-progress", "resolved", "closed"].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              <p className="text-white/60 text-sm">{t.message}</p>
              {t.admin_response && (
                <div className="mt-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-green-400 text-xs font-medium mb-1">Admin Response</p>
                  <p className="text-white/70 text-sm">{t.admin_response}</p>
                </div>
              )}
              {responding === t.id ? (
                <div className="mt-3 space-y-2">
                  <textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="Type your response..."
                    className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none h-20 resize-none"
                  />
                  <div className="flex gap-2">
                    <button onClick={() => submitResponse(t.id)} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-xs font-medium transition-colors">Send</button>
                    <button onClick={() => setResponding(null)} className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-xs transition-colors">Cancel</button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => { setResponding(t.id); setResponse(t.admin_response || ""); }}
                  className="mt-3 text-red-400 text-xs hover:text-red-300 transition-colors"
                >
                  {t.admin_response ? "Edit Response" : "Respond"}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminSupport;
