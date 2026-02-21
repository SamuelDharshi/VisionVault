"use client";
import { motion } from "motion/react";
import { useState } from "react";

const CONTACT_METHODS = [
  { icon: "📧", label: "Email", value: "hello@visionvault.xyz", href: "mailto:hello@visionvault.xyz", desc: "Best for billing, partnerships, and serious inquiries." },
  { icon: "💬", label: "Telegram", value: "@VisionVaultBCH", href: "https://t.me/VisionVaultBCH", desc: "Fastest response. Community discussion & support." },
  { icon: "🐦", label: "Twitter / X", value: "@VisionVaultBCH", href: "https://x.com", desc: "Updates, announcements, and community Q&A." },
  { icon: "🛠️", label: "GitHub Issues", value: "github.com/visionvault", href: "https://github.com", desc: "Bug reports, feature requests, and code contributions." },
];

const TOPICS = [
  "General Question",
  "Bug Report",
  "Feature Request",
  "Partnership / Collaboration",
  "Bounty Creator Inquiry",
  "Press / Media",
  "Other",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", topic: TOPICS[0], message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: 600, height: 600, background: "radial-gradient(ellipse, rgba(204,255,0,0.04) 0%, transparent 70%)" }} />
      </div>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative py-24 px-6 text-center" style={{ zIndex: 1 }}>
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-block px-4 py-1.5 rounded-full border mb-6 text-xs font-bold uppercase tracking-widest"
              style={{ background: "rgba(204,255,0,0.08)", borderColor: "rgba(204,255,0,0.2)", color: "#CCFF00" }}>
              Contact & Support
            </div>
            <h1 className="font-black tracking-tighter mb-4" style={{ fontSize: "clamp(2.5rem,6vw,4.5rem)" }}>
              We&apos;re here<br /><span style={{ color: "#CCFF00" }}>to help</span>
            </h1>
            <p className="text-lg" style={{ color: "rgba(255,255,255,0.5)" }}>
              Found a bug? Have a partnership idea? Just want to say hi? We read every message.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Content ─────────────────────────────────────────── */}
      <section className="relative pb-24 px-6" style={{ zIndex: 1 }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">

          {/* Contact Methods */}
          <div>
            <h2 className="font-black text-xl mb-6">Direct channels</h2>
            <div className="space-y-4 mb-10">
              {CONTACT_METHODS.map((m, i) => (
                <motion.a key={m.label} href={m.href} target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-5 rounded-2xl border group transition-all hover:border-yellow-400/20"
                  style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 border"
                    style={{ background: "rgba(204,255,0,0.08)", borderColor: "rgba(204,255,0,0.15)" }}>
                    {m.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm">{m.label}</div>
                    <div className="text-xs font-mono mt-0.5" style={{ color: "#CCFF00" }}>{m.value}</div>
                    <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>{m.desc}</div>
                  </div>
                  <span className="text-lg transition-transform group-hover:translate-x-1" style={{ color: "rgba(255,255,255,0.2)" }}>→</span>
                </motion.a>
              ))}
            </div>

            {/* Response time */}
            <div className="rounded-2xl p-5 border" style={{ background: "rgba(204,255,0,0.04)", borderColor: "rgba(204,255,0,0.12)" }}>
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="font-bold text-sm mb-1">Typical response time</h3>
              <p className="text-sm" style={{ color: "rgba(255, 255, 255, 0.5)" }}>
                Telegram: &lt; 4 hours · Email: 24–48 hours · GitHub: 1–3 business days
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="font-black text-xl mb-6">Send a message</h2>

            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="rounded-3xl p-10 border text-center"
                style={{ background: "rgba(204,255,0,0.06)", borderColor: "rgba(204,255,0,0.2)" }}>
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="font-black text-xl mb-2">Message sent!</h3>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Thanks for reaching out. We&apos;ll get back to you within 24–48 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { id: "name", label: "Your Name", type: "text", placeholder: "Satoshi Nakamoto" },
                  { id: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
                ].map((field) => (
                  <div key={field.id}>
                    <label htmlFor={field.id} className="block text-xs font-bold uppercase tracking-widest mb-2"
                      style={{ color: "rgba(255,255,255,0.4)" }}>
                      {field.label}
                    </label>
                    <input id={field.id} type={field.type} required
                      placeholder={field.placeholder}
                      value={form[field.id as keyof typeof form]}
                      onChange={e => setForm({ ...form, [field.id]: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border text-sm outline-none transition-all focus:border-yellow-400/40"
                      style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)", color: "white" }}
                    />
                  </div>
                ))}

                <div>
                  <label htmlFor="topic" className="block text-xs font-bold uppercase tracking-widest mb-2"
                    style={{ color: "rgba(255,255,255,0.4)" }}>Topic</label>
                  <select id="topic" value={form.topic}
                    onChange={e => setForm({ ...form, topic: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border text-sm outline-none"
                    style={{ background: "#111", borderColor: "rgba(255,255,255,0.1)", color: "white" }}>
                    {TOPICS.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest mb-2"
                    style={{ color: "rgba(255,255,255,0.4)" }}>Message</label>
                  <textarea id="message" required rows={5}
                    placeholder="Tell us what's on your mind..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border text-sm outline-none transition-all focus:border-yellow-400/40 resize-none"
                    style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)", color: "white" }}
                  />
                </div>

                <button type="submit" disabled={loading}
                  className="w-full py-4 rounded-2xl font-bold text-sm transition-all hover:scale-105 disabled:opacity-60 disabled:scale-100"
                  style={{ background: "#CCFF00", color: "#000" }}>
                  {loading ? "Sending..." : "Send Message ⚡"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
