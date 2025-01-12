import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Text } from '@chakra-ui/react';

interface BetNowBoxProps {
  onSubmit: (amount: string) => void;
  displayText: string;
}

const BetNowBox: React.FC<BetNowBoxProps> = ({ onSubmit, displayText }) => {
  const [betAmount, setBetAmount] = useState('');

  const handleSubmit = () => {
    onSubmit(betAmount);
  };

  return (
    <Box borderWidth={1} borderRadius="lg" p={4}>
      <VStack spacing={4} align="stretch">
        <Text fontSize="lg" fontWeight="bold" color="white" display={{ base: 'none', md: 'block' }}>
          {displayText}
        </Text>
        <FormControl>
          <FormLabel>Bet Amount (USDC)</FormLabel>
          <Input
            type="number"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            placeholder="Enter bet amount"
          />
        </FormControl>
        <Button colorScheme="gray" onClick={handleSubmit} isDisabled={!betAmount}>
          Place Bet
        </Button>
      </VStack>
    </Box>
  );
};

export default BetNowBox;
