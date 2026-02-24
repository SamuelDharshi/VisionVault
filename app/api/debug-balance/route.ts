
import { NextRequest, NextResponse } from 'next/server';
import { TestNetWallet } from 'mainnet-js';

export async function GET(req: NextRequest) {
  try {
    const seed = process.env.SPONSOR_WALLET_SEED;
    if (!seed) return NextResponse.json({ error: 'No seed' });
    
    const wallet = await TestNetWallet.fromSeed(seed);
    const balance = await wallet.getBalance();
    const address = wallet.getDepositAddress();
    const network = (wallet as any).network;
    
    return NextResponse.json({
      address,
      balanceBCH: Number(balance) / 1e8,
      balanceSats: balance.toString(),
      network: network || 'unknown',
      userAgent: process.env.NODE_ENV,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
