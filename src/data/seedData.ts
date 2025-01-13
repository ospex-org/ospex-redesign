import { Contest } from '../types'

export const contests: Contest[] = [
  {
    id: 'seed1',
    awayScore: 0,
    homeScore: 0,
    contestCreator: '0x123',
    rundownId: '1',
    sportspageId: '1',
    jsonoddsId: '1',
    leagueId: 1,
    contestStatus: 'scheduled',
    eventTime: Date.now(),
    bets: [],
    date: '2023-09-10',
    time: '1:00 pm',
    league: 'NFL',
    awayTeam: 'San Francisco 49ers',
    homeTeam: 'Pittsburgh Steelers',
    awaySpread: -2.5,
    homeSpread: 2.5,
    awaySpreadOdds: -110,
    homeSpreadOdds: -110,
    awayMoneyline: -130,
    homeMoneyline: 110,
    total: 41.5,
    overOdds: -110,
    underOdds: -110,
    poolSizes: {
      spread: {
        away: 450,
        home: 300
      },
      moneyline: {
        away: 600,
        home: 400
      },
      total: {
        over: 350,
        under: 350
      }
    },
    awayTeamId: 1,
    homeTeamId: 2
  },
  {
    id: 'seed2',
    awayScore: 0,
    homeScore: 0,
    contestCreator: '0x123',
    rundownId: '2',
    sportspageId: '2',
    jsonoddsId: '2',
    leagueId: 1,
    contestStatus: 'scheduled',
    eventTime: Date.now(),
    bets: [],
    date: '2023-09-10',
    time: '4:25 pm',
    league: 'NFL',
    awayTeam: 'Los Angeles Rams',
    homeTeam: 'Seattle Seahawks',
    awaySpread: 5.5,
    homeSpread: -5.5,
    awaySpreadOdds: -110,
    homeSpreadOdds: -110,
    awayMoneyline: 200,
    homeMoneyline: -240,
    total: 46.5,
    overOdds: -110,
    underOdds: -110,
    poolSizes: {
      spread: {
        away: 250,
        home: 500
      },
      moneyline: {
        away: 200,
        home: 1200
      },
      total: {
        over: 400,
        under: 300
      }
    },
    awayTeamId: 3,
    homeTeamId: 4
  },
  // Add more contests as needed
]