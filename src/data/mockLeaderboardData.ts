import { addDays, format } from 'date-fns'

const generateChartData = (startDate: Date, days: number) => {
  let net = 0
  return Array.from({ length: days }, (_, i) => {
    const date = addDays(startDate, i)
    net += Math.random() * 20 - 10 // Random daily change between -10 and 10
    return {
      date: format(date, 'yyyy-MM-dd'),
      net: parseFloat(net.toFixed(2))
    }
  })
}

const generateLeaderboard = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `user${i + 1}`,
    address: `0x${Math.random().toString(16).substr(2, 40)}`,
    alias: `User${i + 1}`,
    net: parseFloat((Math.random() * 1000 - 500).toFixed(2)),
    validBets: Math.floor(Math.random() * 50) + 10
  })).sort((a, b) => b.net - a.net)
}

const currentDate = new Date()
const currentMonth = currentDate.getMonth() + 1
const currentYear = currentDate.getFullYear()

export const mockLeaderboardData = {
  monthly: {
    [`${currentMonth}${currentYear}`]: {
      period: `${currentMonth}${currentYear}`,
      chartData: generateChartData(new Date(currentYear, currentMonth - 1, 1), 30),
      leaderboard: generateLeaderboard(20)
    }
  },
  yearly: {
    [currentYear.toString()]: {
      period: currentYear.toString(),
      chartData: generateChartData(new Date(currentYear, 0, 1), 365),
      leaderboard: generateLeaderboard(50)
    }
  }
}