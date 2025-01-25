'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Box, Table, Thead, Tbody, Tr, Th, Td, Badge, Text, Flex, useBreakpointValue } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Contest } from '../types'
import { useRouter } from 'next/navigation'
import { TableSkeleton } from './LoadingIndicators'
import AdjustableValue from './common/AdjustableValue'
import { fetchContests, updateContest } from '../api/mockApi'
import { useContestStore } from '../store/contestStore'
import BetPoolPieChart from './common/BetPoolPieChart'
import ContestRowDetails from './contest/ContestRowDetails'
import { keyframes } from '@emotion/react'

interface ContestListProps {
  pickersEnabled: boolean;
}

const bounceUpKeyframes = keyframes`
  0% {
    opacity: 1;
    transform: translateY(14px);
  }
  25% {
    opacity: 0.5;
    transform: translateY(8px);
  }
  50% {
    opacity: 0;
    transform: translateY(8px);
  }
  75% {
    opacity: 0;
    transform: translateY(8px);
  }
  100% {
    opacity: 0;
    transform: translateY(14px);
  }
`;

const AnimatedChevron = ({
  side,
  isRowExpanded
}: {
  side: 'left' | 'right' | 'center';
  isRowExpanded: boolean;
}) => (
  <Box
    position="relative"
    height="100%"
    display={isRowExpanded ? 'none' : 'flex'}
    alignItems="flex-end"
    justifyContent="center"
    opacity="0"
    transform="translateY(14px)"
    transition="opacity 0.2s ease-out, transform 0s"
    _groupHover={{
      animation: !isRowExpanded ? `${bounceUpKeyframes} 2s ease-out infinite` : 'none',
    }}
  >
    <ChevronDownIcon boxSize={5} color="gray.100" />
  </Box>
);

const ContestList: React.FC<ContestListProps> = ({ pickersEnabled }) => {
  const { contests, setContests, isLoading, setIsLoading } = useContestStore();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const router = useRouter();
  const dateFormat = useBreakpointValue({ 
    base: 'short',  // e.g. "09-10"
    lg: 'long'      // e.g. "2023-09-10"
  });

  const handleRowClick = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const handleRowMouseEnter = (index: number) => {
    setHoveredIndex(index);
    router.prefetch(`/c/seed${index + 1}`);
  };

  const handleSpreadChange = useCallback((index: number, team: 'away' | 'home', newSpread: number) => {
    const roundedSpread = Math.round(newSpread * 2) / 2;
    updateContest(index, {
      awaySpread: roundedSpread,
      homeSpread: -roundedSpread
    });
  }, [updateContest]);

  const handleTotalChange = useCallback((index: number, newTotal: number) => {
    const roundedTotal = Math.round(newTotal * 2) / 2;
    updateContest(index, {
      total: roundedTotal
    });
  }, [updateContest]);

  const formatDate = (date: string, time: string) => {
    if (dateFormat === 'short') {
      // Convert from "2023-09-10" to "09-10"
      const shortDate = date.split('-').slice(1).join('-');
      return (
        <Box>
          <Text>{shortDate}</Text>
          <Text>{time}</Text>
        </Box>
      );
    }
    
    return (
      <Box>
        <Text>{date}</Text>
        <Text>{time} EST</Text>
      </Box>
    );
  };

  useEffect(() => {
    const loadContests = async () => {
      const fetchedContests = await fetchContests();
      setContests(fetchedContests);
      setIsLoading(false);
    };
    loadContests();
  }, [setContests, setIsLoading]);

  if (isLoading) {
    return <TableSkeleton />
  }

  return (
    <Box overflowX="auto" width="100%">
      <Table variant="simple" color="white" size="sm">
        <Thead>
          <Tr borderBottom="2px solid" borderColor="gray.700">
            <Th 
              color="gray.300" 
              width={{ base: "1%", xl: "2%" }} 
              px={{ base: 1, xl: 3 }}
            ></Th>
            <Th 
              color="gray.300" 
              width={{ base: "8%", xl: "10%" }}
              px={{ base: 1, xl: 3 }}
            >Date/Time</Th>
            <Th 
              color="gray.300" 
              width={{ base: "6%", xl: "8%" }}
              px={{ base: 1, xl: 3 }}
            >League</Th>
            <Th 
              color="gray.300"
              width={{ base: "24%", xl: "28%" }}
              px={{ base: 1, xl: 3 }}
            >Teams</Th>
            <Th
              color="gray.300"
              width={{ base: "1%", xl: "2%" }}
              px={{ base: 1, xl: 3 }}
            ></Th>
            <Th
              color="gray.300"
              textAlign="right"
              width={{ base: "8%", xl: "10%" }}
              px={{ base: 1, xl: 3 }}
            >Spread</Th>
            <Th
              color="gray.300" 
              textAlign="right" 
              width={{ base: "8%", xl: "10%" }}
              px={{ base: 1, xl: 3 }}
            >Spread Pools</Th>
            <Th
              color="gray.300"
              textAlign="right"
              width={{ base: "8%", xl: "10%" }}
              px={{ base: 1, xl: 3 }}
            >ML Pools</Th>
            <Th
              color="gray.300"
              textAlign="right"
              width={{ base: "8%", xl: "10%" }}
              px={{ base: 1, xl: 3 }}
            >Total</Th>
            <Th 
              color="gray.300" 
              textAlign="right" 
              width={{ base: "6%", xl: "8%" }}
              px={{ base: 1, xl: 3 }}
            >Total Pools</Th>
            <Th 
              color="gray.300"
              width={{ base: "1%", xl: "2%" }}
              px={{ base: 1, xl: 3 }}
            ></Th>
          </Tr>
        </Thead>
        <Tbody>
          {contests.map((contest: Contest, index: number) => (
            <React.Fragment key={contest.id}>
              <Tr
                onClick={() => handleRowClick(index)}
                onMouseEnter={() => handleRowMouseEnter(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  backgroundColor: hoveredIndex === index ? 'rgba(45, 55, 72, 0.3)' : 'transparent',
                  transition: 'background-color 0.2s',
                  cursor: 'pointer',
                }}
                borderBottom="1px solid"
                borderColor="gray.600"
                role="group"
                position="relative"
                sx={{
                  'td': {
                    px: { base: 1, xl: 3 },
                    py: { base: 2, xl: 3 }
                  }
                }}
              >
                <Td p={0} width={{ base: "1%", xl: "2%" }}>
                  <AnimatedChevron
                    side="left"
                    isRowExpanded={expandedRow === index}
                  />
                </Td>
                <Td width={{ base: "8%", xl: "10%" }} py={3}>
                  {formatDate(contest.date, contest.time)}
                </Td>
                <Td width={{ base: "6%", xl: "8%" }} py={3}>
                  <Badge colorScheme={getLeagueColor(contest.league)}>{contest.league}</Badge>
                </Td>
                <Td width={{ base: "24%", xl: "28%" }} py={3}>
                  <Box>
                    <Text>{contest.awayTeam}</Text>
                    <Text>{contest.homeTeam}</Text>
                  </Box>
                </Td>
                {/* <Td width="3%" pr={0}>
                  {pickersEnabled ? (
                    <AdjustableValue
                      value={contest.awaySpread}
                      onChange={(newSpread) => handleSpreadChange(index, 'away', newSpread)}
                      step={1}
                      enabled={pickersEnabled}
                      isSpread={true}
                      showLeftChevronOnly={true}
                      alignment="right"
                    />
                  ) : (
                    <Box width="20px" height="20px" />
                  )}
                </Td> */}
                <Td p={0} width={{ base: "1%", xl: "2%" }}>
                  <AnimatedChevron
                    side="center"
                    isRowExpanded={expandedRow === index}
                  />
                </Td>
                <Td textAlign="right" width={{ base: "8%", xl: "10%" }} py={3}>
                  <Box>
                    <Text>{formatSpread(contest.awaySpread)}</Text>
                    <Text>{formatSpread(-contest.awaySpread)}</Text>
                  </Box>
                </Td>
                {/* <Td width="3%" pl={0}>
                  {pickersEnabled ? (
                    <AdjustableValue
                      value={contest.awaySpread}
                      onChange={(newSpread) => handleSpreadChange(index, 'away', newSpread)}
                      step={1}
                      enabled={pickersEnabled}
                      isSpread={true}
                      showRightChevronOnly={true}
                      alignment="left"
                    />
                  ) : (
                    <Box width="20px" height="20px" />
                  )}
                </Td> */}
                <Td textAlign="right" width={{ base: "8%", xl: "10%" }} py={3}>
                  <Box>
                    <Text>{formatCurrency(contest.poolSizes?.spread.away || 0)}</Text>
                    <Text>{formatCurrency(contest.poolSizes?.spread.home || 0)}</Text>
                  </Box>
                </Td>
                <Td textAlign="right" width={{ base: "8%", xl: "10%" }} py={3}>
                  <Box>
                    <Text>{formatCurrency(contest.poolSizes?.moneyline.away || 0)}</Text>
                    <Text>{formatCurrency(contest.poolSizes?.moneyline.home || 0)}</Text>
                  </Box>
                </Td>
                {/* <Td width="3%" pr={0}>
                  {pickersEnabled ? (
                    <AdjustableValue
                      value={contest.total}
                      onChange={(newTotal) => handleTotalChange(index, newTotal)}
                      step={1}
                      enabled={pickersEnabled}
                      isTotal={true}
                      showLeftChevronOnly={true}
                      alignment="right"
                    />
                  ) : (
                    <Box width="20px" height="20px" />
                  )}
                </Td> */}
                <Td textAlign="right" width={{ base: "8%", xl: "10%" }} py={3}>
                  <Text>{contest.total}</Text>
                </Td>
                {/* <Td width="3%" pl={0}>
                  {pickersEnabled ? (
                    <AdjustableValue
                      value={contest.total}
                      onChange={(newTotal) => handleTotalChange(index, newTotal)}
                      step={1}
                      enabled={pickersEnabled}
                      isTotal={true}
                      showRightChevronOnly={true}
                      alignment="left"
                    />
                  ) : (
                    <Box width="20px" height="20px" />
                  )}
                </Td> */}
                <Td textAlign="right" width={{ base: "6%", xl: "8%" }} py={3}>
                  <Box>
                    <Text>{formatCurrency(contest.poolSizes?.total.over || 0)}</Text>
                    <Text>{formatCurrency(contest.poolSizes?.total.under || 0)}</Text>
                  </Box>
                </Td>
                <Td p={0} width={{ base: "1%", xl: "2%" }}>
                  <AnimatedChevron
                    side="right"
                    isRowExpanded={expandedRow === index}
                  />
                </Td>
              </Tr>
              <Tr>
                <Td colSpan={12} p={0}>
                  <ContestRowDetails
                    contest={contest}
                    isOpen={expandedRow === index}
                  />
                </Td>
              </Tr>
            </React.Fragment>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}

const formatSpread = (spread: number) => {
  return spread > 0 ? `+${spread.toFixed(1)}` : spread.toFixed(1);
};

const getLeagueColor = (league: string) => {
  switch (league) {
    // case 'NFL': return 'red'
    // case 'NBA': return 'orange'
    // case 'MLB': return 'blue'
    // case 'NHL': return 'purple'
    default: return 'gray'
  }
}

const formatCurrency = (amount: number) => {
  return `$${amount.toLocaleString()}`;
};

export default ContestList
