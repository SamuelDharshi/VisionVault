export interface Bounty {
  id: string;
  title: string;
  description: string;
  rewardBCH: number;
  rewardBadge: string;
  sponsor: string;
  category: 'Meetup' | 'Social' | 'Development' | 'Education';
  image?: string;
}

export interface User {
  username: string;
  balanceBCH: number;
  badges: string[];
  completedBounties: string[];
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
  },
  {
    id: '2',
    title: 'Merchant Adoption',
    description: 'Find a shop that accepts BCH and take a photo of their "BCH Accepted Here" sign or a transaction receipt.',
    rewardBCH: 0.004,
    rewardBadge: 'Merchant Scout',
    sponsor: 'CashPay',
    category: 'Social',
  },
  {
    id: '3',
    title: 'Code Contribution',
    description: 'Submit a screenshot of a merged PR to a BCH-related open source project.',
    rewardBCH: 0.01,
    rewardBadge: 'Code Warrior',
    sponsor: 'BCH Devs',
    category: 'Development',
  }
];
