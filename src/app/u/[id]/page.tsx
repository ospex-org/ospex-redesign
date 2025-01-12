'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import {
  Box,
  Heading,
  Text,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink
} from '@chakra-ui/react'
import { getUserById } from '@/data/mockUserData'
import { User, UserBet } from '@/types'
import PreloadLink from '@/components/common/PreloadLink'

const UserProfilePage = () => {
  const params = useParams()
  const userId = params?.id as string
  const [userData, setUserData] = useState<User | null>(null)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value)
  }

  useEffect(() => {
    if (userId) {
      const user = getUserById(userId)
      if (user) {
        setUserData(user)
      }
    }
    // In a real application, you'd fetch data from an API here
  }, [userId])

  if (!userData) {
    return <Box>Loading...</Box>
  }

  return (
    <Box maxWidth="1400px" margin="0 auto" padding="1rem">
      <Flex direction="column">
        <Breadcrumb color="gray.300" mb={4}>
          <BreadcrumbItem>
            <PreloadLink href="/" props={{}}>
              <BreadcrumbLink as="span">Home</BreadcrumbLink>
            </PreloadLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <PreloadLink href="/u" props={{}}>
              <BreadcrumbLink as="span">Users</BreadcrumbLink>
            </PreloadLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>{userData.alias}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Flex justifyContent="space-between" alignItems="center" mb={6}>
          <Box>
            <Heading as="h1" size="xl" mb={2}>{userData.alias}</Heading>
            <Text color="gray.500">{userData.address}</Text>
          </Box>
          {/* <Button colorScheme="blue">Follow User</Button> */}
        </Flex>

        <Text mb={6}>{userData.description}</Text>

        <Flex mb={8} gap={4} flexWrap="wrap">
          <Stat>
            <StatLabel>Net</StatLabel>
            <StatNumber>{formatCurrency(userData.net)} USDC</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Record</StatLabel>
            <StatNumber>{userData.record}</StatNumber>
            {/* <StatHelpText>{userData.net > 0 ? '+' : ''}{userData.net.toFixed(2)} USDC</StatHelpText> */}
          </Stat>
          <Stat>
            <StatLabel>Win Percentage</StatLabel>
            <StatNumber>{userData.winPercentage}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Total Speculated</StatLabel>
            <StatNumber>{formatCurrency(userData.totalSpeculated)} USDC</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Last Active</StatLabel>
            <StatNumber>{userData.lastActivity}</StatNumber>
          </Stat>
        </Flex>
      </Flex>

      <Heading as="h2" size="lg" mb={4}>Recent Bets</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Amount</Th>
            <Th>Type</Th>
            <Th>Side</Th>
            <Th>Odds</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {userData.recentBets.map((bet: UserBet) => (
            <Tr key={bet.id}>
              <Td>{bet.amount.toFixed(2)} USDC</Td>
              <Td>{bet.type}</Td>
              <Td>{bet.side}</Td>
              <Td>{bet.odds}</Td>
              <Td>
                <Badge colorScheme={bet.claimed ? 'green' : 'yellow'}>
                  {bet.claimed ? 'Claimed' : 'Pending'}
                </Badge>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}

export default UserProfilePage
