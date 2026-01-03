import React, { useState, useEffect } from 'react'
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  LinearProgress,
} from '@mui/material'
import {
  AttachMoney as AttachMoneyIcon,
  ShoppingCart as ShoppingCartIcon,
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
  Inventory as InventoryIcon,
} from '@mui/icons-material'
import { format } from 'date-fns'
import { useSnackbar } from '../contexts/SnackbarContext'
import type { DashboardStats, Product } from '../types'

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalSales: 0,
    totalRevenue: 0,
    lowStockProducts: 0,
  })
  const [recentSales, setRecentSales] = useState<any[]>([])
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { showSnackbar } = useSnackbar()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Mock data - Replace with actual API calls
      const mockStats: DashboardStats = {
        totalProducts: 156,
        totalSales: 2347,
        totalRevenue: 45280,
        lowStockProducts: 12,
      }

      const mockRecentSales = [
        { id: 1, product: 'Premium Coffee', quantity: 2, total: 49.98, date: new Date() },
        { id: 2, product: 'Green Tea', quantity: 5, total: 24.95, date: new Date(Date.now() - 3600000) },
        { id: 3, product: 'Croissant', quantity: 3, total: 8.97, date: new Date(Date.now() - 7200000) },
        { id: 4, product: 'Sandwich', quantity: 1, total: 6.99, date: new Date(Date.now() - 10800000) },
      ]

      const mockLowStockProducts: Product[] = [
        {
          id: '1',
          name: 'Premium Coffee Beans',
          sku: 'COF001',
          description: '',
          price: 24.99,
          cost: 15.50,
          quantity: 5,
          minStockLevel: 20,
          categoryId: '1',
          createdAt: '',
          updatedAt: '',
        },
        {
          id: '2',
          name: 'Green Tea Bags',
          sku: 'TEA001',
          description: '',
          price: 4.99,
          cost: 2.50,
          quantity: 8,
          minStockLevel: 30,
          categoryId: '1',
          createdAt: '',
          updatedAt: '',
        },
      ]

      setStats(mockStats)
      setRecentSales(mockRecentSales)
      setLowStockProducts(mockLowStockProducts)
      setLoading(false)
    } catch (error) {
      showSnackbar('Error loading dashboard data', 'error')
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: <AttachMoneyIcon />,
      color: '#10b981',
      progress: 75,
    },
    {
      title: 'Total Sales',
      value: stats.totalSales.toLocaleString(),
      icon: <ShoppingCartIcon />,
      color: '#3b82f6',
      progress: 65,
    },
    {
      title: 'Total Products',
      value: stats.totalProducts.toString(),
      icon: <InventoryIcon />,
      color: '#8b5cf6',
      progress: 85,
    },
    {
      title: 'Low Stock Items',
      value: stats.lowStockProducts.toString(),
      icon: <WarningIcon />,
      color: '#ef4444',
      progress: 40,
    },
  ]

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <LinearProgress sx={{ width: '50%' }} />
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
        Dashboard
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Welcome back! Here's what's happening with your business today.
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {statCards.map((stat) => (
          <Grid item xs={12} sm={6} lg={3} key={stat.title}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      backgroundColor: `${stat.color}15`,
                      borderRadius: '12px',
                      p: 1.5,
                      mr: 2,
                    }}
                  >
                    <Box sx={{ color: stat.color, display: 'flex' }}>
                      {stat.icon}
                    </Box>
                  </Box>
                  <Box>
                    <Typography color="text.secondary" variant="body2">
                      {stat.title}
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      {stat.value}
                    </Typography>
                  </Box>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={stat.progress}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: `${stat.color}20`,
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: stat.color,
                      borderRadius: 3,
                    },
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
        
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Recent Sales
            </Typography>
            <Box sx={{ mt: 2 }}>
              {recentSales.map((sale) => (
                <Box
                  key={sale.id}
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
                  <Box>
                    <Typography variant="subtitle1" fontWeight={500}>
                      {sale.product}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {format(sale.date, 'MMM dd, yyyy HH:mm')}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="subtitle1" fontWeight={500}>
                      ${sale.total.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {sale.quantity} units
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Low Stock Alert
            </Typography>
            <Box sx={{ mt: 2 }}>
              {lowStockProducts.map((product) => (
                <Box
                  key={product.id}
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
                  <Box>
                    <Typography variant="subtitle1" fontWeight={500}>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      SKU: {product.sku}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography 
                      variant="subtitle1" 
                      color="error.main"
                      fontWeight={500}
                    >
                      {product.quantity} left
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Min: {product.minStockLevel}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard