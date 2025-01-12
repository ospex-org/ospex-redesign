'use client'

import React from 'react'
import { Box, VStack, Tabs, TabList, Tab, Text, Button, Flex, Badge } from '@chakra-ui/react'
import { Contest } from '../../types'

interface BetCreationPanelProps {
  contest: Contest
  createdBetTypes: Set<'spread' | 'moneyline' | 'total'>
  onCreateBet: (betType: 'spread' | 'moneyline' | 'total') => void
  isWalletConnected: boolean
}

const BetCreationPanel: React.FC<BetCreationPanelProps> = ({
  contest,
  createdBetTypes,
  onCreateBet,
  isWalletConnected
}) => {
  const getBetTypeStatus = (betType: 'spread' | 'moneyline' | 'total') => {
    if (createdBetTypes.has(betType)) {
      return <Badge colorScheme="gray">Already Created</Badge>
    }
    // if (!isWalletConnected) {
    //   return <Badge colorScheme="yellow">Connect Wallet</Badge>
    // }
    // return <Badge colorScheme="green">Available</Badge>
  }

  const renderBetTypeInfo = (betType: 'spread' | 'moneyline' | 'total') => {
    switch (betType) {
      case 'spread':
        return (
          <Text color="gray.300" fontSize="sm">
            Current spread: {contest.awaySpread} {/* (all spreads will be available) */}
          </Text>
        )
      case 'total':
        return (
          <Text color="gray.300" fontSize="sm">
            Current total: {contest.total} {/* (all totals will be available) */}
          </Text>
        )
      case 'moneyline':
        return (
          <Text color="gray.300" fontSize="sm">
            {/* Simple win/loss bet type */}
          </Text>
        )
    }
  }

  return (
    <Box borderWidth={1} borderRadius="md" p={4}>
      <Text color="white" fontWeight="bold" mb={4}>
        {contest.awayTeam} vs {contest.homeTeam}
      </Text>

      <VStack spacing={6} align="stretch">
        {(['spread', 'moneyline', 'total'] as const).map((betType) => (
          <Box key={betType} p={4} borderWidth={1} borderRadius="md">
            <Flex justify="space-between" align="center" mb={2}>
              <Text color="white" fontWeight="bold" textTransform="capitalize">
                {betType}
              </Text>
              {getBetTypeStatus(betType)}
            </Flex>

            {renderBetTypeInfo(betType)}

            <Button
              mt={4}
              width="100%"
              colorScheme="gray"
              isDisabled={!isWalletConnected || createdBetTypes.has(betType)}
              onClick={() => onCreateBet(betType)}
            >
              Create {betType.charAt(0).toUpperCase() + betType.slice(1)} Bet
            </Button>
          </Box>
        ))}
      </VStack>
    </Box>
  )
}

export default BetCreationPanel