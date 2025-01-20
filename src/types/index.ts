export interface Contest {
  id: string;
  awayScore: number;
  homeScore: number;
  contestCreator: string;
  rundownId: string;
  sportspageId: string;
  jsonoddsId: string;
  contestCreationId?: string;
  leagueId: number;
  league: string;
  awayTeamId: number;
  awayTeam: string;
  homeTeamId: number;
  homeTeam: string;
  eventTime: number;
  contestStatus: string;
  date: string;
  time: string;
  awaySpread: number;
  homeSpread: number;
  awaySpreadOdds: number;
  homeSpreadOdds: number;
  awayMoneylineOdds: number;
  homeMoneylineOdds: number;
  total: number;
  overOdds: number;
  underOdds: number;
  bets: ContestBet[];
  poolSizes?: PoolSizes;
}

export interface ContestBet {
  id: string;
  contestId: string;
  scorer: string;
  theNumber: number;
  creator: string;
  upperAmount: number;
  lowerAmount: number;
  winSide: string;
  status: string;
  userBets: UserBet[];
}

export interface UserBet {
  id: string;
  contestBetId: string;
  userId: string;
  amount: number;
  contributedUponCreation: number;
  contributedUponClaim: number;
  side: string;
  claimed: boolean;
  amountClaimed: number;
  odds: string;
  type: 'spread' | 'moneyline' | 'total';
  date: string;
  league: string;
  leagueId: number;
}

export interface User {
  id: string;
  address: string;
  alias: string;
  totalSpeculated: number;
  totalClaimed: number;
  totalClaimable: number;
  totalContributed: number;
  totalLost: number;
  totalPending: number;
  wins: number;
  losses: number;
  ties: number;
  net: number;
  record: string;
  winPercentage: string;
  totalBet: string;
  lastActivity: string;
  description: string;
  recentBets: UserBet[];
}

export interface PoolSizes {
  spread: {
    away: number;
    home: number;
  };
  moneyline: {
    away: number;
    home: number;
  };
  total: {
    over: number;
    under: number;
  };
}

