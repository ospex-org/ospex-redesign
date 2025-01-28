import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { BETTING_COLORS, NFL_TEAMS, getTeamColor } from '@/constants/teamColors';
import { adjustBrightness } from '@/utils/colorUtils';

ChartJS.register(ArcElement, Tooltip);

interface BetPoolPieChartProps {
  poolSizeA: number;
  poolSizeB: number;
  size?: string;
  teamAName?: string;
  teamBName?: string;
  hoveredTeam?: 'A' | 'B' | null;
  selectedTeam?: 'A' | 'B' | null;
}

const DEFAULT_COLORS = {
  A: 'rgba(75, 85, 99, 0.6)', // gray.600
  B: 'rgba(55, 65, 81, 0.6)', // gray.700
};

const BetPoolPieChart: React.FC<BetPoolPieChartProps> = ({
  poolSizeA,
  poolSizeB,
  size = '80px',
  teamAName = '',
  teamBName = '',
  hoveredTeam = null,
  selectedTeam = null,
}) => {
  const [chartHoveredTeam, setChartHoveredTeam] = useState<'A' | 'B' | null>(null);

  const getTeamColors = (team: 'A' | 'B') => {
    const teamName = team === 'A' ? teamAName : teamBName;
    const isHovered = hoveredTeam === team;
    const isChartHovered = chartHoveredTeam === team;
    const isSelected = selectedTeam === team;
    
    // Special handling for Over/Under
    if (teamName === 'Over' || teamName === 'Under') {
      if (isSelected || isChartHovered) {
        return teamName === 'Over' ? BETTING_COLORS.OVER : BETTING_COLORS.UNDER;
      }
      if (isHovered) {
        const color = teamName === 'Over' ? BETTING_COLORS.OVER : BETTING_COLORS.UNDER;
        return adjustBrightness(color, 0.7);
      }
      return DEFAULT_COLORS[team];
    }
    
    const teamConfig = NFL_TEAMS[teamName];
    if (!teamName || !teamConfig) return DEFAULT_COLORS[team];

    const primaryColor = teamConfig.useSecondaryForDonut ? 
      teamConfig.secondary : 
      teamConfig.primary;
    
    if (isSelected || isChartHovered) {
      return primaryColor;
    }
    if (isHovered) {
      return adjustBrightness(primaryColor, 0.7);
    }
    return DEFAULT_COLORS[team];
  };

  const getBorderColors = (team: 'A' | 'B') => {
    const teamName = team === 'A' ? teamAName : teamBName;
    const isHovered = hoveredTeam === team;
    const isSelected = selectedTeam === team;
    
    // Special handling for Over/Under
    if (teamName === 'Over' || teamName === 'Under') {
      return 'rgba(0, 0, 0, 0.8)';  // Use black border for Over/Under
    }
    
    const teamConfig = NFL_TEAMS[teamName];
    if (!teamName || !teamConfig) return 'rgba(0, 0, 0, 0.8)';
    
    const borderColor = teamConfig.useSecondaryForDonut ? 
      teamConfig.primary : 
      teamConfig.secondary;

    return (isHovered || isSelected) ? borderColor : 'rgba(0, 0, 0, 0.8)';
  };

  const getHoverColor = (team: 'A' | 'B') => {
    const teamName = team === 'A' ? teamAName : teamBName;
    
    // Special handling for Over/Under
    if (teamName === 'Over' || teamName === 'Under') {
      return teamName === 'Over' ? BETTING_COLORS.OVER : BETTING_COLORS.UNDER;
    }
    
    const teamConfig = NFL_TEAMS[teamName];
    if (!teamName || !teamConfig) return DEFAULT_COLORS[team];

    return teamConfig.useSecondaryForDonut ? teamConfig.secondary : teamConfig.primary;
  };

  const getTeamBorderOnHover = (team: 'A' | 'B') => {
    const teamName = team === 'A' ? teamAName : teamBName;
    
    // Special handling for Over/Under
    if (teamName === 'Over' || teamName === 'Under') {
      return 'rgba(0, 0, 0, 0.8)';  // Keep black border for Over/Under
    }
    
    const teamConfig = NFL_TEAMS[teamName];
    if (!teamName || !teamConfig) return 'rgba(0, 0, 0, 0.8)';
    
    // Use the opposite color for border (same as in getBorderColors)
    return teamConfig.useSecondaryForDonut ? 
      teamConfig.primary : 
      teamConfig.secondary;
  };

  const data = {
    labels: [teamBName, teamAName],
    datasets: [{
      data: [poolSizeB, poolSizeA],
      backgroundColor: [getTeamColors('B'), getTeamColors('A')],
      borderWidth: 2,
      borderColor: [getBorderColors('B'), getBorderColors('A')],
      hoverBackgroundColor: [getHoverColor('B'), getHoverColor('A')],
      hoverBorderColor: [
        getTeamBorderOnHover('B'),
        getTeamBorderOnHover('A')
      ]
    }]
  };

  const options = {
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true,
        callbacks: {
          title: () => '',
          label: (context: any) => {
            const teamAbbrev = NFL_TEAMS[context.label]?.abbreviation || context.label;
            return `${teamAbbrev}: $${context.raw.toLocaleString()}`;
          },
          labelColor: (context: any) => {
            const team = context.dataIndex === 0 ? 'B' : 'A';
            const color = getHoverColor(team);
            return {
              backgroundColor: color,
              borderColor: getTeamBorderOnHover(team),
              borderWidth: 2
            };
          }
        }
      }
    },
    cutout: '50%',
    responsive: true,
    maintainAspectRatio: true,
    spacing: 1
  };

  return (
    <Box width={size} height={size}>
      <Pie 
        data={data} 
        options={options}
      />
    </Box>
  );
};

export default BetPoolPieChart;
