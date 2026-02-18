import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import MenuButton from "@/components/MenuButton";
import CartButton from "@/components/CartButton";
import AccountButton from "@/components/AccountButton";
import ShopNowButton from "@/components/ShopNowButton";
import FooterSection from "@/components/FooterSection";
import logo from "@/assets/Frame_5.png";
import mouseImg from "@/assets/mouse-hero.png";
import keyboardImg from "@/assets/keyboard-dark.png";
import controllerImg from "@/assets/controller-black.png";
import headphonesImg from "@/assets/headphones.png";
import speakerImg from "@/assets/speaker.png";

type Category = "All" | "News" | "Press Release" | "Tech" | "Gaming" | "Reviews";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: Category;
  date: string;
  readTime: string;
  img: string;
  featured?: boolean;
  tags: string[];
}

const posts: BlogPost[] = [
  {
    id: 1,
    title: "Rebel Head Launches Next-Gen Pro Click R3 — Redefining Precision Gaming",
    excerpt: "We're thrilled to announce the Pro Click R3, our most advanced gaming mouse yet. Featuring a groundbreaking XS-2 sensor, 8K polling rate, and our signature haptic feedback system, the R3 sets a new standard for competitive gaming peripherals.",
    category: "Press Release",
    date: "Feb 15, 2026",
    readTime: "4 min read",
    img: mouseImg,
    featured: true,
    tags: ["Product Launch", "Mouse", "Pro Click"],
  },
  {
    id: 2,
    title: "How Mechanical Switches Are Evolving in 2026",
    excerpt: "From optical to magnetic Hall Effect switches, the keyboard landscape is shifting fast. We break down what matters for gamers and creators alike, and where Rebel Head is pushing the envelope.",
    category: "Tech",
    date: "Feb 10, 2026",
    readTime: "6 min read",
    img: keyboardImg,
    tags: ["Keyboard", "Technology", "Switches"],
  },
  {
    id: 3,
    title: "Rebel Head Partners With ESL for 2026 Pro League Season",
    excerpt: "Rebel Head is now the official peripherals partner for ESL Pro League Season 23. Our gear will be featured across all tournament venues, with custom editions available for fans.",
    category: "Press Release",
    date: "Feb 5, 2026",
    readTime: "3 min read",
    img: controllerImg,
    tags: ["Esports", "Partnership", "ESL"],
  },
  {
    id: 4,
    title: "5 Reasons Haptic Feedback Changes Everything",
    excerpt: "Haptic feedback isn't just a buzzword — it's a competitive advantage. Here's how tactile response in your mouse and controller can shave milliseconds off your reaction time.",
    category: "Gaming",
    date: "Jan 28, 2026",
    readTime: "5 min read",
    img: mouseImg,
    tags: ["Haptic", "Gaming Tips", "Performance"],
  },
  {
    id: 5,
    title: "Rebel Head Audio X Review: Spatial Sound Done Right",
    excerpt: "Our latest over-ear headset delivers immersive spatial audio without the premium price tag. Independent reviewers are calling it the best gaming headset under ₹5,000.",
    category: "Reviews",
    date: "Jan 22, 2026",
    readTime: "7 min read",
    img: headphonesImg,
    tags: ["Headphones", "Review", "Audio"],
  },
  {
    id: 6,
    title: "Rebel Head Expands to Southeast Asian Markets",
    excerpt: "Starting March 2026, Rebel Head products will be available in Singapore, Malaysia, Thailand, and Indonesia through our new regional distribution partnership.",
    category: "Press Release",
    date: "Jan 18, 2026",
    readTime: "3 min read",
    img: speakerImg,
    tags: ["Expansion", "Business", "Global"],
  },
  {
    id: 7,
    title: "The Ultimate Desk Setup Guide for Competitive Gamers",
    excerpt: "From monitor placement to peripheral layout, we cover every detail of building a pro-level gaming station that maximizes comfort and performance during long sessions.",
    category: "Gaming",
    date: "Jan 12, 2026",
    readTime: "8 min read",
    img: keyboardImg,
    tags: ["Setup Guide", "Gaming", "Ergonomics"],
  },
  {
    id: 8,
    title: "Q4 2025 Earnings: Record Growth for Rebel Head",
    excerpt: "Rebel Head reported a 340% year-over-year revenue increase in Q4 2025, driven by strong demand for the Pro Click R2 and Rebel Keys Dark mechanical keyboard.",
    category: "News",
    date: "Jan 5, 2026",
    readTime: "4 min read",
    img: controllerImg,
    tags: ["Earnings", "Business", "Growth"],
  },
];

const categories: Category[] = ["All", "News", "Press Release", "Tech", "Gaming", "Reviews"];

const Blog = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = posts.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featured = posts.find((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured || activeCategory !== "All");

  return (
    <div className="min-h-screen bg-black text-white">
      {/* SEO meta handled by Helmet or index.html */}

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
        {/* Hero / Featured Post */}
        {activeCategory === "All" && featured && !searchQuery && (
          <section className="pt-24 px-6 md:px-10 mb-12">
            <article className="relative rounded-2xl overflow-hidden cursor-pointer group" onClick={() => {}}>
              <div className="aspect-[21/9] md:aspect-[3/1]">
                <img
                  src={featured.img}
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
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {featured.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {featured.readTime}</span>
                </div>
              </div>
            </article>
          </section>
        )}

        {/* Title + Search + Categories */}
        <section className={`px-6 md:px-10 ${activeCategory === "All" && featured && !searchQuery ? "" : "pt-24"}`}>
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

          {/* Category Tabs */}
          <nav className="flex items-center gap-1 border-b border-white/10 mb-10 overflow-x-auto" aria-label="Blog categories">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-3 text-sm whitespace-nowrap transition-colors relative ${
                  activeCategory === cat
                    ? "text-white font-medium"
                    : "text-white/40 hover:text-white/60"
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
                <article
                  key={post.id}
                  className="group cursor-pointer"
                  onClick={() => {}}
                >
                  <div className="aspect-[16/10] rounded-xl overflow-hidden bg-neutral-900 border border-white/5 mb-4">
                    <img
                      src={post.img}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded-full ${
                      post.category === "Press Release"
                        ? "bg-red-600/20 text-red-400"
                        : post.category === "News"
                        ? "bg-blue-600/20 text-blue-400"
                        : post.category === "Tech"
                        ? "bg-purple-600/20 text-purple-400"
                        : post.category === "Gaming"
                        ? "bg-green-600/20 text-green-400"
                        : "bg-amber-600/20 text-amber-400"
                    }`}>
                      {post.category}
                    </span>
                    <span className="text-white/30 text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.readTime}
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
                      <Calendar className="w-3 h-3" /> {post.date}
                    </span>
                    <span className="text-red-500 text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Read More <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                  {/* Tags for SEO */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-[10px] text-white/20 flex items-center gap-0.5">
                        <Tag className="w-2.5 h-2.5" /> {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Press Release CTA */}
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
              datePublished: p.date,
              articleSection: p.category,
              keywords: p.tags.join(", "),
            })),
          }),
        }}
      />
    </div>
  );
};

export default Blog;
