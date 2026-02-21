"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Wallet,
  Trophy,
  Plus,
  Camera,
  CheckCircle2,
  XCircle,
  Loader2,
  ChevronRight,
  Home,
  Search,
  User as UserIcon,
  Zap,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCcw,
  Image as ImageIcon,
  ExternalLink,
  AlertTriangle,
  Medal,
  Coins,
  ArrowLeft,
  Upload,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { Bounty, User, SAMPLE_BOUNTIES, CRYPTO_EVENTS, SAMPLE_TRANSACTIONS } from '@/lib/types';

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export default function VisionVaultApp() {
  const [user, setUser] = useState<User>({
    username: 'Satoshi',
    balanceBCH: 5428.44,
    badges: ['Early Adopter'],
    completedBounties: [],
  });

  const [bounties, setBounties] = useState<Bounty[]>(SAMPLE_BOUNTIES);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newBounty, setNewBounty] = useState<Partial<Bounty>>({
    category: 'Social',
    rewardBCH: 0.01,
  });

  const [selectedBounty, setSelectedBounty] = useState<Bounty | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [bchAddress, setBchAddress] = useState('');
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [txId, setTxId] = useState('');
  const [paymentWarning, setPaymentWarning] = useState('');

  // ─── New tab state ────────────────────────────────────────────────────────
  const [walletAddress, setWalletAddress] = useState('');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [tempWalletInput, setTempWalletInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [eventCategory, setEventCategory] = useState('All');
  const [transactions] = useState(SAMPLE_TRANSACTIONS);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ─── Handlers ────────────────────────────────────────────────────────────────
  const handleCreateBounty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBounty.title || !newBounty.description) return;

    const bounty: Bounty = {
      id: Math.random().toString(36).substr(2, 9),
      title: newBounty.title,
      description: newBounty.description,
      rewardBCH: newBounty.rewardBCH || 0.01,
      rewardBadge: `${newBounty.title.split(' ')[0]} Master`,
      sponsor: user.username,
      category: (newBounty.category as Bounty['category']) || 'Social',
      prompt: newBounty.description,
    };

    setBounties([bounty, ...bounties]);
    setIsCreateModalOpen(false);
    setNewBounty({ category: 'Social', rewardBCH: 0.01 });

    confetti({
      particleCount: 50,
      spread: 40,
      origin: { y: 0.9 },
      colors: ['#CCFF00', '#FFFFFF'],
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetVerification = () => {
    setUploadedImage(null);
    setUploadedFile(null);
    setSubmitStatus('idle');
    setErrorMessage('');
    setTxId('');
    setPaymentWarning('');
    setBchAddress('');
  };

  const submitProof = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBounty || !uploadedFile || !bchAddress) return;

    setSubmitStatus('loading');
    setErrorMessage('');
    setTxId('');
    setPaymentWarning('');

    try {
      const formData = new FormData();
      formData.append('image', uploadedFile);
      formData.append('prompt', selectedBounty.prompt);
      formData.append('bchAddress', bchAddress);
      formData.append('rewardBCH', selectedBounty.rewardBCH.toString());


      const res = await fetch('/api/verify', { method: 'POST', body: formData });
      const data = await res.json();

      if (data.success) {
        setSubmitStatus('success');
        setTxId(data.txid ?? '');
        if (data.error) setPaymentWarning(data.error);

        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#CCFF00', '#FFFFFF', '#000000'],
        });
        setTimeout(
          () =>
            confetti({
              particleCount: 60,
              spread: 120,
              origin: { y: 0.55 },
              angle: 60,
              colors: ['#CCFF00', '#99CC00'],
            }),
          400
        );

        // Update user state
        setUser((prev) => ({
          ...prev,
          balanceBCH: prev.balanceBCH + selectedBounty.rewardBCH,
          badges: [...prev.badges, selectedBounty.rewardBadge],
          completedBounties: [...prev.completedBounties, selectedBounty.id],
        }));
      } else if (data.error) {
        setSubmitStatus('error');
        setErrorMessage(data.error);
      } else {
        setSubmitStatus('error');
        setErrorMessage(
          'AI Referee rejected this image. Make sure it clearly matches the bounty criteria and try again.'
        );
      }
    } catch {
      setSubmitStatus('error');
      setErrorMessage('Network error. Is the server running?');
    }
  };

  const closeModal = () => {
    setSelectedBounty(null);
    resetVerification();
  };

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-black text-white pb-24 max-w-md mx-auto relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-[#CCFF00]/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-64 h-64 bg-[#CCFF00]/5 blur-[100px] rounded-full pointer-events-none" />

      {/* ─── Header ────────────────────────────────────────────────────────── */}
      <header className="p-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#CCFF00] overflow-hidden flex items-center justify-center">
            <img
              src="https://picsum.photos/seed/satoshi/100/100"
              alt="Avatar"
              className="w-full h-full object-cover grayscale"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h2 className="text-sm text-white/50 font-medium">Welcome home,</h2>
            <h1 className="text-xl font-bold tracking-tight">{user.username}</h1>
          </div>
        </div>
        <button className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
          <div className="grid grid-cols-2 gap-1">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/40" />
            ))}
          </div>
        </button>
      </header>

      {/* ─── Main Content ──────────────────────────────────────────────────── */}
      <main className="px-6 relative z-10">

        {/* ─── HOME TAB ─────────────────────────────────────────────────────── */}
        {activeTab === 'home' && <div className="space-y-6">

        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#CCFF00] to-[#99CC00] rounded-[2.5rem] p-8 text-black shadow-2xl electric-glow"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
              <span className="text-[10px] font-bold text-[#CCFF00]">$</span>
            </div>
            <span className="text-sm font-bold uppercase tracking-wider opacity-60">CASH</span>
            <div className="ml-auto px-3 py-1 bg-black/10 rounded-full text-[10px] font-bold">
              BCH Vault
            </div>
          </div>
          <div className="text-5xl font-bold tracking-tighter mb-8">
            ${user.balanceBCH.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="flex gap-3">
            <button className="flex-1 bg-black text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2">
              <ArrowDownLeft size={18} /> Deposit
            </button>
            <button className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
              <RefreshCcw size={20} />
            </button>
            <button className="flex-1 bg-black text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2">
              <ArrowUpRight size={18} /> Withdraw
            </button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bento-card">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center">
                <Zap size={16} className="text-[#CCFF00]" />
              </div>
              <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Bounties</span>
            </div>
            <div className="text-2xl font-bold">
              {SAMPLE_BOUNTIES.length - user.completedBounties.length} Available
            </div>
            <div className="mt-2 h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#CCFF00]"
                style={{
                  width: `${(user.completedBounties.length / SAMPLE_BOUNTIES.length) * 100}%`,
                }}
              />
            </div>
          </div>
          <div className="bento-card">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center">
                <Trophy size={16} className="text-[#CCFF00]" />
              </div>
              <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Badges</span>
            </div>
            <div className="text-2xl font-bold">{user.badges.length} Earned</div>
            <div className="flex -space-x-2 mt-3">
              {user.badges.slice(0, 3).map((badge, i) => (
                <div
                  key={i}
                  title={badge}
                  className="w-8 h-8 rounded-full bg-[#CCFF00]/20 border-2 border-[#1C1C1E] flex items-center justify-center"
                >
                  <Trophy size={12} className="text-[#CCFF00]" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bounty List */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Active Bounties</h3>
            <button className="text-[#CCFF00] text-sm font-bold flex items-center gap-1">
              View all <ChevronRight size={16} />
            </button>
          </div>
          <div className="space-y-4">
            {bounties.map((bounty) => (
              <motion.button
                key={bounty.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedBounty(bounty)}
                className={cn(
                  'w-full text-left bento-card flex items-center gap-4 group relative overflow-hidden',
                  user.completedBounties.includes(bounty.id) && 'opacity-50'
                )}
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-[#CCFF00]/10 transition-colors shrink-0">
                  {bounty.category === 'Meetup' ? (
                    <Camera size={24} className="text-[#CCFF00]" />
                  ) : bounty.category === 'Development' ? (
                    <Zap size={24} className="text-[#CCFF00]" />
                  ) : (
                    <ImageIcon size={24} className="text-[#CCFF00]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold truncate">{bounty.title}</h4>
                    {user.completedBounties.includes(bounty.id) && (
                      <CheckCircle2 size={14} className="text-[#CCFF00] shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-white/40 line-clamp-1 mt-0.5">{bounty.description}</p>
                  <div className="text-[10px] text-white/30 font-bold uppercase tracking-widest mt-1">
                    by {bounty.sponsor}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-bold text-[#CCFF00]">+{bounty.rewardBCH} BCH</div>
                  <div className="text-[10px] text-white/30 font-bold uppercase tracking-tighter mt-0.5">
                    {bounty.rewardBadge}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </section>
        </div>} {/* end home tab */}

        {/* ─── SEARCH / EVENTS TAB ──────────────────────────────────────────── */}
        {activeTab === 'search' && (
          <div className="space-y-5 pt-2 pb-10">
            <div>
              <h2 className="text-2xl font-bold mb-1">Discover Events</h2>
              <p className="text-sm text-white/40">Global crypto conferences, BCH meetups & hackathons</p>
            </div>

            {/* Search bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events, cities..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-sm placeholder:text-white/30 focus:outline-none focus:border-[#CCFF00]/50 transition-colors"
              />
            </div>

            {/* Category filter chips */}
            <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
              {['All', 'Conference', 'Meetup', 'Hackathon', 'Workshop'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setEventCategory(cat)}
                  className={cn(
                    'shrink-0 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all',
                    eventCategory === cat
                      ? 'bg-[#CCFF00] text-black'
                      : 'bg-white/5 text-white/40 border border-white/10 hover:border-[#CCFF00]/30'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Event cards */}
            <div className="space-y-4">
              {CRYPTO_EVENTS
                .filter((e) =>
                  (eventCategory === 'All' || e.category === eventCategory) &&
                  (searchQuery === '' ||
                    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    e.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    e.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())))
                )
                .map((event, i) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bento-card cursor-pointer group hover:border-[#CCFF00]/20 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-[#CCFF00]/10 border border-[#CCFF00]/20 flex items-center justify-center text-2xl shrink-0">
                        {event.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-sm leading-tight truncate">{event.name}</h3>
                            <p className="text-xs text-white/40 mt-0.5">📍 {event.location}</p>
                          </div>
                          <div className="shrink-0 text-right">
                            <div className="text-xs font-bold text-[#CCFF00]">+{event.bounty} BCH</div>
                            <div className="text-[10px] text-white/30 mt-0.5">{event.attendees}</div>
                          </div>
                        </div>
                        <p className="text-xs text-white/50 mt-2 leading-relaxed line-clamp-2">{event.description}</p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex gap-1 flex-wrap">
                            <span className="px-2 py-0.5 rounded-full bg-[#CCFF00]/10 text-[10px] text-[#CCFF00] font-bold border border-[#CCFF00]/20">
                              {event.category}
                            </span>
                            {event.tags.slice(0, 2).map((tag) => (
                              <span key={tag} className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] text-white/40 border border-white/5">{tag}</span>
                            ))}
                          </div>
                          <span className="text-[10px] font-bold text-white/30">{event.date}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              {CRYPTO_EVENTS.filter(e =>
                (eventCategory === 'All' || e.category === eventCategory) &&
                (searchQuery === '' || e.name.toLowerCase().includes(searchQuery.toLowerCase()) || e.location.toLowerCase().includes(searchQuery.toLowerCase()))
              ).length === 0 && (
                <div className="text-center py-12 text-white/30">
                  <div className="text-4xl mb-3">🔍</div>
                  <p className="text-sm">No events found. Try a different search.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── TROPHY / TRANSACTIONS TAB ────────────────────────────────────── */}
        {activeTab === 'trophy' && (
          <div className="space-y-5 pt-2 pb-10">
            <div>
              <h2 className="text-2xl font-bold mb-1">Transaction History</h2>
              <p className="text-sm text-white/40">Your BCH activity on VisionVault</p>
            </div>

            {/* Summary stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  label: 'Received',
                  value: transactions.filter(t => t.type === 'received').reduce((s, t) => s + t.amount, 0).toFixed(3),
                  color: '#CCFF00',
                  icon: '📥',
                },
                {
                  label: 'Sent',
                  value: transactions.filter(t => t.type === 'sent').reduce((s, t) => s + t.amount, 0).toFixed(3),
                  color: '#FF6B6B',
                  icon: '📤',
                },
                {
                  label: 'Net',
                  value: (
                    transactions.filter(t => t.type === 'received').reduce((s, t) => s + t.amount, 0) -
                    transactions.filter(t => t.type === 'sent').reduce((s, t) => s + t.amount, 0)
                  ).toFixed(3),
                  color: '#60A5FA',
                  icon: '💰',
                },
              ].map((stat) => (
                <div key={stat.label} className="bento-card text-center p-4">
                  <div className="text-xl mb-1">{stat.icon}</div>
                  <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">{stat.label}</div>
                  <div className="text-base font-bold" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="text-[10px] text-white/30">BCH</div>
                </div>
              ))}
            </div>

            {/* Transaction list */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-white/30 uppercase tracking-widest">Recent Transactions</h3>
              {transactions.map((tx, i) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bento-card flex items-center gap-4"
                >
                  <div className={cn(
                    'w-12 h-12 rounded-2xl flex items-center justify-center shrink-0',
                    tx.type === 'received' ? 'bg-[#CCFF00]/10' : 'bg-red-500/10'
                  )}>
                    {tx.type === 'received'
                      ? <ArrowDownLeft size={20} className="text-[#CCFF00]" />
                      : <ArrowUpRight size={20} className="text-red-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold truncate">{tx.desc}</div>
                    <div className="text-xs text-white/30 mt-0.5">{tx.date}</div>
                    {tx.txid && (
                      <a
                        href={`https://blockchair.com/bitcoin-cash/transaction/${tx.txid}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-[#CCFF00]/50 hover:text-[#CCFF00] transition-colors mt-0.5 flex items-center gap-1"
                      >
                        <ExternalLink size={10} />
                        {tx.txid.slice(0, 18)}...
                      </a>
                    )}
                  </div>
                  <div className={cn(
                    'text-sm font-bold shrink-0',
                    tx.type === 'received' ? 'text-[#CCFF00]' : 'text-red-400'
                  )}>
                    {tx.type === 'received' ? '+' : '-'}{tx.amount} BCH
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* ─── PROFILE TAB ──────────────────────────────────────────────────── */}
        {activeTab === 'profile' && (
          <div className="space-y-5 pt-2 pb-10">

            {/* Avatar + name */}
            <div className="flex flex-col items-center py-6 gap-3">
              <div className="relative">
                <div className="w-24 h-24 rounded-[2rem] bg-[#CCFF00] overflow-hidden border-4 border-[#CCFF00]/30">
                  <img
                    src="https://picsum.photos/seed/satoshi/200/200"
                    alt="Profile"
                    className="w-full h-full object-cover grayscale"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {isWalletConnected && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#CCFF00] flex items-center justify-center">
                    <span className="text-[10px] font-bold text-black">✓</span>
                  </div>
                )}
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold">{user.username}</h2>
                <p className="text-sm text-white/40">BCH Bounty Hunter</p>
                {isWalletConnected && (
                  <p className="text-xs text-[#CCFF00] mt-1 font-mono">{walletAddress.slice(0, 16)}...{walletAddress.slice(-6)}</p>
                )}
              </div>
              <div className="flex gap-8 mt-2">
                {[
                  { label: 'Bounties', value: user.completedBounties.length },
                  { label: 'Badges', value: user.badges.length },
                  { label: 'BCH', value: transactions.filter(t => t.type === 'received').reduce((s, t) => s + t.amount, 0).toFixed(2) },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-xl font-bold text-[#CCFF00]">{stat.value}</div>
                    <div className="text-[10px] text-white/30 uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Wallet Connect */}
            <div className="bento-card">
              <div className="flex items-center gap-2 mb-4">
                <Wallet size={16} className="text-[#CCFF00]" />
                <span className="text-sm font-bold uppercase tracking-widest text-white/40">BCH Wallet</span>
              </div>
              {isWalletConnected ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
                    <span className="text-xs text-[#CCFF00] font-bold">Wallet Connected</span>
                  </div>
                  <div className="font-mono text-xs text-white/60 bg-white/5 rounded-xl p-3 break-all border border-white/10">
                    {walletAddress}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={`https://explorer.bitcoinunlimited.info/address/${walletAddress}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-3 rounded-2xl bg-[#CCFF00]/10 border border-[#CCFF00]/20 text-[#CCFF00] text-xs font-bold transition-all hover:bg-[#CCFF00]/20"
                    >
                      <ExternalLink size={12} /> View on Chain
                    </a>
                    <button
                      onClick={() => { setIsWalletConnected(false); setWalletAddress(''); setTempWalletInput(''); }}
                      className="py-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold transition-all hover:bg-red-500/20"
                    >
                      Disconnect
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs text-white/40 leading-relaxed">
                    Connect your BCH testnet wallet to auto-fill your address when claiming bounties.
                  </p>
                  <input
                    value={tempWalletInput}
                    onChange={(e) => setTempWalletInput(e.target.value)}
                    placeholder="Paste your bchtest:qq... address"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 font-mono text-xs placeholder:text-white/20 focus:outline-none focus:border-[#CCFF00]/50 transition-colors"
                  />
                  <button
                    onClick={() => {
                      if (tempWalletInput.length > 15) {
                        setWalletAddress(tempWalletInput.trim());
                        setIsWalletConnected(true);
                      }
                    }}
                    disabled={tempWalletInput.length < 15}
                    className={cn(
                      'w-full py-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2',
                      tempWalletInput.length >= 15
                        ? 'bg-[#CCFF00] text-black electric-glow'
                        : 'bg-white/5 text-white/20 cursor-not-allowed'
                    )}
                  >
                    <Wallet size={16} /> Connect Wallet ⚡
                  </button>
                </div>
              )}
            </div>

            {/* Badges Gallery */}
            <div className="bento-card">
              <div className="flex items-center gap-2 mb-4">
                <Trophy size={16} className="text-[#CCFF00]" />
                <span className="text-sm font-bold uppercase tracking-widest text-white/40">My Badges</span>
              </div>
              {user.badges.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {user.badges.map((badge, i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#CCFF00]/10 border border-[#CCFF00]/20">
                      <Medal size={14} className="text-[#CCFF00]" />
                      <span className="text-xs font-bold text-[#CCFF00]">{badge}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-white/30 text-center py-4">Complete bounties to earn badges! 🏆</p>
              )}
            </div>

            {/* App Info */}
            <div className="bento-card space-y-1">
              {[
                { label: 'Network', value: 'BCH Testnet', icon: '🌐' },
                { label: 'App Version', value: 'v0.1.0 — VisionVault', icon: '📦' },
                { label: 'AI Verifier', value: 'HuggingFace BLIP', icon: '🤖' },
                { label: 'Smart Contract', value: 'mainnet-js TestNet', icon: '⚡' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-2">
                    <span>{item.icon}</span>
                    <span className="text-sm text-white/60">{item.label}</span>
                  </div>
                  <span className="text-xs font-bold text-white/30">{item.value}</span>
                </div>
              ))}
            </div>

          </div>
        )}

      </main>

      {/* ─── Create Bounty Modal ───────────────────────────────────────────── */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-md bg-[#1C1C1E] rounded-[3rem] p-8 pb-12 border-t border-white/10 relative"
            >
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center"
              >
                <XCircle size={20} className="text-white/40" />
              </button>

              <div className="mb-6">
                <h2 className="text-3xl font-bold tracking-tight mb-2">Create Bounty</h2>
                <p className="text-white/60">Sponsor a task and reward the community.</p>
              </div>

              <form onSubmit={handleCreateBounty} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-2">
                    Title
                  </label>
                  <input
                    required
                    value={newBounty.title || ''}
                    onChange={(e) => setNewBounty({ ...newBounty, title: e.target.value })}
                    placeholder="e.g. Meetup Selfie"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-[#CCFF00]/50 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-2">
                    Description
                  </label>
                  <textarea
                    required
                    value={newBounty.description || ''}
                    onChange={(e) => setNewBounty({ ...newBounty, description: e.target.value })}
                    placeholder="What should the user do? This also becomes the AI verification prompt."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 h-24 focus:outline-none focus:border-[#CCFF00]/50 transition-colors resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-2">
                      Reward (BCH)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={newBounty.rewardBCH || 0.01}
                      onChange={(e) =>
                        setNewBounty({ ...newBounty, rewardBCH: parseFloat(e.target.value) })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-[#CCFF00]/50 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-2">
                      Category
                    </label>
                    <select
                      value={newBounty.category}
                      onChange={(e) =>
                        setNewBounty({ ...newBounty, category: e.target.value as Bounty['category'] })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-[#CCFF00]/50 transition-colors appearance-none"
                    >
                      <option value="Social">Social</option>
                      <option value="Meetup">Meetup</option>
                      <option value="Development">Development</option>
                      <option value="Education">Education</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-5 bg-[#CCFF00] text-black rounded-[2rem] font-bold text-lg electric-glow mt-4"
                >
                  Post Bounty
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Bounty Detail / Proof Submission Modal ────────────────────────── */}
      <AnimatePresence>
        {selectedBounty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-md bg-[#1C1C1E] rounded-[3rem] p-8 pb-12 border-t border-white/10 relative overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center z-10"
              >
                <XCircle size={20} className="text-white/40" />
              </button>

              <AnimatePresence mode="wait">
                {/* ── SUCCESS STATE ── */}
                {submitStatus === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="flex flex-col items-center py-6 gap-6 text-center"
                  >
                    {/* Badge loot-box reveal */}
                    <div className="relative flex items-center justify-center">
                      {[1, 2, 3].map((i) => (
                        <motion.span
                          key={i}
                          initial={{ scale: 0.5, opacity: 0.6 }}
                          animate={{ scale: 2 + i * 0.6, opacity: 0 }}
                          transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            delay: i * 0.3,
                            ease: 'easeOut',
                          }}
                          className="absolute inset-0 rounded-full bg-[#CCFF00]"
                        />
                      ))}
                      <motion.div
                        initial={{ scale: 0, rotate: -180, y: -20 }}
                        animate={{ scale: 1, rotate: 0, y: 0 }}
                        transition={{ type: 'spring', stiffness: 220, damping: 15, delay: 0.1 }}
                        className="relative z-10 rounded-full p-1 electric-glow-lg"
                        style={{
                          background:
                            'conic-gradient(from 0deg, #CCFF00, #99CC00, #CCFF00)',
                        }}
                      >
                        <div className="rounded-full bg-black p-5 shadow-inner">
                          <Medal className="h-14 w-14 text-[#CCFF00] drop-shadow-[0_0_12px_rgba(204,255,0,0.8)]" />
                        </div>
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="space-y-3"
                    >
                      <div className="inline-flex items-center gap-2 rounded-full bg-[#CCFF00]/15 border border-[#CCFF00]/30 px-3 py-1 text-xs font-semibold text-[#CCFF00] uppercase tracking-widest">
                        ✓ Bounty Approved by AI Referee
                      </div>
                      <h2 className="text-2xl font-bold text-white leading-snug">
                        Badge Unlocked! 🎖️
                      </h2>
                      <p className="text-sm text-white/60 leading-relaxed max-w-xs mx-auto">
                        You earned the{' '}
                        <span className="text-[#CCFF00] font-semibold">
                          {selectedBounty.rewardBadge}
                        </span>{' '}
                        badge + {selectedBounty.rewardBCH} BCH sent to your wallet.
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="flex flex-wrap justify-center gap-2"
                    >
                      <span className="flex items-center gap-1.5 rounded-full border border-[#CCFF00]/40 bg-[#CCFF00]/10 px-3 py-1.5 text-xs font-medium text-[#CCFF00]">
                        <Medal className="h-3.5 w-3.5" /> {selectedBounty.rewardBadge} NFT
                      </span>
                      <span className="flex items-center gap-1.5 rounded-full border border-[#CCFF00]/40 bg-[#CCFF00]/10 px-3 py-1.5 text-xs font-medium text-[#CCFF00]">
                        <Coins className="h-3.5 w-3.5" /> {selectedBounty.rewardBCH} BCH
                      </span>
                    </motion.div>

                    {bchAddress && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.85 }}
                        className="w-full space-y-1"
                      >
                        <p className="text-xs text-white/40">Sent to</p>
                        <p className="font-mono text-xs text-[#CCFF00] break-all px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                          {bchAddress}
                        </p>
                      </motion.div>
                    )}

                    {txId && (
                      <motion.a
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.0 }}
                        href={`https://blockchair.com/bitcoin-cash/transaction/${txId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-[#CCFF00]/40 bg-[#CCFF00]/10 px-4 py-2 text-sm font-medium text-[#CCFF00] transition hover:bg-[#CCFF00]/20"
                      >
                        View on Block Explorer <ExternalLink className="h-4 w-4" />
                      </motion.a>
                    )}

                    {paymentWarning && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1 }}
                        className="flex items-start gap-2 rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-3 text-left w-full"
                      >
                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-yellow-400" />
                        <p className="text-xs text-yellow-200">{paymentWarning}</p>
                      </motion.div>
                    )}

                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      onClick={() => { closeModal(); setActiveTab('home'); }}
                      className="mt-1 text-sm text-white/40 transition hover:text-[#CCFF00] flex items-center gap-1"
                    >
                      <ArrowLeft className="h-4 w-4" /> Explore More Bounties
                    </motion.button>
                  </motion.div>
                )}

                {/* ── NORMAL / FORM STATE ── */}
                {submitStatus !== 'success' && (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Bounty Info Header */}
                    <div className="mb-6">
                      <div className="inline-block px-3 py-1 rounded-full bg-[#CCFF00]/10 text-[#CCFF00] text-[10px] font-bold uppercase tracking-widest mb-3">
                        {selectedBounty.category}
                      </div>
                      <h2 className="text-3xl font-bold tracking-tight mb-2">{selectedBounty.title}</h2>
                      <p className="text-white/60 leading-relaxed">{selectedBounty.description}</p>
                    </div>

                    {/* Reward Info */}
                    <div className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/5 mb-6">
                      <div>
                        <div className="text-xs font-bold text-white/30 uppercase tracking-widest mb-1">
                          Reward
                        </div>
                        <div className="text-2xl font-bold text-[#CCFF00]">
                          {selectedBounty.rewardBCH} BCH
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-white/30 uppercase tracking-widest mb-1">
                          Badge
                        </div>
                        <div className="text-sm font-bold">{selectedBounty.rewardBadge}</div>
                      </div>
                    </div>

                    {/* Already Completed */}
                    {user.completedBounties.includes(selectedBounty.id) ? (
                      <div className="p-6 bg-[#CCFF00]/10 rounded-3xl border border-[#CCFF00]/20 text-center">
                        <CheckCircle2 className="text-[#CCFF00] mx-auto mb-2" size={32} />
                        <div className="font-bold text-[#CCFF00]">Bounty Completed</div>
                        <p className="text-xs text-white/40 mt-1">
                          You&apos;ve already earned this reward.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={submitProof} className="space-y-5">
                        {/* BCH Address */}
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-sm font-bold text-white/40 uppercase tracking-widest">
                            <Wallet size={14} className="text-[#CCFF00]" />
                            Your BCH Testnet Address
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="bchtest:qq... or bitcoincash:qq..."
                            value={bchAddress}
                            onChange={(e) => setBchAddress(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 font-mono text-sm placeholder:text-white/20 focus:outline-none focus:border-[#CCFF00]/50 transition-colors"
                          />
                        </div>

                        {/* Image Upload */}
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-sm font-bold text-white/40 uppercase tracking-widest">
                            <Camera size={14} className="text-[#CCFF00]" />
                            Proof Photo
                          </label>

                          {!uploadedImage ? (
                            <div
                              role="button"
                              tabIndex={0}
                              onClick={() => fileInputRef.current?.click()}
                              onDragOver={(e) => e.preventDefault()}
                              onDrop={handleDrop}
                              onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
                              className="w-full h-48 border-2 border-dashed border-white/10 rounded-[2rem] flex flex-col items-center justify-center gap-3 hover:border-[#CCFF00]/50 hover:bg-[#CCFF00]/5 transition-all duration-300 cursor-pointer group"
                            >
                              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-[#CCFF00]/10 transition-colors">
                                <Upload size={24} className="text-white/40 group-hover:text-[#CCFF00]" />
                              </div>
                              <div className="text-center">
                                <span className="text-sm font-bold text-white/40 group-hover:text-white/70 block transition-colors">
                                  Tap to upload or drag &amp; drop
                                </span>
                                <span className="text-xs text-white/20 mt-1 block">JPG, PNG — max 5 MB</span>
                              </div>
                              <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                className="hidden"
                                accept="image/*"
                              />
                            </div>
                          ) : (
                            <div className="relative w-full h-48 rounded-[2rem] overflow-hidden border border-white/10">
                              <img
                                src={uploadedImage}
                                alt="Proof"
                                className="w-full h-full object-cover"
                              />
                              <button
                                type="button"
                                onClick={() => { setUploadedImage(null); setUploadedFile(null); }}
                                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center"
                              >
                                <RefreshCcw size={14} />
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Error Banner */}
                        <AnimatePresence>
                          {submitStatus === 'error' && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4"
                            >
                              <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                              <p className="text-sm text-red-200">{errorMessage}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={!uploadedImage || !bchAddress || submitStatus === 'loading'}
                          className={cn(
                            'w-full py-5 rounded-[2rem] font-bold text-lg flex items-center justify-center gap-3 transition-all',
                            uploadedImage && bchAddress && submitStatus !== 'loading'
                              ? 'bg-[#CCFF00] text-black electric-glow'
                              : 'bg-white/5 text-white/20 cursor-not-allowed'
                          )}
                        >
                          {submitStatus === 'loading' ? (
                            <>
                              <Loader2 className="animate-spin" />
                              AI Verifying...
                            </>
                          ) : (
                            'Verify & Claim Bounty ⚡'
                          )}
                        </button>
                      </form>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Navigation Bar ────────────────────────────────────────────────── */}
      <nav className="fixed bottom-6 left-6 right-6 h-20 bg-[#1C1C1E]/80 backdrop-blur-xl rounded-[2.5rem] border border-white/10 flex items-center justify-around px-4 z-40 max-w-md mx-auto">
        {[
          { id: 'home', icon: Home },
          { id: 'search', icon: Search },
          { id: 'add', icon: Plus, primary: true, action: () => setIsCreateModalOpen(true) },
          { id: 'trophy', icon: Trophy },
          { id: 'profile', icon: UserIcon },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              if (item.action) {
                item.action();
              } else {
                setActiveTab(item.id);
              }
            }}
            className={cn(
              'relative flex items-center justify-center transition-all duration-300',
              item.primary
                ? 'w-14 h-14 bg-[#CCFF00] rounded-2xl text-black -mt-12 shadow-lg electric-glow'
                : 'w-12 h-12 text-white/40',
              activeTab === item.id && !item.primary && 'text-[#CCFF00]'
            )}
          >
            <item.icon
              size={item.primary ? 28 : 24}
              strokeWidth={activeTab === item.id ? 2.5 : 2}
            />
            {activeTab === item.id && !item.primary && (
              <motion.div
                layoutId="nav-dot"
                className="absolute -bottom-2 w-1 h-1 rounded-full bg-[#CCFF00]"
              />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}
