import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, Pencil } from "lucide-react";

interface Driver {
  id: string;
  name: string;
  version: string;
  description: string | null;
  file_url: string | null;
  file_size: string | null;
  category: string;
  release_date: string | null;
  created_at: string;
}

const emptyDriver = { name: "", version: "", description: "", file_url: "", file_size: "", category: "Mouse" };

const AdminDrivers = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Driver | null>(null);
  const [form, setForm] = useState(emptyDriver);
  const [showForm, setShowForm] = useState(false);

  const fetchDrivers = async () => {
    const { data } = await supabase.from("drivers").select("*").order("created_at", { ascending: false });
    setDrivers((data as Driver[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchDrivers(); }, []);

  const handleSave = async () => {
    if (editing) {
      await supabase.from("drivers").update(form).eq("id", editing.id);
    } else {
      await supabase.from("drivers").insert(form);
    }
    setShowForm(false);
    setEditing(null);
    setForm(emptyDriver);
    fetchDrivers();
  };

  const handleEdit = (d: Driver) => {
    setEditing(d);
    setForm({ name: d.name, version: d.version, description: d.description || "", file_url: d.file_url || "", file_size: d.file_size || "", category: d.category });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    await supabase.from("drivers").delete().eq("id", id);
    fetchDrivers();
  };

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Drivers & Downloads</h1>
        <button
          onClick={() => { setEditing(null); setForm(emptyDriver); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Driver
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-white/10 rounded-xl p-6 w-full max-w-lg space-y-4">
            <h2 className="text-lg font-semibold">{editing ? "Edit Driver" : "Add Driver"}</h2>
            <input placeholder="Driver Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none" />
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="Version (e.g. 3.2.1)" value={form.version} onChange={(e) => setForm({ ...form, version: e.target.value })} className="bg-neutral-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none" />
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="bg-neutral-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none">
                {["Mouse", "Gamepad", "Keyboard", "Headphone", "Webcam", "Accessories"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none h-20 resize-none" />
            <input placeholder="File URL" value={form.file_url} onChange={(e) => setForm({ ...form, file_url: e.target.value })} className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none" />
            <input placeholder="File Size (e.g. 24 MB)" value={form.file_size} onChange={(e) => setForm({ ...form, file_size: e.target.value })} className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none" />
            <div className="flex gap-3 pt-2">
              <button onClick={handleSave} className="flex-1 bg-red-600 hover:bg-red-700 rounded-lg py-2.5 text-sm font-medium transition-colors">Save</button>
              <button onClick={() => { setShowForm(false); setEditing(null); }} className="flex-1 bg-neutral-800 hover:bg-neutral-700 rounded-lg py-2.5 text-sm transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-white/40">Loading...</p>
      ) : drivers.length === 0 ? (
        <p className="text-white/40">No drivers uploaded yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-wider">
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Version</th>
                <th className="text-left py-3 px-4">Category</th>
                <th className="text-left py-3 px-4">Size</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((d) => (
                <tr key={d.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 font-medium">{d.name}</td>
                  <td className="py-3 px-4 text-white/60">v{d.version}</td>
                  <td className="py-3 px-4 text-white/60">{d.category}</td>
                  <td className="py-3 px-4 text-white/60">{d.file_size || "—"}</td>
                  <td className="py-3 px-4 flex gap-2">
                    <button onClick={() => handleEdit(d)} className="p-1.5 rounded-md hover:bg-white/10 text-white/60 hover:text-white transition-colors">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(d.id)} className="p-1.5 rounded-md hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-colors">
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

export default AdminDrivers;
