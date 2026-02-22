"use client";
import Link from "next/link";
import { motion } from "motion/react";

export default function ThankYouPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6" style={{ zIndex: 1 }}>
      <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full text-center">

        {/* Success ring */}
        <div className="relative inline-flex items-center justify-center mb-10">
          <div className="w-32 h-32 rounded-full border-4 flex items-center justify-center text-6xl"
            style={{ borderColor: "#CCFF00", background: "rgba(204,255,0,0.08)", boxShadow: "0 0 60px rgba(204,255,0,0.2)" }}>
            🎉
          </div>
          <div className="absolute w-40 h-40 rounded-full border animate-ping opacity-20"
            style={{ borderColor: "#CCFF00" }} />
        </div>

        <h1 className="font-black tracking-tighter mb-4" style={{ fontSize: "clamp(2.5rem,6vw,4rem)" }}>
          You&apos;re all set!<br /><span style={{ color: "#CCFF00" }}>Welcome aboard.</span>
        </h1>

        <p className="text-lg leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.55)" }}>
          Thanks for joining VisionVault. Your journey to earning BCH bounties starts right now.
          Check your email for a confirmation, then launch the app and claim your first bounty.
        </p>

        {/* Steps */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {[
            { step: "1", icon: "📧", title: "Check your email", desc: "Confirm your email address to unlock all features." },
            { step: "2", icon: "💳", title: "Get a BCH wallet", desc: "Grab free testnet BCH from tbch.googol.cash." },
            { step: "3", icon: "⚡", title: "Claim a bounty", desc: "Launch the app, pick a bounty, and earn your first BCH!" },
          ].map((s) => (
            <div key={s.step} className="rounded-2xl p-5 border"
              style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black mx-auto mb-3"
                style={{ background: "#CCFF00", color: "#000" }}>{s.step}</div>
              <div className="text-2xl mb-2">{s.icon}</div>
              <h3 className="font-bold text-sm mb-1">{s.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/app"
            className="px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105"
            style={{ background: "#CCFF00", color: "#000", boxShadow: "0 0 40px rgba(204,255,0,0.3)" }}>
            ⚡ Launch App Now →
          </Link>
          <Link href="/landing"
            className="px-8 py-4 rounded-2xl font-bold text-lg border transition-all"
            style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)", color: "white" }}>
            Back to Home
          </Link>
        </div>

        {/* BCH Faucet link */}
        <p className="text-sm mt-8" style={{ color: "rgba(255,255,255,0.3)" }}>
          Need testnet BCH?{" "}
          <a href="https://tbch.googol.cash" target="_blank" rel="noopener noreferrer"
            className="underline hover:text-white transition-colors">
            Get free tBCH here →
          </a>
        </p>
      </motion.div>
    </div>
  );
}
