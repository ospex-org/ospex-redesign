'use client'

import React, { useState, useEffect } from 'react'
import { Box, Heading, Text, Flex, VStack, Table, Thead, Tbody, Tr, Th, Td, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import LeaderboardChart from '@/components/graphs/LeaderboardChart'
import { mockLeaderboardData } from '@/data/mockLeaderboardData'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import PreloadLink from '@/components/common/PreloadLink'

const LeaderboardPage = () => {
  const [monthlyData, setMonthlyData] = useState<any>(null)
  const [yearlyData, setYearlyData] = useState<any>(null)
  const [hoveredMonthlyIndex, setHoveredMonthlyIndex] = useState<string | null>(null)
  const [hoveredYearlyIndex, setHoveredYearlyIndex] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth() + 1
    const currentYear = currentDate.getFullYear()
    const monthKey = `${currentMonth}${currentYear}`
    const yearKey = currentYear.toString()

    setMonthlyData(mockLeaderboardData.monthly[monthKey])
    setYearlyData(mockLeaderboardData.yearly[yearKey])
  }, [])

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  // Add these handler functions
  const handleRowMouseEnter = (id: string, isMonthly: boolean) => {
    if (isMonthly) {
      setHoveredMonthlyIndex(id)
    } else {
      setHoveredYearlyIndex(id)
    }
    router.prefetch(`/u/${id}`)
  }

  const handleRowMouseLeave = (isMonthly: boolean) => {
    if (isMonthly) {
      setHoveredMonthlyIndex(null)
    } else {
      setHoveredYearlyIndex(null)
    }
  }

  const handleRowClick = (id: string) => {
    router.push(`/u/${id}`)
  }

  // Update LeaderboardList component
  const LeaderboardList = ({ data, isMonthly }: { data: any, isMonthly: boolean }) => (
    <Table variant="simple" size="sm">
      <Thead>
        <Tr>
          <Th>Rank</Th>
          <Th>User</Th>
          <Th>Net</Th>
          <Th>Valid Bets</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data?.leaderboard?.slice(0, 5).map((user: any, index: number) => (
          <Tr
            key={user.id}
            onClick={() => handleRowClick(user.id)}
            onMouseEnter={() => handleRowMouseEnter(user.id, isMonthly)}
            onMouseLeave={() => handleRowMouseLeave(isMonthly)}
            style={{
              backgroundColor: (isMonthly ? hoveredMonthlyIndex : hoveredYearlyIndex) === user.id
                ? 'rgba(45, 55, 72, 0.3)'
                : 'transparent',
              transition: 'background-color 0.2s',
              cursor: 'pointer',
            }}
          >
            <Td>{index + 1}</Td>
            <Td>
              <Text fontWeight="bold">{user.alias || formatAddress(user.address)}</Text>
            </Td>
            <Td>{user.net.toFixed(2)} USDC</Td>
            <Td>{user.validBets}</Td>
          </Tr>
        )) || <Tr><Td colSpan={4}>No data available</Td></Tr>}
      </Tbody>
    </Table>
  )

  const currentDate = new Date()
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' })
  const currentYear = currentDate.getFullYear()

  return (
    <Box maxWidth="1400px" margin="0 auto" padding="1rem" width="calc(100% - 15px)">
      <Breadcrumb color="gray.300" mb={4}>
        <BreadcrumbItem>
          <PreloadLink href="/" props={{}}>
            <BreadcrumbLink as="span">Home</BreadcrumbLink>
          </PreloadLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>Leaderboards</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Heading as="h1" size="xl" mb={4}>Leaderboards</Heading>
      <Flex direction={['column', 'column', 'row']} gap={8}>
        <VStack flex={1} align="stretch">
          <Heading as="h2" size="lg">Monthly Leaderboard</Heading>
          {monthlyData ? (
            <PreloadLink href={`/l/${monthlyData.period}`} props={{}}>
              <Text color="gray.300" mb={4} _hover={{ textDecoration: 'underline' }}>{currentMonth} {currentYear}</Text>
            </PreloadLink>
          ) : (
            <Text color="gray.300" mb={4}>{currentMonth} {currentYear}</Text>
          )}
          <Box height="300px">
            {monthlyData?.chartData && monthlyData.chartData.length > 0 ? (
              <LeaderboardChart data={monthlyData.chartData} />
            ) : (
              <Text>No data available for monthly chart</Text>
            )}
          </Box>
          <LeaderboardList data={monthlyData} isMonthly={true} />
          {monthlyData && (
            <Flex mt={4}>
              <PreloadLink href={`/l/${getPreviousMonth(monthlyData.period)}`} props={{}}>
                <Text color="gray.300" _hover={{ textDecoration: 'underline' }}>See last month</Text>
              </PreloadLink>
            </Flex>
          )}
        </VStack>
        <VStack flex={1} align="stretch">
          <Heading as="h2" size="lg">Yearly Leaderboard</Heading>
          {yearlyData ? (
            <PreloadLink href={`/l/${yearlyData.period}`} props={{}}>
              <Text color="gray.300" mb={4} _hover={{ textDecoration: 'underline' }}>{currentYear}</Text>
            </PreloadLink>
          ) : (
            <Text color="gray.300" mb={4}>{currentYear}</Text>
          )}
          <Box height="300px">
            {yearlyData?.chartData && yearlyData.chartData.length > 0 ? (
              <LeaderboardChart data={yearlyData.chartData} />
            ) : (
              <Text>No data available for yearly chart</Text>
            )}
          </Box>
          <LeaderboardList data={yearlyData} isMonthly={false} />
          {yearlyData && (
            <Flex mt={4}>
              <PreloadLink href={`/l/${getPreviousYear(yearlyData.period)}`} props={{}}>
                <Text color="gray.300" _hover={{ textDecoration: 'underline' }}>See last year</Text>
              </PreloadLink>
            </Flex>
          )}
        </VStack>
      </Flex>
    </Box>
  )
}

const getPreviousMonth = (period: string) => {
  const year = parseInt(period.slice(-4))
  const month = parseInt(period.slice(0, -4))
  if (month === 1) {
    return `12${year - 1}`
  }
  return `${(month - 1).toString().padStart(2, '0')}${year}`
}

const getPreviousYear = (period: string) => {
  return (parseInt(period) - 1).toString()
}

export default LeaderboardPage
