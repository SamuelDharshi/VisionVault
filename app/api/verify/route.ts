import { NextRequest, NextResponse } from 'next/server';
import { Wallet, TestNetWallet, NFTCapability, TokenGenesisRequest, Config } from 'mainnet-js';

// Global network check override for chipnet
process.env.BCH_NETWORK = 'chipnet';
(Config as any).network = 'chipnet';

// ── AI Vision: calls Hugging Face's free Inference API ─────────────────────
// Model: Salesforce/blip-image-captioning-large (free, no quota issues)
async function verifyImageWithAI(base64Image: string, mimeType: string, prompt: string): Promise<boolean> {
  const hfToken = process.env.HF_TOKEN; // required for router.huggingface.co
  if (!hfToken) console.warn('[VisionVault] HF_TOKEN is not set — the new HF router requires a token. Add HF_TOKEN to .env.local');

  // Convert base64 to binary blob
  const binaryStr = Buffer.from(base64Image, 'base64');

  const fetchCaption = async () => {
    const res = await fetch(
      'https://router.huggingface.co/hf-inference/models/Salesforce/blip-image-captioning-large',
      {
        method: 'POST',
        headers: {
          'Content-Type': mimeType,
          Authorization: `Bearer ${hfToken ?? ''}`,
        },
        body: binaryStr,
      }
    );
    return res;
  };

  let captionRes = await fetchCaption();

  // If model is loading (503), wait 8s and retry once
  if (captionRes.status === 503) {
    await new Promise(r => setTimeout(r, 8000));
    captionRes = await fetchCaption();
  }

  if (!captionRes.ok) {
    throw new Error(`HF API error (${captionRes.status}): ${await captionRes.text()}`);
  }

  const data = await captionRes.json() as { generated_text?: string }[];
  const caption = data?.[0]?.generated_text ?? '';
  console.log(`[VisionVault] Image caption: "${caption}" | Prompt: "${prompt}"`);
  return matchCaption(caption, prompt);
}

// ── Simple keyword match between caption and prompt ─────────────────────────
function matchCaption(caption: string, prompt: string): boolean {
  const cap = caption.toLowerCase();
  const words = prompt.toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 3); // skip short words like "a", "the", "at"

  const matches = words.filter(w => cap.includes(w));
  const score = matches.length / Math.max(words.length, 1);
  console.log(`[VisionVault] Match score: ${score.toFixed(2)} (${matches.join(', ')})`);
  return score >= 0.3; // 30% keyword match = pass
}

// ── Encode badge name as NFT commitment (hex, max 40 bytes) ─────────────────
function badgeToCommitment(badge: string): string {
  // Encode badge name as UTF-8 hex, max 40 bytes
  const bytes = Buffer.from(badge.slice(0, 40), 'utf-8');
  return bytes.toString('hex');
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('image') as File;
    const prompt = formData.get('prompt') as string;
    const userAddress = formData.get('bchAddress') as string;
    const rewardBCH = parseFloat((formData.get('rewardBCH') as string) || '0.005');
    const badgeName = (formData.get('badgeName') as string) || 'VisionVault Badge';

    if (!file || !prompt || !userAddress) {
      return NextResponse.json(
        { error: 'Missing image, prompt, or BCH address' },
        { status: 400 }
      );
    }

    // ── Guard: only accept testnet addresses ────────────────────────────────
    const isTestnetAddress = userAddress.startsWith('bchtest:') || userAddress.startsWith('bchtestpp:');
    if (!isTestnetAddress) {
      return NextResponse.json(
        { error: '⛔ Mainnet BCH address detected! This app runs on BCH TESTNET only. Use a bchtest:qq... address. Get free testnet BCH at tbch.googol.cash' },
        { status: 400 }
      );
    }

    // Basic length check for safety
    if (userAddress.length < 30) {
      return NextResponse.json({ error: 'Invalid BCH address format.' }, { status: 400 });
    }

    // ── 1. Convert image to base64 ──────────────────────────────────────────
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64Image = buffer.toString('base64');
    const mimeType = file.type || 'image/jpeg';

    // ── 2. AI Vision check ──────────────────────────────────────────────────
    let verified = false;
    try {
      verified = await verifyImageWithAI(base64Image, mimeType, prompt);
    } catch (aiErr) {
      console.error('[VisionVault] AI error:', aiErr);
      // Fallback: if AI is down, approve if image exists (demo mode)
      console.warn('[VisionVault] AI unavailable — falling back to image-present check');
      verified = buffer.length > 1000; // image must be at least 1KB
    }

    // ── 3. AI said NO → reject cleanly ─────────────────────────────────────
    if (!verified) {
      return NextResponse.json({ success: false });
    }

    // ── 4. AI said YES → send BCH + mint NFT badge ────────────────────────
    const seed = process.env.SPONSOR_WALLET_SEED;
    if (!seed) {
      return NextResponse.json(
        {
          success: true,
          error: 'Sponsor wallet not configured (SPONSOR_WALLET_SEED missing).',
          paymentTxId: null,
          nftTxId: null,
        },
        { status: 200 }
      );
    }

    let paymentTxId: string | null = null;
    let nftTxId: string | null = null;
    const warnings: string[] = [];

    // ── Step A: Send BCH reward ─────────────────────────────────────────────
    try {
      // Use standard fromSeed with explicit chipnet network string.
      // This is often more reliable than fromId in older mainnet-js versions.
      const sponsorWallet = await Wallet.fromSeed(seed, "m/44'/145'/0'/0/0", 'chipnet');
      
      const balanceSats = (await sponsorWallet.getBalance()) as bigint;
      const rewardSats = BigInt(Math.round(rewardBCH * 1e8));
      const sponsorAddr = sponsorWallet.getDepositAddress();
      
      console.log(`[VisionVault] Sponsor Address: ${sponsorAddr}`);
      console.log(`[VisionVault] Sponsor Balance: ${balanceSats} sats (${Number(balanceSats) / 1e8} BCH)`);
      console.log(`[VisionVault] Attempting payout of: ${rewardSats} sats to ${userAddress}`);

      if (balanceSats < (rewardSats + BigInt(10000))) { // keep 10k sats buffer for fees
        const msg = `Sponsor vault has ${Number(balanceSats) / 1e8} BCH — not enough to pay ${rewardBCH} BCH reward. Fund ${sponsorAddr} at tbch.googol.cash`;
        console.warn(`[VisionVault] ${msg}`);
        warnings.push(msg);
      } else {
        // Send using satoshis for maximum precision
        // We use any cast here because mainnet-js types can be tricky in some environments
        const tx = await (sponsorWallet.send as any)([
          { cashaddr: userAddress, value: rewardSats, unit: 'sat' },
        ]);
        
        // Handle different possible return formats from mainnet-js
        paymentTxId = (tx as any).txId || (tx as any).txid || null;
        console.log(`[VisionVault] BCH payment successful! TXID: ${paymentTxId}`);
      }
    } catch (payErr) {
      const msg = payErr instanceof Error ? payErr.message : String(payErr);
      console.error('[VisionVault] BCH Chipnet payment error:', msg);
      warnings.push(`Chipnet payment failed: ${msg}`);
    }

    // ── Step B: Mint CashToken NFT badge via tokenGenesis ───────────────────
    // tokenGenesis creates a brand-new token category and sends the NFT to `cashaddr`
    try {
      const mintWallet = await Wallet.fromSeed(seed, "m/44'/145'/0'/0/0", 'chipnet');
      const commitment = badgeToCommitment(badgeName);

      const genesisReq = new TokenGenesisRequest({
        // No fungible amount — pure NFT
        nft: {
          capability: NFTCapability.none, // immutable NFT badge
          commitment,
        },
        cashaddr: userAddress,   // send the NFT directly to the winner
        value: BigInt(1000),    // 1000 satoshis dust alongside the token
      });

      const mintTx = await mintWallet.tokenGenesis(genesisReq);
      nftTxId = mintTx?.txId ?? null;
      console.log(`[VisionVault] NFT minted (category: ${mintTx?.categories?.[0] ?? 'unknown'}): ${nftTxId}`);
    } catch (nftErr) {
      const msg = nftErr instanceof Error ? nftErr.message : String(nftErr);
      console.error('[VisionVault] NFT mint error:', msg);
      const suffix = paymentTxId ? '(BCH reward still sent)' : '(BCH reward also failed)';
      warnings.push(`NFT badge mint failed ${suffix}: ${msg}`);
    }

    return NextResponse.json({
      success: true,
      paymentTxId,
      nftTxId,
      // Legacy field so old code that reads data.txid still works
      txid: paymentTxId,
      warning: warnings.length > 0 ? warnings.join(' | ') : undefined,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: `Internal server error: ${msg}` }, { status: 500 });
  }
}
