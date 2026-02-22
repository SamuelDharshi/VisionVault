"use client";
import Link from "next/link";
import { motion } from "motion/react";

const TIMELINE = [
  { year: "2024", title: "The Problem", desc: "BCH events happen globally but there's no trustless way to reward participation. Organizers can't scale manual verification." },
  { year: "Q1 2025", title: "The Idea", desc: "What if AI could replace human referees for photo proof? Zero trust required — just raw computer vision + on-chain settlement." },
  { year: "Q2 2025", title: "Hackathon Build", desc: "VisionVault was built for the BCH Hackathon 2025, combining HuggingFace vision models with mainnet-js CashTokens API." },
  { year: "Q3 2025", title: "Testnet Live", desc: "Deployed on BCH Chipnet testnet. AI verification, BCH payments, and CashToken NFT minting — all working end-to-end." },
  { year: "2026", title: "Mainnet & Beyond", desc: "Full mainnet deployment, DAO governance for bounty creation, and mobile app under development." },
];

const VALUES = [
  { icon: "🔓", title: "Permissionless", desc: "We refuse to add gatekeeping. No accounts, no approvals, no identity checks. Your wallet is your passport." },
  { icon: "🌐", title: "Global First", desc: "Bitcoin Cash is money for the world. VisionVault runs in any country, on any device, for any event." },
  { icon: "🤝", title: "Community Owned", desc: "The code is open source. The protocol is public. We build tools for the community — not the other way around." },
  { icon: "⚡", title: "Speed Matters", desc: "We believe waiting is a bug. Our entire stack is optimized for sub-10-second bounty resolution." },
];

const TEAM = [
  { name: "SamuelDharshi", role: "Founder & Lead Dev", avatar: "🧑‍💻", bio: "BCH developer & hackathon participant building real-world adoption tools." },
  { name: "AI Vision Model", role: "Chief Referee Officer", avatar: "🤖", bio: "HuggingFace BLIP large — the impartial, tireless AI that verifies every submission." },
  { name: "Bitcoin Cash", role: "Settlement Layer", avatar: "⚡", bio: "BCH CashTokens — the on-chain backbone that makes instant NFT minting possible." },
];

export default function AboutPage() {
  return (
    <div style={{ overflowX: "hidden" }}>
      {/* BG */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: 600, height: 600, background: "radial-gradient(ellipse, rgba(204,255,0,0.04) 0%, transparent 70%)" }} />
      </div>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative py-24 px-6 text-center" style={{ zIndex: 1 }}>
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-block px-4 py-1.5 rounded-full border mb-6 text-xs font-bold uppercase tracking-widest"
              style={{ background: "rgba(204,255,0,0.08)", borderColor: "rgba(204,255,0,0.2)", color: "#CCFF00" }}>
              Our Story
            </div>
            <h1 className="font-black tracking-tighter mb-6" style={{ fontSize: "clamp(2.5rem,6vw,4.5rem)" }}>
              Why we built<br /><span style={{ color: "#CCFF00" }}>VisionVault</span>
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
              Crypto conferences are full of people who care deeply about Bitcoin Cash. But the connection between
              attending those events and earning BCH was always broken — until now.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Mission ─────────────────────────────────────────── */}
      <section className="relative py-16 px-6" style={{ zIndex: 1 }}>
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl p-10 border text-center" style={{ background: "rgba(204,255,0,0.04)", borderColor: "rgba(204,255,0,0.15)" }}>
            <div className="text-5xl mb-6">🎯</div>
            <h2 className="font-black text-2xl md:text-3xl mb-4">Our Mission</h2>
            <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
              To make BCH adoption measurable and rewarding — by creating a trustless feedback loop where{" "}
              <strong style={{ color: "white" }}>real-world participation generates real on-chain value</strong>,
              verified by AI and settled in seconds.
            </p>
          </div>
        </div>
      </section>

      {/* ── Values ─────────────────────────────────────────── */}
      <section className="relative py-24 px-6 border-y" style={{ borderColor: "rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.015)", zIndex: 1 }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="font-black tracking-tighter text-center mb-12" style={{ fontSize: "clamp(2rem,5vw,3rem)" }}>
            What we <span style={{ color: "#CCFF00" }}>believe in</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {VALUES.map((v, i) => (
              <motion.div key={v.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex gap-5 p-6 rounded-3xl border"
                style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 border"
                  style={{ background: "rgba(204,255,0,0.08)", borderColor: "rgba(204,255,0,0.2)" }}>
                  {v.icon}
                </div>
                <div>
                  <h3 className="font-bold text-base mb-2">{v.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ───────────────────────────────────────── */}
      <section className="relative py-24 px-6" style={{ zIndex: 1 }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-black tracking-tighter text-center mb-16" style={{ fontSize: "clamp(2rem,5vw,3rem)" }}>
            The <span style={{ color: "#CCFF00" }}>story so far</span>
          </h2>
          <div className="relative">
            <div className="absolute left-[22px] top-0 bottom-0 w-px" style={{ background: "rgba(204,255,0,0.15)" }} />
            <div className="space-y-10">
              {TIMELINE.map((t, i) => (
                <motion.div key={t.year}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex gap-6">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 border-2 z-10"
                    style={{ background: "#000", borderColor: "#CCFF00" }}>
                    <div className="w-3 h-3 rounded-full" style={{ background: "#CCFF00" }} />
                  </div>
                  <div className="pb-2">
                    <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#CCFF00" }}>{t.year}</div>
                    <h3 className="font-bold text-base mb-1">{t.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{t.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ───────────────────────────────────────────── */}
      <section className="relative py-24 px-6 border-t" style={{ borderColor: "rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.015)", zIndex: 1 }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="font-black tracking-tighter text-center mb-12" style={{ fontSize: "clamp(2rem,5vw,3rem)" }}>
            Meet the <span style={{ color: "#CCFF00" }}>team</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {TEAM.map((m, i) => (
              <motion.div key={m.name}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center p-8 rounded-3xl border"
                style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}>
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 border-2"
                  style={{ background: "rgba(204,255,0,0.08)", borderColor: "rgba(204,255,0,0.2)" }}>
                  {m.avatar}
                </div>
                <h3 className="font-bold text-base mb-1">{m.name}</h3>
                <p className="text-xs font-bold mb-3" style={{ color: "#CCFF00" }}>{m.role}</p>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{m.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="relative py-24 px-6 text-center" style={{ zIndex: 1 }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="font-black tracking-tighter mb-6" style={{ fontSize: "clamp(2rem,5vw,3rem)" }}>
            Want to be part of <span style={{ color: "#CCFF00" }}>the story?</span>
          </h2>
          <p className="text-lg mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
            Contribute, build a bounty, or just start earning. The ecosystem is open to everyone.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/app" className="px-8 py-4 rounded-2xl font-bold transition-all hover:scale-105"
              style={{ background: "#CCFF00", color: "#000" }}>
              Launch App ⚡
            </Link>
            <Link href="/landing/contact" className="px-8 py-4 rounded-2xl font-bold border transition-all"
              style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)", color: "white" }}>
              Get In Touch →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
