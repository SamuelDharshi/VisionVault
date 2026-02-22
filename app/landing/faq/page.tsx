"use client";
import { motion } from "motion/react";
import { useState } from "react";

const CATEGORIES = ["All", "Getting Started", "Bounties", "AI Verification", "BCH & Wallets", "NFT Badges", "Technical"];

const FAQS = [
  // Getting Started
  { cat: "Getting Started", q: "What is VisionVault?", a: "VisionVault is an AI-powered bounty verification platform built on Bitcoin Cash. You upload a photo as proof of completing a real-world task, our AI verifies it, and you receive BCH + a CashToken NFT badge automatically — no human review required." },
  { cat: "Getting Started", q: "Do I need to create an account?", a: "No account needed. VisionVault is completely permissionless. You only need a Bitcoin Cash testnet wallet address to receive rewards. No email, no password, no KYC." },
  { cat: "Getting Started", q: "How do I get a BCH testnet wallet?", a: "We recommend Electron Cash (desktop) or using the Chipnet testnet mode. You can get free testnet BCH from the faucet at tbch.googol.cash. The app will guide you through this." },
  { cat: "Getting Started", q: "Is VisionVault on mainnet?", a: "Currently VisionVault runs on BCH Testnet (Chipnet) for safety during the hackathon phase. Mainnet launch is planned for mid-2026 after thorough security audits." },
  // Bounties
  { cat: "Bounties", q: "What kinds of bounties are available?", a: "Bounties cover real-world BCH events: meetups, conferences, hackathons, merchant adoption demonstrations, community service tasks, and developer contributions. New bounties are added by event organizers." },
  { cat: "Bounties", q: "How much BCH can I earn per bounty?", a: "Rewards range from 0.002 BCH for basic participation bounties to 0.02 BCH for major conference attendance or significant contributions. Each bounty clearly states the reward upfront." },
  { cat: "Bounties", q: "Can I claim the same bounty twice?", a: "No. Each bounty is designed as a one-time-per-user claim. This is enforced by the sponsor wallet logic which tracks claimed addresses." },
  { cat: "Bounties", q: "What if there are no bounties near me?", a: "Global bounties (like contributing to open source projects or creating BCH educational content) are available to anyone, anywhere. Location-specific bounties expand as the ecosystem grows." },
  { cat: "Bounties", q: "How are bounties created?", a: "Currently, bounties are seeded by the VisionVault team and hackathon organizers. In future versions, any BCH holder can create and fund a bounty through the Bounty Creator tier." },
  // AI Verification
  { cat: "AI Verification", q: "What AI model does VisionVault use?", a: "We use Salesforce/blip-image-captioning-large via the HuggingFace Inference API. It's a state-of-the-art vision-language model that generates text captions from images, which we compare against the bounty prompt." },
  { cat: "AI Verification", q: "How accurate is the AI?", a: "For clear, well-lit photos that match the bounty description, accuracy is very high (95%+). Poor lighting, ambiguous framing, or unrelated content will result in rejection. Read each bounty's tips for best results." },
  { cat: "AI Verification", q: "What if the AI wrongly rejects my photo?", a: "You can resubmit with a better photo. We're working on an appeal mechanism for v2 where a CAPTCHA challenge can override an AI rejection in edge cases." },
  { cat: "AI Verification", q: "How fast is verification?", a: "Typically under 5 seconds. If the model is cold-starting (it sleeps after inactivity), the first request may take up to 20 seconds. Subsequent requests are fast." },
  { cat: "AI Verification", q: "Is AI verification always required?", a: "Yes, for photo bounties. We have a fallback mode where if the AI is completely unavailable, a simpler image-present check is used (for demo reliability). This will be removed in production." },
  // BCH & Wallets
  { cat: "BCH & Wallets", q: "What wallet should I use?", a: "For testnet: Electron Cash in Chipnet mode, or any BCH wallet supporting testnet. For future mainnet: any standard BCH wallet (Electron Cash, Bitcoin.com Wallet, etc.)." },
  { cat: "BCH & Wallets", q: "Where do I get testnet BCH?", a: "Free testnet BCH is available at tbch.googol.cash. Simply paste your testnet cashaddr and request funds." },
  { cat: "BCH & Wallets", q: "How long does the BCH transfer take to confirm?", a: "BCH has 10-minute block times, but the transaction is broadcast immediately and visible in mempool within seconds. Zero-confirmation transactions are generally reliable on BCH." },
  // NFT Badges
  { cat: "NFT Badges", q: "What are CashToken NFT badges?", a: "CashToken NFTs are a native token standard on Bitcoin Cash (CIP-1). VisionVault mints a unique NFT badge directly on-chain when you complete a bounty. It's a permanent, immutable record of your achievement." },
  { cat: "NFT Badges", q: "Where can I view my NFT badges?", a: "In the Trophy tab inside the VisionVault app, or on the BCH Chipnet explorer at chipnet.imaginary.cash. You can also view them in any CashTokens-compatible wallet." },
  { cat: "NFT Badges", q: "Do NFT badges have real value?", a: "On testnet, no. On mainnet, their value will depend on scarcity and the prestige of the event. Early adopter badges from major BCH events could become collectibles." },
  // Technical
  { cat: "Technical", q: "Is VisionVault open source?", a: "Yes! The entire codebase is open source on GitHub under the MIT License. You can audit, fork, and contribute to VisionVault." },
  { cat: "Technical", q: "What technology stack powers VisionVault?", a: "Next.js 15 (App Router) for the frontend, mainnet-js for BCH & CashToken operations, HuggingFace BLIP for AI vision, and framer-motion for animations. All deployed on Vercel." },
  { cat: "Technical", q: "Can I run my own instance of VisionVault?", a: "Yes. Clone the repo, set your SPONSOR_WALLET_SEED and optional HF_TOKEN in .env.local, run npm run dev, and you have a fully functional VisionVault instance." },
];

export default function FAQPage() {
  const [selected, setSelected] = useState("All");
  const [open, setOpen] = useState<number | null>(null);

  const filtered = FAQS.filter(f => selected === "All" || f.cat === selected);

  return (
    <div style={{ overflowX: "hidden" }}>
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 700, height: 400, background: "radial-gradient(ellipse, rgba(204,255,0,0.045) 0%, transparent 70%)" }} />
      </div>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative py-24 px-6 text-center" style={{ zIndex: 1 }}>
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-block px-4 py-1.5 rounded-full border mb-6 text-xs font-bold uppercase tracking-widest"
              style={{ background: "rgba(204,255,0,0.08)", borderColor: "rgba(204,255,0,0.2)", color: "#CCFF00" }}>
              Help Center
            </div>
            <h1 className="font-black tracking-tighter mb-4" style={{ fontSize: "clamp(2.5rem,6vw,4.5rem)" }}>
              Frequently Asked<br /><span style={{ color: "#CCFF00" }}>Questions</span>
            </h1>
            <p className="text-lg" style={{ color: "rgba(255,255,255,0.5)" }}>
              Everything you need to know about VisionVault, bounties, AI verification, and BCH.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Filter tabs ─────────────────────────────────────── */}
      <section className="relative px-6 mb-8" style={{ zIndex: 1 }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => { setSelected(cat); setOpen(null); }}
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all border"
                style={{
                  background: selected === cat ? "rgba(204,255,0,0.12)" : "rgba(255,255,255,0.03)",
                  borderColor: selected === cat ? "rgba(204,255,0,0.35)" : "rgba(255,255,255,0.08)",
                  color: selected === cat ? "#CCFF00" : "rgba(255,255,255,0.45)",
                }}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ Accordion ───────────────────────────────────── */}
      <section className="relative pb-24 px-6" style={{ zIndex: 1 }}>
        <div className="max-w-3xl mx-auto">
          <div className="space-y-3">
            {filtered.map((faq, i) => (
              <motion.div key={`${selected}-${i}`}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="rounded-2xl border overflow-hidden"
                style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}>
                <button onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-start justify-between px-6 py-5 text-left gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest mb-1 block"
                      style={{ color: "rgba(204,255,0,0.5)" }}>{faq.cat}</span>
                    <span className="font-bold text-sm">{faq.q}</span>
                  </div>
                  <span className="text-2xl font-light shrink-0 mt-1 leading-none transition-transform"
                    style={{ color: "#CCFF00", transform: open === i ? "rotate(45deg)" : "" }}>+</span>
                </button>
                {open === i && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                    className="px-6 pb-5 text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.55)" }}>
                    {faq.a}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Still need help? */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mt-12 rounded-3xl p-8 border text-center"
            style={{ background: "rgba(204,255,0,0.04)", borderColor: "rgba(204,255,0,0.15)" }}>
            <div className="text-4xl mb-3">🤔</div>
            <h3 className="font-bold text-base mb-2">Didn&apos;t find your answer?</h3>
            <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
              Our team is active on Telegram and responds to every message.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://t.me/VisionVaultBCH" target="_blank" rel="noopener noreferrer"
                className="px-6 py-3 rounded-2xl font-bold text-sm transition-all hover:scale-105"
                style={{ background: "#CCFF00", color: "#000" }}>
                Chat on Telegram ⚡
              </a>
              <a href="/landing/contact"
                className="px-6 py-3 rounded-2xl font-bold text-sm border transition-all"
                style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)", color: "white" }}>
                Send us an email →
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
