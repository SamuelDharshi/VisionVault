"use client";
import { motion } from "motion/react";

const SECTIONS = [
  {
    title: "1. Information We Collect",
    content: `VisionVault is designed to collect as little personal information as possible.

**What we DO collect:**
- BCH wallet addresses submitted as part of bounty claims (public blockchain data)
- Images uploaded for AI verification (processed in memory, not persistently stored)
- Anonymous usage analytics via privacy-respecting tools
- Contact form submissions (name, email, message) if you voluntarily reach out

**What we do NOT collect:**
- Your name, unless voluntarily provided
- Government ID or KYC information
- Browser history or tracking cookies
- Financial information (we never handle fiat currency)`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use collected information solely to:
- Process and verify your bounty submission using AI
- Send BCH rewards to your provided wallet address
- Mint CashToken NFT badges on the BCH blockchain
- Respond to support inquiries you initiate
- Improve our AI verification accuracy through anonymized aggregate data

We do **not** sell, rent, or trade your information to any third parties.`,
  },
  {
    title: "3. Blockchain Transparency",
    content: `By using VisionVault, you understand and agree that:
- Your BCH wallet address and all transactions are recorded on the **public Bitcoin Cash blockchain**
- Blockchain transactions are permanent and cannot be deleted
- Anyone can view transaction details using a block explorer
- VisionVault has no ability to reverse or modify on-chain transactions

This is a fundamental property of blockchain technology, not a privacy limitation of VisionVault.`,
  },
  {
    title: "4. Image Processing",
    content: `Images you upload for bounty verification:
- Are transmitted securely via HTTPS
- Are processed by the HuggingFace BLIP AI model via their Inference API
- Are subject to HuggingFace's Privacy Policy for API processing
- Are **not** permanently stored on VisionVault servers
- Are held in memory only for the duration of the verification request

We strongly recommend not uploading images containing sensitive personal information beyond what the bounty requires (e.g., your face is not required for most bounties).`,
  },
  {
    title: "5. Cookies & Analytics",
    content: `VisionVault uses:
- **No third-party advertising cookies**
- **No cross-site tracking**
- Minimal session cookies for UI state (dark mode preference, etc.)
- Privacy-first anonymous analytics to understand aggregate usage patterns

You can disable cookies in your browser settings without affecting core VisionVault functionality.`,
  },
  {
    title: "6. Data Retention",
    content: `- **Bounty claim data** (wallet address + verification result): retained for 90 days for dispute resolution purposes
- **Contact form submissions**: retained for 12 months
- **Images**: not retained — purged after AI verification completes
- **Blockchain data**: permanent by nature of the BCH blockchain (beyond our control)`,
  },
  {
    title: "7. Your Rights (GDPR & Global)",
    content: `Regardless of your jurisdiction, you have the right to:
- **Access**: request a copy of any personal data we hold about you
- **Deletion**: request deletion of off-chain personal data (e.g., contact form data)
- **Correction**: request correction of inaccurate personal data
- **Portability**: receive your data in a machine-readable format
- **Object**: opt out of analytics collection

To exercise any of these rights, contact us at **privacy@visionvault.xyz**.

Note: Blockchain-recorded data (wallet addresses, transactions) **cannot** be deleted due to the immutable nature of the BCH blockchain.`,
  },
  {
    title: "8. Children's Privacy",
    content: `VisionVault is intended for users 18 years of age and older. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us immediately at privacy@visionvault.xyz.`,
  },
  {
    title: "9. Third-Party Services",
    content: `VisionVault integrates with the following third-party services:
- **HuggingFace** (AI inference): processes uploaded images. See HuggingFace Privacy Policy.
- **BCH Mainnet/Chipnet** (blockchain): public ledger for transactions
- **Vercel** (hosting): our application is hosted on Vercel. See Vercel Privacy Policy.
- **Chipnet Imaginary Cash** (block explorer): for linking to transaction details

We are not responsible for the privacy practices of these third-party services.`,
  },
  {
    title: "10. Changes to This Policy",
    content: `We may update this Privacy Policy as our platform evolves. We will:
- Post the updated policy at this URL with a new "Last Updated" date
- Notify users via our Telegram channel for material changes

Continued use of VisionVault after updates constitutes acceptance of the revised policy.`,
  },
  {
    title: "11. Contact Us",
    content: `For privacy-related inquiries:
- **Email**: privacy@visionvault.xyz
- **Telegram**: @VisionVaultBCH
- **Mailing address**: Available upon request

We aim to respond to all privacy inquiries within 30 days.`,
  },
];

export default function PrivacyPage() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <section className="relative py-24 px-6" style={{ zIndex: 1 }}>
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-block px-4 py-1.5 rounded-full border mb-6 text-xs font-bold uppercase tracking-widest"
              style={{ background: "rgba(204,255,0,0.08)", borderColor: "rgba(204,255,0,0.2)", color: "#CCFF00" }}>
              Legal
            </div>
            <h1 className="font-black tracking-tighter mb-3" style={{ fontSize: "clamp(2.5rem,6vw,4rem)" }}>
              Privacy <span style={{ color: "#CCFF00" }}>Policy</span>
            </h1>
            <p className="text-sm mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>
              Last Updated: January 1, 2026 · Effective: January 1, 2026
            </p>
            <p className="text-base leading-relaxed mt-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              VisionVault (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting your privacy.
              This policy explains what information we collect, how we use it, and your rights regarding your data.
              We believe in radical transparency about our data practices.
            </p>
          </motion.div>

          {/* TL;DR Box */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="mt-8 rounded-3xl p-6 border mb-12"
            style={{ background: "rgba(204,255,0,0.06)", borderColor: "rgba(204,255,0,0.2)" }}>
            <h2 className="font-black text-base mb-3 flex items-center gap-2">
              <span>⚡</span> TL;DR (Plain English)
            </h2>
            <ul className="space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
              {[
                "We collect your BCH address and uploaded photos — nothing else.",
                "Photos are processed by AI and deleted immediately after — we don't store them.",
                "We never sell your data. Not now, not ever.",
                "Your on-chain transactions are public by design (it's a blockchain).",
                "You can request deletion of any off-chain data we hold.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span style={{ color: "#CCFF00" }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Sections */}
          <div className="space-y-8">
            {SECTIONS.map((s, i) => (
              <motion.div key={s.title}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                className="rounded-2xl p-6 border"
                style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}>
                <h2 className="font-bold text-base mb-4" style={{ color: "#CCFF00" }}>{s.title}</h2>
                <div className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "rgba(255,255,255,0.6)" }}>
                  {s.content.split(/\*\*(.*?)\*\*/g).map((part, j) =>
                    j % 2 === 1 ? <strong key={j} style={{ color: "white" }}>{part}</strong> : part
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
