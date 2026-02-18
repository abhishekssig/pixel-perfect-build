import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FooterSectionProps {
  overlap?: boolean;
}

const socials = [
  { name: "Facebook", href: "#" },
  { name: "Twitter", href: "#" },
  { name: "Instagram", href: "#" },
  { name: "Gmail", href: "#" },
];

const footerLinks = [
  {
    title: "ABOUT US",
    links: [
      { label: "Pricing", path: "/store" },
      { label: "Contact", path: "/support" },
      { label: "FAQ", path: "/support" },
      { label: "Blog", path: "/blog" },
    ],
  },
  {
    title: "SUPPORT",
    links: [
      { label: "Help Center", path: "/support" },
      { label: "Terms", path: "#" },
      { label: "Privacy", path: "#" },
      { label: "Security", path: "#" },
    ],
  },
  {
    title: "COMUNITY",
    links: [
      { label: "Forum", path: "#" },
      { label: "Event", path: "#" },
      { label: "Partners", path: "#" },
      { label: "Affiliates", path: "#" },
      { label: "Career", path: "#" },
    ],
  },
  {
    title: "PRESS",
    links: [
      { label: "Press Releases", path: "/blog" },
      { label: "Terms Of Use", path: "#" },
      { label: "Privacy Policy", path: "#" },
      { label: "Cookie Policy", path: "#" },
      { label: "Legal", path: "#" },
    ],
  },
];

const FooterSection = ({ overlap = false }: FooterSectionProps) => {
  const navigate = useNavigate();
  return (
    <footer className={`relative z-30 ${overlap ? '-mt-[50vh]' : ''}`}>
      {/* Gradient fade from transparent to black */}
      <div className={`h-40 bg-gradient-to-b ${overlap ? 'from-transparent' : 'from-black'} to-black pointer-events-none`} />

      {/* Solid black content area */}
      <div className="bg-black">
      {/* Social links bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-t border-white/10">
        {socials.map((s) => (
          <a
            key={s.name}
            href={s.href}
            className="flex items-center justify-between px-6 py-5 border-r border-white/10 last:border-r-0 text-white text-sm font-medium hover:bg-white/5 transition-colors"
          >
            {s.name}
            <ArrowRight className="w-4 h-4 text-white/60" />
          </a>
        ))}
      </div>

      {/* Footer links grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-6 md:px-12 py-16 pb-24 border-t border-white/10">
        {footerLinks.map((col) => (
          <div key={col.title} className="flex flex-col gap-4">
            <p className="text-white/30 text-xs font-medium tracking-wider uppercase mb-2">
              {col.title}
            </p>
            {col.links.map((link) => (
              <button
                key={link.label}
                onClick={() => link.path !== "#" && navigate(link.path)}
                className="text-white/70 text-sm hover:text-white transition-colors text-left"
              >
                {link.label}
              </button>
            ))}
          </div>
        ))}
      </div>
      </div>
    </footer>
  );
};

export default FooterSection;
