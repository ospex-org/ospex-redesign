'use client'

import React, { useState, useEffect } from 'react'
import { Box, Heading, Text, Flex, VStack, Container } from '@chakra-ui/react'
import UserPerformanceChart from '@/components/graphs/UserPerformanceChart'
import { UserStats } from '@/components/profile/UserStats'
import { SportFilter } from '@/components/profile/SportFilter'
import { RecentBetsTable } from '@/components/profile/RecentBetsTable'
import { ProfileHeader } from '@/components/profile/ProfileHeader'
import { useParams } from 'next/navigation'
import { getUserById } from '@/data/mockUserData'
import { TimeframeSelector } from '@/components/profile/TimeframeSelector'

const UserProfilePage = () => {
  const params = useParams()
  const userId = params?.id as string
  const [timeframe, setTimeframe] = useState('ALL')
  const [selectedSports, setSelectedSports] = useState(['ALL'])
  const [isLoading, setIsLoading] = useState(true)
  const userData = getUserById(userId)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (!userData) {
    return <Box>Loading...</Box>
  }

  const filteredBets = selectedSports.includes('ALL') 
    ? userData.recentBets
    : userData.recentBets.filter(bet => selectedSports.includes(bet.league));

  return (
    <Container maxW="1400px" px={4}>
      <VStack spacing={4} align="stretch">
        <ProfileHeader user={userData} />
        
        <UserStats 
          user={userData}
          timeframe={timeframe}
        />

        <Box>
          <Box mb={4}>
            <SportFilter 
              selectedSports={selectedSports}
              onSportChange={setSelectedSports}
            />
          </Box>

          <Box mb={4}>
            <TimeframeSelector
              timeframe={timeframe}
              onTimeframeChange={setTimeframe}
            />
          </Box>

          <Box>
            <UserPerformanceChart
              recentBets={filteredBets}
              timeframe={timeframe}
              onTimeframeChange={setTimeframe}
            />
          </Box>
        </Box>

        <Box>
          <Heading size="md">Bets</Heading>
          <RecentBetsTable 
            bets={filteredBets} 
            isLoading={isLoading}
          />
        </Box>
      </VStack>
    </Container>
  )
}

export default UserProfilePage
