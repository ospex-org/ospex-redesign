import React from 'react';
import { Box } from '@chakra-ui/react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { BETTING_COLORS } from '@/constants/teamColors';
import { NFL_TEAMS } from '@/constants/teamColors';

ChartJS.register(ArcElement, Tooltip);

interface BetPoolPieChartProps {
  poolSizeA: number;
  poolSizeB: number;
  size?: string;
  colorA?: string;
  colorB?: string;
  teamAName?: string;
  teamBName?: string;
}

const BetPoolPieChart: React.FC<BetPoolPieChartProps> = ({
  poolSizeA,
  poolSizeB,
  size = '80px',
  colorA = BETTING_COLORS.AWAY,
  colorB = BETTING_COLORS.HOME,
  teamAName = '',
  teamBName = ''
}) => {
  const data = {
    labels: [teamAName, teamBName],
    datasets: [{
      data: [poolSizeA, poolSizeB],
      backgroundColor: [colorA, colorB],
      borderWidth: 1,
      borderColor: 'black'
    }]
  };

  const options = {
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          title: () => '',
          label: (context: any) => {
            const teamAbbrev = NFL_TEAMS[context.label]?.abbreviation || context.label;
            return `${teamAbbrev}: $${context.raw.toLocaleString()}`;
          }
        }
      }
    },
    cutout: '50%',
    responsive: true,
    maintainAspectRatio: true
  };

  return (
    <Box width={size} height={size}>
      <Pie data={data} options={options} />
    </Box>
  );
};

export default BetPoolPieChart;
