
const { Wallet } = require('mainnet-js');

async function check() {
  const seed = "bargain perfect athlete walk scorpion veteran lizard physical virtual exist reject delay";
  try {
    // Check Path 145 (BCH Standard) - bchtest:qqvd77...
    const w145 = await Wallet.fromId(`seed:chipnet:${seed}:m/44'/145'/0'/0/0`);
    console.log('--- DATA START ---');
    console.log('P145_ADDR:', w145.getDepositAddress());
    console.log('P145_BAL:', await w145.getBalance());

    // Check Path 1 (Legacy Testnet)
    const w1 = await Wallet.fromId(`seed:chipnet:${seed}:m/44'/1'/0'/0/0`);
    console.log('P1_ADDR:', w1.getDepositAddress());
    console.log('P1_BAL:', await w1.getBalance());
    console.log('--- DATA END ---');

  } catch (e) {
    console.error('Error:', e.message);
  }
}

check();
