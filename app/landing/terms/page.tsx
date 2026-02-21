"use client";
import { motion } from "motion/react";

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing or using VisionVault (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use the Service.

These Terms constitute a legally binding agreement between you and VisionVault ("we", "us", "our"). We reserve the right to modify these Terms at any time — continued use after changes constitutes acceptance.`,
  },
  {
    title: "2. Description of Service",
    content: `VisionVault is an AI-powered bounty verification platform built on the Bitcoin Cash (BCH) blockchain. The Service allows users to:
- Browse and discover real-world bounty challenges
- Submit photo-based proof of task completion
- Receive automated AI verification of submitted proof
- Receive BCH rewards and CashToken NFT badges upon successful verification

The Service currently operates on the **BCH Testnet (Chipnet)** and involves no real monetary value for testnet transactions.`,
  },
  {
    title: "3. Eligibility",
    content: `To use VisionVault, you must:
- Be at least 18 years of age
- Not be a resident of a jurisdiction where cryptocurrency activities are prohibited
- Agree to comply with all applicable local, national, and international laws

You do not need to create an account to use the Service in its current form. Providing a BCH wallet address is sufficient to participate.`,
  },
  {
    title: "4. Bounty Claims & AI Verification",
    content: `**User Responsibilities:**
- You must submit honest, unaltered photographs as proof of task completion
- Submitting fraudulent, AI-generated, or manipulated images constitutes a violation of these Terms
- Each bounty may only be claimed once per wallet address

**AI Verification Disclaimer:**
- Our AI verification system may make errors in both directions (false approvals and false rejections)
- VisionVault makes no guarantee of AI accuracy for any specific submission
- We reserve the right to implement additional anti-fraud measures at any time
- Appeals for AI rejections may be submitted through our support channels (v2 feature)

**No Guarantee of Reward:**
- Submission of proof does not guarantee a reward; successful AI verification is required
- Rewards are contingent on the sponsor wallet being funded with sufficient BCH`,
  },
  {
    title: "5. BCH Transactions & CashTokens",
    content: `**Irreversibility:** All BCH transactions and CashToken minting operations are **irreversible** once confirmed on the blockchain. VisionVault cannot reverse, refund, or retrieve any blockchain transaction.

**Testnet vs. Mainnet:** During the testnet phase, all BCH and NFTs are on the Chipnet testnet and have **no real monetary value**. Future mainnet operations will involve real BCH.

**Wallet Security:** You are solely responsible for the security of your BCH wallet. VisionVault has no access to your private keys and cannot recover lost wallets or funds.

**Sponsor Wallet:** VisionVault may operate a sponsor wallet to fund rewards. Sponsor wallet balances are subject to availability — if the sponsor wallet is empty, rewards cannot be distributed.`,
  },
  {
    title: "6. Prohibited Activities",
    content: `You agree NOT to:
- Submit fraudulent, AI-generated, or otherwise falsified proof images
- Use automated bots or scripts to submit bounty claims
- Attempt to exploit, hack, or manipulate the AI verification system
- Create or submit content that is illegal, defamatory, obscene, or harmful
- Impersonate any person or entity
- Attempt to claim bounties on behalf of multiple wallet addresses
- Use the Service to launder money or fund illegal activities
- Reverse engineer or attempt to extract proprietary algorithms

Violation of these prohibitions may result in permanent exclusion from the Service and, where applicable, legal action.`,
  },
  {
    title: "7. Intellectual Property",
    content: `**VisionVault IP:** Our platform, brand, code (except open-source components), and design elements are the intellectual property of VisionVault.

**Open Source:** VisionVault's codebase is open source under the MIT License. You may use, copy, modify, and distribute the code with attribution.

**Your Content:** You retain rights to photos you submit. By submitting, you grant us a limited, temporary license to process the image through our AI systems for verification purposes. We do not claim ownership of or permanently store your images.

**CashToken NFTs:** CashToken NFT badges minted by VisionVault are on-chain assets. Once minted to your wallet, they are under your full ownership and control.`,
  },
  {
    title: "8. Disclaimers & Limitation of Liability",
    content: `**NO WARRANTIES:** THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.

**CRYPTO RISK ACKNOWLEDGMENT:** You understand and accept that:
- Cryptocurrency values are volatile and may lose value
- Blockchain transactions are irreversible
- Smart contract code may contain bugs notwithstanding our best efforts
- Regulatory environments for cryptocurrency vary by jurisdiction and may change

**LIMITATION OF LIABILITY:** TO THE MAXIMUM EXTENT PERMITTED BY LAW, VISIONVAULT SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICE, INCLUDING BUT NOT LIMITED TO LOST PROFITS, LOST BCH, OR DATA LOSS.

Our total aggregate liability to you shall not exceed the equivalent of $100 USD.`,
  },
  {
    title: "9. Indemnification",
    content: `You agree to indemnify, defend, and hold harmless VisionVault and its operators, contributors, and affiliates from any claims, liabilities, damages, costs, and expenses (including legal fees) arising out of:
- Your use or misuse of the Service
- Your violation of these Terms
- Your violation of any third-party rights
- Any fraudulent bounty submissions you make`,
  },
  {
    title: "10. Governing Law & Dispute Resolution",
    content: `These Terms are governed by applicable law without regard to conflict-of-law principles. Any disputes arising from these Terms or the Service shall first be attempted to be resolved through good-faith negotiation.

If negotiation fails, disputes shall be resolved through binding arbitration. Class action suits against VisionVault are expressly waived.`,
  },
  {
    title: "11. Modifications & Termination",
    content: `We may modify these Terms at any time. Significant changes will be announced via our Telegram channel and website. Continued use 30 days after changes constitutes acceptance.

We reserve the right to suspend or terminate your access to the Service at any time for violation of these Terms, without prior notice.`,
  },
  {
    title: "12. Contact Information",
    content: `For questions about these Terms:
- **Email**: legal@visionvault.xyz
- **Telegram**: @VisionVaultBCH

We aim to respond to all legal inquiries within 10 business days.`,
  },
];

export default function TermsPage() {
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
              Terms of <span style={{ color: "#CCFF00" }}>Service</span>
            </h1>
            <p className="text-sm mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>
              Last Updated: January 1, 2026 · Effective: January 1, 2026
            </p>
            <p className="text-base leading-relaxed mt-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              Please read these Terms of Service carefully before using VisionVault. They govern your use of our
              platform and establish important rights and obligations for both you and us.
            </p>
          </motion.div>

          {/* Key points box */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="mt-8 rounded-3xl p-6 border mb-12"
            style={{ background: "rgba(204,255,0,0.06)", borderColor: "rgba(204,255,0,0.2)" }}>
            <h2 className="font-black text-base mb-3">⚠️ Key Points</h2>
            <ul className="space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
              {[
                "Currently on BCH Testnet — no real monetary value involved.",
                "Only submit genuine, unaltered photos as bounty proof.",
                "All BCH transactions are irreversible by design.",
                "You are responsible for your own wallet security.",
                "AI verification may make errors — we do not guarantee reward.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span style={{ color: "#CCFF00" }}>→</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Sections */}
          <div className="space-y-6">
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

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="mt-10 pt-8 border-t text-center" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
              By using VisionVault, you confirm you have read, understood, and agree to these Terms of Service.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
