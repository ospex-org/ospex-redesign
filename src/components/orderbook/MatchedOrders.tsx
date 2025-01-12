// src/components/orderbook/MatchedOrders.tsx
import React from 'react';
import { VStack, Box, Text } from '@chakra-ui/react';

interface MatchedOrder {
  id: string;
  odds: string;
  amount: number;
  time: string;
}

interface MatchedOrdersProps {
  orders: MatchedOrder[];
}

const MatchedOrders: React.FC<MatchedOrdersProps> = ({ orders }) => {
  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <VStack spacing={2} align="stretch" width="100%">
      {orders.map((order, index) => (
        <Box
          key={index}
          bg="gray.800"
          p={2}
          borderWidth="1px"
          borderStyle="solid"
          borderColor="gray.600"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          fontSize="sm"
          color="white"
          position="relative"
          _hover={{
            borderColor: "white",
            boxShadow: "0 0 10px white",
          }}
          cursor="pointer"
          height="90px"
          width="100%"
          borderRadius="md"
          transition="all 0.2s"
        >
          <Text fontSize="sm">{order.odds} | {order.amount} USDC</Text>
          <Text fontSize="xs" color="gray.500">{order.time}</Text>
        </Box>
      ))}
    </VStack>
  );
};

export default MatchedOrders;
