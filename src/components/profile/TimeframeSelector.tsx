import { ButtonGroup, Button } from '@chakra-ui/react';

const timeframes = [
  { label: '24H', value: '1D' },
  { label: '7D', value: '7D' },
  { label: '1M', value: '1M' },
  { label: '3M', value: '3M' },
  { label: 'YTD', value: 'YTD' },
  { label: '1Y', value: '1Y' },
  { label: 'ALL', value: 'ALL' }
];

interface TimeframeSelectorProps {
  timeframe: string;
  onTimeframeChange: (timeframe: string) => void;
}

export const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({ 
  timeframe, 
  onTimeframeChange 
}) => {
  return (
    <ButtonGroup size="sm" isAttached variant="outline">
      {timeframes.map(({ label, value }) => (
        <Button
          key={value}
          onClick={() => onTimeframeChange(value)}
          colorScheme={timeframe === value ? 'white' : 'gray'}
        >
          {label}
        </Button>
      ))}
    </ButtonGroup>
  );
}; 