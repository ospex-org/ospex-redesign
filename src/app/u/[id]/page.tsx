'use client'

import React, { useState, useEffect } from 'react'
import { Box, Heading, Text, Flex, VStack, Container, SimpleGrid, Skeleton } from '@chakra-ui/react'
import UserPerformanceChart from '@/components/graphs/UserPerformanceChart'
import { UserStats } from '@/components/profile/UserStats'
import { SportFilter } from '@/components/profile/SportFilter'
import { RecentBetsTable } from '@/components/profile/RecentBetsTable'
import { ProfileHeader } from '@/components/profile/ProfileHeader'
import { useParams } from 'next/navigation'
import { getUserById } from '@/data/mockUserData'
import { TimeframeSelector } from '@/components/profile/TimeframeSelector'
// import { TableSkeleton } from '@/components/LoadingIndicators'
import { UserBet } from '@/types'

const UserProfilePage = () => {
  const params = useParams()
  const userId = params?.id as string
  const [timeframe, setTimeframe] = useState('ALL')
  const [selectedSports, setSelectedSports] = useState(['ALL'])
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    const loadUserData = async () => {
      // In the future, this would be a real API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const data = getUserById(userId);
      setUserData(data);
      setIsLoading(false);
    };
    loadUserData();
  }, [userId]);

  if (isLoading || !userData) {
    return (
      <Container maxW="1400px" px={4}>
        <VStack spacing={4} align="stretch">
          {/* Stats Skeleton */}
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={3} mb={3} mt={3}>
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} height="80px" />
            ))}
          </SimpleGrid>

          {/* Filters Skeleton */}
          <Box>
            <Skeleton height="40px" mb={4} />
            <Skeleton height="40px" mb={4} />
          </Box>

          {/* Chart Skeleton */}
          <Box height="300px">
            <Skeleton height="100%" />
          </Box>

          {/* Bets Table Skeleton */}
          <Box>
            <Skeleton height="40px" mb={4} />
            {/* <TableSkeleton /> */}
          </Box>
        </VStack>
      </Container>
    );
  }

  const filteredBets = selectedSports.includes('ALL') 
    ? userData.recentBets
    : userData.recentBets.filter((bet: UserBet) => selectedSports.includes(bet.league));

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
