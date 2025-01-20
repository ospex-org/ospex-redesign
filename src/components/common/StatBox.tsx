import { Box, Text, Flex, Icon } from '@chakra-ui/react';
import { TriangleUpIcon, TriangleDownIcon } from '@chakra-ui/icons';

interface StatBoxProps {
  label: string;
  value: number | string;
  change?: number;
  format?: 'currency' | 'percentage' | 'number';
}

const StatBox: React.FC<StatBoxProps> = ({ label, value, change, format }) => {
  const formatValue = (val: number | string) => {
    if (format === 'currency') {
      return typeof val === 'number' 
        ? `$${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` 
        : val;
    }
    if (format === 'percentage') {
      return typeof val === 'number' ? `${val}%` : val;
    }
    return val;
  };

  return (
    <Box 
      p={3}
      pt={2}
      pb={2}
      borderRadius="lg" 
      borderWidth="1px" 
      borderColor="gray.700"
      bg="gray.900"
      _hover={{ borderColor: 'gray.600' }}
      transition="all 0.2s"
    >
      <Text color="gray.400" fontSize="sm" mb={1}>
        {label}
      </Text>
      <Text fontSize="xl" fontWeight="bold">
        {formatValue(value)}
      </Text>
      {change !== undefined && (
        <Flex align="center" color={change >= 0 ? 'green.400' : 'red.400'}>
          <Icon 
            as={change >= 0 ? TriangleUpIcon : TriangleDownIcon} 
            w={3} 
            h={3} 
            mr={1}
          />
          <Text fontSize="sm">{Math.abs(change)}%</Text>
        </Flex>
      )}
    </Box>
  );
};

export default StatBox; 