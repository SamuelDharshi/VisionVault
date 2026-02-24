
import { TestNetWallet } from 'mainnet-js';

async function check() {
  const seed = "bargain perfect athlete walk scorpion veteran lizard physical virtual exist reject delay";
  try {
    const wallet = await TestNetWallet.fromSeed(seed);
    const balance = await wallet.getBalance();
    const address = wallet.getDepositAddress();
    
    console.log('--- BASIC INFO ---');
    console.log('Address:', address);
    console.log('Balance (sats):', balance);
    console.log('-------------------');
  } catch (e) {
    console.error('Error:', e);
  }
}

check();
