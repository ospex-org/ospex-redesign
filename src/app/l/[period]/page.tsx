'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Box, Heading, Text, Flex, VStack, Table, Thead, Tbody, Tr, Th, Td, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import LeaderboardChart from '@/components/graphs/LeaderboardChart'
import { mockLeaderboardData } from '@/data/mockLeaderboardData'
import PreloadLink from '@/components/common/PreloadLink'

const IndividualLeaderboardPage = () => {
  const params = useParams()
  const period = params?.period as string
  const [leaderboardData, setLeaderboardData] = useState<any>(null)

  useEffect(() => {
    if (period) {
      const isMonthly = period.length === 6
      const data = isMonthly
        ? mockLeaderboardData.monthly[period]
        : mockLeaderboardData.yearly[period]
      setLeaderboardData(data)
    }
  }, [period])

  if (!leaderboardData) {
    return <Box>Loading...</Box>
  }

  const isMonthly = period.length === 6
  const title = isMonthly
    ? `${getMonthName(period.slice(0, 2))} ${period.slice(-4)} Leaderboard`
    : `${period} Yearly Leaderboard`

  return (
    <Box maxWidth="1400px" margin="0 auto" padding="1rem">
      <Breadcrumb color="gray.300" mb={4}>
        <BreadcrumbItem>
          <PreloadLink href="/" props={{}}>
            <BreadcrumbLink as="span">Home</BreadcrumbLink>
          </PreloadLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <PreloadLink href="/l" props={{}}>
            <BreadcrumbLink as="span">Leaderboards</BreadcrumbLink>
          </PreloadLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>{title}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Heading as="h1" size="xl" mb={4}>{title}</Heading>

      <VStack align="stretch" spacing={8}>
        <Box height="300px">
          {leaderboardData.chartData && leaderboardData.chartData.length > 0 ? (
            <LeaderboardChart data={leaderboardData.chartData} />
          ) : (
            <Text>No data available for chart</Text>
          )}
        </Box>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Rank</Th>
              <Th>User</Th>
              <Th>Net</Th>
              <Th>Valid Bets</Th>
            </Tr>
          </Thead>
          <Tbody>
            {leaderboardData.leaderboard.map((user: any, index: number) => (
              <Tr key={user.id}>
                <Td>{index + 1}</Td>
                <Td>
                  <PreloadLink href={`/u/${user.id}`} props={{}}>
                    <Text fontWeight="bold">{user.alias || formatAddress(user.address)}</Text>
                  </PreloadLink>
                </Td>
                <Td>{user.net.toFixed(2)} USDC</Td>
                <Td>{user.validBets}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Box>
  )
}

const getMonthName = (monthNumber: string) => {
  const date = new Date(2000, parseInt(monthNumber) - 1, 1)
  return date.toLocaleString('default', { month: 'long' })
}

const formatAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export default IndividualLeaderboardPage