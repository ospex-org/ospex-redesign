import React from 'react';
import { Box, Flex, Grid, Text, Button, Tabs, TabList, Tab, TabPanels, TabPanel, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react';
import { Contest } from '../../types';
import BetPoolPieChart from '../common/BetPoolPieChart';
import OddsChartContainer from '../graphs/OddsChartContainer';
import { useRouter } from 'next/navigation';
import { RadioCard } from '../common/RadioCard';
import { useRadioGroup, VStack } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

interface ContestRowDetailsProps {
  contest: Contest;
  isOpen: boolean;
}

const ContestRowDetails: React.FC<ContestRowDetailsProps> = ({ contest, isOpen }) => {
  const router = useRouter();

  // Add state to track selection
  const [selectedValue, setSelectedValue] = React.useState("");
  const [betAmount, setBetAmount] = React.useState(1);
  const [contributeAmount, setContributeAmount] = React.useState(0);

  const handleChange = (value: string) => {
    console.log('RadioGroup onChange:', value)
    if (value === selectedValue) {
      setSelectedValue("")
    } else {
      setSelectedValue(value)
    }
  }

  const { getRootProps, getRadioProps } = useRadioGroup({
    value: selectedValue,
    onChange: handleChange
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
          <Tabs variant="soft-rounded" colorScheme="blue" orientation="vertical">
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
                      />
                    </Box>
                    
                    {/* Radio Buttons */}
                    <Box 
                      flex="1"
                      p={0}
                      height="100%"
                    >
                      <VStack {...getRootProps()} spacing={1} width="100%" height="100%" justify="space-between">
                        <RadioCard
                          {...getRadioProps({ value: 'away' })}
                          label={`${contest.awayTeam} -2.5`}
                          description="Current Odds: -110"
                        />
                        <RadioCard
                          {...getRadioProps({ value: 'home' })}
                          label={`${contest.homeTeam} +2.5`}
                          description="Current Odds: -110"
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
                          sx={{
                            '& .chakra-numberinput__stepper': {
                              color: 'gray.400',
                              _hover: { color: 'white' }
                            }
                          }}
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
                          sx={{
                            '& .chakra-numberinput__stepper': {
                              color: 'gray.400',
                              _hover: { color: 'white' }
                            }
                          }}
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
                      />
                    </Box>
                    
                    <Box flex="1" p={0} height="100%">
                      <VStack {...getRootProps()} spacing={1} width="100%" height="100%" justify="space-between">
                        <RadioCard
                          {...getRadioProps({ value: 'moneyline_away' })}
                          label={`${contest.awayTeam}`}
                          description="Current Odds: +110"
                        />
                        <RadioCard
                          {...getRadioProps({ value: 'moneyline_home' })}
                          label={`${contest.homeTeam}`}
                          description="Current Odds: -130"
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
                          sx={{
                            '& .chakra-numberinput__stepper': {
                              color: 'gray.400',
                              _hover: { color: 'white' }
                            }
                          }}
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
                          sx={{
                            '& .chakra-numberinput__stepper': {
                              color: 'gray.400',
                              _hover: { color: 'white' }
                            }
                          }}
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
                      />
                    </Box>
                    
                    <Box flex="1" p={0} height="100%">
                      <VStack {...getRootProps()} spacing={1} width="100%" height="100%" justify="space-between">
                        <RadioCard
                          {...getRadioProps({ value: 'total_over' })}
                          label={`Over ${contest.total}`}
                          description="Current Odds: -110"
                        />
                        <RadioCard
                          {...getRadioProps({ value: 'total_under' })}
                          label={`Under ${contest.total}`}
                          description="Current Odds: -110"
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
                          sx={{
                            '& .chakra-numberinput__stepper': {
                              color: 'gray.400',
                              _hover: { color: 'white' }
                            }
                          }}
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
                          sx={{
                            '& .chakra-numberinput__stepper': {
                              color: 'gray.400',
                              _hover: { color: 'white' }
                            }
                          }}
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