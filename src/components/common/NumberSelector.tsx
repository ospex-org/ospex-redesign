import React from 'react';
import { Flex, Button, Box } from '@chakra-ui/react';

interface NumberSelectorProps {
  value: number;
  onChange: (newValue: number) => void;
  min?: number;
  max?: number;
  showPlusSign?: boolean;
}

const NumberSelector: React.FC<NumberSelectorProps> = ({ value, onChange, min = -50, max = 50, showPlusSign = true }) => {
  const visibleNumbers = 11; // Number of visible options (should be odd)
  const halfVisible = Math.floor(visibleNumbers / 2);

  const generateNumbers = () => {
    const numbers = [];
    for (let i = -halfVisible; i <= halfVisible; i++) {
      const num = Math.round((value + i) * 2) / 2;
      numbers.push(num >= min && num <= max ? num : null);
    }
    return numbers;
  };

  const numbers = generateNumbers();

  const handleLeftClick = () => {
    const newValue = Math.max(Math.round((value - 1) * 2) / 2, min);
    onChange(newValue);
  };

  const handleRightClick = () => {
    const newValue = Math.min(Math.round((value + 1) * 2) / 2, max);
    onChange(newValue);
  };

  return (
    <Flex align="center">
      <Button onClick={handleLeftClick} disabled={value <= min}>&lt;</Button>
      <Box overflowX="hidden" width="600px" mx={2}>
        <Flex justifyContent="center">
          {numbers.map((num, index) => (
            <Box
              key={index}
              width="60px"
              height="40px"
              textAlign="center"
              fontWeight={num === value ? 'bold' : 'normal'}
              color={num === value ? 'white' : 'gray.500'}
              cursor={num !== null ? 'pointer' : 'default'}
              onClick={() => num !== null && onChange(num)}
              position="relative"
              display="flex"
              alignItems="center"
              justifyContent="center"
              overflow="hidden"
            >
              {num !== null && (
                <>
                  {num === value && (
                    <Box
                      position="absolute"
                      top="-2px"
                      left="0"
                      right="0"
                      height="44px"
                      borderWidth="2px"
                      borderColor="gray.300"
                      borderRadius="md"
                      pointerEvents="none"
                    />
                  )}
                  {showPlusSign && num > 0 ? '+' : ''}{num.toFixed(1)}
                </>
              )}
            </Box>
          ))}
        </Flex>
      </Box>
      <Button onClick={handleRightClick} disabled={value >= max}>&gt;</Button>
    </Flex>
  );
};

export default NumberSelector;