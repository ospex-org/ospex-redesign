'use client'

import React, { useState } from 'react';
import { Box, Heading, Text, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, VStack, Tabs, TabList, Tab, IconButton } from '@chakra-ui/react'
import PreloadLink from '../common/PreloadLink'
import OddsChartContainer from '../graphs/OddsChartContainer';
// import NumberSelector from '../common/NumberSelector';
import BetNowBox from './BetNowBox';
import { useContestStore } from '../../store/contestStore';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
// import OrderBook from '../orderbook/OrderBook';

interface ContestDetailProps {
  contestId: string;
}

const ContestDetail: React.FC<ContestDetailProps> = ({ contestId }) => {
  const { contests } = useContestStore();
  const contest = contests[parseInt(contestId.replace('seed', '')) - 1];
  const [spread, setSpread] = useState(contest.awaySpread);
  const [total, setTotal] = useState(contest.total);
  const [betType, setBetType] = useState<'spread' | 'moneyline' | 'total'>('spread');
  const [teamPerspective, setTeamPerspective] = useState<'away' | 'home'>('away');
  const [isGraphCollapsed, setIsGraphCollapsed] = useState(false);
  const [isOrderBookCollapsed, setIsOrderBookCollapsed] = useState(false);

  const handleNumberChange = (newValue: number) => {
    if (betType === 'spread') {
      setSpread(newValue);
    } else if (betType === 'total') {
      setTotal(newValue);
    }
  };

  const getDisplaySpread = () => {
    return teamPerspective === 'away' ? spread : -spread;
  };

  const getDisplayTeam = () => {
    return teamPerspective === 'away' ? contest.awayTeam : contest.homeTeam;
  };

  const getDisplayText = () => {
    if (betType === 'spread') {
      return `${getDisplayTeam()} ${getDisplaySpread() > 0 ? '+' : ''}${getDisplaySpread().toFixed(1)}`;
    } else if (betType === 'total') {
      return `${teamPerspective === 'away' ? 'Over' : 'Under'} ${total.toFixed(1)}`;
    } else {
      return `${getDisplayTeam()} Moneyline`;
    }
  };

  const handleBetSubmit = (amount: string) => {
    console.log('Submitting bet:', { amount, betType, spread, total, teamPerspective });
    // Implement bet submission logic here
  };

  return (
    <Box className="scroll-container" maxWidth="1400px" margin="0 auto" padding="1rem">
      <Flex direction="column">
        <Breadcrumb color="gray.300" mb={4}>
          <BreadcrumbItem>
            <PreloadLink href="/" props={{}}>
              <BreadcrumbLink as="span">Home</BreadcrumbLink>
            </PreloadLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <PreloadLink href="/" props={{}}>
              <BreadcrumbLink as="span">{contest.league}</BreadcrumbLink>
            </PreloadLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>{contest.awayTeam} vs. {contest.homeTeam}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Flex direction={{ base: "column", md: "row" }} mb={4}>
          <Box flex={1}>
            <Heading as="h1" size="xl" mb={2} color="white">
              {contest.awayTeam} vs. {contest.homeTeam}
            </Heading>
            <Text mb={4} color="gray.300">
              {new Date(contest.date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })} {contest.time} EST
            </Text>

            {/* Number Selector to be utilized in version 2 */}
            {/* <VStack align="stretch" spacing={4} mb={2}>
              <Box>
                <Text fontSize="xl" fontWeight="bold" color="white" mb={2}>
                  {getDisplayText()}
                </Text>
                <Box height="40px">
                  {betType !== 'moneyline' && (
                    <NumberSelector
                      value={betType === 'spread' ? getDisplaySpread() : total}
                      onChange={(newValue) => handleNumberChange(betType === 'spread' && teamPerspective === 'home' ? -newValue : newValue)}
                      min={betType === 'spread' ? -50 : 0}
                      max={betType === 'spread' ? 50 : 100}
                      showPlusSign={betType === 'spread'}
                    />
                  )}
                </Box>
              </Box>
            </VStack> */}
          </Box>

          <Box width={{ base: "100%", md: "300px" }} ml={{ md: 8 }} mt={{ base: 4, md: 0 }}>
            <BetNowBox onSubmit={handleBetSubmit} displayText={getDisplayText()} />
          </Box>
        </Flex>

        <Flex direction="column" flex="1">
          <Box mb={4}>
            <Tabs colorScheme="gray" index={teamPerspective === 'away' ? 0 : 1} onChange={(index) => setTeamPerspective(index === 0 ? 'away' : 'home')}>
              <TabList mb={2}>
                <Tab>{betType === 'total' ? 'Over' : contest.awayTeam}</Tab>
                <Tab>{betType === 'total' ? 'Under' : contest.homeTeam}</Tab>
              </TabList>
            </Tabs>
            <Tabs colorScheme="gray" index={['spread', 'moneyline', 'total'].indexOf(betType)} onChange={(index) => setBetType(['spread', 'moneyline', 'total'][index] as 'spread' | 'moneyline' | 'total')}>
              <TabList mb={4}>
                <Tab>Spread</Tab>
                <Tab>Moneyline</Tab>
                <Tab>Total</Tab>
              </TabList>
            </Tabs>
          </Box>

          <Box mb={4}>
            <Flex alignItems="center" mb={2}>
              <Heading size="md" mr={2}>Chart</Heading>
              <IconButton
                aria-label={isGraphCollapsed ? "Expand graph" : "Collapse graph"}
                icon={isGraphCollapsed ? <ChevronDownIcon /> : <ChevronUpIcon />}
                onClick={() => setIsGraphCollapsed(!isGraphCollapsed)}
                size="sm"
                variant="ghost"
              />
            </Flex>

            <Box
              height={isGraphCollapsed ? "0" : "300px"}
              transition="height 0.3s ease-in-out, opacity 0.3s ease-in-out"
              opacity={isGraphCollapsed ? 0 : 1}
              overflow="hidden"
            >
              <Box borderWidth={1} borderRadius="md" p={4} mb={4} height="100%">
                <OddsChartContainer
                  awayTeam={contest.awayTeam}
                  homeTeam={contest.homeTeam}
                  awayTeamColor="#FF6B6B"
                  homeTeamColor="#4ECDC4"
                  betType={betType}
                  teamPerspective={teamPerspective}
                />
              </Box>
            </Box>
          </Box>

          {/* Order Book to be utilized in version 2 */}
          {/* <Box
            transition="transform 0.6s ease-in-out, opacity 0.6s ease-in-out"
            transform={isGraphCollapsed ? "translateY(0)" : "translateY(20px)"}
            opacity={isGraphCollapsed ? 1 : 0.8}
            mb={4}
          >
            <Flex alignItems="center" mb={2}>
              <Heading size="md" mr={2}>Order Book</Heading>
              <IconButton
                aria-label={isOrderBookCollapsed ? "Expand order book" : "Collapse order book"}
                icon={isOrderBookCollapsed ? <ChevronDownIcon /> : <ChevronUpIcon />}
                onClick={() => setIsOrderBookCollapsed(!isOrderBookCollapsed)}
                size="sm"
                variant="ghost"
              />
            </Flex>

            <Box
              height={isOrderBookCollapsed ? "0" : "auto"}
              transition="height 0.6s ease-in-out, opacity 0.6s ease-in-out"
              opacity={isOrderBookCollapsed ? 0 : 1}
              overflow="hidden"
            >
              <Box borderWidth={1} borderRadius="md" p={4}>
                <OrderBook
                  contestId={contestId}
                  awayTeam={contest.awayTeam}
                  homeTeam={contest.homeTeam}
                  betType={betType}
                  spreadValue={spread}
                  totalValue={total}
                />
              </Box>
            </Box>
          </Box> */}
        </Flex>
      </Flex>
    </Box>
  )
}

export default ContestDetail;
