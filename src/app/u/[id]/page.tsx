'use client'

import React, { useState } from 'react'
import { Box, Heading, Text, Flex, VStack, Container } from '@chakra-ui/react'
import UserPerformanceChart from '@/components/graphs/UserPerformanceChart'
import { UserStats } from '@/components/profile/UserStats'
import { SportFilter } from '@/components/profile/SportFilter'
import { RecentBetsTable } from '@/components/profile/RecentBetsTable'
import { ProfileHeader } from '@/components/profile/ProfileHeader'
import { useParams } from 'next/navigation'
import { getUserById } from '@/data/mockUserData'

const UserProfilePage = () => {
  const params = useParams()
  const userId = params?.id as string
  const [timeframe, setTimeframe] = useState('1M')
  const [selectedSports, setSelectedSports] = useState(['ALL'])
  const userData = getUserById(userId)

  if (!userData) {
    return <Box>Loading...</Box>
  }

  const filteredBets = selectedSports.includes('ALL') 
    ? userData.recentBets
    : userData.recentBets.filter(bet => selectedSports.includes(bet.league));

  return (
    <Container maxW="1400px" px={4}>
      <VStack spacing={8} align="stretch">
        <ProfileHeader user={userData} />
        
        <Box>
          <Flex justify="space-between" align="center" mb={4}>
            <Heading size="md">Performance</Heading>
            <SportFilter 
              selectedSports={selectedSports}
              onSportChange={setSelectedSports}
            />
          </Flex>
          <UserPerformanceChart
            recentBets={filteredBets}
            timeframe={timeframe}
            onTimeframeChange={setTimeframe}
          />
        </Box>

        <UserStats 
          user={userData}
          timeframe={timeframe}
        />

        <Box>
          <Heading size="md" mb={4}>Recent Activity</Heading>
          <RecentBetsTable bets={filteredBets} />
        </Box>
      </VStack>
    </Container>
  )
}

export default UserProfilePage
