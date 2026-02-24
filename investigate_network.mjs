
import { Wallet, TestNetWallet } from 'mainnet-js';

async function check() {
  const seed = "bargain perfect athlete walk scorpion veteran lizard physical virtual exist reject delay";
  try {
    const w = await Wallet.fromSeed(seed);
    console.log('Default Wallet Address:', w.getDepositAddress());
    console.log('Default Wallet Network:', (w as any).network);
    
    try {
      (w as any).network = 'chipnet';
      console.log('After setting network:', w.getDepositAddress());
    } catch (e) {
      console.log('Failed to set network directly:', e.message);
    }

    const w2 = await TestNetWallet.fromSeed(seed);
    console.log('TestNetWallet Address:', w2.getDepositAddress());
    console.log('TestNetWallet Network:', (w2 as any).network);

  } catch (e) {
    console.error('Error:', e);
  }
}

check();
