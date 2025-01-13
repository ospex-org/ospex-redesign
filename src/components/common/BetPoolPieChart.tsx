import React from 'react';
import { Box, Tooltip } from '@chakra-ui/react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip } from 'chart.js';

ChartJS.register(ArcElement, ChartTooltip);

interface BetPoolPieChartProps {
  poolSizeA: number;
  poolSizeB: number;
  labelA: string;
  labelB: string;
  oddsA: number;
  oddsB: number;
  size?: string;
}

const BetPoolPieChart: React.FC<BetPoolPieChartProps> = ({
  poolSizeA,
  poolSizeB,
  labelA,
  labelB,
  oddsA,
  oddsB,
  size = '40px'
}) => {
  const data = {
    datasets: [{
      data: [poolSizeA, poolSizeB],
      backgroundColor: ['#4ECDC4', '#FF6B6B'],
      borderWidth: 0
    }]
  };

  const options = {
    plugins: {
      tooltip: {
        enabled: false
      }
    },
    cutout: '50%',
    responsive: true,
    maintainAspectRatio: true
  };

  const tooltipContent = `
    ${labelA}: $${poolSizeA} (${oddsA})
    ${labelB}: $${poolSizeB} (${oddsB})
  `;

  return (
    <Tooltip label={tooltipContent} hasArrow>
      <Box width={size} height={size}>
        <Pie data={data} options={options} />
      </Box>
    </Tooltip>
  );
};

export default BetPoolPieChart;
