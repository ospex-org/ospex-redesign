'use client'

import React from 'react';
import { Box } from '@chakra-ui/react';
import ChartJsOddsGraph from './OddsChartRenderer';

// Dummy data - replace this with real data later
const dummyData = [
  { date: '2023-09-01', awaySpread: -2.5, homeSpread: 2.5, awayMoneyline: 2.1, homeMoneyline: 1.8, total: 41.5, over: 1.9, under: 1.9 },
  { date: '2023-09-02', awaySpread: -2, homeSpread: 2, awayMoneyline: 2.2, homeMoneyline: 1.7, total: 42, over: 1.95, under: 1.95 },
  { date: '2023-09-03', awaySpread: -3, homeSpread: 3, awayMoneyline: 2.0, homeMoneyline: 1.9, total: 41, over: 1.85, under: 1.85 },
  { date: '2023-09-04', awaySpread: -2.5, homeSpread: 2.5, awayMoneyline: 2.3, homeMoneyline: 1.6, total: 42.5, over: 2, under: 2 },
  { date: '2023-09-05', awaySpread: -1.5, homeSpread: 1.5, awayMoneyline: 2.1, homeMoneyline: 1.8, total: 40.5, over: 1.9, under: 1.9 },
];

interface OddsChartContainerProps {
  awayTeam: string;
  homeTeam: string;
  awayTeamColor: string;
  homeTeamColor: string;
  betType: 'spread' | 'moneyline' | 'total';
  teamPerspective: 'away' | 'home';
}

const OddsChartContainer: React.FC<OddsChartContainerProps> = ({
  awayTeam,
  homeTeam,
  awayTeamColor,
  homeTeamColor,
  betType,
  teamPerspective
}) => {
  const getChartData = () => {
    switch (betType) {
      case 'spread':
        return dummyData.map(d => ({ date: d.date, away: d.awaySpread, home: d.homeSpread }));
      case 'moneyline':
        return dummyData.map(d => ({ date: d.date, away: d.awayMoneyline, home: d.homeMoneyline }));
      case 'total':
        return dummyData.map(d => ({ date: d.date, over: d.over, under: d.under }));
    }
  };

  return (
    <Box height="300px" width="100%">
      <ChartJsOddsGraph
        data={getChartData()}
        perspective={teamPerspective}
        teamName={betType === 'total'
          ? (teamPerspective === 'away' ? 'Over' : 'Under')
          : (teamPerspective === 'away' ? awayTeam : homeTeam)}
        lineColor={betType === 'total'
          ? '#3273dc'
          : (teamPerspective === 'away' ? awayTeamColor : homeTeamColor)}
      />
    </Box>
  );
};

export default OddsChartContainer;
