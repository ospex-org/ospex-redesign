import { HStack, Tag } from "@chakra-ui/react"

export const SportFilter: React.FC<{
  selectedSports: string[];
  onSportChange: (sports: string[]) => void;
}> = ({ selectedSports, onSportChange }) => {
  return (
    <HStack spacing={2} wrap="wrap">
      {['ALL', 'NFL', 'NBA', 'MLB', 'NHL'].map(sport => (
        <Tag
          key={sport}
          size="md"
          variant={selectedSports.includes(sport) ? 'solid' : 'outline'}
          colorScheme="blue"
          cursor="pointer"
          onClick={() => {
            const newSelection = sport === 'ALL' 
              ? ['ALL']
              : selectedSports.includes(sport)
                ? selectedSports.filter(s => s !== sport)
                : [...selectedSports, sport];
            onSportChange(newSelection);
          }}
        >
          {sport}
        </Tag>
      ))}
    </HStack>
  );
}; 