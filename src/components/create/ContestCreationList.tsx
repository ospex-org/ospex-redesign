'use client'

import React, { useState } from 'react'
import { Box, Table, Thead, Tbody, Tr, Th, Td, Badge, Text } from '@chakra-ui/react'
import { Contest } from '../../types'
import { TableSkeleton } from '../LoadingIndicators'

interface ContestCreationListProps {
  contests: Contest[]
  onSelectContest: (contest: Contest) => void
  selectedContestId?: string
  createdContests: Set<string> // Track which contests have been created
}

const ContestCreationList: React.FC<ContestCreationListProps> = ({
  contests,
  onSelectContest,
  selectedContestId,
  createdContests
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const handleRowMouseEnter = (index: number) => {
    setHoveredIndex(index)
  }

  const handleRowMouseLeave = () => {
    if (!selectedContestId) {
      setHoveredIndex(null)
    }
  }

  if (!contests.length) {
    return <TableSkeleton />
  }

  return (
    <Box overflowX="auto" width="100%">
      <Table variant="simple" color="white" size="sm">
        <Thead>
          <Tr>
            <Th color="gray.300" width="20%">Date/Time</Th>
            <Th color="gray.300" width="10%">League</Th>
            <Th color="gray.300" width="40%">Teams</Th>
            <Th color="gray.300" width="15%" textAlign="right">Spread</Th>
            <Th color="gray.300" width="15%" textAlign="right">Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          {contests.map((contest: Contest, index: number) => (
            <Tr
              key={index}
              onClick={() => onSelectContest(contest)}
              onMouseEnter={() => handleRowMouseEnter(index)}
              onMouseLeave={() => handleRowMouseLeave()}
              style={{
                backgroundColor: hoveredIndex === index || `seed${index + 1}` === selectedContestId
                  ? 'rgba(45, 55, 72, 0.3)' 
                  : 'transparent',
                transition: 'background-color 0.2s',
                cursor: 'pointer',
              }}
            >
              <Td width="20%" py={3}>
                <Box>
                  <Text>{contest.date}</Text>
                  <Text>{contest.time} EST</Text>
                </Box>
              </Td>
              <Td width="10%" py={3}>
                <Badge colorScheme="gray">{contest.league}</Badge>
              </Td>
              <Td width="40%" py={3}>
                <Box>
                  <Text>{contest.awayTeam}</Text>
                  <Text>{contest.homeTeam}</Text>
                  {createdContests.has(contest.id) && (
                    <Text color="gray.400" fontSize="sm">Already Created</Text>
                  )}
                </Box>
              </Td>
              <Td width="15%" py={3} textAlign="right">
                <Text>{formatSpread(contest.awaySpread)}</Text>
                <Text>{formatSpread(-contest.awaySpread)}</Text>
              </Td>
              <Td width="15%" py={3} textAlign="right">
                <Text>{contest.total}</Text>
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

export default ContestCreationList