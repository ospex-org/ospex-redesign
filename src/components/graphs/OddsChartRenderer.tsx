'use client'

import React, { useEffect, useRef } from 'react';
import { Chart, ChartConfiguration } from 'chart.js/auto';

interface OddsChartRendererProps {
  data: Array<{ date: string; away: number; home: number } | { date: string; over: number; under: number }>;
  perspective: 'away' | 'home';
  teamName: string;
  lineColor: string;
}

const OddsChartRenderer: React.FC<OddsChartRendererProps> = ({ data, perspective, teamName, lineColor }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        const chartConfig: ChartConfiguration = {
          type: 'line',
          data: {
            labels: data.map(d => d.date),
            datasets: [{
              label: `${teamName}`,
              data: data.map(d => 'away' in d ? (perspective === 'away' ? d.away : d.home) : (perspective === 'away' ? d.over : d.under)),
              borderColor: lineColor,
              tension: 0.1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              x: {
                grid: {
                  display: false
                },
                border: {
                  display: true,
                  color: 'rgba(255, 255, 255, 0.3)'
                }
              },
              y: {
                beginAtZero: false,
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)'
                },
                border: {
                  display: true,
                  color: 'rgba(255, 255, 255, 0.3)'
                }
              }
            },
            layout: {
              padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 30
              }
            }
          }
        };

        chartInstanceRef.current = new Chart(ctx, chartConfig);
      }
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data, perspective, teamName, lineColor]);

  return <canvas ref={chartRef} style={{ width: '100%', height: '300px' }}></canvas>;
};

export default OddsChartRenderer;
