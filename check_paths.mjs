
import { Wallet } from 'mainnet-js';

async function check() {
  const seed = "bargain perfect athlete walk scorpion veteran lizard physical virtual exist reject delay";
  try {
    // Check Path 145 (BCH Standard)
    const w145 = await Wallet.fromId(`seed:chipnet:${seed}:m/44'/145'/0'/0/0`);
    console.log('Path 145 Address:', w145.getDepositAddress());
    console.log('Path 145 Balance:', await w145.getBalance());

    // Check Path 1 (Legacy Testnet)
    const w1 = await Wallet.fromId(`seed:chipnet:${seed}:m/44'/1'/0'/0/0`);
    console.log('Path 1 Address:', w1.getDepositAddress());
    console.log('Path 1 Balance:', await w1.getBalance());

  } catch (e) {
    console.error('Error:', e.message);
  }
}

check();
