
const { TestNetWallet } = require('mainnet-js');

async function check() {
  const seed = "bargain perfect athlete walk scorpion veteran lizard physical virtual exist reject delay";
  try {
    const wallet = await TestNetWallet.fromSeed(seed);
    console.log('--- START ---');
    console.log('Address:', wallet.getDepositAddress());
    console.log('Balance:', await wallet.getBalance());
    console.log('--- END ---');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

check();
