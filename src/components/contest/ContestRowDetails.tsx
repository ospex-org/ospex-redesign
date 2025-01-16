import React from 'react';
import { Box, Flex, Grid, Text, Button, Tabs, TabList, Tab, TabPanels, TabPanel, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react';
import { Contest } from '../../types';
import BetPoolPieChart from '../common/BetPoolPieChart';
import OddsChartContainer from '../graphs/OddsChartContainer';
import { useRouter } from 'next/navigation';
import { RadioCard } from '../common/RadioCard';
import { useRadioGroup, VStack } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { getTeamColor, NFL_TEAMS, BETTING_COLORS } from '@/constants/teamColors';

interface ContestRowDetailsProps {
  contest: Contest;
  isOpen: boolean;
}

const formatSpread = (spread: number) => {
  return spread > 0 ? `+${spread}` : spread;
};

const formatOdds = (odds: number) => {
  return odds > 0 ? `+${odds}` : odds;
};

const ContestRowDetails: React.FC<ContestRowDetailsProps> = ({ contest, isOpen }) => {
  const router = useRouter();

  // Separate states for each bet type
  const [spreadSelection, setSpreadSelection] = React.useState("");
  const [moneylineSelection, setMoneylineSelection] = React.useState("");
  const [totalSelection, setTotalSelection] = React.useState("");
  const [betAmount, setBetAmount] = React.useState(1);
  const [contributeAmount, setContributeAmount] = React.useState(0);

  // Get current selection based on active tab
  const [activeTab, setActiveTab] = React.useState(0);
  const getCurrentSelection = () => {
    switch(activeTab) {
      case 0: return spreadSelection;
      case 1: return moneylineSelection;
      case 2: return totalSelection;
      default: return "";
    }
  };

  // Handle radio changes for each type
  const handleSpreadChange = (value: string) => {
    setSpreadSelection(value === spreadSelection ? "" : value);
  };

  const handleMoneylineChange = (value: string) => {
    setMoneylineSelection(value === moneylineSelection ? "" : value);
  };

  const handleTotalChange = (value: string) => {
    setTotalSelection(value === totalSelection ? "" : value);
  };

  // Create separate radio groups for each bet type
  const {
    getRootProps: getSpreadRootProps,
    getRadioProps: getSpreadRadioProps
  } = useRadioGroup({
    value: spreadSelection,
    onChange: handleSpreadChange
  });

  const {
    getRootProps: getMoneylineRootProps,
    getRadioProps: getMoneylineRadioProps
  } = useRadioGroup({
    value: moneylineSelection,
    onChange: handleMoneylineChange
  });

  const {
    getRootProps: getTotalRootProps,
    getRadioProps: getTotalRadioProps
  } = useRadioGroup({
    value: totalSelection,
    onChange: handleTotalChange
  });

  return (
    <Box
      height={isOpen ? '144px' : '0'}
      transition="height 0.3s ease-in-out"
      overflow="hidden"
      bg="black"
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `repeating-linear-gradient(45deg, rgba(45, 55, 72, 0.1) 0px, rgba(45, 55, 72, 0.1) 1px, transparent 1px, transparent 10px)`
      }}
    >
      <Flex 
        p={4} 
        justify="space-between"
        opacity={isOpen ? 1 : 0}
        transition="opacity 0.2s"
        position="relative"
      >
        {/* Left side: Reserved for future content */}
        <Box width="45%">
          {/* Future content: stats, write-ups, etc. */}
        </Box>

        {/* Right side: Betting interface */}
        <Box width="55%" position="relative">
          <Tabs variant="soft-rounded" colorScheme="blue" orientation="vertical" onChange={(index) => setActiveTab(index)}>
            <Flex gap={6}>
              {/* Button list - moved more to center */}
              <TabList 
                flexDirection="column" 
                gap={2}
                width="120px"
              >
                <Tab 
                  justifyContent="flex-start"
                  px={4}
                  py={2}
                  _selected={{ 
                    bg: 'gray.700',
                    color: 'white' 
                  }}
                >
                  Spread
                </Tab>
                <Tab 
                  justifyContent="flex-start"
                  px={4}
                  py={2}
                  _selected={{ 
                    bg: 'gray.700',
                    color: 'white' 
                  }}
                >
                  Moneyline
                </Tab>
                <Tab 
                  justifyContent="flex-start"
                  px={4}
                  py={2}
                  _selected={{ 
                    bg: 'gray.700',
                    color: 'white' 
                  }}
                >
                  Total
                </Tab>
              </TabList>

              {/* Chart and betting options */}
              <TabPanels width="calc(100% - 140px)">
                <TabPanel p={0} height="100%">
                  <Flex align="center" height="100%" gap={4}>
                    {/* Chart */}
                    <Box 
                      display="flex" 
                      alignItems="center" 
                      justifyContent="center"
                      height="100%"
                      minWidth="100px"
                    >
                      <BetPoolPieChart
                        poolSizeA={contest.poolSizes?.spread.away || 0}
                        poolSizeB={contest.poolSizes?.spread.home || 0}
                        size="100px"
                        colorA={NFL_TEAMS[contest.awayTeam]?.useSecondaryForDonut ? 
                          NFL_TEAMS[contest.awayTeam].secondary : 
                          getTeamColor(contest.awayTeam)}
                        colorB={NFL_TEAMS[contest.homeTeam]?.useSecondaryForDonut ? 
                          NFL_TEAMS[contest.homeTeam].secondary : 
                          getTeamColor(contest.homeTeam)}
                        teamAName={contest.awayTeam}
                        teamBName={contest.homeTeam}
                      />
                    </Box>
                    
                    {/* Radio Buttons */}
                    <Box 
                      flex="1"
                      p={0}
                      height="100%"
                    >
                      <VStack {...getSpreadRootProps()} spacing={1} width="100%" height="100%" justify="space-between">
                        <RadioCard
                          {...getSpreadRadioProps({ value: 'spread_away' })}
                          label={`${contest.awayTeam} ${formatSpread(contest.awaySpread)}`}
                          description={`Current Odds: ${formatOdds(contest.awaySpreadOdds)}`}
                          teamColor={NFL_TEAMS[contest.awayTeam]?.useSecondaryForDonut ? 
                            NFL_TEAMS[contest.awayTeam].secondary : 
                            getTeamColor(contest.awayTeam)}
                        />
                        <RadioCard
                          {...getSpreadRadioProps({ value: 'spread_home' })}
                          label={`${contest.homeTeam} ${formatSpread(contest.homeSpread)}`}
                          description={`Current Odds: ${formatOdds(contest.homeSpreadOdds)}`}
                          teamColor={NFL_TEAMS[contest.homeTeam]?.useSecondaryForDonut ? 
                            NFL_TEAMS[contest.homeTeam].secondary : 
                            getTeamColor(contest.homeTeam)}
                        />
                      </VStack>
                    </Box>

                    {/* New 2x2 Grid for Betting Interface */}
                    <Grid 
                      templateColumns="repeat(2, 1fr)" 
                      gap={3}
                      width="240px"
                      height="100%"
                      ml={2}
                      borderRadius="md"
                      alignContent="center"
                    >
                      {/* [1] Amount Selector */}
                      <Box>
                        <Text fontSize="xs" mb={1} color="gray.400">Amount (USDC)</Text>
                        <NumberInput 
                          size="sm"
                          value={betAmount}
                          onChange={(valueString) => setBetAmount(Number(valueString))}
                          min={1}
                          max={100}
                          step={1}
                          bg="gray.900"
                          borderRadius="md"
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </Box>

                      {/* [2] Contribute Selector */}
                      <Box>
                        <Text fontSize="xs" mb={1} color="gray.400">Contribute</Text>
                        <NumberInput
                          size="sm"
                          value={contributeAmount}
                          onChange={(valueString) => setContributeAmount(Number(valueString))}
                          min={0}
                          step={1}
                          bg="gray.900"
                          borderRadius="md"
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                        <Text fontSize="xs" color="gray.500" mt={1}>(Not required)</Text>
                      </Box>

                      {/* [3] Place Bet Button */}
                      <Button
                        size="sm"
                        bg="gray.700"
                        color="white"
                        _hover={{ bg: 'gray.600' }}
                        _disabled={{
                          bg: 'gray.900',
                          opacity: 0.7,
                          cursor: 'not-allowed'
                        }}
                        isDisabled={!spreadSelection}
                      >
                        Place Bet
                      </Button>

                      {/* [4] Full Details Link */}
                      <Button
                        size="sm"
                        variant="ghost"
                        rightIcon={<ChevronRightIcon />}
                        onClick={() => router.push(`/c/${contest.id}`)}
                        color="gray.400"
                        _hover={{ color: 'white' }}
                      >
                        Full Details
                      </Button>
                    </Grid>
                  </Flex>
                </TabPanel>

                <TabPanel p={0} height="100%">
                  <Flex align="center" height="100%" gap={4}>
                    <Box 
                      display="flex" 
                      alignItems="center" 
                      justifyContent="center"
                      height="100%"
                      minWidth="100px"
                    >
                      <BetPoolPieChart
                        poolSizeA={contest.poolSizes?.moneyline.away || 0}
                        poolSizeB={contest.poolSizes?.moneyline.home || 0}
                        size="100px"
                        colorA={NFL_TEAMS[contest.awayTeam]?.useSecondaryForDonut ? 
                          NFL_TEAMS[contest.awayTeam].secondary : 
                          getTeamColor(contest.awayTeam)}
                        colorB={NFL_TEAMS[contest.homeTeam]?.useSecondaryForDonut ? 
                          NFL_TEAMS[contest.homeTeam].secondary : 
                          getTeamColor(contest.homeTeam)}
                        teamAName={contest.awayTeam}
                        teamBName={contest.homeTeam}
                      />
                    </Box>
                    
                    <Box flex="1" p={0} height="100%">
                      <VStack {...getMoneylineRootProps()} spacing={1} width="100%" height="100%" justify="space-between">
                        <RadioCard
                          {...getMoneylineRadioProps({ value: 'moneyline_away' })}
                          label={`${contest.awayTeam}`}
                          description={`Current Odds: ${formatOdds(contest.awayMoneyline)}`}
                          teamColor={getTeamColor(contest.awayTeam)}
                          secondaryColor={NFL_TEAMS[contest.awayTeam]?.secondary}
                        />
                        <RadioCard
                          {...getMoneylineRadioProps({ value: 'moneyline_home' })}
                          label={`${contest.homeTeam}`}
                          description={`Current Odds: ${formatOdds(contest.homeMoneyline)}`}
                          teamColor={NFL_TEAMS[contest.homeTeam]?.useSecondaryForDonut ? 
                            NFL_TEAMS[contest.homeTeam].secondary : 
                            getTeamColor(contest.homeTeam)}
                        />
                      </VStack>
                    </Box>

                    {/* New 2x2 Grid for Betting Interface */}
                    <Grid 
                      templateColumns="repeat(2, 1fr)" 
                      gap={3}
                      width="240px"
                      height="100%"
                      ml={2}
                      borderRadius="md"
                      alignContent="center"
                    >
                      {/* [1] Amount Selector */}
                      <Box>
                        <Text fontSize="xs" mb={1} color="gray.400">Amount (USDC)</Text>
                        <NumberInput 
                          size="sm"
                          value={betAmount}
                          onChange={(valueString) => setBetAmount(Number(valueString))}
                          min={1}
                          max={100}
                          step={1}
                          bg="gray.900"
                          borderRadius="md"
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </Box>

                      {/* [2] Contribute Selector */}
                      <Box>
                        <Text fontSize="xs" mb={1} color="gray.400">Contribute</Text>
                        <NumberInput
                          size="sm"
                          value={contributeAmount}
                          onChange={(valueString) => setContributeAmount(Number(valueString))}
                          min={0}
                          step={1}
                          bg="gray.900"
                          borderRadius="md"
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                        <Text fontSize="xs" color="gray.500" mt={1}>(Not required)</Text>
                      </Box>

                      {/* [3] Place Bet Button */}
                      <Button
                        size="sm"
                        bg="gray.700"
                        color="white"
                        _hover={{ bg: 'gray.600' }}
                        _disabled={{
                          bg: 'gray.900',
                          opacity: 0.7,
                          cursor: 'not-allowed'
                        }}
                        isDisabled={!moneylineSelection}
                      >
                        Place Bet
                      </Button>

                      {/* [4] Full Details Link */}
                      <Button
                        size="sm"
                        variant="ghost"
                        rightIcon={<ChevronRightIcon />}
                        onClick={() => router.push(`/c/${contest.id}`)}
                        color="gray.400"
                        _hover={{ color: 'white' }}
                      >
                        Full Details
                      </Button>
                    </Grid>
                  </Flex>
                </TabPanel>

                <TabPanel p={0} height="100%">
                  <Flex align="center" height="100%" gap={4}>
                    <Box 
                      display="flex" 
                      alignItems="center" 
                      justifyContent="center"
                      height="100%"
                      minWidth="100px"
                    >
                      <BetPoolPieChart
                        poolSizeA={contest.poolSizes?.total.over || 0}
                        poolSizeB={contest.poolSizes?.total.under || 0}
                        size="100px"
                        colorA={BETTING_COLORS.OVER}
                        colorB={BETTING_COLORS.UNDER}
                        teamAName="Over"
                        teamBName="Under"
                      />
                    </Box>
                    
                    <Box flex="1" p={0} height="100%">
                      <VStack {...getTotalRootProps()} spacing={1} width="100%" height="100%" justify="space-between">
                        <RadioCard
                          {...getTotalRadioProps({ value: 'total_over' })}
                          label={`Over ${contest.total}`}
                          description={`Current Odds: ${formatOdds(contest.overOdds)}`}
                          teamColor={BETTING_COLORS.OVER}
                        />
                        <RadioCard
                          {...getTotalRadioProps({ value: 'total_under' })}
                          label={`Under ${contest.total}`}
                          description={`Current Odds: ${formatOdds(contest.underOdds)}`}
                          teamColor={BETTING_COLORS.UNDER}
                        />
                      </VStack>
                    </Box>

                    {/* New 2x2 Grid for Betting Interface */}
                    <Grid 
                      templateColumns="repeat(2, 1fr)" 
                      gap={3}
                      width="240px"
                      height="100%"
                      ml={2}
                      borderRadius="md"
                      alignContent="center"
                    >
                      {/* [1] Amount Selector */}
                      <Box>
                        <Text fontSize="xs" mb={1} color="gray.400">Amount (USDC)</Text>
                        <NumberInput 
                          size="sm"
                          value={betAmount}
                          onChange={(valueString) => setBetAmount(Number(valueString))}
                          min={1}
                          max={100}
                          step={1}
                          bg="gray.900"
                          borderRadius="md"
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </Box>

                      {/* [2] Contribute Selector */}
                      <Box>
                        <Text fontSize="xs" mb={1} color="gray.400">Contribute</Text>
                        <NumberInput
                          size="sm"
                          value={contributeAmount}
                          onChange={(valueString) => setContributeAmount(Number(valueString))}
                          min={0}
                          step={1}
                          bg="gray.900"
                          borderRadius="md"
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                        <Text fontSize="xs" color="gray.500" mt={1}>(Not required)</Text>
                      </Box>

                      {/* [3] Place Bet Button */}
                      <Button
                        size="sm"
                        bg="gray.700"
                        color="white"
                        _hover={{ bg: 'gray.600' }}
                        _disabled={{
                          bg: 'gray.900',
                          opacity: 0.7,
                          cursor: 'not-allowed'
                        }}
                        isDisabled={!totalSelection}
                      >
                        Place Bet
                      </Button>

                      {/* [4] Full Details Link */}
                      <Button
                        size="sm"
                        variant="ghost"
                        rightIcon={<ChevronRightIcon />}
                        onClick={() => router.push(`/c/${contest.id}`)}
                        color="gray.400"
                        _hover={{ color: 'white' }}
                      >
                        Full Details
                      </Button>
                    </Grid>
                  </Flex>
                </TabPanel>

              </TabPanels>
            </Flex>
          </Tabs>
        </Box>
      </Flex>
    </Box>
  );
};

export default ContestRowDetails; 