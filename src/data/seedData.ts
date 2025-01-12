import { Contest } from '../types'

export const contests: Contest[] = [
  {
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
    underOdds: -110
  },
  {
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
    underOdds: -110
  },
  // Add more contests as needed
]