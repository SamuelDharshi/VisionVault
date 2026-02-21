"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Events", href: "#events" },
  { label: "About", href: "#about" },
];

const FEATURES = [
  {
    icon: "🤖",
    title: "AI Vision Referee",
    desc: "Our AI instantly analyzes your proof photo and decides if it matches the bounty requirement — no human needed, no delays.",
    tag: "Powered by HuggingFace",
  },
  {
    icon: "⚡",
    title: "Instant BCH Rewards",
    desc: "Pass verification and receive Bitcoin Cash directly to your wallet in seconds. No sign-ups, no KYC, no waiting.",
    tag: "On-chain & Trustless",
  },
  {
    icon: "🏆",
    title: "NFT Achievement Badges",
    desc: "Earn exclusive on-chain NFT badges with every completed bounty. Build your reputation as a verified contributor.",
    tag: "CashToken NFTs",
  },
  {
    icon: "🌍",
    title: "Global Event Discovery",
    desc: "Find Bitcoin Cash meetups, hackathons, and crypto conferences worldwide. Attend, prove it, and earn.",
    tag: "500+ Events Listed",
  },
  {
    icon: "🔓",
    title: "Zero Gatekeeping",
    desc: "Anyone with a BCH wallet can participate. No accounts, no approvals — just upload your proof and claim.",
    tag: "Permissionless",
  },
  {
    icon: "📊",
    title: "On-Chain Transparency",
    desc: "Every bounty payout is a real blockchain transaction. Verify any reward on the BCH block explorer instantly.",
    tag: "Fully Auditable",
  },
];

const STEPS = [
  {
    step: "01",
    icon: "🎯",
    title: "Pick a Bounty",
    desc: "Browse active bounties — from attending BCH meetups to photographing merchants who accept Bitcoin Cash.",
  },
  {
    step: "02",
    icon: "📸",
    title: "Submit Your Proof",
    desc: "Take a photo proving you completed the task. Upload it right in the app along with your BCH wallet address.",
  },
  {
    step: "03",
    icon: "🤖",
    title: "AI Verifies Instantly",
    desc: "Our vision AI analyzes your image against the bounty criteria in seconds. No waiting, no human review.",
  },
  {
    step: "04",
    icon: "💸",
    title: "BCH Lands in Your Wallet",
    desc: "Pass verification and BCH is sent directly to your wallet on-chain. You also receive an exclusive NFT badge.",
  },
];

const STATS = [
  { value: "0.05–0.25", label: "BCH per Bounty", icon: "₿" },
  { value: "< 5s", label: "AI Verification", icon: "⚡" },
  { value: "100%", label: "On-Chain Payouts", icon: "🔗" },
  { value: "FREE", label: "To Participate", icon: "🎁" },
];

const EVENTS = [
  { name: "Bitcoin Cash City Conference", loc: "Townsville, AU", date: "Sep 2025", reward: "0.10 BCH", emoji: "🎤" },
  { name: "Consensus 2025", loc: "Austin, TX, USA", date: "May 2025", reward: "0.25 BCH", emoji: "🌐" },
  { name: "BCH Hackathon Tokyo", loc: "Tokyo, Japan", date: "Mar 2025", reward: "0.50 BCH", emoji: "💻" },
  { name: "Bitcoin Amsterdam", loc: "Amsterdam, NL", date: "Oct 2025", reward: "0.15 BCH", emoji: "🇳🇱" },
];

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* ── BACKGROUND GRID ─────────────────────────────────────────────────── */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(204,255,0,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(204,255,0,0.03) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#CCFF00]/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* ── HEADER ──────────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#CCFF00] flex items-center justify-center">
              <span className="text-black font-black text-sm">V</span>
            </div>
            <span className="font-black text-lg tracking-tight">
              Vision<span className="text-[#CCFF00]">Vault</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-white/60 hover:text-white transition-colors font-medium"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden md:block text-sm text-white/60 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/"
              className="px-5 py-2.5 bg-[#CCFF00] text-black rounded-xl font-bold text-sm hover:bg-[#BBEE00] transition-all hover:scale-105 active:scale-95"
            >
              Launch App ⚡
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="relative z-10 pt-32 pb-24 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#CCFF00]/10 border border-[#CCFF00]/30 text-[#CCFF00] text-xs font-bold uppercase tracking-widest mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse" />
            Built on Bitcoin Cash · Powered by AI
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6">
            Prove It.
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(135deg, #CCFF00 0%, #99CC00 50%, #CCFF00 100%)",
              }}
            >
              Earn BCH.
            </span>
          </h1>

          {/* Subhead */}
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-10">
            VisionVault is the world&apos;s first AI-powered bounty verification platform on
            Bitcoin Cash. Upload a photo, let AI verify it, and receive instant BCH rewards
            — no middlemen, no delays.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/"
              className="group px-8 py-4 bg-[#CCFF00] text-black rounded-2xl font-black text-lg hover:bg-[#BBEE00] transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-[0_0_40px_rgba(204,255,0,0.3)]"
            >
              Get Started Free
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <a
              href="#how-it-works"
              className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-all hover:border-[#CCFF00]/30"
            >
              See How It Works
            </a>
          </div>

          {/* App Screenshot mockup */}
          <div className="relative max-w-sm mx-auto">
            <div className="absolute inset-0 bg-[#CCFF00]/20 blur-[60px] rounded-full" />
            <div className="relative bg-[#1C1C1E] rounded-[2.5rem] border border-white/10 p-6 shadow-2xl text-left">
              {/* Fake phone top */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#CCFF00] flex items-center justify-center">
                    <span className="text-black font-black text-xs">V</span>
                  </div>
                  <div>
                    <div className="text-xs text-white/40">Welcome home,</div>
                    <div className="text-sm font-bold">Satoshi</div>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
              </div>

              {/* Fake balance card */}
              <div className="bg-[#CCFF00] rounded-2xl p-4 mb-4 text-black">
                <div className="text-xs font-bold opacity-60 mb-1">BCH VAULT</div>
                <div className="text-2xl font-black mb-3">$0.43 BCH</div>
                <div className="flex gap-2">
                  <div className="flex-1 bg-black/20 rounded-xl py-2 text-center text-xs font-bold">Deposit</div>
                  <div className="flex-1 bg-black/20 rounded-xl py-2 text-center text-xs font-bold">Withdraw</div>
                </div>
              </div>

              {/* Fake bounty item */}
              <div className="bg-white/5 rounded-xl p-3 flex items-center gap-3 border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-[#CCFF00]/10 flex items-center justify-center">
                  📸
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold">BCH Meetup Photo</div>
                  <div className="text-[10px] text-white/40">BY BCH GLOBAL</div>
                </div>
                <div className="text-xs font-bold text-[#CCFF00]">+0.05 BCH</div>
              </div>

              {/* Success badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1, repeat: Infinity, repeatDelay: 3, duration: 0.4 }}
                className="absolute -top-4 -right-4 bg-[#CCFF00] text-black rounded-2xl px-3 py-2 text-xs font-black shadow-lg"
              >
                ✓ Bounty Approved!
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── STATS BAR ───────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-12 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-black text-[#CCFF00]">{stat.value}</div>
                <div className="text-xs text-white/40 uppercase tracking-widest font-bold mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────────────────────────── */}
      <section id="features" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#CCFF00]/10 border border-[#CCFF00]/20 text-[#CCFF00] text-xs font-bold uppercase tracking-widest mb-4">
              Platform Features
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
              Everything you need to{" "}
              <span className="text-[#CCFF00]">earn on-chain</span>
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              A complete bounty ecosystem — from discovery to verification to payout.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-[#1C1C1E] border border-white/8 rounded-3xl p-6 group hover:border-[#CCFF00]/20 transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#CCFF00]/10 border border-[#CCFF00]/20 flex items-center justify-center text-2xl mb-4 group-hover:bg-[#CCFF00]/20 transition-all">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed mb-4">{f.desc}</p>
                <span className="text-[10px] font-bold text-[#CCFF00]/70 uppercase tracking-widest px-2 py-1 rounded-full bg-[#CCFF00]/10 border border-[#CCFF00]/15">
                  {f.tag}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="relative z-10 py-24 px-6 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#CCFF00]/10 border border-[#CCFF00]/20 text-[#CCFF00] text-xs font-bold uppercase tracking-widest mb-4">
              How It Works
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
              From zero to{" "}
              <span className="text-[#CCFF00]">BCH in 4 steps</span>
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              The simplest way to earn Bitcoin Cash — no experience needed.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative"
              >
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-[calc(100%+12px)] w-6 text-[#CCFF00]/30 text-xl font-bold z-10">
                    →
                  </div>
                )}
                <div className="bg-[#1C1C1E] border border-white/8 rounded-3xl p-6 h-full hover:border-[#CCFF00]/20 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#CCFF00]/10 border border-[#CCFF00]/20 flex items-center justify-center text-xl">
                      {s.icon}
                    </div>
                    <span className="text-3xl font-black text-white/10">{s.step}</span>
                  </div>
                  <h3 className="font-bold text-base mb-2">{s.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENTS PREVIEW ──────────────────────────────────────────────────── */}
      <section id="events" className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#CCFF00]/10 border border-[#CCFF00]/20 text-[#CCFF00] text-xs font-bold uppercase tracking-widest mb-4">
              Upcoming Events
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
              Earn at{" "}
              <span className="text-[#CCFF00]">real-world events</span>
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Attend a crypto conference, prove you were there, earn BCH.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-10">
            {EVENTS.map((ev, i) => (
              <motion.div
                key={ev.name}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#1C1C1E] border border-white/8 rounded-3xl p-5 flex items-center gap-4 hover:border-[#CCFF00]/20 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#CCFF00]/10 border border-[#CCFF00]/20 flex items-center justify-center text-2xl shrink-0">
                  {ev.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm leading-tight truncate">{ev.name}</h3>
                  <p className="text-xs text-white/40 mt-0.5">📍 {ev.loc} · {ev.date}</p>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-sm font-bold text-[#CCFF00]">+{ev.reward}</div>
                  <div className="text-[10px] text-white/30">Bounty</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold hover:bg-white/10 hover:border-[#CCFF00]/30 transition-all"
            >
              Explore All Events in App →
            </Link>
          </div>
        </div>
      </section>

      {/* ── ABOUT / MISSION ─────────────────────────────────────────────────── */}
      <section id="about" className="relative z-10 py-24 px-6 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#CCFF00]/10 border border-[#CCFF00]/20 text-[#CCFF00] text-xs font-bold uppercase tracking-widest mb-6">
            Our Mission
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6">
            Rewarding real-world{" "}
            <span className="text-[#CCFF00]">contributions</span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            VisionVault was built during a hackathon to solve a simple problem: how do you reward 
            community contributions fairly, instantly, and without trust? The answer — AI vision + 
            Bitcoin Cash. Submit proof, get verified, earn BCH. No middleman. Ever.
          </p>
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[
              { label: "Open Source", icon: "🔓" },
              { label: "No Sign-Up", icon: "🚀" },
              { label: "BCH Testnet", icon: "🧪" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-sm font-bold text-white/60">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-32 px-6 text-center">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[400px] bg-[#CCFF00]/8 blur-[100px] rounded-full" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">
            Start earning
            <br />
            <span className="text-[#CCFF00]">BCH today.</span>
          </h2>
          <p className="text-white/50 text-lg mb-10 max-w-lg mx-auto">
            Join the VisionVault bounty network. No wallet? Get a free testnet BCH wallet 
            and start completing bounties in minutes.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#CCFF00] text-black rounded-2xl font-black text-xl hover:bg-[#BBEE00] transition-all hover:scale-105 active:scale-95 shadow-[0_0_60px_rgba(204,255,0,0.4)]"
          >
            <span>⚡</span>
            Get Started — It&apos;s Free
            <span>→</span>
          </Link>
          <p className="text-white/30 text-sm mt-4">No sign-up required · BCH Testnet · Open Source</p>
        </motion.div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-white/8 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Brand */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#CCFF00] flex items-center justify-center">
                <span className="text-black font-black text-xs">V</span>
              </div>
              <span className="font-black text-base">
                Vision<span className="text-[#CCFF00]">Vault</span>
              </span>
              <span className="text-white/30 text-xs ml-2">Hackathon 2025</span>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6 text-sm text-white/40">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
              <a href="#about" className="hover:text-white transition-colors">About</a>
              <Link href="/" className="hover:text-[#CCFF00] transition-colors font-bold">Launch App</Link>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-sm hover:bg-white/10 hover:border-[#CCFF00]/30 transition-all"
              >
                🐙
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-sm hover:bg-white/10 hover:border-[#CCFF00]/30 transition-all"
              >
                𝕏
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/30">
            <p>© 2025 VisionVault. Built for the BCH Hackathon. Open Source.</p>
            <div className="flex gap-4">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span className="text-[#CCFF00]/50">⚡ Powered by Bitcoin Cash</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
