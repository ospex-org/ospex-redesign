import { User } from "@/types";
import StatBox from "@/components/common/StatBox";
import { SimpleGrid } from "@chakra-ui/react"

interface UserStatsProps {
  user: User;
  timeframe: string;
  sportFilter?: string;
}

export const UserStats: React.FC<UserStatsProps> = ({ user, timeframe }) => {
  const avgBetSize = user.totalSpeculated / (user.wins + user.losses + user.ties);
  
  return (
    <SimpleGrid 
      columns={{ base: 2, md: 4 }} 
      spacing={3}
      fontSize="sm"
      mb={3}
      // sx={{
      //   '& > div': {
      //     transform: 'scale(0.9)',
      //     padding: '0.75rem',
      //     bg: 'gray.800'
      //   }
      // }}
    >
      <StatBox
        label="Net"
        value={`$${user.net.toFixed(2)}`}
      />
      <StatBox
        label="Record"
        value={`${user.wins}-${user.losses}-${user.ties}`}
      />
      <StatBox
        label="Average Bet Size"
        value={`$${(user.totalSpeculated / (user.wins + user.losses + user.ties)).toFixed(2)}`}
      />
      <StatBox
        label="Total Volume"
        value={`$${user.totalSpeculated.toFixed(2)}`}
      />
    </SimpleGrid>
  );
}; 