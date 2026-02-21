"use client";
import Link from "next/link";
import { motion } from "motion/react";

const PLANS = [
  {
    name: "Bounty Hunter",
    price: "Free",
    sub: "Forever",
    emoji: "🎯",
    color: "#CCFF00",
    highlight: true,
    cta: "Start Earning Free",
    desc: "Everything you need to discover and claim BCH bounties on real-world events.",
    features: [
      "Browse all active bounties",
      "Upload photo proof",
      "AI verification (<5 seconds)",
      "Instant BCH testnet payouts",
      "CashToken NFT badge awarded",
      "On-chain transaction receipts",
      "Trophy wall & achievement history",
      "BCH testnet wallet support",
    ],
    notIncluded: [
      "Create custom bounties",
      "Bounty analytics dashboard",
    ],
  },
  {
    name: "Bounty Creator",
    price: "0.1 BCH",
    sub: "per bounty post",
    emoji: "🏗️",
    color: "#a855f7",
    highlight: false,
    cta: "Coming Soon",
    desc: "For event organizers and community builders who want to reward participants at scale.",
    features: [
      "Everything in Bounty Hunter",
      "Create & publish custom bounties",
      "Set your own reward amounts",
      "Custom NFT badge design",
      "Real-time claim dashboard",
      "Geo-tagged event support",
      "CSV export of claimants",
      "Priority support",
    ],
    notIncluded: [],
    comingSoon: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    sub: "contact us",
    emoji: "🏢",
    color: "#38bdf8",
    highlight: false,
    cta: "Contact Us",
    ctaHref: "/landing/contact",
    desc: "White-label bounty infrastructure for large conferences, DAOs, and BCH ecosystem teams.",
    features: [
      "Everything in Bounty Creator",
      "Dedicated infrastructure",
      "White-label branding",
      "Custom AI verification prompts",
      "SLA & dedicated support",
      "Mainnet BCH deployment",
      "Custom smart contract logic",
      "Revenue sharing available",
    ],
    notIncluded: [],
  },
];

const BILLING_FAQS = [
  { q: "Is there really no fee to claim bounties?", a: "Absolutely none. The BCH reward is funded by the bounty creator — you simply claim it. The only 'cost' is a BCH testnet wallet address." },
  { q: "What is BCH Testnet?", a: "The Bitcoin Cash Testnet (Chipnet) is a parallel blockchain used for development and testing. Testnet BCH has no real monetary value but is perfect for demonstrating the technology." },
  { q: "When does mainnet launch?", a: "Mainnet BCH support is planned for mid-2026. All your existing badges and trophy history will be migrated." },
  { q: "How do bounty creators fund rewards?", a: "Creators deposit real BCH into a sponsor wallet. The smart contract automatically distributes rewards when claims are verified." },
  { q: "Are there BCH network fees?", a: "BCH transaction fees are extremely low (~$0.001). For testnet, they are completely free." },
];

export default function PricingPage() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 800, height: 500, background: "radial-gradient(ellipse, rgba(204,255,0,0.05) 0%, transparent 70%)" }} />
      </div>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative py-24 px-6 text-center" style={{ zIndex: 1 }}>
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-block px-4 py-1.5 rounded-full border mb-6 text-xs font-bold uppercase tracking-widest"
              style={{ background: "rgba(204,255,0,0.08)", borderColor: "rgba(204,255,0,0.2)", color: "#CCFF00" }}>
              Pricing
            </div>
            <h1 className="font-black tracking-tighter mb-4" style={{ fontSize: "clamp(2.5rem,6vw,4.5rem)" }}>
              Transparent,<br /><span style={{ color: "#CCFF00" }}>no-surprise pricing</span>
            </h1>
            <p className="text-lg" style={{ color: "rgba(255,255,255,0.5)" }}>
              Claiming bounties is and will always be <strong style={{ color: "white" }}>free</strong>.
              We only charge bounty creators a small listing fee to keep the ecosystem sustainable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Plans ───────────────────────────────────────────── */}
      <section className="relative py-12 px-6" style={{ zIndex: 1 }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((plan, i) => (
              <motion.div key={plan.name}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 }}
                className="rounded-3xl p-8 border flex flex-col relative overflow-hidden"
                style={{
                  background: plan.highlight ? `rgba(204,255,0,0.06)` : "rgba(255,255,255,0.03)",
                  borderColor: plan.highlight ? "rgba(204,255,0,0.3)" : "rgba(255,255,255,0.08)",
                  boxShadow: plan.highlight ? "0 0 60px rgba(204,255,0,0.08)" : "none",
                }}>
                {plan.highlight && (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest"
                    style={{ background: "#CCFF00", color: "#000" }}>Most Popular</div>
                )}
                <div className="text-3xl mb-3">{plan.emoji}</div>
                <h3 className="font-black text-xl mb-1">{plan.name}</h3>
                <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>{plan.desc}</p>
                <div className="mb-8">
                  <span className="font-black" style={{ fontSize: 40, color: plan.color }}>{plan.price}</span>
                  <span className="text-sm ml-2" style={{ color: "rgba(255,255,255,0.35)" }}>{plan.sub}</span>
                </div>

                {plan.comingSoon ? (
                  <div className="w-full py-4 rounded-2xl font-bold text-center mb-8 border"
                    style={{ background: "rgba(168,85,247,0.1)", borderColor: "rgba(168,85,247,0.3)", color: "#a855f7" }}>
                    🚧 Coming Soon
                  </div>
                ) : plan.ctaHref ? (
                  <Link href={plan.ctaHref}
                    className="w-full py-4 rounded-2xl font-bold text-center mb-8 border block transition-all hover:scale-105"
                    style={{ background: "rgba(56,189,248,0.1)", borderColor: "rgba(56,189,248,0.3)", color: "#38bdf8" }}>
                    {plan.cta} →
                  </Link>
                ) : (
                  <Link href="/"
                    className="w-full py-4 rounded-2xl font-bold text-center mb-8 block transition-all hover:scale-105"
                    style={{ background: plan.highlight ? "#CCFF00" : "rgba(255,255,255,0.08)", color: plan.highlight ? "#000" : "white" }}>
                    {plan.cta} {plan.highlight ? "⚡" : "→"}
                  </Link>
                )}

                <ul className="space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <span style={{ color: plan.color }}>✓</span>
                      <span style={{ color: "rgba(255,255,255,0.7)" }}>{f}</span>
                    </li>
                  ))}
                  {plan.notIncluded.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <span style={{ color: "rgba(255,255,255,0.2)" }}>✗</span>
                      <span style={{ color: "rgba(255,255,255,0.25)" }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison note ─────────────────────────────────── */}
      <section className="relative py-16 px-6" style={{ zIndex: 1 }}>
        <div className="max-w-3xl mx-auto">
          <div className="rounded-3xl p-8 border text-center" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}>
            <div className="text-4xl mb-4">💡</div>
            <h3 className="font-black text-xl mb-3">How the economics work</h3>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
              VisionVault is a <strong style={{ color: "white" }}>protocol</strong>, not a service. Bounty creators deposit BCH directly into a sponsor wallet.
              When a claim is verified by AI, &nbsp;BCH is sent peer-to-peer from the sponsor wallet to the winner's wallet.
              We never hold funds. The 0.1 BCH listing fee goes to platform maintenance and
              AI inference costs.
            </p>
          </div>
        </div>
      </section>

      {/* ── Billing FAQ ─────────────────────────────────────── */}
      <section className="relative py-16 px-6 border-t" style={{ borderColor: "rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.015)", zIndex: 1 }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-black text-center mb-10" style={{ fontSize: "clamp(1.5rem,4vw,2.5rem)" }}>
            Billing <span style={{ color: "#CCFF00" }}>FAQ</span>
          </h2>
          <div className="space-y-4">
            {BILLING_FAQS.map((faq, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="rounded-2xl p-6 border"
                style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}>
                <h3 className="font-bold text-sm mb-2">{faq.q}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{faq.a}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>Still have questions about pricing?</p>
            <Link href="/landing/contact" className="px-6 py-3 rounded-2xl font-bold text-sm border transition-all hover:border-yellow-400/30"
              style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)", color: "white" }}>
              Contact Us →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
