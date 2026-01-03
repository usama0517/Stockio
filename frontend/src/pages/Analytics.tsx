import React, { useState, useEffect } from 'react'
import {
  Box,
  Paper,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  LinearProgress
} from '@mui/material'
import type { SelectChangeEvent } from '@mui/material/Select'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
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
import { format, subDays, startOfWeek, startOfMonth, startOfYear } from 'date-fns'
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

const Analytics = () => {
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
      // Mock data based on timeFrame
      let data: ChartData[] = []
      const now = new Date()

      switch (timeFrame) {
        case 'day':
          data = Array.from({ length: 24 }, (_, i) => ({
            date: `${i}:00`,
            revenue: Math.random() * 1000 + 500,
            sales: Math.floor(Math.random() * 50 + 10),
            profit: Math.random() * 300 + 200,
          }))
          break
        case 'week':
          data = Array.from({ length: 7 }, (_, i) => {
            const date = subDays(now, 6 - i)
            return {
              date: format(date, 'EEE'),
              revenue: Math.random() * 2000 + 1000,
              sales: Math.floor(Math.random() * 100 + 50),
              profit: Math.random() * 800 + 400,
            }
          })
          break
        case 'month':
          data = Array.from({ length: 30 }, (_, i) => {
            const date = subDays(now, 29 - i)
            return {
              date: format(date, 'MMM dd'),
              revenue: Math.random() * 3000 + 1500,
              sales: Math.floor(Math.random() * 150 + 75),
              profit: Math.random() * 1200 + 600,
            }
          })
          break
        case 'year':
          data = Array.from({ length: 12 }, (_, i) => ({
            date: format(new Date(now.getFullYear(), i, 1), 'MMM'),
            revenue: Math.random() * 15000 + 10000,
            sales: Math.floor(Math.random() * 800 + 400),
            profit: Math.random() * 6000 + 3000,
          }))
          break
      }

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
      setTopProducts(mockTopProducts)
    } catch (error) {
      showSnackbar('Error loading analytics data', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleTimeFrameChange = (event: SelectChangeEvent) => {
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
                    <XAxis 
                      dataKey="date" 
                      stroke="#666"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="#666"
                      fontSize={12}
                      tickFormatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <Tooltip 
                      formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Value']}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
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
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} units`, 'Sales']} />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Daily Sales Volume
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#666"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="#666"
                      fontSize={12}
                    />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      dataKey="sales" 
                      fill="#8884d8" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Top Selling Products
              </Typography>
              <Box sx={{ mt: 2 }}>
                {topProducts.map((product, index) => (
                  <Box
                    key={product.name}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      py: 2,
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      '&:last-child': { borderBottom: 'none' },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          backgroundColor: index === 0 ? '#ffd700' : 
                                         index === 1 ? '#c0c0c0' : 
                                         index === 2 ? '#cd7f32' : 'primary.light',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 2,
                          color: index < 3 ? 'white' : 'text.primary',
                          fontWeight: 600,
                          fontSize: '0.875rem',
                        }}
                      >
                        {index + 1}
                      </Box>
                      <Box>
                        <Typography variant="subtitle1" fontWeight={500}>
                          {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {product.sales.toLocaleString()} units sold
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="h6" color="primary" fontWeight={600}>
                      ${product.revenue.toLocaleString()}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom color="text.secondary">
                Total Revenue
              </Typography>
              <Typography variant="h3" color="primary" sx={{ fontWeight: 700, mb: 1 }}>
                ${totalRevenue.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="success.main">
                +12.5% from last {timeFrame}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom color="text.secondary">
                Total Profit
              </Typography>
              <Typography variant="h3" color="success.main" sx={{ fontWeight: 700, mb: 1 }}>
                ${totalProfit.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="success.main">
                +8.3% from last {timeFrame}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom color="text.secondary">
                Avg Order Value
              </Typography>
              <Typography variant="h3" color="secondary" sx={{ fontWeight: 700, mb: 1 }}>
                ${avgOrderValue.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="success.main">
                +5.2% from last {timeFrame}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom color="text.secondary">
                Total Sales
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                {totalSales.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="success.main">
                +15.7% from last {timeFrame}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Analytics