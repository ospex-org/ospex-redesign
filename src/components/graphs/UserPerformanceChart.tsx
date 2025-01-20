import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Box, ButtonGroup, Button, Flex } from '@chakra-ui/react';
import { Chart, ChartConfiguration, ScriptableContext, ScriptableLineSegmentContext } from 'chart.js/auto';
import { enUS } from 'date-fns/locale';
import 'chartjs-adapter-date-fns';
import { UserBet } from '@/types';

interface UserPerformanceChartProps {
  recentBets: UserBet[];
  timeframe: string;
  onTimeframeChange?: (timeframe: string) => void;
}

const timeframes = [
  { label: '24H', value: '1D' },
  { label: '7D', value: '7D' },
  { label: '1M', value: '1M' },
  { label: '3M', value: '3M' },
  { label: 'YTD', value: 'YTD' },
  { label: '1Y', value: '1Y' },
  { label: 'ALL', value: 'ALL' }
];

const UserPerformanceChart: React.FC<UserPerformanceChartProps> = ({ 
  recentBets,
  timeframe,
  onTimeframeChange 
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M');

  // Transform recentBets into chart data
  const chartData = useMemo(() => {
    return recentBets
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .reduce((acc, bet) => {
        const lastValue = acc[acc.length - 1]?.net || 0;
        return [...acc, {
          date: bet.date,
          net: lastValue + (bet.amountClaimed - bet.amount)
        }];
      }, [] as Array<{date: string; net: number}>);
  }, [recentBets]);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        datasets: [{
          label: 'Net Profit/Loss',
          data: chartData.map(point => ({
            x: new Date(point.date).getTime(),
            y: point.net
          })),
          borderColor: '#48BB78',
          borderWidth: 2,
          fill: true,
          segment: {
            borderColor: (ctx: ScriptableLineSegmentContext) => {
              const value = ctx.p1.parsed.y;
              return value >= 0 ? '#48BB78' : '#E53E3E';
            },
            backgroundColor: (ctx: ScriptableLineSegmentContext) => {
              const value = ctx.p1.parsed.y;
              return value >= 0 
                ? 'rgba(72, 187, 120, 0.1)'  // green with opacity
                : 'rgba(229, 62, 62, 0.1)';  // red with opacity
            }
          },
          tension: 0,
          pointRadius: 0,
          pointHitRadius: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: (context: ScriptableContext<'line'>) => {
            const value = (context.raw as { y: number })?.y;
            return value >= 0 ? '#48BB78' : '#E53E3E';
          },
          pointHoverBorderColor: '#FFFFFF'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'index'
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                return `Net: $${context.parsed.y.toFixed(2)}`;
              }
            }
          }
        },
        scales: {
          x: {
            type: 'time',
            time: {
              unit: timeframe === '1D' ? 'hour' 
                : timeframe === '7D' ? 'day'
                : timeframe === '1M' ? 'week'
                : 'month',
              displayFormats: {
                hour: 'HH:mm',
                day: 'MMM d',
                week: 'MMM d',
                month: 'MMM yyyy'
              }
            },
            adapters: {
              date: {
                locale: enUS
              }
            },
            grid: {
              display: false
            },
            border: {
              display: false
            },
            ticks: {
              color: '#718096' // gray.500
            }
          },
          y: {
            grid: {
              color: 'rgba(113, 128, 150, 0.1)' // gray.500 with opacity
            },
            border: {
              display: false
            },
            ticks: {
              color: '#718096', // gray.500
              callback: (value) => `$${value}`
            }
          }
        }
      }
    };

    chartInstanceRef.current = new Chart(ctx, config);

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [chartData, timeframe]);

  return (
    <Box>
      <Flex justify="space-between" mb={4}>
        <ButtonGroup size="sm" isAttached variant="outline">
          {timeframes.map(({ label, value }) => (
            <Button
              key={value}
              onClick={() => {
                setSelectedTimeframe(value);
                onTimeframeChange?.(value);
              }}
              colorScheme={selectedTimeframe === value ? 'blue' : 'gray'}
            >
              {label}
            </Button>
          ))}
        </ButtonGroup>
      </Flex>
      <Box height="400px">
        <canvas ref={chartRef} />
      </Box>
    </Box>
  );
};

export default UserPerformanceChart; 