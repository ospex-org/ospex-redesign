import React from 'react';
import { Flex, Button, Text } from '@chakra-ui/react';

interface NumberAdjusterProps {
  value: number;
  onChange: (newValue: number) => void;
  step?: number;
}

const NumberAdjuster: React.FC<NumberAdjusterProps> = ({ value, onChange, step = 0.5 }) => {
  const adjustNumber = (adjustment: number) => {
    const newValue = Math.round((value + adjustment) * 2) / 2;
    onChange(newValue);
  };

  return (
    <Flex align="center">
      <Button size="sm" onClick={() => adjustNumber(-step)}>-</Button>
      <Text mx={2}>{value.toFixed(1)}</Text>
      <Button size="sm" onClick={() => adjustNumber(step)}>+</Button>
    </Flex>
  );
};

export default NumberAdjuster;