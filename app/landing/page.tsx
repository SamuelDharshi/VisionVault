"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";

// ── Data ────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: "🤖",
    title: "AI Vision Referee",
    benefit: "No waiting for human review — our AI judges your photo in under 5 seconds, 24/7.",
    tag: "HuggingFace BLIP",
    color: "#CCFF00",
  },
  {
    icon: "⚡",
    title: "Instant BCH Payouts",
    benefit: "Pass verification and Bitcoin Cash lands in your wallet before the page finishes loading.",
    tag: "On-chain & Trustless",
    color: "#CCFF00",
  },
  {
    icon: "🎨",
    title: "CashToken NFT Badges",
    benefit: "Every completed bounty mints a real on-chain NFT badge — a permanent, verifiable achievement.",
    tag: "BCH CashTokens",
    color: "#a855f7",
  },
  {
    icon: "🌍",
    title: "Global Event Discovery",
    benefit: "Find BCH meetups, hackathons, and conferences worldwide with a bounty attached to each.",
    tag: "500+ Events Listed",
    color: "#38bdf8",
  },
  {
    icon: "🔓",
    title: "Zero Gatekeeping",
    benefit: "No accounts, no KYC, no approvals. Connect a BCH wallet and start claiming in 30 seconds.",
    tag: "Permissionless",
    color: "#34d399",
  },
  {
    icon: "📊",
    title: "Full On-Chain Transparency",
    benefit: "Every payout is a real BCH transaction. Verify any reward on the public blockchain anytime.",
    tag: "Fully Auditable",
    color: "#f59e0b",
  },
];

const STEPS = [
  { step: "01", icon: "🎯", title: "Browse bounties", desc: "Find an active bounty matching your skills or location. Each has a clear task and BCH reward." },
  { step: "02", icon: "📸", title: "Upload your proof", desc: "Take a photo completing the task. Upload it with your BCH testnet wallet address." },
  { step: "03", icon: "🤖", title: "AI verifies instantly", desc: "Our computer vision AI checks the photo against the bounty criteria in seconds. It never sleeps." },
  { step: "04", icon: "💸", title: "BCH + NFT arrive", desc: "Verification passes → BCH is sent to your wallet and a CashToken NFT badge is minted — all on-chain." },
];

const TESTIMONIALS = [
  {
    name: "Satoshi N.",
    role: "BCH Developer",
    avatar: "🧑‍💻",
    text: "I submitted a meetup selfie, the AI verified it, and had 0.05 BCH in my wallet within 10 seconds. That's genuinely insane.",
    stars: 5,
  },
  {
    name: "Maria C.",
    role: "Crypto Enthusiast",
    avatar: "👩‍🎤",
    text: "The NFT badges are the coolest part. I have 4 on-chain proofs that I attended real BCH events — feels like a digital passport.",
    stars: 5,
  },
  {
    name: "TysonDev",
    role: "Hackathon Winner",
    avatar: "🏆",
    text: "VisionVault is exactly what BCH needed to drive real-world adoption. Bounties create a feedback loop between events and the ecosystem.",
    stars: 5,
  },
];

const STATS = [
  { value: "< 5s", label: "AI Verification", icon: "⚡" },
  { value: "100%", label: "On-Chain Payouts", icon: "🔗" },
  { value: "0.05–0.50", label: "BCH per Bounty", icon: "₿" },
  { value: "FREE", label: "To Participate", icon: "🎁" },
];

const EVENTS_PREVIEW = [
  { name: "Bitcoin Cash City Conference", loc: "Townsville, AU", date: "Sep 2025", reward: "0.10 BCH", emoji: "🎤" },
  { name: "Consensus 2025", loc: "Austin, TX, USA", date: "May 2025", reward: "0.25 BCH", emoji: "🌐" },
  { name: "BCH Hackathon Tokyo", loc: "Tokyo, Japan", date: "Mar 2025", reward: "0.50 BCH", emoji: "💻" },
  { name: "Bitcoin Amsterdam", loc: "Amsterdam, NL", date: "Oct 2025", reward: "0.15 BCH", emoji: "🇳🇱" },
];

const PARTNERS = ["🏦 CashPay", "🌐 BCH Global", "💻 BCH Devs", "🤝 CoinFlex", "🛠️ Flowee", "📡 Electron Cash"];

const FAQS_PREVIEW = [
  { q: "Is VisionVault free to use?", a: "Yes. Claiming bounties is completely free. You only need a BCH testnet wallet." },
  { q: "How accurate is the AI verification?", a: "Very high for clear, well-lit photos that match the bounty description. The AI uses state-of-the-art image captioning." },
  { q: "What is a CashToken NFT badge?", a: "It's a real on-chain Non-Fungible Token minted on Bitcoin Cash that permanently records your achievement." },
];

// ── App Mockup (CSS-only) ───────────────────────────────────────────────────
function AppMockup() {
  return (
    <div className="relative mx-auto" style={{ maxWidth: 320 }}>
      {/* Glow */}
      <div className="absolute inset-0 rounded-[3rem]" style={{ background: "rgba(204,255,0,0.15)", filter: "blur(60px)" }} />

      {/* Phone shell */}
      <div className="relative rounded-[3rem] overflow-hidden border border-white/10"
        style={{ background: "#111", padding: 24 }}>
        {/* Status bar */}
        <div className="flex justify-between items-center mb-5 px-1">
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>9:41 AM</span>
          <div className="flex gap-1">
            {[1, 2, 3].map(i => <div key={i} className="w-1 rounded-full" style={{ height: 8 * i / 3 + 4, background: "rgba(255,255,255,0.4)" }} />)}
          </div>
        </div>

        {/* BCH Balance Card */}
        <div className="rounded-3xl p-5 mb-4" style={{ background: "linear-gradient(135deg,#CCFF00,#99CC00)" }}>
          <div className="text-xs font-bold mb-1" style={{ color: "rgba(0,0,0,0.5)" }}>BCH VAULT</div>
          <div className="text-3xl font-black mb-4" style={{ color: "#000" }}>0.43 BCH</div>
          <div className="flex gap-2">
            <div className="flex-1 rounded-xl py-2 text-center text-xs font-bold" style={{ background: "rgba(0,0,0,0.2)", color: "#000" }}>Deposit</div>
            <div className="flex-1 rounded-xl py-2 text-center text-xs font-bold" style={{ background: "rgba(0,0,0,0.2)", color: "#000" }}>Withdraw</div>
          </div>
        </div>

        {/* Bounties */}
        <div className="text-xs font-bold mb-3 px-1" style={{ color: "rgba(255,255,255,0.3)" }}>ACTIVE BOUNTIES</div>
        {[
          { icon: "📸", title: "BCH Meetup Photo", reward: "+0.05 BCH", badge: "Community Pioneer" },
          { icon: "🏪", title: "Merchant Adoption", reward: "+0.10 BCH", badge: "Merchant Scout" },
          { icon: "💻", title: "Code Contribution", reward: "+0.25 BCH", badge: "Code Warrior" },
        ].map((b, i) => (
          <div key={i} className="flex items-center gap-3 rounded-2xl p-3 mb-2 border"
            style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.06)" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
              style={{ background: "rgba(204,255,0,0.1)" }}>{b.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold truncate">{b.title}</div>
              <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>{b.badge}</div>
            </div>
            <div className="text-xs font-bold shrink-0" style={{ color: "#CCFF00" }}>{b.reward}</div>
          </div>
        ))}

        {/* Success toast */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1, repeat: Infinity, repeatDelay: 3, duration: 0.4 }}
          className="absolute -top-3 -right-3 rounded-2xl px-3 py-2 text-xs font-black shadow-xl"
          style={{ background: "#CCFF00", color: "#000" }}>
          ✓ Bounty Approved! 🎉
        </motion.div>
      </div>
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────────────────
export default function LandingHomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ overflowX: "hidden" }}>
      {/* ── BACKGROUND ──────────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(rgba(204,255,0,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(204,255,0,0.025) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />
        <div style={{
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          width: 900, height: 600,
          background: "radial-gradient(ellipse at center, rgba(204,255,0,0.06) 0%, transparent 70%)",
        }} />
      </div>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 1. HERO                                                       */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-20 px-6 text-center" style={{ zIndex: 1 }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            {/* Live badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 text-xs font-bold uppercase tracking-widest"
              style={{ background: "rgba(204,255,0,0.08)", borderColor: "rgba(204,255,0,0.25)", color: "#CCFF00" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#CCFF00" }} />
              Live on BCH Testnet · 100% Open Source
            </div>

            {/* Headline */}
            <h1 className="font-black tracking-tighter leading-none mb-6"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}>
              Earn Bitcoin Cash for<br />
              <span style={{ background: "linear-gradient(135deg,#CCFF00 0%,#99CC00 50%,#CCFF00 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Real-World Proof
              </span>
            </h1>

            {/* Sub */}
            <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
              style={{ color: "rgba(255,255,255,0.55)" }}>
              VisionVault is the world&apos;s first <strong style={{ color: "white" }}>AI-powered bounty platform</strong> on Bitcoin Cash.
              Upload a proof photo, get verified by AI in seconds, and receive instant BCH rewards + an NFT badge — no middlemen, no delays.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
              <Link href="/" className="group px-8 py-4 rounded-2xl font-black text-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                style={{ background: "#CCFF00", color: "#000", boxShadow: "0 0 40px rgba(204,255,0,0.35)" }}>
                🚀 Start Earning Free
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link href="#how-it-works" className="px-8 py-4 rounded-2xl font-bold text-lg border transition-all hover:border-yellow-400/40"
                style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)", color: "white" }}>
                See How It Works
              </Link>
            </div>

            {/* Trust line */}
            <p className="text-sm mb-16" style={{ color: "rgba(255,255,255,0.25)" }}>
              No sign-up · No KYC · No fees · BCH Testnet demo
            </p>
          </motion.div>

          {/* Hero visual — app mockup + stats */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-16">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
              <AppMockup />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-4 text-left max-w-xs">
              {[
                { icon: "✅", text: "AI verification in under 5 seconds" },
                { icon: "💸", text: "BCH sent directly on-chain — no custodians" },
                { icon: "🎨", text: "Real CashToken NFT badges minted per bounty" },
                { icon: "🔒", text: "Permissionless — just a BCH wallet needed" },
                { icon: "🌍", text: "500+ real-world events with attached bounties" },
              ].map((item, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl border"
                  style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}>
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 2. STATS BAR                                                  */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="relative py-12 border-y" style={{ borderColor: "rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.015)", zIndex: 1 }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-3xl font-black mb-1" style={{ color: "#CCFF00" }}>{s.value}</div>
                <div className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 3. PARTNER LOGOS / SOCIAL PROOF                              */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="relative py-16 px-6" style={{ zIndex: 1 }}>
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-8" style={{ color: "rgba(255,255,255,0.25)" }}>
            Trusted by teams & builders across the BCH ecosystem
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {PARTNERS.map((p, i) => (
              <div key={i} className="px-5 py-3 rounded-2xl border text-sm font-bold"
                style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.45)" }}>
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 4. FEATURES & BENEFITS                                        */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section id="features" className="relative py-24 px-6" style={{ zIndex: 1 }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full border mb-4 text-xs font-bold uppercase tracking-widest"
              style={{ background: "rgba(204,255,0,0.08)", borderColor: "rgba(204,255,0,0.2)", color: "#CCFF00" }}>
              Platform Features
            </div>
            <h2 className="font-black tracking-tighter mb-4" style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
              Everything you need to <span style={{ color: "#CCFF00" }}>earn on-chain</span>
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.45)" }}>
              We didn&apos;t just build another app. We built a trustless loop — real-world action → AI verification → instant settlement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <motion.div key={f.title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="rounded-3xl p-6 border group cursor-default transition-all"
                style={{ background: "rgba(255,255,255,0.025)", borderColor: "rgba(255,255,255,0.07)" }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 border transition-all"
                  style={{ background: `${f.color}15`, borderColor: `${f.color}20` }}>
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>{f.benefit}</p>
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full border"
                  style={{ color: f.color, background: `${f.color}10`, borderColor: `${f.color}20` }}>
                  {f.tag}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 5. HOW IT WORKS                                               */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="relative py-24 px-6 border-y" style={{ borderColor: "rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.015)", zIndex: 1 }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full border mb-4 text-xs font-bold uppercase tracking-widest"
              style={{ background: "rgba(204,255,0,0.08)", borderColor: "rgba(204,255,0,0.2)", color: "#CCFF00" }}>
              How It Works
            </div>
            <h2 className="font-black tracking-tighter mb-4" style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
              From zero to <span style={{ color: "#CCFF00" }}>BCH in 4 steps</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s, i) => (
              <motion.div key={s.step}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                className="relative rounded-3xl p-6 border h-full"
                style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}>
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-full w-6 text-center font-bold z-10"
                    style={{ color: "rgba(204,255,0,0.3)", fontSize: 20 }}>→</div>
                )}
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl border"
                    style={{ background: "rgba(204,255,0,0.08)", borderColor: "rgba(204,255,0,0.2)" }}>
                    {s.icon}
                  </div>
                  <span className="font-black" style={{ fontSize: 28, color: "rgba(255,255,255,0.08)" }}>{s.step}</span>
                </div>
                <h3 className="font-bold text-base mb-2">{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105"
              style={{ background: "#CCFF00", color: "#000" }}>
              Try It Now — It&apos;s Free →
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 6. EVENTS PREVIEW (Visual Proof)                             */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="relative py-24 px-6" style={{ zIndex: 1 }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full border mb-4 text-xs font-bold uppercase tracking-widest"
              style={{ background: "rgba(204,255,0,0.08)", borderColor: "rgba(204,255,0,0.2)", color: "#CCFF00" }}>
              Upcoming Events
            </div>
            <h2 className="font-black tracking-tighter mb-4" style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
              Earn at <span style={{ color: "#CCFF00" }}>real-world events</span>
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.45)" }}>
              Attend a BCH conference, prove you were there, collect your reward. It&apos;s that simple.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-10">
            {EVENTS_PREVIEW.map((ev, i) => (
              <motion.div key={ev.name}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-5 rounded-3xl border group transition-all"
                style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 border"
                  style={{ background: "rgba(204,255,0,0.08)", borderColor: "rgba(204,255,0,0.2)" }}>
                  {ev.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm leading-tight truncate">{ev.name}</h3>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>📍 {ev.loc} · {ev.date}</p>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-sm font-bold" style={{ color: "#CCFF00" }}>+{ev.reward}</div>
                  <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.25)" }}>Bounty</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold border transition-all hover:border-yellow-400/30"
              style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)", color: "white" }}>
              Explore All Events in App →
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 7. TESTIMONIALS                                               */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="relative py-24 px-6 border-y" style={{ borderColor: "rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.015)", zIndex: 1 }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full border mb-4 text-xs font-bold uppercase tracking-widest"
              style={{ background: "rgba(204,255,0,0.08)", borderColor: "rgba(204,255,0,0.2)", color: "#CCFF00" }}>
              Community Love
            </div>
            <h2 className="font-black tracking-tighter" style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
              What early users <span style={{ color: "#CCFF00" }}>are saying</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={t.name}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="rounded-3xl p-6 border flex flex-col"
                style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}>
                <div className="flex mb-3">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <span key={j} style={{ color: "#CCFF00" }}>★</span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed flex-1 mb-5 italic" style={{ color: "rgba(255,255,255,0.65)" }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl border"
                    style={{ background: "rgba(204,255,0,0.08)", borderColor: "rgba(204,255,0,0.2)" }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-bold">{t.name}</div>
                    <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 8. FAQ PREVIEW                                                */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="relative py-24 px-6" style={{ zIndex: 1 }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-black tracking-tighter mb-4" style={{ fontSize: "clamp(2rem,5vw,3rem)" }}>
              Quick <span style={{ color: "#CCFF00" }}>Answers</span>
            </h2>
          </div>
          <div className="space-y-3 mb-8">
            {FAQS_PREVIEW.map((faq, i) => (
              <div key={i} className="rounded-2xl border overflow-hidden"
                style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="font-bold text-sm">{faq.q}</span>
                  <span className="text-xl font-light transition-transform" style={{ color: "#CCFF00", transform: openFaq === i ? "rotate(45deg)" : "" }}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/landing/faq" className="text-sm font-bold transition-colors" style={{ color: "#CCFF00" }}>
              View All FAQs →
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 9. FINAL CTA                                                  */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="relative py-32 px-6 text-center border-t" style={{ borderColor: "rgba(255,255,255,0.05)", zIndex: 1 }}>
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div style={{ width: 700, height: 400, background: "radial-gradient(ellipse, rgba(204,255,0,0.07) 0%, transparent 70%)" }} />
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative max-w-3xl mx-auto">
          <h2 className="font-black tracking-tighter mb-6" style={{ fontSize: "clamp(2.5rem,6vw,4.5rem)" }}>
            Ready to earn<br /><span style={{ color: "#CCFF00" }}>your first bounty?</span>
          </h2>
          <p className="text-lg mb-10" style={{ color: "rgba(255,255,255,0.5)" }}>
            No wallet? No problem. Get a free BCH testnet wallet and start earning in minutes.
            Your proof is worth BCH — don&apos;t leave it on the table.
          </p>
          <Link href="/"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-black text-xl transition-all hover:scale-105 active:scale-95"
            style={{ background: "#CCFF00", color: "#000", boxShadow: "0 0 60px rgba(204,255,0,0.4)" }}>
            <span>⚡</span>
            Get Started Free
            <span>→</span>
          </Link>
          <p className="text-sm mt-5" style={{ color: "rgba(255,255,255,0.25)" }}>
            No sign-up required · BCH Testnet · Open Source on GitHub
          </p>
        </motion.div>
      </section>
    </div>
  );
}
