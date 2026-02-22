export interface Bounty {
  id: string;
  title: string;
  description: string;
  rewardBCH: number;
  rewardBadge: string;
  sponsor: string;
  category: 'Meetup' | 'Social' | 'Development' | 'Education';
  prompt: string;
  image?: string;
}

export interface User {
  username: string;
  balanceBCH: number;
  badges: string[];
  completedBounties: string[];
}

export interface CryptoEvent {
  id: string;
  name: string;
  location: string;
  date: string;
  category: 'Conference' | 'Meetup' | 'Hackathon' | 'Workshop';
  description: string;
  attendees: string;
  bounty: number;
  tags: string[];
  emoji: string;
}

export interface Transaction {
  id: string;
  type: 'received' | 'sent';
  amount: number;
  desc: string;
  date: string;
  txid?: string;
}

export const SAMPLE_BOUNTIES: Bounty[] = [
  {
    id: '1',
    title: 'BCH Meetup Photo',
    description: 'Take a selfie at a local Bitcoin Cash meetup. Make sure a BCH logo or event banner is visible.',
    rewardBCH: 0.002,
    rewardBadge: 'Community Pioneer',
    sponsor: 'BCH Global',
    category: 'Meetup',
    prompt: 'Does this image clearly show people gathering at a Bitcoin Cash meetup event with a BCH logo or banner visible?',
  },
  {
    id: '2',
    title: 'Merchant Adoption',
    description: 'Find a shop that accepts BCH and take a photo of their "BCH Accepted Here" sign or a transaction receipt.',
    rewardBCH: 0.004,
    rewardBadge: 'Merchant Scout',
    sponsor: 'CashPay',
    category: 'Social',
    prompt: 'Does this image show a store or merchant accepting Bitcoin Cash, with a visible sign or payment receipt?',
  },
  {
    id: '3',
    title: 'Code Contribution',
    description: 'Submit a screenshot of a merged PR to a BCH-related open source project.',
    rewardBCH: 0.01,
    rewardBadge: 'Code Warrior',
    sponsor: 'BCH Devs',
    category: 'Development',
    prompt: 'Does this image show a merged pull request on GitHub or similar platform for a Bitcoin Cash related project?',
  },
];

export const CRYPTO_EVENTS: CryptoEvent[] = [
  {
    id: 'e1',
    name: 'Bitcoin Cash City Conference 2025',
    location: 'Townsville, Australia',
    date: 'Sep 4–6, 2025',
    category: 'Conference',
    description: 'The premier BCH conference in Asia-Pacific. Connect with developers, merchants, and BCH enthusiasts from around the world.',
    attendees: '500+',
    bounty: 0.004,
    tags: ['BCH', 'Australia', 'Annual'],
    emoji: '🎤',
  },
  {
    id: 'e2',
    name: 'Consensus 2025',
    location: 'Austin, Texas, USA',
    date: 'May 14–16, 2025',
    category: 'Conference',
    description: "The world's largest and most influential gathering of the crypto, blockchain, and Web3 community. 15,000+ attendees.",
    attendees: '15,000+',
    bounty: 0.01,
    tags: ['Multi-chain', 'USA', 'Networking'],
    emoji: '🌐',
  },
  {
    id: 'e3',
    name: 'Bitcoin Amsterdam 2025',
    location: 'Amsterdam, Netherlands',
    date: 'Oct 9–10, 2025',
    category: 'Conference',
    description: "Europe's largest Bitcoin conference featuring speakers from around the world. Deep-dive sessions on Bitcoin Cash adoption.",
    attendees: '5,000+',
    bounty: 0.006,
    tags: ['Bitcoin', 'Europe', 'Innovation'],
    emoji: '🇳🇱',
  },
  {
    id: 'e4',
    name: 'BCH Hackathon — Tokyo',
    location: 'Tokyo, Japan',
    date: 'Mar 15–16, 2025',
    category: 'Hackathon',
    description: 'Build on Bitcoin Cash! 48-hour hackathon with cash prizes and NFT badges for the best BCH-powered apps.',
    attendees: '200+',
    bounty: 0.02,
    tags: ['BCH', 'Japan', 'Builders'],
    emoji: '💻',
  },
  {
    id: 'e5',
    name: 'Satoshi Roundtable XII',
    location: 'Caribbean',
    date: 'Feb 20–23, 2025',
    category: 'Conference',
    description: 'Exclusive invite-only gathering of crypto founders, investors, and protocol engineers. High-signal discussions only.',
    attendees: '300',
    bounty: 0.002,
    tags: ['Exclusive', 'Leaders', 'Strategy'],
    emoji: '🏝️',
  },
  {
    id: 'e6',
    name: 'BCH Bull Community Meetup',
    location: 'New York, USA',
    date: 'Mar 28, 2025',
    category: 'Meetup',
    description: 'Monthly BCH community meetup in NYC. Network with local BCH enthusiasts, merchants, and developers.',
    attendees: '80+',
    bounty: 0.002,
    tags: ['BCH', 'Monthly', 'Community'],
    emoji: '🤝',
  },
  {
    id: 'e7',
    name: 'Web3 Builder Workshop',
    location: 'Bangalore, India',
    date: 'Apr 5, 2025',
    category: 'Workshop',
    description: 'Hands-on workshop on building decentralized apps with Bitcoin Cash. Ideal for developers new to BCH.',
    attendees: '150+',
    bounty: 0.003,
    tags: ['BCH', 'India', 'Developers'],
    emoji: '🛠️',
  },
  {
    id: 'e8',
    name: 'Africa Bitcoin Conference',
    location: 'Accra, Ghana',
    date: 'Dec 9–11, 2025',
    category: 'Conference',
    description: 'The largest Bitcoin conference in Africa. Focus on financial inclusion and peer-to-peer cash adoption.',
    attendees: '1,000+',
    bounty: 0.005,
    tags: ['Bitcoin', 'Africa', 'Inclusion'],
    emoji: '🌍',
  },
];

export const SAMPLE_TRANSACTIONS: Transaction[] = [
  { id: 't1', type: 'received', amount: 0.002, desc: 'BCH Meetup Photo bounty reward', date: 'Feb 20, 2025', txid: 'a1b2c3d4e5f6789012345678901234567890abcdef' },
  { id: 't2', type: 'received', amount: 0.004, desc: 'Merchant Adoption bounty reward', date: 'Feb 18, 2025', txid: 'b2c3d4e5f6789012345678901234567890abcdef1' },
  { id: 't3', type: 'sent', amount: 0.01, desc: 'Posted Code Contribution bounty', date: 'Feb 15, 2025' },
  { id: 't4', type: 'received', amount: 0.006, desc: 'Community Workshop bounty reward', date: 'Feb 10, 2025', txid: 'c3d4e5f6789012345678901234567890abcdef12' },
  { id: 't5', type: 'sent', amount: 0.001, desc: 'Network fee', date: 'Feb 8, 2025' },
  { id: 't6', type: 'received', amount: 0.003, desc: 'Web3 Builder Workshop reward', date: 'Jan 30, 2025', txid: 'd4e5f6789012345678901234567890abcdef123' },
];
