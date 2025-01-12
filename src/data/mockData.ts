// src/data/mockData.ts

export const mockOrders = [
    { team: 'San Francisco 49ers', odds: '+110', amount: 100, wallet: '0x1234...abcd' },
    { team: 'San Francisco 49ers', odds: '+115', amount: 150, wallet: '0x2345...bcde' },
    { team: 'San Francisco 49ers', odds: '+120', amount: 200, wallet: '0x3456...cdef' },
    { team: 'Pittsburgh Steelers', odds: '-110', amount: 100, wallet: '0x4567...defg' },
    { team: 'Pittsburgh Steelers', odds: '-115', amount: 150, wallet: '0x5678...efgh' },
    { team: 'Pittsburgh Steelers', odds: '-120', amount: 200, wallet: '0x6789...fghi' },
  ];
  
  export const mockMatchedOrders = [
    { id: '1', odds: '+110', amount: 100, time: '10:00 AM' },
    { id: '2', odds: '-110', amount: 200, time: '10:05 AM' },
    { id: '3', odds: '+115', amount: 150, time: '10:10 AM' },
  ];
