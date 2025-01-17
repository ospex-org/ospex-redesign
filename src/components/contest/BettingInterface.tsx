import React from 'react';
import { Box, Grid, Text, Button, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';

interface BettingInterfaceProps {
  betAmount: number;
  setBetAmount: (amount: number) => void;
  contributeAmount: number;
  setContributeAmount: (amount: number) => void;
  isDisabled: boolean;
  contestId: string;
}

const BettingInterface: React.FC<BettingInterfaceProps> = ({
  betAmount,
  setBetAmount,
  contributeAmount,
  setContributeAmount,
  isDisabled,
  contestId,
}) => {
  const router = useRouter();

  return (
    <Grid 
      templateColumns="repeat(2, 1fr)" 
      gap={{ base: 2, xl: 3 }}
      width={{ base: "200px", xl: "240px" }}
      height="100%"
      ml={2}
      borderRadius="md"
      alignContent="center"
    >
      {/* [1] Amount Selector */}
      <Box>
        <Text fontSize="xs" mb={1} color="gray.400">Amount (USDC)</Text>
        <NumberInput 
          size={{ base: "xs", xl: "sm" }}
          value={betAmount}
          onChange={(valueString) => setBetAmount(Number(valueString))}
          min={1}
          max={100}
          step={1}
          bg="gray.900"
          borderRadius="md"
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Box>

      {/* [2] Contribute Selector */}
      <Box>
        <Text fontSize="xs" mb={1} color="gray.400">Contribute</Text>
        <NumberInput
          size={{ base: "xs", xl: "sm" }}
          value={contributeAmount}
          onChange={(valueString) => setContributeAmount(Number(valueString))}
          min={0}
          step={1}
          bg="gray.900"
          borderRadius="md"
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Text fontSize={{ base: "2xs", xl: "xs" }} color="gray.500" mt={{ base: 0.5, xl: 1 }}>(Optional)</Text>
      </Box>

      {/* [3] Place Bet Button */}
      <Button
        size={{ base: "xs", xl: "sm" }}
        bg="gray.700"
        color="white"
        width={{ base: "90px", xl: "auto" }}
        _hover={{ bg: 'gray.600' }}
        _disabled={{
          bg: 'gray.900',
          opacity: 0.7,
          cursor: 'not-allowed'
        }}
        isDisabled={isDisabled}
      >
        Place Bet
      </Button>

      {/* [4] Full Details Link */}
      <Button
        size={{ base: "xs", xl: "sm" }}
        variant="ghost"
        width={{ base: "90px", xl: "auto" }}
        rightIcon={<ChevronRightIcon />}
        onClick={() => router.push(`/c/${contestId}`)}
        color="gray.400"
        _hover={{ color: 'white' }}
      >
        Details
      </Button>
    </Grid>
  );
};

export default BettingInterface; 