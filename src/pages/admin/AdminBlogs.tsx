import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  category: string;
  cover_image: string | null;
  author: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
}

const emptyBlog = { title: "", slug: "", excerpt: "", content: "", category: "News", cover_image: "", author: "Rebel Head", is_published: false };

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Blog | null>(null);
  const [form, setForm] = useState(emptyBlog);
  const [showForm, setShowForm] = useState(false);

  const fetchBlogs = async () => {
    const { data } = await supabase.from("blogs").select("*").order("created_at", { ascending: false });
    setBlogs((data as Blog[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchBlogs(); }, []);

  const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleSave = async () => {
    const payload = {
      ...form,
      slug: form.slug || generateSlug(form.title),
      published_at: form.is_published ? new Date().toISOString() : null,
    };
    if (editing) {
      await supabase.from("blogs").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("blogs").insert(payload);
    }
    setShowForm(false);
    setEditing(null);
    setForm(emptyBlog);
    fetchBlogs();
  };

  const handleEdit = (b: Blog) => {
    setEditing(b);
    setForm({ title: b.title, slug: b.slug, excerpt: b.excerpt || "", content: b.content || "", category: b.category, cover_image: b.cover_image || "", author: b.author || "Rebel Head", is_published: b.is_published });
    setShowForm(true);
  };

  const togglePublish = async (b: Blog) => {
    await supabase.from("blogs").update({ is_published: !b.is_published, published_at: !b.is_published ? new Date().toISOString() : null }).eq("id", b.id);
    fetchBlogs();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("blogs").delete().eq("id", id);
    fetchBlogs();
  };

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Blog Posts</h1>
        <button onClick={() => { setEditing(null); setForm(emptyBlog); setShowForm(true); }} className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-white/10 rounded-xl p-6 w-full max-w-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold">{editing ? "Edit Post" : "New Post"}</h2>
            <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: generateSlug(e.target.value) })} className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none" />
            <input placeholder="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white/60 outline-none" />
            <div className="grid grid-cols-2 gap-3">
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="bg-neutral-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none">
                {["News", "Press Release", "Tech", "Gaming", "Reviews"].map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <input placeholder="Author" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="bg-neutral-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none" />
            </div>
            <input placeholder="Cover Image URL" value={form.cover_image} onChange={(e) => setForm({ ...form, cover_image: e.target.value })} className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none" />
            <textarea placeholder="Excerpt (short summary)" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none h-16 resize-none" />
            <textarea placeholder="Content (full article)" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none h-40 resize-y" />
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
      ) : blogs.length === 0 ? (
        <p className="text-white/40">No blog posts yet.</p>
      ) : (
        <div className="space-y-3">
          {blogs.map((b) => (
            <div key={b.id} className="bg-neutral-900 border border-white/10 rounded-xl p-5 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-white font-medium truncate">{b.title}</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/10 text-white/50 shrink-0">{b.category}</span>
                  {b.is_published ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-green-500/20 text-green-400 shrink-0">Published</span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-yellow-500/20 text-yellow-400 shrink-0">Draft</span>
                  )}
                </div>
                <p className="text-white/40 text-xs truncate">{b.excerpt || "No excerpt"}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => togglePublish(b)} className="p-1.5 rounded-md hover:bg-white/10 text-white/60 hover:text-white transition-colors" title={b.is_published ? "Unpublish" : "Publish"}>
                  {b.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button onClick={() => handleEdit(b)} className="p-1.5 rounded-md hover:bg-white/10 text-white/60 hover:text-white transition-colors">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(b.id)} className="p-1.5 rounded-md hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-colors">
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

export default AdminBlogs;
