'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Box, Table, Thead, Tbody, Tr, Th, Td, Badge, Text, Flex } from '@chakra-ui/react'
import { Contest } from '../types'
import { useRouter } from 'next/navigation'
import { TableSkeleton } from './LoadingIndicators'
import AdjustableValue from './common/AdjustableValue'
import { fetchContests, updateContest } from '../api/mockApi'
import { useContestStore } from '../store/contestStore'

interface ContestListProps {
  pickersEnabled: boolean;
}

const ContestList: React.FC<ContestListProps> = ({ pickersEnabled }) => {
  const { contests, setContests, isLoading, setIsLoading } = useContestStore();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const router = useRouter();

  const handleRowClick = (index: number) => {
    router.push(`/c/seed${index + 1}`);
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
          <Tr>
            <Th color="gray.300" width="10%">Date/Time</Th>
            <Th color="gray.300" width="8%">League</Th>
            <Th color="gray.300" width="30%">Teams</Th>
            <Th width="3%"></Th>
            <Th color="gray.300" textAlign="right" width="5%">Spread</Th>
            <Th width="3%"></Th>
            <Th color="gray.300" textAlign="right" width="8%">Odds</Th>
            <Th color="gray.300" textAlign="right" width="14%">Moneyline</Th>
            <Th width="3%"></Th>
            <Th color="gray.300" textAlign="right" width="5%">Total</Th>
            <Th width="3%"></Th>
            <Th color="gray.300" textAlign="right" width="8%">O/U Odds</Th>
          </Tr>
        </Thead>
        <Tbody>
          {contests.map((contest: Contest, index: number) => (
            <Tr
              key={index}
              onClick={() => handleRowClick(index)}
              onMouseEnter={() => handleRowMouseEnter(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                backgroundColor: hoveredIndex === index ? 'rgba(45, 55, 72, 0.3)' : 'transparent',
                transition: 'background-color 0.2s',
                cursor: 'pointer',
              }}
            >
              <Td width="10%" py={3}>
                <Box>
                  <Text>{contest.date}</Text>
                  <Text>{contest.time} EST</Text>
                </Box>
              </Td>
              <Td width="8%" py={3}>
                <Badge colorScheme={getLeagueColor(contest.league)}>{contest.league}</Badge>
              </Td>
              <Td width="30%" py={3}>
                <Box>
                  <Text>{contest.awayTeam}</Text>
                  <Text>{contest.homeTeam}</Text>
                </Box>
              </Td>
              <Td width="3%" pr={0}>
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
              </Td>
              <Td textAlign="right" width="5%" py={3}>
                <Box>
                  <Text>{formatSpread(contest.awaySpread)}</Text>
                  <Text>{formatSpread(-contest.awaySpread)}</Text>
                </Box>
              </Td>
              <Td width="3%" pl={0}>
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
              </Td>
              <Td textAlign="right" width="8%" py={3}>
                <Box>
                  <Text>{contest.awaySpreadOdds}</Text>
                  <Text>{contest.homeSpreadOdds}</Text>
                </Box>
              </Td>
              <Td textAlign="right" width="14%" py={3}>
                <Box>
                  <Text>{contest.awayMoneyline}</Text>
                  <Text>{contest.homeMoneyline}</Text>
                </Box>
              </Td>
              <Td width="3%" pr={0}>
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
              </Td>
              <Td textAlign="right" width="5%" py={3}>
                <Text>{contest.total}</Text>
              </Td>
              <Td width="3%" pl={0}>
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
              </Td>
              <Td textAlign="right" width="8%" py={3}>
                <Box>
                  <Text>{contest.overOdds}</Text>
                  <Text>{contest.underOdds}</Text>
                </Box>
              </Td>
            </Tr>
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

export default ContestList
