import React from 'react';
import { Box } from '@chakra-ui/react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement } from 'chart.js';

ChartJS.register(ArcElement);

interface BetPoolPieChartProps {
  poolSizeA: number;
  poolSizeB: number;
  size?: string;
}

const BetPoolPieChart: React.FC<BetPoolPieChartProps> = ({
  poolSizeA,
  poolSizeB,
  size = '80px'
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

  return (
    <Box 
      display="flex" 
      alignItems="center" 
      justifyContent="center"
      height="100%"
      width="100%"
    >
      <Box width={size} height={size}>
        <Pie data={data} options={options} />
      </Box>
    </Box>
  );
};

export default BetPoolPieChart;
