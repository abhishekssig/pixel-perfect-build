import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2, Image, FileText, Video, Star } from "lucide-react";

type ContentItem = {
  id: string;
  section: string;
  content_key: string;
  content_value: string | null;
  content_type: string;
  sort_order: number;
  is_active: boolean;
};

type Testimonial = {
  id: string;
  author_name: string;
  author_title: string | null;
  author_avatar: string | null;
  content: string;
  rating: number;
  sort_order: number;
  is_active: boolean;
};

const sections = ["hero", "showcase", "mouse", "keyboard", "gyro", "footer", "general"];
const contentTypes = ["text", "image", "video", "url"];

const emptyContent = { section: "hero", content_key: "", content_value: "", content_type: "text", sort_order: 0, is_active: true };
const emptyTestimonial = { author_name: "", author_title: "", author_avatar: "", content: "", rating: 5, sort_order: 0, is_active: true };

const AdminCMS = () => {
  const [tab, setTab] = useState<"content" | "testimonials">("content");
  const [items, setItems] = useState<ContentItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<ContentItem | Testimonial | null>(null);
  const [contentForm, setContentForm] = useState(emptyContent);
  const [testimonialForm, setTestimonialForm] = useState(emptyTestimonial);

  const fetchContent = async () => {
    const { data } = await supabase.from("site_content").select("*").order("section").order("sort_order");
    setItems((data as ContentItem[]) || []);
  };

  const fetchTestimonials = async () => {
    const { data } = await supabase.from("testimonials").select("*").order("sort_order");
    setTestimonials((data as Testimonial[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchContent(); fetchTestimonials(); }, []);

  // Content CRUD
  const handleSaveContent = async () => {
    const payload = {
      section: contentForm.section,
      content_key: contentForm.content_key,
      content_value: contentForm.content_value,
      content_type: contentForm.content_type,
      sort_order: contentForm.sort_order,
      is_active: contentForm.is_active,
    };
    if (editing && "content_key" in editing) {
      await supabase.from("site_content").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("site_content").insert(payload);
    }
    setShowForm(false); setEditing(null); setContentForm(emptyContent);
    fetchContent();
  };

  const handleEditContent = (item: ContentItem) => {
    setEditing(item);
    setContentForm({
      section: item.section, content_key: item.content_key,
      content_value: item.content_value || "", content_type: item.content_type,
      sort_order: item.sort_order, is_active: item.is_active,
    });
    setShowForm(true);
  };

  const handleDeleteContent = async (id: string) => {
    await supabase.from("site_content").delete().eq("id", id);
    fetchContent();
  };

  // Testimonial CRUD
  const handleSaveTestimonial = async () => {
    const payload = {
      author_name: testimonialForm.author_name,
      author_title: testimonialForm.author_title,
      author_avatar: testimonialForm.author_avatar,
      content: testimonialForm.content,
      rating: testimonialForm.rating,
      sort_order: testimonialForm.sort_order,
      is_active: testimonialForm.is_active,
    };
    if (editing && "author_name" in editing) {
      await supabase.from("testimonials").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("testimonials").insert(payload);
    }
    setShowForm(false); setEditing(null); setTestimonialForm(emptyTestimonial);
    fetchTestimonials();
  };

  const handleEditTestimonial = (t: Testimonial) => {
    setEditing(t);
    setTestimonialForm({
      author_name: t.author_name, author_title: t.author_title || "",
      author_avatar: t.author_avatar || "", content: t.content,
      rating: t.rating, sort_order: t.sort_order, is_active: t.is_active,
    });
    setShowForm(true);
  };

  const handleDeleteTestimonial = async (id: string) => {
    await supabase.from("testimonials").delete().eq("id", id);
    fetchTestimonials();
  };

  const typeIcon = (t: string) => {
    switch (t) {
      case "image": return <Image className="w-3.5 h-3.5" />;
      case "video": return <Video className="w-3.5 h-3.5" />;
      default: return <FileText className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Content Management</h1>
        <button
          onClick={() => {
            setEditing(null);
            if (tab === "content") setContentForm(emptyContent);
            else setTestimonialForm(emptyTestimonial);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" /> Add {tab === "content" ? "Content" : "Testimonial"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-neutral-900 rounded-lg p-1 w-fit">
        {(["content", "testimonials"] as const).map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setShowForm(false); }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
              tab === t ? "bg-red-600 text-white" : "text-white/60 hover:text-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content Form Modal */}
      {showForm && tab === "content" && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-white/10 rounded-xl p-6 w-full max-w-lg space-y-4">
            <h2 className="text-lg font-semibold">{editing ? "Edit Content" : "Add Content"}</h2>
            <div className="grid grid-cols-2 gap-3">
              <select value={contentForm.section} onChange={(e) => setContentForm({ ...contentForm, section: e.target.value })} className="bg-neutral-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none">
                {sections.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <select value={contentForm.content_type} onChange={(e) => setContentForm({ ...contentForm, content_type: e.target.value })} className="bg-neutral-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none">
                {contentTypes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <input placeholder="Key (e.g. hero_title)" value={contentForm.content_key} onChange={(e) => setContentForm({ ...contentForm, content_key: e.target.value })} className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none" />
            <textarea placeholder="Value / URL" value={contentForm.content_value} onChange={(e) => setContentForm({ ...contentForm, content_value: e.target.value })} className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none h-24 resize-none" />
            <div className="grid grid-cols-2 gap-3">
              <input type="number" placeholder="Sort Order" value={contentForm.sort_order} onChange={(e) => setContentForm({ ...contentForm, sort_order: Number(e.target.value) })} className="bg-neutral-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none" />
              <label className="flex items-center gap-2 text-sm text-white/60 px-4">
                <input type="checkbox" checked={contentForm.is_active} onChange={(e) => setContentForm({ ...contentForm, is_active: e.target.checked })} className="rounded" />
                Active
              </label>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={handleSaveContent} className="flex-1 bg-red-600 hover:bg-red-700 rounded-lg py-2.5 text-sm font-medium transition-colors">Save</button>
              <button onClick={() => { setShowForm(false); setEditing(null); }} className="flex-1 bg-neutral-800 hover:bg-neutral-700 rounded-lg py-2.5 text-sm transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Testimonial Form Modal */}
      {showForm && tab === "testimonials" && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-white/10 rounded-xl p-6 w-full max-w-lg space-y-4">
            <h2 className="text-lg font-semibold">{editing ? "Edit Testimonial" : "Add Testimonial"}</h2>
            <input placeholder="Author Name" value={testimonialForm.author_name} onChange={(e) => setTestimonialForm({ ...testimonialForm, author_name: e.target.value })} className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none" />
            <input placeholder="Title / Role (e.g. CEO at Company)" value={testimonialForm.author_title} onChange={(e) => setTestimonialForm({ ...testimonialForm, author_title: e.target.value })} className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none" />
            <input placeholder="Avatar URL" value={testimonialForm.author_avatar} onChange={(e) => setTestimonialForm({ ...testimonialForm, author_avatar: e.target.value })} className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none" />
            <textarea placeholder="Testimonial content" value={testimonialForm.content} onChange={(e) => setTestimonialForm({ ...testimonialForm, content: e.target.value })} className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none h-24 resize-none" />
            <div className="grid grid-cols-3 gap-3">
              <input type="number" min={1} max={5} placeholder="Rating" value={testimonialForm.rating} onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: Number(e.target.value) })} className="bg-neutral-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none" />
              <input type="number" placeholder="Sort Order" value={testimonialForm.sort_order} onChange={(e) => setTestimonialForm({ ...testimonialForm, sort_order: Number(e.target.value) })} className="bg-neutral-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none" />
              <label className="flex items-center gap-2 text-sm text-white/60 px-2">
                <input type="checkbox" checked={testimonialForm.is_active} onChange={(e) => setTestimonialForm({ ...testimonialForm, is_active: e.target.checked })} className="rounded" />
                Active
              </label>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={handleSaveTestimonial} className="flex-1 bg-red-600 hover:bg-red-700 rounded-lg py-2.5 text-sm font-medium transition-colors">Save</button>
              <button onClick={() => { setShowForm(false); setEditing(null); }} className="flex-1 bg-neutral-800 hover:bg-neutral-700 rounded-lg py-2.5 text-sm transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Content Table */}
      {tab === "content" && (
        loading ? <p className="text-white/40">Loading...</p> : items.length === 0 ? (
          <p className="text-white/40">No content items yet. Add hero text, images, videos, etc.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-wider">
                  <th className="text-left py-3 px-4">Section</th>
                  <th className="text-left py-3 px-4">Key</th>
                  <th className="text-left py-3 px-4">Value</th>
                  <th className="text-left py-3 px-4">Type</th>
                  <th className="text-left py-3 px-4">Active</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded bg-white/10 text-xs font-medium">{item.section}</span>
                    </td>
                    <td className="py-3 px-4 font-medium">{item.content_key}</td>
                    <td className="py-3 px-4 text-white/60 max-w-[200px] truncate">{item.content_value || "—"}</td>
                    <td className="py-3 px-4">
                      <span className="flex items-center gap-1.5 text-white/60">{typeIcon(item.content_type)} {item.content_type}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`w-2 h-2 rounded-full inline-block ${item.is_active ? "bg-green-400" : "bg-red-400"}`} />
                    </td>
                    <td className="py-3 px-4 flex gap-2">
                      <button onClick={() => handleEditContent(item)} className="p-1.5 rounded-md hover:bg-white/10 text-white/60 hover:text-white transition-colors"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => handleDeleteContent(item.id)} className="p-1.5 rounded-md hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}

      {/* Testimonials Table */}
      {tab === "testimonials" && (
        loading ? <p className="text-white/40">Loading...</p> : testimonials.length === 0 ? (
          <p className="text-white/40">No testimonials yet. Add customer reviews above.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-wider">
                  <th className="text-left py-3 px-4">Author</th>
                  <th className="text-left py-3 px-4">Title</th>
                  <th className="text-left py-3 px-4">Content</th>
                  <th className="text-left py-3 px-4">Rating</th>
                  <th className="text-left py-3 px-4">Active</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map((t) => (
                  <tr key={t.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 font-medium flex items-center gap-2">
                      {t.author_avatar && <img src={t.author_avatar} alt="" className="w-6 h-6 rounded-full" />}
                      {t.author_name}
                    </td>
                    <td className="py-3 px-4 text-white/60">{t.author_title || "—"}</td>
                    <td className="py-3 px-4 text-white/60 max-w-[250px] truncate">{t.content}</td>
                    <td className="py-3 px-4">
                      <span className="flex items-center gap-1 text-yellow-400">
                        <Star className="w-3.5 h-3.5 fill-current" /> {t.rating}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`w-2 h-2 rounded-full inline-block ${t.is_active ? "bg-green-400" : "bg-red-400"}`} />
                    </td>
                    <td className="py-3 px-4 flex gap-2">
                      <button onClick={() => handleEditTestimonial(t)} className="p-1.5 rounded-md hover:bg-white/10 text-white/60 hover:text-white transition-colors"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => handleDeleteTestimonial(t.id)} className="p-1.5 rounded-md hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
};

export default AdminCMS;
