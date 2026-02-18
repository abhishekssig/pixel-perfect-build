import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MenuButton from "@/components/MenuButton";
import CartButton from "@/components/CartButton";
import AccountButton from "@/components/AccountButton";
import ShopNowButton from "@/components/ShopNowButton";
import FooterSection from "@/components/FooterSection";
import logo from "@/assets/Frame_5.png";

type Tab = "terms" | "privacy" | "cookies";

const tabs: { id: Tab; label: string }[] = [
  { id: "terms", label: "Terms of Use" },
  { id: "privacy", label: "Privacy Policy" },
  { id: "cookies", label: "Cookie Policy" },
];

const Terms = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState<Tab>("terms");

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4">
        <img src={logo} alt="Rebel Head" className="h-10 w-auto cursor-pointer" onClick={() => navigate("/")} style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.4))" }} />
        <MenuButton />
        <div className="flex items-center gap-3">
          <ShopNowButton />
          <CartButton />
          <AccountButton />
        </div>
      </div>

      <div className="pt-24 px-6 md:px-10 max-w-3xl mx-auto pb-20">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-center italic text-white/80 mb-8 font-jp">法的 · Legal</h1>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium tracking-wide transition-colors ${active === t.id ? "bg-white text-black" : "bg-white/5 text-white/50 hover:text-white hover:bg-white/10 border border-white/10"}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {active === "terms" && (
          <article className="prose-invert space-y-6">
            <section>
              <h2 className="text-lg font-semibold mb-3">1. Acceptance of Terms</h2>
              <p className="text-white/60 text-sm leading-relaxed">By accessing and using the Rebel Head website and products, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our services. We reserve the right to modify these terms at any time, and your continued use constitutes acceptance of any changes.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold mb-3">2. Use of Products</h2>
              <p className="text-white/60 text-sm leading-relaxed">Rebel Head products are designed for personal and professional use. You agree not to modify, reverse-engineer, or disassemble any hardware or software without prior written consent. Unauthorized modifications may void your warranty and could result in product malfunction.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold mb-3">3. Intellectual Property</h2>
              <p className="text-white/60 text-sm leading-relaxed">All content, trademarks, logos, and designs displayed on this website are the intellectual property of Rebel Head. Unauthorized reproduction, distribution, or use of any materials is strictly prohibited and may result in legal action.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold mb-3">4. Limitation of Liability</h2>
              <p className="text-white/60 text-sm leading-relaxed">Rebel Head shall not be liable for any indirect, incidental, special, or consequential damages arising from the use or inability to use our products or services. Our total liability shall not exceed the amount paid for the specific product in question.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold mb-3">5. Governing Law</h2>
              <p className="text-white/60 text-sm leading-relaxed">These terms shall be governed by and construed in accordance with applicable laws. Any disputes shall be resolved through binding arbitration in the jurisdiction where Rebel Head is incorporated.</p>
            </section>
            <p className="text-white/30 text-xs mt-8">Last updated: February 1, 2026</p>
          </article>
        )}

        {active === "privacy" && (
          <article className="prose-invert space-y-6">
            <section>
              <h2 className="text-lg font-semibold mb-3">Information We Collect</h2>
              <p className="text-white/60 text-sm leading-relaxed">We collect information you provide directly, such as name, email, shipping address, and payment details when you make a purchase. We also collect device information, usage data, and analytics through cookies and similar technologies to improve our services.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold mb-3">How We Use Your Information</h2>
              <p className="text-white/60 text-sm leading-relaxed">Your information is used to process orders, provide customer support, send product updates and firmware notifications, personalize your experience, and improve our products. We do not sell your personal information to third parties.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold mb-3">Data Security</h2>
              <p className="text-white/60 text-sm leading-relaxed">We implement industry-standard encryption and security measures to protect your personal data. All payment processing is handled through secure, PCI-compliant third-party processors. We regularly audit our systems to ensure the highest level of data protection.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold mb-3">Your Rights</h2>
              <p className="text-white/60 text-sm leading-relaxed">You have the right to access, correct, or delete your personal data at any time. You may also opt out of marketing communications. To exercise these rights, contact our support team or manage your preferences in your account settings.</p>
            </section>
            <p className="text-white/30 text-xs mt-8">Last updated: February 1, 2026</p>
          </article>
        )}

        {active === "cookies" && (
          <article className="prose-invert space-y-6">
            <section>
              <h2 className="text-lg font-semibold mb-3">What Are Cookies</h2>
              <p className="text-white/60 text-sm leading-relaxed">Cookies are small text files stored on your device when you visit our website. They help us provide a better experience by remembering your preferences, analyzing site traffic, and enabling certain features.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold mb-3">Types of Cookies We Use</h2>
              <p className="text-white/60 text-sm leading-relaxed"><strong className="text-white/80">Essential cookies</strong> are required for basic site functionality. <strong className="text-white/80">Analytics cookies</strong> help us understand how visitors interact with our site. <strong className="text-white/80">Preference cookies</strong> remember your settings and choices.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold mb-3">Managing Cookies</h2>
              <p className="text-white/60 text-sm leading-relaxed">You can control and delete cookies through your browser settings. Please note that disabling cookies may affect the functionality of certain features on our website.</p>
            </section>
            <p className="text-white/30 text-xs mt-8">Last updated: February 1, 2026</p>
          </article>
        )}
      </div>

      <FooterSection />
    </div>
  );
};

export default Terms;
