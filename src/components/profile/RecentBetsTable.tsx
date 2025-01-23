import { 
  Table, 
  Thead, 
  Tbody, 
  Tr, 
  Th, 
  Td, 
  Badge, 
  Button, 
  Flex, 
  Checkbox, 
  Box,
  Skeleton,
  SkeletonText
} from '@chakra-ui/react';
import { UserBet } from '@/types';
import { useState } from 'react';
import { TableSkeleton } from '../LoadingIndicators';
import Pagination from '../common/Pagination';

interface RecentBetsTableProps {
  bets: UserBet[];
  isLoading?: boolean;
}

export const RecentBetsTable: React.FC<RecentBetsTableProps> = ({ 
  bets,
  isLoading = false
}) => {
  const [showOnlyClaimable, setShowOnlyClaimable] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of bets per page
  
  // Check if there are any claimable bets
  const hasClaimableBets = bets.some(bet => bet.isClaimable);

  if (isLoading) {
    return <TableSkeleton />
  }

  // Filter bets and sort by date (newest first)
  const filteredBets = showOnlyClaimable 
    ? bets.filter(bet => bet.isClaimable)
    : [...bets];

  // Sort in descending order (newest first)
  filteredBets.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Calculate pagination
  const totalPages = Math.ceil(filteredBets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBets = filteredBets.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const formatSide = (bet: UserBet) => {
    // TODO: This is using temporary data structure. 
    // Will be updated when integrating with indexing service to use awayTeam/homeTeam
    return bet.team || '';

    // Future implementation will use:
    // switch (bet.type) {
    //   case 'total':
    //     return bet.awayTeam && bet.homeTeam ? `${bet.awayTeam} at ${bet.homeTeam}` : '';
    //   case 'spread':
    //   case 'moneyline':
    //     return bet.side === 'away' ? bet.awayTeam : bet.homeTeam;
    // }
  };

  const formatNumber = (bet: UserBet) => {
    switch (bet.type) {
      case 'total':
        return bet.theNumber ? `${bet.side === 'over' ? 'Over' : 'Under'} ${bet.theNumber}` : '';
      case 'spread':
        return bet.theNumber ? (bet.theNumber > 0 ? `+${bet.theNumber}` : bet.theNumber) : '';
      case 'moneyline':
        return 'ML';
      default:
        return '';
    }
  };

  const formatAmount = (bet: UserBet) => {
    return bet.amount.toFixed(2);
  };

  const formatProfitLoss = (bet: UserBet) => {
    if (!bet.claimed && !bet.isClaimable) return '-';  // Only pending, non-claimable bets show dash
    
    const profitLoss = bet.isClaimable 
      ? (bet.toWin ?? 0)  // Use 0 if toWin is undefined
      : bet.amountClaimed - bet.amount;  // Use actual P/L for settled bets
      
    return profitLoss === 0 
      ? '0.00' 
      : `${profitLoss > 0 ? '+' : ''}${profitLoss.toFixed(2)}`;
  };

  const getResultBadge = (bet: UserBet) => {
    if (!bet.claimed) {
      if (bet.isClaimable) {
        return (
          <Button
            size="sm"
            variant="outline"
            bg="transparent"
            color="green.400"
            borderColor="green.400"
            _hover={{
              bg: 'green.400',
              color: 'black'
            }}
            height="24px"  // Match badge height
            minWidth="70px"  // Consistent width with other badges
            fontSize="xs"    // Match badge font size
            fontWeight="medium"
            onClick={() => {/* Handle claim */}}
          >
            Claim
          </Button>
        );
      }
      return <Badge colorScheme="gray">Pending</Badge>;
    }
    
    if (bet.amountClaimed > bet.amount) {
      return <Badge colorScheme="green">Win</Badge>;
    } else if (bet.amountClaimed === 0) {
      return <Badge colorScheme="red">Loss</Badge>;
    }
    return <Badge>Push</Badge>;
  };

  return (
    <>
      <Flex justify="flex-end" mb={4}>
        <Checkbox 
          isChecked={showOnlyClaimable}
          onChange={(e) => setShowOnlyClaimable(e.target.checked)}
          colorScheme="gray"
          isDisabled={!hasClaimableBets || isLoading}
          _disabled={{ 
            opacity: 0.4,
            cursor: 'not-allowed'
          }}
        >
          Show claimable
        </Checkbox>
      </Flex>
      
      <Box minH="400px" mb={4}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>League</Th>
              <Th>Side</Th>
              <Th isNumeric>Number</Th>
              <Th isNumeric>Bet</Th>
              <Th isNumeric>Odds</Th>
              <Th isNumeric>Result</Th>
              <Th textAlign="center">Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentBets.map((bet) => (
              <Tr key={bet.id}>
                <Td>{bet.date}</Td>
                <Td>{bet.league}</Td>
                <Td>{formatSide(bet)}</Td>
                <Td isNumeric>{formatNumber(bet)}</Td>
                <Td isNumeric>${bet.amount.toFixed(2)}</Td>
                <Td isNumeric>{bet.odds}</Td>
                <Td isNumeric>{formatProfitLoss(bet)}</Td>
                <Td textAlign="center">{getResultBadge(bet)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </Box>
    </>
  );
}; 