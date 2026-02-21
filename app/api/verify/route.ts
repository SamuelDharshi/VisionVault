import { NextRequest, NextResponse } from 'next/server';
import { TestNetWallet } from 'mainnet-js';

// ── AI Vision: calls Hugging Face's free Inference API ─────────────────────
// Model: Salesforce/blip-image-captioning-large (free, no quota issues)
async function verifyImageWithAI(base64Image: string, mimeType: string, prompt: string): Promise<boolean> {
  const hfToken = process.env.HF_TOKEN; // optional — works without token too (slower)

  // Convert base64 to binary blob
  const binaryStr = Buffer.from(base64Image, 'base64');

  // Step 1: Get image caption from BLIP
  const captionRes = await fetch(
    'https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large',
    {
      method: 'POST',
      headers: {
        'Content-Type': mimeType,
        ...(hfToken ? { Authorization: `Bearer ${hfToken}` } : {}),
      },
      body: binaryStr,
    }
  );

  if (!captionRes.ok) {
    const errText = await captionRes.text();
    // If model is loading (503), wait and retry once
    if (captionRes.status === 503) {
      await new Promise(r => setTimeout(r, 8000));
      const retry = await fetch(
        'https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large',
        {
          method: 'POST',
          headers: {
            'Content-Type': mimeType,
            ...(hfToken ? { Authorization: `Bearer ${hfToken}` } : {}),
          },
          body: binaryStr,
        }
      );
      if (!retry.ok) throw new Error(`HF API error: ${await retry.text()}`);
      const retryData = await retry.json() as { generated_text?: string }[];
      const caption = retryData?.[0]?.generated_text ?? '';
      return matchCaption(caption, prompt);
    }
    throw new Error(`HF API error: ${errText}`);
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

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('image') as File;
    const prompt = formData.get('prompt') as string;
    const userAddress = formData.get('bchAddress') as string;
    const rewardBCH = parseFloat((formData.get('rewardBCH') as string) || '0.005');

    if (!file || !prompt || !userAddress) {
      return NextResponse.json(
        { error: 'Missing image, prompt, or BCH address' },
        { status: 400 }
      );
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

    // ── 4. AI said YES → send BCH dust reward ───────────────────────────────
    const seed = process.env.SPONSOR_WALLET_SEED;
    if (!seed) {
      return NextResponse.json(
        { success: true, error: 'Sponsor wallet not configured (SPONSOR_WALLET_SEED missing).' },
        { status: 200 }
      );
    }

    try {
      const sponsorWallet = await TestNetWallet.fromSeed(seed);
      const balance = await sponsorWallet.getBalance();

      if ((balance as unknown as number) < rewardBCH) {
        return NextResponse.json({
          success: true,
          error: `Vault only has ${balance} BCH — not enough to pay ${rewardBCH} BCH reward. Fund ${await sponsorWallet.getDepositAddress()} at tbch.googol.cash`,
        });
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const tx = await (sponsorWallet.send as any)([
        { cashaddr: userAddress, value: rewardBCH, unit: 'bch' },
      ]);

      return NextResponse.json({ success: true, txid: tx.txId });
    } catch (paymentError: unknown) {
      let errMsg = paymentError instanceof Error ? paymentError.message : String(paymentError);

      try {
        const sponsorWallet = await TestNetWallet.fromSeed(seed);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fallbackTx = await (sponsorWallet.send as any)([
          { cashaddr: userAddress, value: 0.0001, unit: 'bch' },
        ]);
        return NextResponse.json({
          success: true,
          txid: fallbackTx.txId,
          error: `Paid BCH (NFT failed): ${errMsg}`,
        });
      } catch (fallbackError: unknown) {
        errMsg = fallbackError instanceof Error ? fallbackError.message : String(fallbackError);
        return NextResponse.json({
          success: true,
          error: `Verification passed but payment failed: ${errMsg}`,
        });
      }
    }
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: `Internal server error: ${msg}` }, { status: 500 });
  }
}
