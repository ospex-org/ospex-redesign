import React from 'react';
import { Box, Flex, VStack, useBreakpointValue } from '@chakra-ui/react';
import { RadioCard } from '../common/RadioCard';
import BetPoolPieChart from '../common/BetPoolPieChart';
import BettingInterface from './BettingInterface';
import { formatOdds, formatSpread } from '../../utils/formatting';
import { Contest } from '../../types';
import { getTeamColor, NFL_TEAMS, BETTING_COLORS } from '@/constants/teamColors';

interface BetTypePanelProps {
  type: 'spread' | 'moneyline' | 'total';
  contest: Contest;
  selection: string;
  radioProps: {
    getRootProps: () => any;
    getRadioProps: (props: any) => any;
  };
  betAmount: number;
  setBetAmount: (amount: number) => void;
  contributeAmount: number;
  setContributeAmount: (amount: number) => void;
}

const BetTypePanel: React.FC<BetTypePanelProps> = ({
  type,
  contest,
  selection,
  radioProps,
  betAmount,
  setBetAmount,
  contributeAmount,
  setContributeAmount,
}) => {
  const showVisualization = useBreakpointValue({ base: false, md: true });
  const [hoveredOption, setHoveredOption] = React.useState<string | null>(null);

  const handleMouseEnter = (option: string) => {
    setHoveredOption(option);
  };

  const handleMouseLeave = () => {
    setHoveredOption(null);
  };

  const getPieChartProps = () => {
    const props = (() => {
      switch (type) {
        case 'spread':
          return {
            poolSizeA: contest.poolSizes?.spread.away || 0,
            poolSizeB: contest.poolSizes?.spread.home || 0,
            teamAName: contest.awayTeam,
            teamBName: contest.homeTeam,
            hoveredTeam: (hoveredOption === 'spread_away' ? 'A' : hoveredOption === 'spread_home' ? 'B' : null) as ('A' | 'B' | null),
            selectedTeam: (selection === 'spread_away' ? 'A' : selection === 'spread_home' ? 'B' : null) as ('A' | 'B' | null),
          };
        case 'moneyline':
          return {
            poolSizeA: contest.poolSizes?.moneyline.away || 0,
            poolSizeB: contest.poolSizes?.moneyline.home || 0,
            teamAName: contest.awayTeam,
            teamBName: contest.homeTeam,
            hoveredTeam: (hoveredOption === 'moneyline_away' ? 'A' : hoveredOption === 'moneyline_home' ? 'B' : null) as ('A' | 'B' | null),
            selectedTeam: (selection === 'moneyline_away' ? 'A' : selection === 'moneyline_home' ? 'B' : null) as ('A' | 'B' | null),
          };
        case 'total':
          return {
            poolSizeA: contest.poolSizes?.total.over || 0,
            poolSizeB: contest.poolSizes?.total.under || 0,
            teamAName: "Over",
            teamBName: "Under",
            hoveredTeam: (hoveredOption === 'total_over' ? 'A' : hoveredOption === 'total_under' ? 'B' : null) as ('A' | 'B' | null),
            selectedTeam: (selection === 'total_over' ? 'A' : selection === 'total_under' ? 'B' : null) as ('A' | 'B' | null),
          };
      }
    })();

    return props;
  };

  const getRadioCards = () => {
    switch (type) {
      case 'spread':
        return (
          <>
            <RadioCard
              {...radioProps.getRadioProps({ value: 'spread_away' })}
              label={`${contest.awayTeam} ${formatSpread(contest.awaySpread)}`}
              description={`Current Odds: ${formatOdds(contest.awaySpreadOdds)}`}
              teamColor={NFL_TEAMS[contest.awayTeam]?.useSecondaryForDonut ?
                NFL_TEAMS[contest.awayTeam].secondary :
                getTeamColor(contest.awayTeam)}
              onMouseEnter={() => handleMouseEnter('spread_away')}
              onMouseLeave={handleMouseLeave}
            />
            <RadioCard
              {...radioProps.getRadioProps({ value: 'spread_home' })}
              label={`${contest.homeTeam} ${formatSpread(contest.homeSpread)}`}
              description={`Current Odds: ${formatOdds(contest.homeSpreadOdds)}`}
              teamColor={NFL_TEAMS[contest.homeTeam]?.useSecondaryForDonut ?
                NFL_TEAMS[contest.homeTeam].secondary :
                getTeamColor(contest.homeTeam)}
              onMouseEnter={() => handleMouseEnter('spread_home')}
              onMouseLeave={handleMouseLeave}
            />
          </>
        );
      case 'moneyline':
        return (
          <>
            <RadioCard
              {...radioProps.getRadioProps({ value: 'moneyline_away' })}
              label={`${contest.awayTeam} ML`}
              description={`Current Odds: ${formatOdds(contest.awayMoneylineOdds)}`}
              teamColor={NFL_TEAMS[contest.awayTeam]?.useSecondaryForDonut ?
                NFL_TEAMS[contest.awayTeam].secondary :
                getTeamColor(contest.awayTeam)}
              onMouseEnter={() => handleMouseEnter('moneyline_away')}
              onMouseLeave={handleMouseLeave}
            />
            <RadioCard
              {...radioProps.getRadioProps({ value: 'moneyline_home' })}
              label={`${contest.homeTeam} ML`}
              description={`Current Odds: ${formatOdds(contest.homeMoneylineOdds)}`}
              teamColor={NFL_TEAMS[contest.homeTeam]?.useSecondaryForDonut ?
                NFL_TEAMS[contest.homeTeam].secondary :
                getTeamColor(contest.homeTeam)}
              onMouseEnter={() => handleMouseEnter('moneyline_home')}
              onMouseLeave={handleMouseLeave}
            />
          </>
        );
      case 'total':
        return (
          <>
            <RadioCard
              {...radioProps.getRadioProps({ value: 'total_over' })}
              label={`Over ${contest.total}`}
              description={`Current Odds: ${formatOdds(contest.overOdds)}`}
              teamColor={BETTING_COLORS.OVER}
              onMouseEnter={() => handleMouseEnter('total_over')}
              onMouseLeave={handleMouseLeave}
            />
            <RadioCard
              {...radioProps.getRadioProps({ value: 'total_under' })}
              label={`Under ${contest.total}`}
              description={`Current Odds: ${formatOdds(contest.underOdds)}`}
              teamColor={BETTING_COLORS.UNDER}
              onMouseEnter={() => handleMouseEnter('total_under')}
              onMouseLeave={handleMouseLeave}
            />
          </>
        );
    }
  };

  return (
    <Flex 
      align="center" 
      height="100%" 
      gap={4}
      sx={{
        '@media screen and (max-width: 618px)': {
          flexDirection: 'column',
          gap: 2
        }
      }}
    >
      {showVisualization && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
          minWidth="100px"
        >
          <BetPoolPieChart
            {...getPieChartProps()}
            size="100px"
          />
        </Box>
      )}
      <Box flex="1" p={0} height="100%">
        <VStack {...radioProps.getRootProps()} spacing={1} width="100%" height="100%" justify="space-between">
          {getRadioCards()}
        </VStack>
      </Box>
      <BettingInterface
        betAmount={betAmount}
        setBetAmount={setBetAmount}
        contributeAmount={contributeAmount}
        setContributeAmount={setContributeAmount}
        isDisabled={!selection}
        contestId={contest.id}
      />
    </Flex>
  );
};

export default BetTypePanel; 