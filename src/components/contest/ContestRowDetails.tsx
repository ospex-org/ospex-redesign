import React from 'react';
import { Box, Flex, Grid, Text, Button } from '@chakra-ui/react';
import { Contest } from '../../types';
import BetPoolPieChart from '../common/BetPoolPieChart';
import OddsChartContainer from '../graphs/OddsChartContainer';
import { useRouter } from 'next/navigation';

interface ContestRowDetailsProps {
  contest: Contest;
  isOpen: boolean;
}

const ContestRowDetails: React.FC<ContestRowDetailsProps> = ({ contest, isOpen }) => {
  const router = useRouter();

  return (
    <Box
      height={isOpen ? '200px' : '0'}
      transition="height 0.3s ease-in-out"
      overflow="hidden"
      bg="gray.800"
      borderBottomRadius="md"
      position="relative"
      width="100%"
    >
      <Grid 
        templateColumns="repeat(3, 1fr)" 
        gap={4} 
        p={4}
        maxWidth="1400px"
        margin="0 auto"
        width="100%"
      >
        {/* Spread Section */}
        <Box>
          <Text fontWeight="bold" mb={2}>Spread Pools</Text>
          <Flex align="center" justify="space-between" mb={2}>
            <BetPoolPieChart
              poolSizeA={contest.poolSizes?.spread.away || 0}
              poolSizeB={contest.poolSizes?.spread.home || 0}
              labelA="Away"
              labelB="Home"
              oddsA={contest.awaySpreadOdds}
              oddsB={contest.homeSpreadOdds}
              size="80px"
            />
            <Button colorScheme="blue" size="sm">Place Bet</Button>
          </Flex>
          <Box height="100px">
            <OddsChartContainer
              awayTeam={contest.awayTeam}
              homeTeam={contest.homeTeam}
              awayTeamColor="#FF6B6B"
              homeTeamColor="#4ECDC4"
              betType="spread"
              teamPerspective="away"
            />
          </Box>
        </Box>

        {/* Moneyline Section */}
        <Box>
          <Text fontWeight="bold" mb={2}>Moneyline Pools</Text>
          <Flex align="center" justify="space-between" mb={2}>
            <BetPoolPieChart
              poolSizeA={contest.poolSizes?.moneyline.away || 0}
              poolSizeB={contest.poolSizes?.moneyline.home || 0}
              labelA="Away"
              labelB="Home"
              oddsA={contest.awayMoneyline}
              oddsB={contest.homeMoneyline}
              size="80px"
            />
            <Button colorScheme="blue" size="sm">Place Bet</Button>
          </Flex>
          <Box height="100px">
            <OddsChartContainer
              awayTeam={contest.awayTeam}
              homeTeam={contest.homeTeam}
              awayTeamColor="#FF6B6B"
              homeTeamColor="#4ECDC4"
              betType="moneyline"
              teamPerspective="away"
            />
          </Box>
        </Box>

        {/* Total Section */}
        <Box>
          <Text fontWeight="bold" mb={2}>Total Pools</Text>
          <Flex align="center" justify="space-between" mb={2}>
            <BetPoolPieChart
              poolSizeA={contest.poolSizes?.total.over || 0}
              poolSizeB={contest.poolSizes?.total.under || 0}
              labelA="Over"
              labelB="Under"
              oddsA={contest.overOdds}
              oddsB={contest.underOdds}
              size="80px"
            />
            <Button colorScheme="blue" size="sm">Place Bet</Button>
          </Flex>
          <Box height="100px">
            <OddsChartContainer
              awayTeam={contest.awayTeam}
              homeTeam={contest.homeTeam}
              awayTeamColor="#FF6B6B"
              homeTeamColor="#4ECDC4"
              betType="total"
              teamPerspective="away"
            />
          </Box>
        </Box>
      </Grid>
      <Button 
        position="absolute"
        top="10px"
        right="10px"
        size="sm"
        variant="outline"
        onClick={(e) => {
          e.stopPropagation();
          router.push(`/c/${contest.id}`);
        }}
      >
        View Full Details →
      </Button>
    </Box>
  );
};

export default ContestRowDetails; 