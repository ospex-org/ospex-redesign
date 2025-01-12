'use client'

import { Box, Heading, Text, Grid } from '@chakra-ui/react'
import { useState } from 'react'
import { useContestStore } from '../../store/contestStore'
import { Contest } from '../../types'
import ContestCreationList from '../../components/create/ContestCreationList'
import BetCreationPanel from '../../components/create/BetCreationPanel'

const CreatePage = () => {
  const [selectedContest, setSelectedContest] = useState<Contest | null>(null)
  const [createdContests] = useState<Set<string>>(new Set())
  const [createdBetTypes] = useState<Set<'spread' | 'moneyline' | 'total'>>(new Set())
  const { contests } = useContestStore()
  
  // TODO: Replace with actual wallet connection check
  const isWalletConnected = false

  const handleContestSelect = (contest: Contest) => {
    setSelectedContest(contest)
  }

  const handleCreateBet = (betType: 'spread' | 'moneyline' | 'total') => {
    // TODO: Implement bet creation logic
    console.log(`Creating ${betType} bet for contest:`, selectedContest?.id)
  }

  return (
    <Box maxWidth="1400px" margin="0 auto" padding="1rem" width="calc(100% - 15px)">
      <Box mb={4} pt={4}>
        <Heading as="h1" size="xl" mb={4} color="white">
          Create Contests and Bets
        </Heading>
        <Text color="gray.300" mb={4}>
          Contest creation is free, bet creation requires 10 USDC.
        </Text>
      </Box>

      <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={6}>
        <Box>
          <Heading as="h2" size="md" mb={4} color="white">
            Available Contests
          </Heading>
          <ContestCreationList
            contests={contests}
            onSelectContest={handleContestSelect}
            selectedContestId={selectedContest?.id}
            createdContests={createdContests}
          />
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={4} color="white">
            Create Bets
          </Heading>
          {selectedContest ? (
            <BetCreationPanel
              contest={selectedContest}
              createdBetTypes={createdBetTypes}
              onCreateBet={handleCreateBet}
              isWalletConnected={isWalletConnected}
            />
          ) : (
            <Text color="gray.300">Select a contest from the left to create bets</Text>
          )}
        </Box>
      </Grid>
    </Box>
  )
}

export default CreatePage