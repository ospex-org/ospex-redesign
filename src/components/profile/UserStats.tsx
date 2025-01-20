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
    <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
      <StatBox
        label="Net Profit/Loss"
        value={user.net}
        format="currency"
      />
      <StatBox
        label="Win Rate"
        value={user.winPercentage}
        format="percentage"
      />
      <StatBox
        label="Average Bet Size"
        value={avgBetSize}
        format="currency"
      />
      <StatBox
        label="Total Volume"
        value={parseFloat(user.totalBet)}
        format="currency"
      />
    </SimpleGrid>
  );
}; 