import { HStack, Tag, Box } from "@chakra-ui/react"

export const SportFilter: React.FC<{
  selectedSports: string[];
  onSportChange: (sports: string[]) => void;
}> = ({ selectedSports, onSportChange }) => {
  const sports = ['ALL', 'NFL', 'NBA', 'MLB', 'NHL'];
  
  const handleSportClick = (sport: string) => {
    if (sport === 'ALL') {
      // If ALL is being selected, select everything
      if (!selectedSports.includes('ALL')) {
        onSportChange(sports);
      } else {
        // If ALL is being unselected, unselect everything
        onSportChange([]);
      }
    } else {
      // If selecting a specific sport
      const newSelection = selectedSports.includes(sport)
        ? selectedSports.filter(s => s !== sport && s !== 'ALL')
        : [...selectedSports.filter(s => s !== 'ALL'), sport];
      onSportChange(newSelection);
    }
  };

  return (
    <Box>
      <HStack spacing={2} wrap="wrap">
        {sports.map(sport => (
          <Tag
            key={sport}
            size="md"
            variant="outline"
            bg={selectedSports.includes(sport) ? 'gray.700' : 'transparent'}
            color={selectedSports.includes(sport) ? 'gray.100' : 'gray.500'}
            borderColor="gray.700"
            cursor="pointer"
            py={1}
            px={3}
            borderRadius="full"
            fontWeight="semibold"
            transition="all 0.2s"
            _hover={{
              transform: 'translateY(-1px)',
              shadow: 'sm',
              bg: selectedSports.includes(sport) ? 'gray.600' : 'whiteAlpha.50'
            }}
            onClick={() => handleSportClick(sport)}
          >
            {sport}
          </Tag>
        ))}
      </HStack>
    </Box>
  );
}; 