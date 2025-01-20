import { User, UserBet } from '../types'
import sampleData from './sample.json';

export const mockUsers: User[] = [
  {
    id: '1',
    address: '0xA8eb19F9B7c2b2611C1279423A0CB2aee3735320',
    alias: 'crypto.eth',
    totalSpeculated: 1000.00,
    totalClaimed: 970.00,
    totalClaimable: 0,
    totalContributed: 30.00,
    totalLost: 60.00,
    totalPending: 0,
    wins: 19,
    losses: 22,
    ties: 15,
    net: -30.00,
    record: '19-22-15',
    winPercentage: '33.9%',
    totalBet: '1000.00',
    lastActivity: '2023-05-15',
    description: 'Passionate sports bettor with a focus on NFL and NBA games.',
    recentBets: [
      { id: '1', contestBetId: 'cb1', userId: '1', amount: 50.00, contributedUponCreation: 2.50, contributedUponClaim: 0, side: 'upper', claimed: true, amountClaimed: 95.00, odds: '-110', type: 'spread' },
      { id: '2', contestBetId: 'cb2', userId: '1', amount: 100.00, contributedUponCreation: 5.00, contributedUponClaim: 0, side: 'lower', claimed: true, amountClaimed: 0, odds: '-110', type: 'total' },
      { id: '3', contestBetId: 'cb3', userId: '1', amount: 75.00, contributedUponCreation: 3.75, contributedUponClaim: 0, side: 'upper', claimed: true, amountClaimed: 142.50, odds: '+190', type: 'moneyline' },
    ]
  },
  {
    id: '2',
    address: '0xc3FACd96c5c513C1549a1Cf957340BbE565A99E6',
    alias: 'bettor.crypto',
    totalSpeculated: 2000.00,
    totalClaimed: 2150.50,
    totalClaimable: 0,
    totalContributed: 100.00,
    totalLost: 250.00,
    totalPending: 0,
    wins: 30,
    losses: 15,
    ties: 5,
    net: 150.50,
    record: '30-15-5',
    winPercentage: '60.0%',
    totalBet: '2000.00',
    lastActivity: '2023-05-16',
    description: 'Professional bettor specializing in MLB and NHL.',
    recentBets: [
      { id: '4', contestBetId: 'cb4', userId: '2', amount: 200.00, contributedUponCreation: 10.00, contributedUponClaim: 0, side: 'upper', claimed: true, amountClaimed: 380.00, odds: '-110', type: 'spread' },
      { id: '5', contestBetId: 'cb5', userId: '2', amount: 150.00, contributedUponCreation: 7.50, contributedUponClaim: 0, side: 'upper', claimed: true, amountClaimed: 285.00, odds: '-110', type: 'total' },
      { id: '6', contestBetId: 'cb6', userId: '2', amount: 100.00, contributedUponCreation: 5.00, contributedUponClaim: 0, side: 'lower', claimed: true, amountClaimed: 0, odds: '+150', type: 'moneyline' },
    ]
  },
  {
    id: '3',
    address: '0xB8720b00C8FA95aD1bA62AEd4eEcD5567cf1dFD7',
    alias: 'lucky.eth',
    totalSpeculated: 1500.00,
    totalClaimed: 1575.25,
    totalClaimable: 0,
    totalContributed: 75.00,
    totalLost: 225.00,
    totalPending: 0,
    wins: 25,
    losses: 20,
    ties: 5,
    net: 75.25,
    record: '25-20-5',
    winPercentage: '55.6%',
    totalBet: '1500.00',
    lastActivity: '2023-05-17',
    description: 'Casual bettor who enjoys a bit of everything.',
    recentBets: [
      { id: '7', contestBetId: 'cb7', userId: '3', amount: 50.00, contributedUponCreation: 2.50, contributedUponClaim: 0, side: 'upper', claimed: true, amountClaimed: 95.00, odds: '-110', type: 'spread' },
      { id: '8', contestBetId: 'cb8', userId: '3', amount: 75.00, contributedUponCreation: 3.75, contributedUponClaim: 0, side: 'lower', claimed: true, amountClaimed: 0, odds: '+120', type: 'moneyline' },
      { id: '9', contestBetId: 'cb9', userId: '3', amount: 100.00, contributedUponCreation: 5.00, contributedUponClaim: 0, side: 'upper', claimed: true, amountClaimed: 190.00, odds: '-110', type: 'total' },
    ]
  }
]

export interface BettingHistoryEntry {
  date: string;
  league: string;
  team: string;
  betType: string;
  line: number | null;
  stake: number;
  toWin: number;
  result: number;
}

export const getUserById = (id: string) => {
  // Sort bets by date and calculate cumulative profit/loss
  const bettingHistory = sampleData.bettingHistory
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  let cumulativeNet = 0;
  const recentBets = bettingHistory.map(bet => ({
    id: Math.random().toString(36).substr(2, 9),
    contestBetId: Math.random().toString(36).substr(2, 9),
    userId: id,
    amount: bet.stake,
    contributedUponCreation: 0,
    contributedUponClaim: 0,
    side: bet.betType,
    claimed: bet.result !== 0,
    amountClaimed: bet.result > 0 ? bet.stake + bet.result : 0,
    odds: bet.toWin.toString(),
    type: bet.betType as 'spread' | 'moneyline' | 'total',
    date: bet.date,
    league: bet.league,
    leagueId: 1
  }));

  return {
    id,
    address: '0x1234...5678',
    alias: 'Sample User',
    totalSpeculated: recentBets.reduce((sum, bet) => sum + bet.amount, 0),
    totalClaimed: recentBets.reduce((sum, bet) => sum + (bet.amountClaimed || 0), 0),
    totalClaimable: 0,
    totalContributed: 0,
    totalLost: recentBets.reduce((sum, bet) => sum + (bet.amountClaimed === 0 ? bet.amount : 0), 0),
    totalPending: 0,
    wins: recentBets.filter(bet => bet.amountClaimed > bet.amount).length,
    losses: recentBets.filter(bet => bet.amountClaimed === 0).length,
    ties: recentBets.filter(bet => bet.amountClaimed === bet.amount).length,
    net: recentBets.reduce((sum, bet) => sum + (bet.amountClaimed - bet.amount), 0),
    record: '',
    winPercentage: '50',
    totalBet: recentBets.reduce((sum, bet) => sum + bet.amount, 0).toString(),
    lastActivity: recentBets[recentBets.length - 1]?.date || '',
    description: 'Sample user with betting history',
    recentBets
  };
};
