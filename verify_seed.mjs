
import { Wallet } from 'mainnet-js';

async function verify() {
  const seed = "bargain perfect athlete walk scorpion veteran lizard physical virtual exist reject delay";
  
  // Try to set global network if possible
  try {
    const { Config } = await import('mainnet-js');
    if (Config && Config.setNetwork) {
       Config.setNetwork('chipnet');
       console.log('Config.setNetwork("chipnet") successful');
    }
  } catch (e) {
    console.log('Config.setNetwork not available');
  }

  const wallet = await Wallet.fromSeed(seed);
  // Force network property just in case
  (wallet as any).network = 'chipnet';
  
  console.log('--- WALLET INFO ---');
  console.log('Network:', (wallet as any).network);
  console.log('Address (CashAddr):', wallet.getDepositAddress());
  const balance = await wallet.getBalance();
  console.log('Balance (Sats):', balance);
  console.log('Balance (BCH):', Number(balance) / 1e8);
}

verify();
