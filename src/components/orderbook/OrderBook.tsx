// src/components/orderbook/OrderBook.tsx
import React, { useState, useEffect } from 'react';
import { Box, Grid, GridItem, Text, VStack, Spacer } from '@chakra-ui/react';
import OrderBox from './OrderBox';
import MatchedOrders from './MatchedOrders';

interface OrderBookProps {
  contestId: string;
  betType: 'spread' | 'moneyline' | 'total';
  awayTeam: string;
  homeTeam: string;
  spreadValue: number;
  totalValue: number;
}

const OrderBook: React.FC<OrderBookProps> = ({ contestId, betType, awayTeam, homeTeam, spreadValue, totalValue }) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [matchedOrders, setMatchedOrders] = useState<any[]>([]);

  useEffect(() => {
    // Fetch orders based on contestId and betType
    // This is where you'd implement the actual data fetching logic
    const fetchOrders = () => {
      // Dummy data for now
      const dummyOrders = [
        { id: '1', team: 'Team A', odds: '+110', amount: 100, wallet: '0x123...abc' },
        { id: '2', team: 'Team B', odds: '-110', amount: 200, wallet: '0x456...def' },
        // ... more orders
      ];
      setOrders(dummyOrders);

      const dummyMatchedOrders = [
        { id: '1', odds: '+110', amount: 100, time: '10:00 AM' },
        { id: '2', odds: '-110', amount: 200, time: '10:05 AM' },
        // ... more matched orders
      ];
      setMatchedOrders(dummyMatchedOrders);
    };

    fetchOrders();
  }, [contestId, betType]);

  const renderHeader = () => {
    let leftText, rightText;

    switch (betType) {
      case 'spread':
        leftText = `${awayTeam} ${spreadValue > 0 ? '+' : ''}${spreadValue}`;
        rightText = `${homeTeam} ${-spreadValue > 0 ? '+' : ''}${-spreadValue}`;
        break;
      case 'moneyline':
        leftText = `${awayTeam} Moneyline`;
        rightText = `${homeTeam} Moneyline`;
        break;
      case 'total':
        leftText = `Over ${totalValue}`;
        rightText = `Under ${totalValue}`;
        break;
      default:
        leftText = awayTeam;
        rightText = homeTeam;
    }

    return (
      <GridItem colSpan={7}>
        <Grid templateColumns="repeat(7, 1fr)" gap={4}>
          <GridItem colSpan={3}>
            <Text textAlign="center">{leftText}</Text>
          </GridItem>
          <GridItem colSpan={1}>
            <Text textAlign="center">Current Match</Text>
          </GridItem>
          <GridItem colSpan={3}>
            <Text textAlign="center">{rightText}</Text>
          </GridItem>
        </Grid>
      </GridItem>
    );
  };

  const renderColumn = (startIndex: number) => (
    <GridItem>
      <VStack spacing={2}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <OrderBox
            key={i}
            odds={orders[startIndex + i]?.odds || ''}
            amount={orders[startIndex + i]?.amount || 0}
            id={orders[startIndex + i]?.wallet || ''}
            number={startIndex + i}
          />
        ))}
      </VStack>
    </GridItem>
  );

  return (
    <Box width="100%" overflowX="auto">
      <Grid templateColumns="repeat(7, 1fr)" gap={4}>
        {renderHeader()}
        {renderColumn(0)}
        {renderColumn(1)}
        {renderColumn(2)}
        <GridItem>
          <VStack align="stretch" spacing={2}>
            <Box
              height="90px"
              border="1px solid"
              borderColor="gray.600"
              borderRadius="md"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text>Pending</Text>
            </Box>
            <Spacer minHeight="58px" /> {/* Adjust this value as needed */}
            <Text fontWeight="bold" textAlign="center">Match History</Text>
            <MatchedOrders orders={matchedOrders.slice(0, 2)} />
          </VStack>
        </GridItem>
        {renderColumn(4)}
        {renderColumn(5)}
        {renderColumn(6)}
      </Grid>
    </Box>
  );
};

export default OrderBook;
