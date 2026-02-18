import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  event_date: string;
  end_date: string | null;
  cover_image: string | null;
  registration_url: string | null;
  is_published: boolean;
  created_at: string;
}

const emptyEvent = { title: "", description: "", location: "", event_date: "", end_date: "", cover_image: "", registration_url: "", is_published: false };

const AdminEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Event | null>(null);
  const [form, setForm] = useState(emptyEvent);
  const [showForm, setShowForm] = useState(false);

  const fetchEvents = async () => {
    const { data } = await supabase.from("events").select("*").order("event_date", { ascending: false });
    setEvents((data as Event[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleSave = async () => {
    const payload = {
      title: form.title,
      description: form.description || null,
      location: form.location || null,
      event_date: form.event_date,
      end_date: form.end_date || null,
      cover_image: form.cover_image || null,
      registration_url: form.registration_url || null,
      is_published: form.is_published,
    };
    if (editing) {
      await supabase.from("events").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("events").insert(payload);
    }
    setShowForm(false);
    setEditing(null);
    setForm(emptyEvent);
    fetchEvents();
  };

  const handleEdit = (e: Event) => {
    setEditing(e);
    setForm({
      title: e.title, description: e.description || "", location: e.location || "",
      event_date: e.event_date ? new Date(e.event_date).toISOString().slice(0, 16) : "",
      end_date: e.end_date ? new Date(e.end_date).toISOString().slice(0, 16) : "",
      cover_image: e.cover_image || "", registration_url: e.registration_url || "", is_published: e.is_published,
    });
    setShowForm(true);
  };

  const togglePublish = async (e: Event) => {
    await supabase.from("events").update({ is_published: !e.is_published }).eq("id", e.id);
    fetchEvents();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("events").delete().eq("id", id);
    fetchEvents();
  };

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Events</h1>
        <button onClick={() => { setEditing(null); setForm(emptyEvent); setShowForm(true); }} className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" /> New Event
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-white/10 rounded-xl p-6 w-full max-w-lg space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold">{editing ? "Edit Event" : "New Event"}</h2>
            <input placeholder="Event Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none" />
            <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none h-24 resize-none" />
            <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none" />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-white/40 text-xs mb-1 block">Start Date & Time</label>
                <input type="datetime-local" value={form.event_date} onChange={(e) => setForm({ ...form, event_date: e.target.value })} className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none" />
              </div>
              <div>
                <label className="text-white/40 text-xs mb-1 block">End Date & Time</label>
                <input type="datetime-local" value={form.end_date} onChange={(e) => setForm({ ...form, end_date: e.target.value })} className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none" />
              </div>
            </div>
            <input placeholder="Cover Image URL" value={form.cover_image} onChange={(e) => setForm({ ...form, cover_image: e.target.value })} className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none" />
            <input placeholder="Registration URL" value={form.registration_url} onChange={(e) => setForm({ ...form, registration_url: e.target.value })} className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none" />
            <label className="flex items-center gap-2 text-sm text-white/60">
              <input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} className="rounded" />
              Publish immediately
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
      ) : events.length === 0 ? (
        <p className="text-white/40">No events yet.</p>
      ) : (
        <div className="space-y-3">
          {events.map((e) => (
            <div key={e.id} className="bg-neutral-900 border border-white/10 rounded-xl p-5 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-white font-medium truncate">{e.title}</h3>
                  {e.is_published ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-green-500/20 text-green-400 shrink-0">Published</span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-yellow-500/20 text-yellow-400 shrink-0">Draft</span>
                  )}
                </div>
                <p className="text-white/40 text-xs">{e.location || "No location"} · {new Date(e.event_date).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => togglePublish(e)} className="p-1.5 rounded-md hover:bg-white/10 text-white/60 hover:text-white transition-colors">
                  {e.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button onClick={() => handleEdit(e)} className="p-1.5 rounded-md hover:bg-white/10 text-white/60 hover:text-white transition-colors">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(e.id)} className="p-1.5 rounded-md hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminEvents;
