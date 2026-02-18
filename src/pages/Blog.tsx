import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import MenuButton from "@/components/MenuButton";
import CartButton from "@/components/CartButton";
import AccountButton from "@/components/AccountButton";
import ShopNowButton from "@/components/ShopNowButton";
import FooterSection from "@/components/FooterSection";
import logo from "@/assets/Frame_5.png";

// Fallback image map for local assets
import mouseImg from "@/assets/mouse-hero.png";
import keyboardImg from "@/assets/keyboard-dark.png";
import controllerImg from "@/assets/controller-black.png";
import headphonesImg from "@/assets/headphones.png";
import speakerImg from "@/assets/speaker.png";

const localImageMap: Record<string, string> = {
  "/assets/mouse-hero.png": mouseImg,
  "/assets/keyboard-dark.png": keyboardImg,
  "/assets/controller-black.png": controllerImg,
  "/assets/headphones.png": headphonesImg,
  "/assets/speaker.png": speakerImg,
};

type Category = "All" | "News" | "Press Release" | "Tech" | "Gaming" | "Reviews";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  category: string;
  author: string | null;
  cover_image: string | null;
  published_at: string | null;
  created_at: string;
}

const categories: Category[] = ["All", "News", "Press Release", "Tech", "Gaming", "Reviews"];

const resolveImage = (url: string | null) => {
  if (!url) return mouseImg;
  return localImageMap[url] || url;
};

const Blog = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data } = await supabase
        .from("blogs")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false });
      if (data) setPosts(data);
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  const filtered = posts.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.excerpt || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featured = activeCategory === "All" && !searchQuery ? filtered[0] : null;
  const rest = featured ? filtered.slice(1) : filtered;

  const formatDate = (date: string | null) => {
    if (!date) return "";
    try { return format(new Date(date), "MMM d, yyyy"); } catch { return date; }
  };

  const getCategoryStyle = (cat: string) => {
    switch (cat) {
      case "Press Release": return "bg-red-600/20 text-red-400";
      case "News": return "bg-blue-600/20 text-blue-400";
      case "Tech": return "bg-purple-600/20 text-purple-400";
      case "Gaming": return "bg-green-600/20 text-green-400";
      case "Reviews": return "bg-amber-600/20 text-amber-400";
      default: return "bg-white/10 text-white/60";
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4">
        <img
          src={logo}
          alt="Rebel Head"
          className="h-10 w-auto cursor-pointer"
          onClick={() => navigate("/")}
          style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.4)) drop-shadow(0 0 20px rgba(255,255,255,0.15))" }}
        />
        <MenuButton />
        <div className="flex items-center gap-3">
          <ShopNowButton />
          <CartButton />
          <AccountButton />
        </div>
      </header>

      <main>
        {loading ? (
          <div className="pt-32 text-center text-white/40">Loading articles...</div>
        ) : (
          <>
            {/* Hero / Featured Post */}
            {featured && (
              <section className="pt-24 px-6 md:px-10 mb-12">
                <article className="relative rounded-2xl overflow-hidden cursor-pointer group">
                  <div className="aspect-[21/9] md:aspect-[3/1]">
                    <img
                      src={resolveImage(featured.cover_image)}
                      alt={featured.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="eager"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                    <span className="inline-block px-3 py-1 rounded-full bg-red-600/80 text-white text-[10px] font-semibold uppercase tracking-widest mb-3">
                      {featured.category}
                    </span>
                    <h1 className="text-xl md:text-3xl lg:text-4xl font-semibold leading-tight max-w-3xl mb-3">
                      {featured.title}
                    </h1>
                    <p className="text-white/60 text-sm md:text-base max-w-2xl leading-relaxed mb-4 line-clamp-2">
                      {featured.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-white/40 text-xs">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {formatDate(featured.published_at || featured.created_at)}</span>
                    </div>
                  </div>
                </article>
              </section>
            )}

            {/* Title + Search + Categories */}
            <section className={`px-6 md:px-10 ${featured ? "" : "pt-24"}`}>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div>
                  <h2 className="text-2xl md:text-4xl font-light leading-tight font-jp">
                    <span className="font-semibold">Blog.</span>{" "}
                    <span className="text-white/40 italic">News, Insights & Press Releases</span>
                  </h2>
                </div>
                <div className="relative shrink-0">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 bg-white/5 border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-sm text-white outline-none focus:border-white/30 transition-colors"
                    aria-label="Search blog articles"
                  />
                </div>
              </div>

              <nav className="flex items-center gap-1 border-b border-white/10 mb-10 overflow-x-auto" aria-label="Blog categories">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-3 text-sm whitespace-nowrap transition-colors relative ${
                      activeCategory === cat ? "text-white font-medium" : "text-white/40 hover:text-white/60"
                    }`}
                  >
                    {cat}
                    {activeCategory === cat && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-500 rounded-full" />
                    )}
                  </button>
                ))}
              </nav>
            </section>

            {/* Posts Grid */}
            <section className="px-6 md:px-10 pb-16">
              {rest.length === 0 ? (
                <p className="text-white/30 text-center py-20">No articles found.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {rest.map((post) => (
                    <article key={post.id} className="group cursor-pointer">
                      <div className="aspect-[16/10] rounded-xl overflow-hidden bg-neutral-900 border border-white/5 mb-4">
                        <img
                          src={resolveImage(post.cover_image)}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded-full ${getCategoryStyle(post.category)}`}>
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-white text-sm md:text-base font-medium leading-snug mb-2 group-hover:text-white/80 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-white/40 text-xs leading-relaxed line-clamp-2 mb-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-white/30 text-xs flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {formatDate(post.published_at || post.created_at)}
                        </span>
                        <span className="text-red-500 text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          Read More <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>

            {/* Press CTA */}
            <section className="px-6 md:px-10 pb-16">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-white text-xl md:text-2xl font-semibold mb-2">Press & Media Inquiries</h2>
                  <p className="text-white/40 text-sm max-w-lg leading-relaxed">
                    For press kits, media assets, partnership opportunities, or interview requests, reach out to our communications team.
                  </p>
                </div>
                <button
                  onClick={() => navigate("/support")}
                  className="shrink-0 px-8 py-3 rounded-full border border-white/20 text-white text-sm font-medium tracking-wide hover:bg-white/10 transition-colors flex items-center gap-2"
                >
                  Contact Press Team <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </section>
          </>
        )}
      </main>

      <FooterSection />

      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Rebel Head Blog",
            description: "Latest news, press releases, tech insights, and gaming tips from Rebel Head.",
            url: "https://rebelhead.com/blog",
            publisher: {
              "@type": "Organization",
              name: "Rebel Head",
              logo: { "@type": "ImageObject", url: "https://rebelhead.com/favicon.ico" },
            },
            blogPost: posts.map((p) => ({
              "@type": "BlogPosting",
              headline: p.title,
              description: p.excerpt,
              datePublished: p.published_at || p.created_at,
              articleSection: p.category,
            })),
          }),
        }}
      />
    </div>
  );
};

export default Blog;
