// src/components/orderbook/OrderBox.tsx
import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';

interface OrderBoxProps {
  odds: string;
  amount: number;
  id: string;
  number: number;
}

const OrderBox: React.FC<OrderBoxProps> = ({ odds, amount, id, number }) => {
  return (
    <Box
      bg="transparent"
      p={2}
      border="1px solid"
      borderColor="gray.600"
      borderRadius="md"
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="space-between"
      height="90px"
      width="100%"
      _hover={{
        borderColor: "white",
        boxShadow: "0 0 10px white",
      }}
      transition="all 0.2s"
      cursor="pointer"
    >
      <VStack align="stretch" spacing={1}>
        <Text fontWeight="bold">{number !== 0 ? `${number > 0 ? '+' : ''}${number}` : ''} {odds}</Text>
        <Text>{amount} USDC</Text>
        <Text fontSize="xs" color="gray.400">{id}</Text>
      </VStack>
    </Box>
  );
};

export default OrderBox;
