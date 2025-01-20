import { Table, Thead, Tbody, Tr, Th, Td, Badge } from '@chakra-ui/react';
import { UserBet } from '@/types';

interface RecentBetsTableProps {
  bets: UserBet[];
}

export const RecentBetsTable: React.FC<RecentBetsTableProps> = ({ bets }) => {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Date</Th>
          <Th>League</Th>
          <Th>Amount</Th>
          <Th>Type</Th>
          <Th>Side</Th>
          <Th>Odds</Th>
          <Th>Status</Th>
        </Tr>
      </Thead>
      <Tbody>
        {bets.map((bet) => (
          <Tr key={bet.id}>
            <Td>{bet.date}</Td>
            <Td>{bet.league}</Td>
            <Td>{bet.amount.toFixed(2)} USDC</Td>
            <Td>{bet.type}</Td>
            <Td>{bet.side}</Td>
            <Td>{bet.odds}</Td>
            <Td>
              <Badge colorScheme={bet.claimed ? 'green' : 'yellow'}>
                {bet.claimed ? 'Claimed' : 'Pending'}
              </Badge>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}; 