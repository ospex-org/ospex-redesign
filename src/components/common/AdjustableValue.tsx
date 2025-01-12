import React from 'react';
import { Flex, IconButton } from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';

interface AdjustableValueProps {
  value: number;
  onChange: (newValue: number) => void;
  step: number;
  enabled: boolean;
  isSpread?: boolean;
  isTotal?: boolean;
  showLeftChevronOnly?: boolean;
  showRightChevronOnly?: boolean;
  alignment?: 'left' | 'center' | 'right';
}

const AdjustableValue: React.FC<AdjustableValueProps> = ({
  value,
  onChange,
  step,
  enabled,
  isSpread = false,
  isTotal = false,
  showLeftChevronOnly = false,
  showRightChevronOnly = false,
  alignment = 'center' // default to center, though this should not be used, chevrons will be left or right
}) => {
  const handleAdjust = (adjustment: number) => {
    const adjustedValue = isSpread ? -adjustment : adjustment;
    const newValue = Math.round((value + adjustedValue) * 2) / 2;
    onChange(newValue);
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Flex width="20px" height="20px">
      {enabled && showLeftChevronOnly && (
        <IconButton
          aria-label="Decrease value"
          icon={<ChevronDownIcon boxSize="20px" />}
          size="xs"
          variant="ghost"
          onClick={(e) => {
            stopPropagation(e);
            handleAdjust(-step);
          }}
          padding={0}
        />
      )}
      {enabled && showRightChevronOnly && (
        <IconButton
          aria-label="Increase value"
          icon={<ChevronUpIcon boxSize="20px" />}
          size="xs"
          variant="ghost"
          onClick={(e) => {
            stopPropagation(e);
            handleAdjust(step);
          }}
          padding={0}
        />
      )}
    </Flex>
  );
};

export default AdjustableValue;