"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV = [
  { label: "Home", href: "/landing" },
  { label: "Features", href: "/landing#features" },
  { label: "Pricing", href: "/landing/pricing" },
  { label: "FAQ", href: "/landing/faq" },
  { label: "About", href: "/landing/about" },
  { label: "Contact", href: "/landing/contact" },
];

const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "/landing#features" },
    { label: "How It Works", href: "/landing#how-it-works" },
    { label: "Pricing", href: "/landing/pricing" },
    { label: "FAQ", href: "/landing/faq" },
  ],
  Company: [
    { label: "About Us", href: "/landing/about" },
    { label: "Contact", href: "/landing/contact" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/landing/privacy" },
    { label: "Terms of Service", href: "/landing/terms" },
    { label: "Cookie Policy", href: "#" },
  ],
  Social: [
    { label: "GitHub", href: "https://github.com" },
    { label: "Twitter / X", href: "https://x.com" },
    { label: "Telegram", href: "https://t.me" },
    { label: "Discord", href: "#" },
  ],
};

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white antialiased" style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      {/* Google Fonts */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');`}</style>

      {/* ── STICKY NAV ─────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 backdrop-blur-xl"
        style={{ background: "rgba(0,0,0,0.85)" }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/landing" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-black text-sm"
              style={{ background: "#CCFF00" }}>V</div>
            <span className="font-black text-lg tracking-tight">
              Vision<span style={{ color: "#CCFF00" }}>Vault</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((item) => (
              <Link key={item.label} href={item.href}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                style={{
                  color: pathname === item.href ? "#CCFF00" : "rgba(255,255,255,0.55)",
                  background: pathname === item.href ? "rgba(204,255,0,0.08)" : "transparent",
                }}>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link href="/" className="hidden md:block px-5 py-2 rounded-xl text-sm font-bold transition-all"
              style={{ background: "#CCFF00", color: "#000" }}>
              Launch App ⚡
            </Link>
            {/* Mobile hamburger */}
            <button className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
              onClick={() => setMobileOpen(!mobileOpen)}>
              <span className="w-5 h-0.5 bg-white/60 transition-all" style={{ transform: mobileOpen ? "rotate(45deg) translate(4px,4px)" : "" }} />
              <span className="w-5 h-0.5 bg-white/60 transition-all" style={{ opacity: mobileOpen ? 0 : 1 }} />
              <span className="w-5 h-0.5 bg-white/60 transition-all" style={{ transform: mobileOpen ? "rotate(-45deg) translate(4px,-4px)" : "" }} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/5 px-6 py-4 space-y-1">
            {NAV.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-medium"
                style={{ color: "rgba(255,255,255,0.7)" }}>
                {item.label}
              </Link>
            ))}
            <Link href="/" className="block mt-3 px-4 py-3 rounded-xl text-sm font-bold text-center"
              style={{ background: "#CCFF00", color: "#000" }}>
              Launch App ⚡
            </Link>
          </div>
        )}
      </header>

      {/* ── PAGE CONTENT ──────────────────────────────────────── */}
      <main className="pt-16">{children}</main>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer className="border-t border-white/8 mt-24">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-5 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <Link href="/landing" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-black text-sm"
                  style={{ background: "#CCFF00" }}>V</div>
                <span className="font-black tracking-tight">
                  Vision<span style={{ color: "#CCFF00" }}>Vault</span>
                </span>
              </Link>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                The world&apos;s first AI-powered bounty verification platform built on Bitcoin Cash.
              </p>
              <p className="text-xs mt-4" style={{ color: "rgba(255,255,255,0.25)" }}>
                ⚡ Powered by Bitcoin Cash
              </p>
            </div>

            {/* Link columns */}
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>
                  {category}
                </h3>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm transition-colors hover:text-white"
                        style={{ color: "rgba(255,255,255,0.45)" }}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
              © 2025 VisionVault. Built for the BCH Hackathon. Open Source under MIT License.
            </p>
            <div className="flex items-center gap-4 text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
              <Link href="/landing/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/landing/terms" className="hover:text-white transition-colors">Terms</Link>
              <span style={{ color: "#CCFF00", opacity: 0.6 }}>BCH Testnet</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
