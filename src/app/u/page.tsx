'use client'

import React, { useState } from 'react'
import { Box, Heading, Text, Table, Thead, Tbody, Tr, Th, Td, Flex, Button, Icon } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon, TriangleUpIcon, TriangleDownIcon } from '@chakra-ui/icons'
import { mockUsers } from '@/data/mockUserData'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User } from '@/types'

type SortField = 'net' | 'winPercentage' | 'totalBet' | 'lastActivity'
type SortOrder = 'asc' | 'desc'

const UserListPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [sortField, setSortField] = useState<SortField>('net')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const usersPerPage = 10
  const router = useRouter()

  const handleRowClick = (id: string) => {
    router.push(`/u/${id}`)
  }

  const handleRowMouseEnter = (id: string) => {
    setHoveredIndex(parseInt(id))
    router.prefetch(`/u/${id}`)
  }

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('desc')
    }
  }

  const sortedUsers = [...mockUsers].sort((a, b) => {
    let comparison = 0
    switch (sortField) {
      case 'net':
        comparison = a.net - b.net
        break
      case 'winPercentage':
        comparison = parseFloat(a.winPercentage) - parseFloat(b.winPercentage)
        break
      case 'totalBet':
        comparison = parseFloat(a.totalBet) - parseFloat(b.totalBet)
        break
      case 'lastActivity':
        comparison = new Date(a.lastActivity).getTime() - new Date(b.lastActivity).getTime()
        break
    }
    return sortOrder === 'asc' ? comparison : -comparison
  })

  // Paginate users
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser)

  const SortIndicator = ({ field }: { field: SortField }) => (
    <Icon
      as={field === sortField ? (sortOrder === 'asc' ? TriangleUpIcon : TriangleDownIcon) : TriangleDownIcon}
      ml={1}
      color={field === sortField ? 'gray.300' : 'gray.600'}
    />
  )

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value)
  }

  return (
    <Box maxWidth="1400px" margin="0 auto" padding="1rem" width="calc(100% - 15px)">
      <Box mb={4} pt={4}>
        <Heading as="h1" size="xl" mb={4}>Users</Heading>
        <Flex justifyContent="space-between" alignItems="center">
          <Text color="gray.300" flex="1">
            All users.
          </Text>
          <Text>
            Showing {indexOfFirstUser + 1}-{Math.min(indexOfLastUser, sortedUsers.length)} of {sortedUsers.length}
          </Text>
        </Flex>
      </Box>

      <Table variant="simple" color="white" size="sm">
        <Thead>
          <Tr>
            <Th color="gray.300">User</Th>
            <Th color="gray.300" cursor="pointer" onClick={() => handleSort('net')}>
              Net <SortIndicator field="net" />
            </Th>
            <Th color="gray.300">Record</Th>
            <Th color="gray.300" cursor="pointer" onClick={() => handleSort('winPercentage')}>
              Win % <SortIndicator field="winPercentage" />
            </Th>
            <Th color="gray.300" cursor="pointer" onClick={() => handleSort('totalBet')}>
              Total Bet <SortIndicator field="totalBet" />
            </Th>
            <Th color="gray.300" cursor="pointer" onClick={() => handleSort('lastActivity')}>
              Last Active <SortIndicator field="lastActivity" />
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentUsers.map((user: User) => (
            <Tr
              key={user.id}
              onClick={() => handleRowClick(user.id)}
              onMouseEnter={() => handleRowMouseEnter(user.id)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                backgroundColor: hoveredIndex === parseInt(user.id) ? 'rgba(45, 55, 72, 0.3)' : 'transparent',
                transition: 'background-color 0.2s',
                cursor: 'pointer',
              }}
            >
              <Td>
                <Link href={`/u/${user.id}`}>
                  <Text fontWeight="bold">{user.alias}</Text>
                  <Text fontSize="sm" color="gray.500">{user.address}</Text>
                </Link>
              </Td>
              <Td>{formatCurrency(user.net)} USDC</Td>
              <Td>{user.record}</Td>
              <Td>{user.winPercentage}</Td>
              <Td>{formatCurrency(parseFloat(user.totalBet))} USDC</Td>
              <Td>{user.lastActivity}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Flex justifyContent="center" mt={4}>
        <Button
          leftIcon={<ChevronLeftIcon />}
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          isDisabled={currentPage === 1}
          mr={2}
        >
          Previous
        </Button>
        <Button
          rightIcon={<ChevronRightIcon />}
          onClick={() => setCurrentPage(prev => prev + 1)}
          isDisabled={indexOfLastUser >= sortedUsers.length}
          ml={2}
        >
          Next
        </Button>
      </Flex>
    </Box>
  )
}

export default UserListPage
