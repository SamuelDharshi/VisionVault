
import { TestNetWallet } from 'mainnet-js';

async function check() {
  const seed = "bargain perfect athlete walk scorpion veteran lizard physical virtual exist reject delay";
  try {
    const wallet = await TestNetWallet.fromSeed(seed);
    const balance = await wallet.getBalance();
    const address = wallet.getDepositAddress();
    console.log(`ADDRESS_START:${address}:ADDRESS_END`);
    console.log(`BALANCE_START:${balance}:BALANCE_END`);
  } catch (e) {
    console.error('Error:', e);
  }
}

check();
