import { Flex, Text, Box, Tooltip } from '@chakra-ui/react'

const StatsBar = () => {
  return (
    <Flex 
      as="section" 
      justify="flex-start" 
      align="center" 
      bg="black" 
      py={1} 
      px={4} 
      fontSize="xs" 
      color="gray.400"
      borderBottom="1px solid"
      borderColor="gray.600"
    >
      <Box mr={6}>
        <Tooltip label="Total USDC value of all bets in the last 24 hours" placement="bottom" bg="gray.700" color="white">
          <Text display="inline" fontWeight="bold">24h Volume: </Text>
        </Tooltip>
        <Text display="inline" color="green.300">$0</Text>
      </Box>
      <Box mr={6}>
        <Tooltip label="Number of unique users who have placed bets in the last 24 hours" placement="bottom" bg="gray.700" color="white">
          <Text display="inline" fontWeight="bold">24h Users: </Text>
        </Tooltip>
        <Text display="inline" color="green.300">0</Text>
      </Box>
      <Box>
        <Tooltip label="Total value of ospex tokens used in the last 24 hours" placement="bottom" bg="gray.700" color="white">
          <Text display="inline" fontWeight="bold">24h Tokens: </Text>
        </Tooltip>
        <Text display="inline" color="green.300">$0</Text>
      </Box>
    </Flex>
  )
}

export default StatsBar