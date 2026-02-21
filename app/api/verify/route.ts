import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { TestNetWallet } from 'mainnet-js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('image') as File;
    const prompt = formData.get('prompt') as string;
    const userAddress = formData.get('bchAddress') as string;

    if (!file || !prompt || !userAddress) {
      return NextResponse.json(
        { error: 'Missing image, prompt, or BCH address' },
        { status: 400 }
      );
    }

    // ── 1. Convert image to base64 ──────────────────────────────────────────
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64Image = buffer.toString('base64');
    const dataUrl = `data:${file.type};base64,${base64Image}`;

    // ── 2. Ask GPT-4o-mini Vision to referee the image ───────────────────────
    const aiResponse = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            "You are a strict verification bot. Look at the image and the user's prompt. " +
            "If the image clearly satisfies the prompt, reply strictly with the word TRUE. " +
            "If it does not, reply strictly with FALSE. " +
            "Do not add any punctuation or other words.",
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Verify this image against the prompt: "${prompt}"`,
            },
            {
              type: 'image_url',
              image_url: { url: dataUrl },
            },
          ],
        },
      ],
      max_tokens: 10,
    });

    const verdict = aiResponse.choices[0]?.message?.content?.trim().toUpperCase();

    // ── 3. AI said NO → reject cleanly ──────────────────────────────────────
    if (verdict !== 'TRUE') {
      return NextResponse.json({ success: false });
    }

    // ── 4. AI said YES → mint CashToken Badge (NFT) + send BCH dust ─────────
    const seed = process.env.SPONSOR_WALLET_SEED;
    if (!seed) {
      return NextResponse.json(
        { success: true, error: 'Sponsor wallet not configured (SPONSOR_WALLET_SEED missing).' },
        { status: 200 }
      );
    }

    try {
      // NOTE: Change to `Wallet` (from 'mainnet-js') and fund with real BCH for mainnet.
      const sponsorWallet = await TestNetWallet.fromSeed(seed);
      const balance = await sponsorWallet.getBalance('bch');

      if ((balance as number) < 0.0001) {
        return NextResponse.json({
          success: true,
          error: `Vault is empty! Fund ${await sponsorWallet.getDepositAddress()} with tBCH at tbch.googol.cash`,
        });
      }

      // ── Mint a new immutable CashToken NFT (Badge) and send it with BCH dust
      // The token is minted in the same transaction that pays the user (genesis output).
      // mainnet-js represents CashToken genesis via the `token` property on a send output.
      // A capability of undefined with no nft fields creates a pure fungible token;
      // adding `nft: { capability: 'none', commitment: '' }` mints an immutable NFT badge.
      const tx = await sponsorWallet.send([
        {
          cashaddr: userAddress,
          value: 1000, // 1000 satoshis (~dust) carries the NFT to the user
          unit: 'sat',
          token: {
            amount: 0, // no fungible token supply — NFT only
            nft: {
              capability: 'none',   // immutable: cannot be minted further or melted
              commitment: '50726f6f662d6f662d546f756368', // hex for "Proof-of-Touch"
            },
          },
        },
      ]);

      return NextResponse.json({ success: true, txid: tx.txId });
    } catch (paymentError: unknown) {
      // If CashToken minting is unsupported on this testnet node, gracefully fall back
      // to a plain BCH dust payout so the demo still works end-to-end.
      let errMsg = paymentError instanceof Error ? paymentError.message : String(paymentError);

      try {
        const sponsorWallet = await TestNetWallet.fromSeed(seed);
        const fallbackTx = await sponsorWallet.send([
          { cashaddr: userAddress, value: 0.0001, unit: 'bch' },
        ]);
        return NextResponse.json({
          success: true,
          txid: fallbackTx.txId,
          error: `NFT minting fell back to BCH-only payout: ${errMsg}`,
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
