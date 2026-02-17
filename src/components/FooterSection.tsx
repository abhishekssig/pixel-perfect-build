import { ArrowRight } from "lucide-react";

const socials = [
  { name: "Facebook", href: "#" },
  { name: "Twitter", href: "#" },
  { name: "Instagram", href: "#" },
  { name: "Gmail", href: "#" },
];

const footerLinks = [
  {
    title: "ABOUT US",
    links: ["Pricing", "Contact", "FAQ", "Blog"],
  },
  {
    title: "SUPPORT",
    links: ["Help Center", "Terms", "Privacy", "Security"],
  },
  {
    title: "COMUNITY",
    links: ["Forum", "Event", "Partners", "Affiliates", "Career"],
  },
  {
    title: "PRESS",
    links: ["Investors", "Terms Of Use", "Privacy Policy", "Cookie Policy", "Legal"],
  },
];

const FooterSection = () => {
  return (
    <footer className="relative z-30 -mt-[100vh] pt-[50vh] bg-transparent">
      <div className="rounded-t-3xl bg-white/5 backdrop-blur-xl border-t border-white/10 overflow-hidden">
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-6 md:px-12 py-12 border-t border-white/10">
        {footerLinks.map((col) => (
          <div key={col.title} className="flex flex-col gap-3">
            <p className="text-white/30 text-xs font-medium tracking-wider uppercase mb-1">
              {col.title}
            </p>
            {col.links.map((link) => (
              <a
                key={link}
                href="#"
                className="text-white/70 text-sm hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        ))}
      </div>
      </div>
    </footer>
  );
};

export default FooterSection;
