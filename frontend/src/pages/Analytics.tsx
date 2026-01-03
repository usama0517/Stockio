// Simplified Analytics.tsx
import { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  LinearProgress,
} from '@mui/material'
import type { SelectChangeEvent } from '@mui/material/Select'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

import { format, subDays } from 'date-fns'
import { useSnackbar } from '../contexts/SnackbarContext'

interface ChartData {
  date: string
  revenue: number
  sales: number
  profit: number
}

interface CategoryData {
  name: string
  value: number
  color: string
}

interface TopProduct {
  name: string
  sales: number
  revenue: number
}

export default function Analytics() {
  const [timeFrame, setTimeFrame] = useState('month')
  const [revenueData, setRevenueData] = useState<ChartData[]>([])
  const [categoryData, setCategoryData] = useState<CategoryData[]>([])
  const [topProducts, setTopProducts] = useState<TopProduct[]>([])
  const [loading, setLoading] = useState(false)
  const { showSnackbar } = useSnackbar()

  useEffect(() => {
    fetchAnalyticsData()
  }, [timeFrame])

  const fetchAnalyticsData = async () => {
    setLoading(true)
    try {
      // Mock data
      const data: ChartData[] = Array.from({ length: 30 }, (_, i) => {
        const date = subDays(new Date(), 29 - i)
        return {
          date: format(date, 'MMM dd'),
          revenue: Math.random() * 3000 + 1500,
          sales: Math.floor(Math.random() * 150 + 75),
          profit: Math.random() * 1200 + 600,
        }
      })

      const mockCategoryData: CategoryData[] = [
        { name: 'Beverages', value: 400, color: '#0088FE' },
        { name: 'Food', value: 300, color: '#00C49F' },
        { name: 'Supplies', value: 300, color: '#FFBB28' },
        { name: 'Others', value: 200, color: '#FF8042' },
      ]

      const mockTopProducts: TopProduct[] = [
        { name: 'Premium Coffee', sales: 1234, revenue: 12340 },
        { name: 'Green Tea', sales: 987, revenue: 9870 },
        { name: 'Croissant', sales: 654, revenue: 6540 },
        { name: 'Sandwich', sales: 321, revenue: 6420 },
        { name: 'Coffee Mug', sales: 210, revenue: 3150 },
      ]

      setRevenueData(data)
      setCategoryData(mockCategoryData)
      console.log(topProducts);
      setTopProducts(mockTopProducts)
    } catch (error) {
      showSnackbar('Error loading analytics data', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleTimeFrameChange = (event: SelectChangeEvent<string>) => {
    setTimeFrame(event.target.value)
  }

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0)
  const totalProfit = revenueData.reduce((sum, item) => sum + item.profit, 0)
  const totalSales = revenueData.reduce((sum, item) => sum + item.sales, 0)
  const avgOrderValue = totalSales > 0 ? totalRevenue / totalSales : 0

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <LinearProgress sx={{ width: '50%' }} />
      </Box>
    )
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Analytics Dashboard
        </Typography>
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel>Time Frame</InputLabel>
          <Select
            value={timeFrame}
            label="Time Frame"
            onChange={handleTimeFrameChange}
          >
            <MenuItem value="day">Daily</MenuItem>
            <MenuItem value="week">Weekly</MenuItem>
            <MenuItem value="month">Monthly</MenuItem>
            <MenuItem value="year">Yearly</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Revenue Trend
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" stroke="#666" fontSize={12} />
                    <YAxis
                      stroke="#666"
                      fontSize={12}
                      tickFormatter={(value) => `$${value.toLocaleString()}`}
                    />
                    {//,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
}   <Box sx={{ display: 'none' }}>
  Profit: {totalProfit}, Avg: {avgOrderValue}
</Box>
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#8884d8"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="profit"
                      stroke="#82ca9d"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Sales by Category
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData as any[]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name }) => name}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Add other grid items similarly */}
      </Grid>
    </Box>
  )
}