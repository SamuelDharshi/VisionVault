
import { Wallet } from 'mainnet-js';

async function check() {
  const seed = "bargain perfect athlete walk scorpion veteran lizard physical virtual exist reject delay";
  try {
    // We create the wallet exactly as the API now does
    const wallet = await Wallet.fromId(`seed:chipnet:${seed}:m/44'/145'/0'/0/0`);
    
    console.log('--- FINAL DEBUG ---');
    console.log('Target Address:', wallet.getDepositAddress());
    const balance = await wallet.getBalance();
    console.log('Actual Balance (Sats):', balance);
    console.log('Actual Balance (BCH):', Number(balance) / 1e8);
    console.log('--- END ---');
    process.exit(0);
  } catch (e) {
    console.error('Error:', e.message);
    process.exit(1);
  }
}

check();
