'use client'

import React, { useEffect, useRef } from 'react'
import { Chart, ChartConfiguration, registerables } from 'chart.js'
import 'chartjs-adapter-date-fns'
import { enUS } from 'date-fns/locale'

Chart.register(...registerables)

interface LeaderboardChartProps {
  data: Array<{ date: string; net: number }>
}

const LeaderboardChart: React.FC<LeaderboardChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstanceRef = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current && data && data.length > 0) {
      const ctx = chartRef.current.getContext('2d')
      if (ctx) {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy()
        }

        const chartConfig: ChartConfiguration = {
          type: 'line',
          data: {
            labels: data.map(d => d.date),
            datasets: [{
              label: 'Net',
              data: data.map(d => d.net),
              borderColor: '#3273dc',
              tension: 0.1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                mode: 'index',
                intersect: false,
              }
            },
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'day'
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
            interaction: {
              mode: 'nearest',
              axis: 'x',
              intersect: false
            }
          }
        }

        chartInstanceRef.current = new Chart(ctx, chartConfig)
      }
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy()
      }
    }
  }, [data])

  if (!data || data.length === 0) {
    return <div>No data available</div>
  }

  return <canvas ref={chartRef} style={{ width: '100%', height: '100%' }}></canvas>
}

export default LeaderboardChart
