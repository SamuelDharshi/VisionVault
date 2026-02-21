/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
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
  Image as ImageIcon
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Bounty, User, SAMPLE_BOUNTIES } from './types';
import { verifyBountyProof, VerificationResult } from './services/geminiService';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
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
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      category: newBounty.category as any || 'Social',
    };

    setBounties([bounty, ...bounties]);
    setIsCreateModalOpen(false);
    setNewBounty({ category: 'Social', rewardBCH: 0.01 });
    
    confetti({
      particleCount: 50,
      spread: 40,
      origin: { y: 0.9 },
      colors: ['#CCFF00', '#FFFFFF']
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitProof = async () => {
    if (!selectedBounty || !uploadedImage) return;

    setIsVerifying(true);
    setVerificationResult(null);

    const result = await verifyBountyProof(selectedBounty.description, uploadedImage);
    
    setIsVerifying(false);
    setVerificationResult(result);

    if (result.approved) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#CCFF00', '#FFFFFF', '#000000']
      });

      // Update user state
      setUser(prev => ({
        ...prev,
        balanceBCH: prev.balanceBCH + selectedBounty.rewardBCH,
        badges: [...prev.badges, selectedBounty.rewardBadge],
        completedBounties: [...prev.completedBounties, selectedBounty.id]
      }));
    }
  };

  const resetVerification = () => {
    setUploadedImage(null);
    setVerificationResult(null);
    setIsVerifying(false);
  };

  return (
    <div className="min-h-screen bg-black text-white pb-24 max-w-md mx-auto relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-electric-green/10 blur-[100px] rounded-full" />
      <div className="absolute bottom-[20%] right-[-10%] w-64 h-64 bg-electric-green/5 blur-[100px] rounded-full" />

      {/* Header */}
      <header className="p-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-electric-green overflow-hidden flex items-center justify-center">
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
            {[1,2,3,4].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/40" />)}
          </div>
        </button>
      </header>

      {/* Main Content */}
      <main className="px-6 space-y-6 relative z-10">
        {/* Balance Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-electric-green to-[#99CC00] rounded-[2.5rem] p-8 text-black shadow-2xl electric-glow"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
              <span className="text-[10px] font-bold text-electric-green">$</span>
            </div>
            <span className="text-sm font-bold uppercase tracking-wider opacity-60">CASH</span>
            <div className="ml-auto px-3 py-1 bg-black/10 rounded-full text-[10px] font-bold">FDIC Insured</div>
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
                <Zap size={16} className="text-electric-green" />
              </div>
              <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Bounties</span>
            </div>
            <div className="text-2xl font-bold">{SAMPLE_BOUNTIES.length - user.completedBounties.length} Available</div>
            <div className="mt-2 h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-electric-green" 
                style={{ width: `${(user.completedBounties.length / SAMPLE_BOUNTIES.length) * 100}%` }} 
              />
            </div>
          </div>
          <div className="bento-card">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center">
                <Trophy size={16} className="text-electric-green" />
              </div>
              <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Badges</span>
            </div>
            <div className="text-2xl font-bold">{user.badges.length} Earned</div>
            <div className="flex -space-x-2 mt-3">
              {user.badges.slice(0, 3).map((badge, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-electric-green/20 border-2 border-dark-card flex items-center justify-center">
                  <Trophy size={12} className="text-electric-green" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bounty List */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Active Bounties</h3>
            <button className="text-electric-green text-sm font-bold flex items-center gap-1">
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
                  "w-full text-left bento-card flex items-center gap-4 group relative overflow-hidden",
                  user.completedBounties.includes(bounty.id) && "opacity-50"
                )}
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-electric-green/10 transition-colors">
                  {bounty.category === 'Meetup' ? <Camera size={24} className="text-electric-green" /> : 
                   bounty.category === 'Development' ? <Zap size={24} className="text-electric-green" /> :
                   <ImageIcon size={24} className="text-electric-green" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold">{bounty.title}</h4>
                    {user.completedBounties.includes(bounty.id) && <CheckCircle2 size={14} className="text-electric-green" />}
                  </div>
                  <p className="text-xs text-white/40 line-clamp-1">{bounty.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-electric-green">+{bounty.rewardBCH} BCH</div>
                  <div className="text-[10px] text-white/30 font-bold uppercase tracking-tighter">{bounty.rewardBadge}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </section>
      </main>

      {/* Create Bounty Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-md bg-dark-card rounded-[3rem] p-8 pb-12 border-t border-white/10 relative"
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
                  <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-2">Title</label>
                  <input 
                    required
                    value={newBounty.title || ''}
                    onChange={e => setNewBounty({...newBounty, title: e.target.value})}
                    placeholder="e.g. Meetup Selfie"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-electric-green/50 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-2">Description</label>
                  <textarea 
                    required
                    value={newBounty.description || ''}
                    onChange={e => setNewBounty({...newBounty, description: e.target.value})}
                    placeholder="What should the user do?"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 h-24 focus:outline-none focus:border-electric-green/50 transition-colors resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-2">Reward (BCH)</label>
                    <input 
                      type="number"
                      step="0.01"
                      required
                      value={newBounty.rewardBCH || 0.01}
                      onChange={e => setNewBounty({...newBounty, rewardBCH: parseFloat(e.target.value)})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-electric-green/50 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-2">Category</label>
                    <select 
                      value={newBounty.category}
                      onChange={e => setNewBounty({...newBounty, category: e.target.value as any})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-electric-green/50 transition-colors appearance-none"
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
                  className="w-full py-5 bg-electric-green text-black rounded-[2rem] font-bold text-lg electric-glow mt-4"
                >
                  Post Bounty
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bounty Modal */}
      <AnimatePresence>
        {selectedBounty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-md bg-dark-card rounded-[3rem] p-8 pb-12 border-t border-white/10 relative"
            >
              <button 
                onClick={() => { setSelectedBounty(null); resetVerification(); }}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center"
              >
                <XCircle size={20} className="text-white/40" />
              </button>

              <div className="mb-6">
                <div className="inline-block px-3 py-1 rounded-full bg-electric-green/10 text-electric-green text-[10px] font-bold uppercase tracking-widest mb-3">
                  {selectedBounty.category}
                </div>
                <h2 className="text-3xl font-bold tracking-tight mb-2">{selectedBounty.title}</h2>
                <p className="text-white/60 leading-relaxed">{selectedBounty.description}</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/5">
                  <div>
                    <div className="text-xs font-bold text-white/30 uppercase tracking-widest mb-1">Reward</div>
                    <div className="text-2xl font-bold text-electric-green">{selectedBounty.rewardBCH} BCH</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-white/30 uppercase tracking-widest mb-1">Badge</div>
                    <div className="text-sm font-bold">{selectedBounty.rewardBadge}</div>
                  </div>
                </div>

                {!user.completedBounties.includes(selectedBounty.id) && (
                  <div className="space-y-4">
                    {!uploadedImage ? (
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full h-48 border-2 border-dashed border-white/10 rounded-[2rem] flex flex-col items-center justify-center gap-3 hover:border-electric-green/50 transition-colors group"
                      >
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-electric-green/10">
                          <Camera size={28} className="text-white/40 group-hover:text-electric-green" />
                        </div>
                        <span className="text-sm font-bold text-white/40">Upload Proof (Photo)</span>
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          onChange={handleImageUpload} 
                          className="hidden" 
                          accept="image/*" 
                        />
                      </button>
                    ) : (
                      <div className="relative w-full h-48 rounded-[2rem] overflow-hidden border border-white/10">
                        <img src={uploadedImage} alt="Proof" className="w-full h-full object-cover" />
                        <button 
                          onClick={() => setUploadedImage(null)}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center"
                        >
                          <RefreshCcw size={14} />
                        </button>
                      </div>
                    )}

                    {verificationResult ? (
                      <div className={cn(
                        "p-6 rounded-3xl border flex items-start gap-4",
                        verificationResult.approved ? "bg-electric-green/10 border-electric-green/20" : "bg-red-500/10 border-red-500/20"
                      )}>
                        {verificationResult.approved ? (
                          <CheckCircle2 className="text-electric-green shrink-0" size={24} />
                        ) : (
                          <XCircle className="text-red-500 shrink-0" size={24} />
                        )}
                        <div>
                          <div className="font-bold mb-1">
                            {verificationResult.approved ? "Verification Successful!" : "Verification Failed"}
                          </div>
                          <p className="text-xs text-white/60 leading-relaxed">{verificationResult.reason}</p>
                          {verificationResult.approved && (
                            <button 
                              onClick={() => setSelectedBounty(null)}
                              className="mt-4 px-6 py-2 bg-electric-green text-black rounded-xl font-bold text-sm"
                            >
                              Claim Reward
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <button
                        disabled={!uploadedImage || isVerifying}
                        onClick={submitProof}
                        className={cn(
                          "w-full py-5 rounded-[2rem] font-bold text-lg flex items-center justify-center gap-3 transition-all",
                          uploadedImage && !isVerifying ? "bg-electric-green text-black electric-glow" : "bg-white/5 text-white/20 cursor-not-allowed"
                        )}
                      >
                        {isVerifying ? (
                          <>
                            <Loader2 className="animate-spin" />
                            AI Verifying...
                          </>
                        ) : (
                          "Submit for Approval"
                        )}
                      </button>
                    )}
                  </div>
                )}

                {user.completedBounties.includes(selectedBounty.id) && (
                  <div className="p-6 bg-electric-green/10 rounded-3xl border border-electric-green/20 text-center">
                    <CheckCircle2 className="text-electric-green mx-auto mb-2" size={32} />
                    <div className="font-bold text-electric-green">Bounty Completed</div>
                    <p className="text-xs text-white/40 mt-1">You've already earned this reward.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Bar */}
      <nav className="fixed bottom-6 left-6 right-6 h-20 bg-dark-card/80 backdrop-blur-xl rounded-[2.5rem] border border-white/10 flex items-center justify-around px-4 z-40">
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
              "relative flex items-center justify-center transition-all duration-300",
              item.primary ? "w-14 h-14 bg-electric-green rounded-2xl text-black -mt-12 shadow-lg electric-glow" : "w-12 h-12 text-white/40",
              activeTab === item.id && !item.primary && "text-electric-green"
            )}
          >
            <item.icon size={item.primary ? 28 : 24} strokeWidth={activeTab === item.id ? 2.5 : 2} />
            {activeTab === item.id && !item.primary && (
              <motion.div 
                layoutId="nav-dot"
                className="absolute -bottom-2 w-1 h-1 rounded-full bg-electric-green"
              />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}
