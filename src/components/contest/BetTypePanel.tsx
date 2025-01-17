import React from 'react';
import { Box, Flex, VStack } from '@chakra-ui/react';
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
  const getPieChartProps = () => {
    switch (type) {
      case 'spread':
        return {
          poolSizeA: contest.poolSizes?.spread.away || 0,
          poolSizeB: contest.poolSizes?.spread.home || 0,
          colorA: NFL_TEAMS[contest.awayTeam]?.useSecondaryForDonut ?
            NFL_TEAMS[contest.awayTeam].secondary :
            getTeamColor(contest.awayTeam),
          colorB: NFL_TEAMS[contest.homeTeam]?.useSecondaryForDonut ?
            NFL_TEAMS[contest.homeTeam].secondary :
            getTeamColor(contest.homeTeam),
          teamAName: contest.awayTeam,
          teamBName: contest.homeTeam,
        };
      case 'moneyline':
        return {
          poolSizeA: contest.poolSizes?.moneyline.away || 0,
          poolSizeB: contest.poolSizes?.moneyline.home || 0,
          colorA: NFL_TEAMS[contest.awayTeam]?.useSecondaryForDonut ?
            NFL_TEAMS[contest.awayTeam].secondary :
            getTeamColor(contest.awayTeam),
          colorB: NFL_TEAMS[contest.homeTeam]?.useSecondaryForDonut ?
            NFL_TEAMS[contest.homeTeam].secondary :
            getTeamColor(contest.homeTeam),
          teamAName: contest.awayTeam,
          teamBName: contest.homeTeam,
        };
      case 'total':
        return {
          poolSizeA: contest.poolSizes?.total.over || 0,
          poolSizeB: contest.poolSizes?.total.under || 0,
          colorA: BETTING_COLORS.OVER,
          colorB: BETTING_COLORS.UNDER,
          teamAName: "Over",
          teamBName: "Under",
        };
    }
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
            />
            <RadioCard
              {...radioProps.getRadioProps({ value: 'spread_home' })}
              label={`${contest.homeTeam} ${formatSpread(contest.homeSpread)}`}
              description={`Current Odds: ${formatOdds(contest.homeSpreadOdds)}`}
              teamColor={NFL_TEAMS[contest.homeTeam]?.useSecondaryForDonut ?
                NFL_TEAMS[contest.homeTeam].secondary :
                getTeamColor(contest.homeTeam)}
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
            />
            <RadioCard
              {...radioProps.getRadioProps({ value: 'moneyline_home' })}
              label={`${contest.homeTeam} ML`}
              description={`Current Odds: ${formatOdds(contest.homeMoneylineOdds)}`}
              teamColor={NFL_TEAMS[contest.homeTeam]?.useSecondaryForDonut ?
                NFL_TEAMS[contest.homeTeam].secondary :
                getTeamColor(contest.homeTeam)}
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
            />
            <RadioCard
              {...radioProps.getRadioProps({ value: 'total_under' })}
              label={`Under ${contest.total}`}
              description={`Current Odds: ${formatOdds(contest.underOdds)}`}
              teamColor={BETTING_COLORS.UNDER}
            />
          </>
        );
    }
  };

  const pieChartProps = getPieChartProps();

  return (
    <Flex align="center" height="100%" gap={4}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100%"
        minWidth="100px"
      >
        <BetPoolPieChart
          {...pieChartProps}
          size="100px"
        />
      </Box>

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