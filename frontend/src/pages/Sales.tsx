import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Paper,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  MenuItem,
  InputAdornment,
  LinearProgress,
} from '@mui/material'
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  ShoppingCart as ShoppingCartIcon,
  TrendingDown as TrendingDownIcon,
} from '@mui/icons-material'
import { format } from 'date-fns'
import { useSnackbar } from '../contexts/SnackbarContext'
import type { Sale, Discard, Product } from '../types'

const Sales = () => {
  const [sales, setSales] = useState<Sale[]>([])
  const [discards, setDiscards] = useState<Discard[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [openSaleDialog, setOpenSaleDialog] = useState(false)
  const [openDiscardDialog, setOpenDiscardDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const [salePage, setSalePage] = useState(0)
  const [discardPage, setDiscardPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const { showSnackbar } = useSnackbar()

  const [saleFormData, setSaleFormData] = useState({
    productId: '',
    quantity: '',
    price: '',
  })

  const [discardFormData, setDiscardFormData] = useState({
    productId: '',
    quantity: '',
    reason: '',
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      // Mock data - Replace with API calls
      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'Premium Coffee Beans',
          sku: 'COF001',
          description: '',
          price: 24.99,
          cost: 15.50,
          quantity: 150,
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
          quantity: 300,
          minStockLevel: 30,
          categoryId: '1',
          createdAt: '',
          updatedAt: '',
        },
      ]

      const mockSales: Sale[] = [
        {
          id: '1',
          productId: '1',
          quantity: 2,
          price: 24.99,
          total: 49.98,
          saleDate: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]

      const mockDiscards: Discard[] = [
        {
          id: '1',
          productId: '1',
          quantity: 1,
          reason: 'Expired',
          date: new Date().toISOString(),
          createdAt: new Date().toISOString(),
        },
      ]

      setProducts(mockProducts)
      setSales(mockSales)
      setDiscards(mockDiscards)
    } catch (error) {
      showSnackbar('Error loading data', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleRecordSale = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const product = products.find(p => p.id === saleFormData.productId)
      if (!product) throw new Error('Product not found')

      const sale: Sale = {
        id: Date.now().toString(),
        productId: saleFormData.productId,
        quantity: parseInt(saleFormData.quantity),
        price: product.price,
        total: product.price * parseInt(saleFormData.quantity),
        saleDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      setSales(prev => [sale, ...prev])
      showSnackbar('Sale recorded successfully', 'success')
      setOpenSaleDialog(false)
      setSaleFormData({ productId: '', quantity: '', price: '' })
    } catch (error) {
      showSnackbar('Error recording sale', 'error')
    }
  }

  const handleRecordDiscard = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const discard: Discard = {
        id: Date.now().toString(),
        productId: discardFormData.productId,
        quantity: parseInt(discardFormData.quantity),
        reason: discardFormData.reason,
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      }

      setDiscards(prev => [discard, ...prev])
      showSnackbar('Discard recorded successfully', 'success')
      setOpenDiscardDialog(false)
      setDiscardFormData({ productId: '', quantity: '', reason: '' })
    } catch (error) {
      showSnackbar('Error recording discard', 'error')
    }
  }

  const handleDeleteSale = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this sale record?')) {
      try {
        setSales(prev => prev.filter(sale => sale.id !== id))
        showSnackbar('Sale record deleted', 'success')
      } catch (error) {
        showSnackbar('Error deleting sale', 'error')
      }
    }
  }

  const handleDeleteDiscard = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this discard record?')) {
      try {
        setDiscards(prev => prev.filter(discard => discard.id !== id))
        showSnackbar('Discard record deleted', 'success')
      } catch (error) {
        showSnackbar('Error deleting discard', 'error')
      }
    }
  }

  const getProductName = (productId: string) => {
    const product = products.find(p => p.id === productId)
    return product ? product.name : 'Unknown Product'
  }

  const handleSaleChangePage = (_event: unknown, newPage: number) => {
    setSalePage(newPage)
  }

  const handleDiscardChangePage = (_event: unknown, newPage: number) => {
    setDiscardPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setSalePage(0)
    setDiscardPage(0)
  }

  const totalSalesToday = sales
    .filter(sale => format(new Date(sale.saleDate), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd'))
    .reduce((sum, sale) => sum + sale.total, 0)

  const totalDiscardsToday = discards
    .filter(discard => format(new Date(discard.date), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd'))
    .reduce((sum, discard) => discard.quantity, 0)

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Sales & Discards
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="error"
            startIcon={<TrendingDownIcon />}
            onClick={() => setOpenDiscardDialog(true)}
            sx={{ textTransform: 'none' }}
          >
            Record Discard
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenSaleDialog(true)}
            sx={{ textTransform: 'none' }}
          >
            Record Sale
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <ShoppingCartIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              ${totalSalesToday.toFixed(2)}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Today's Sales
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <TrendingDownIcon sx={{ fontSize: 48, color: 'error.main', mb: 2 }} />
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              {totalDiscardsToday}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Items Discarded Today
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {loading ? (
        <LinearProgress />
      ) : (
        <>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, mt: 4 }}>
            Recent Sales
          </Typography>
          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sales
                  .slice(salePage * rowsPerPage, salePage * rowsPerPage + rowsPerPage)
                  .map((sale) => (
                    <TableRow key={sale.id} hover>
                      <TableCell>
                        {format(new Date(sale.saleDate), 'MMM dd, yyyy HH:mm')}
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight={500}>
                          {getProductName(sale.productId)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label={sale.quantity} size="small" />
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight={500}>
                          ${sale.price.toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="primary" fontWeight={600}>
                          ${sale.total.toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton size="small" onClick={() => handleDeleteSale(sale.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={sales.length}
              rowsPerPage={rowsPerPage}
              page={salePage}
              onPageChange={handleSaleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>

          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Discarded Items
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {discards
                  .slice(discardPage * rowsPerPage, discardPage * rowsPerPage + rowsPerPage)
                  .map((discard) => (
                    <TableRow key={discard.id} hover>
                      <TableCell>
                        {format(new Date(discard.date), 'MMM dd, yyyy')}
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight={500}>
                          {getProductName(discard.productId)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label={discard.quantity} size="small" color="error" />
                      </TableCell>
                      <TableCell>
                        <Typography color="text.secondary">
                          {discard.reason}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton size="small" onClick={() => handleDeleteDiscard(discard.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={discards.length}
              rowsPerPage={rowsPerPage}
              page={discardPage}
              onPageChange={handleDiscardChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </>
      )}

      {/* Record Sale Dialog */}
      <Dialog open={openSaleDialog} onClose={() => setOpenSaleDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 600 }}>Record New Sale</DialogTitle>
        <form onSubmit={handleRecordSale}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Product"
                  value={saleFormData.productId}
                  onChange={(e) => {
                    const product = products.find(p => p.id === e.target.value)
                    setSaleFormData({
                      ...saleFormData,
                      productId: e.target.value,
                      price: product ? product.price.toString() : ''
                    })
                  }}
                  required
                  size="small"
                >
                  <MenuItem value="">Select Product</MenuItem>
                  {products.map((product) => (
                    <MenuItem key={product.id} value={product.id}>
                      {product.name} (${product.price})
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Quantity"
                  type="number"
                  value={saleFormData.quantity}
                  onChange={(e) => setSaleFormData({ ...saleFormData, quantity: e.target.value })}
                  required
                  size="small"
                  inputProps={{ min: 1 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Price"
                  type="number"
                  value={saleFormData.price}
                  onChange={(e) => setSaleFormData({ ...saleFormData, price: e.target.value })}
                  required
                  size="small"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                />
              </Grid>
              {saleFormData.productId && saleFormData.quantity && (
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, backgroundColor: 'primary.light', color: 'white' }}>
                    <Typography variant="body2">
                      Total: ${(parseFloat(saleFormData.price || '0') * parseInt(saleFormData.quantity || '0')).toFixed(2)}
                    </Typography>
                  </Paper>
                </Grid>
              )}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenSaleDialog(false)}>Cancel</Button>
            <Button type="submit" variant="contained">
              Record Sale
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Record Discard Dialog */}
      <Dialog open={openDiscardDialog} onClose={() => setOpenDiscardDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 600 }}>Record Discarded Items</DialogTitle>
        <form onSubmit={handleRecordDiscard}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Product"
                  value={discardFormData.productId}
                  onChange={(e) => setDiscardFormData({ ...discardFormData, productId: e.target.value })}
                  required
                  size="small"
                >
                  <MenuItem value="">Select Product</MenuItem>
                  {products.map((product) => (
                    <MenuItem key={product.id} value={product.id}>
                      {product.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Quantity"
                  type="number"
                  value={discardFormData.quantity}
                  onChange={(e) => setDiscardFormData({ ...discardFormData, quantity: e.target.value })}
                  required
                  size="small"
                  inputProps={{ min: 1 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Reason"
                  value={discardFormData.reason}
                  onChange={(e) => setDiscardFormData({ ...discardFormData, reason: e.target.value })}
                  required
                  size="small"
                >
                  <MenuItem value="">Select Reason</MenuItem>
                  <MenuItem value="Expired">Expired</MenuItem>
                  <MenuItem value="Damaged">Damaged</MenuItem>
                  <MenuItem value="Quality Issue">Quality Issue</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDiscardDialog(false)}>Cancel</Button>
            <Button type="submit" variant="contained" color="error">
              Record Discard
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  )
}

export default Sales