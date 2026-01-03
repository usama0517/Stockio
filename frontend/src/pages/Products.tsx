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
  MenuItem,
  Chip,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from '@mui/material'
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Inventory as InventoryIcon,
} from '@mui/icons-material'
import { useSnackbar } from '../contexts/SnackbarContext'
import type { Product } from '../types'

const Products = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const { showSnackbar } = useSnackbar()

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    description: '',
    price: '',
    cost: '',
    quantity: '',
    categoryId: '',
    minStockLevel: '',
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      // Mock data - Replace with API call
      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'Premium Coffee Beans',
          sku: 'COF001',
          description: 'Arabica coffee beans from Colombia',
          price: 24.99,
          cost: 15.50,
          quantity: 150,
          minStockLevel: 20,
          categoryId: '1',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01',
        },
        {
          id: '2',
          name: 'Green Tea Bags',
          sku: 'TEA001',
          description: 'Organic green tea bags',
          price: 4.99,
          cost: 2.50,
          quantity: 300,
          minStockLevel: 30,
          categoryId: '1',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01',
        },
        {
          id: '3',
          name: 'Croissant',
          sku: 'BAK001',
          description: 'Fresh butter croissant',
          price: 2.99,
          cost: 1.20,
          quantity: 80,
          minStockLevel: 25,
          categoryId: '2',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01',
        },
      ]
      setProducts(mockProducts)
    } catch (error) {
      showSnackbar('Error fetching products', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (selectedProduct) {
        // Update product
        showSnackbar('Product updated successfully', 'success')
      } else {
        // Create product
        showSnackbar('Product created successfully', 'success')
      }
      setOpenDialog(false)
      resetForm()
      fetchProducts()
    } catch (error) {
      showSnackbar('Error saving product', 'error')
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        // API call to delete
        console.log(id)
        showSnackbar('Product deleted successfully', 'success')
        fetchProducts()
      } catch (error) {
        showSnackbar('Error deleting product', 'error')
      }
    }
  }

  const handleEdit = (product: Product) => {
    setSelectedProduct(product)
    setFormData({
      name: product.name,
      sku: product.sku,
      description: product.description,
      price: product.price.toString(),
      cost: product.cost.toString(),
      quantity: product.quantity.toString(),
      categoryId: product.categoryId,
      minStockLevel: product.minStockLevel.toString(),
    })
    setOpenDialog(true)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      sku: '',
      description: '',
      price: '',
      cost: '',
      quantity: '',
      categoryId: '',
      minStockLevel: '',
    })
    setSelectedProduct(null)
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStockStatus = (quantity: number, minStockLevel: number) => {
    if (quantity === 0) return { status: 'Out of Stock', color: 'error' as const }
    if (quantity < minStockLevel) return { status: 'Low Stock', color: 'warning' as const }
    if (quantity < minStockLevel * 2) return { status: 'Medium Stock', color: 'info' as const }
    return { status: 'In Stock', color: 'success' as const }
  }

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Products
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{ textTransform: 'none' }}
        >
          Add Product
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search products by name or SKU..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      {loading ? (
        <LinearProgress />
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>SKU</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Cost</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((product) => {
                    const stockStatus = getStockStatus(product.quantity, product.minStockLevel)
                    return (
                      <TableRow key={product.id} hover>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <InventoryIcon sx={{ mr: 2, color: 'text.secondary' }} />
                            <Box>
                              <Typography variant="subtitle1" fontWeight={500}>
                                {product.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {product.description.substring(0, 50)}...
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip label={product.sku} size="small" variant="outlined" />
                        </TableCell>
                        <TableCell>
                          <Typography fontWeight={500}>
                            ${product.price.toFixed(2)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography color="text.secondary">
                            ${product.cost.toFixed(2)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Typography fontWeight={500}>
                              {product.quantity}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Min: {product.minStockLevel}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={stockStatus.status}
                            color={stockStatus.color}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <IconButton size="small" onClick={() => handleEdit(product)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton size="small" onClick={() => handleDelete(product.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredProducts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}

      <Dialog open={openDialog} onClose={() => { setOpenDialog(false); resetForm() }} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 600 }}>
          {selectedProduct ? 'Edit Product' : 'Add New Product'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Product Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="SKU"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  required
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  multiline
                  rows={3}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                  size="small"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Cost"
                  type="number"
                  value={formData.cost}
                  onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                  size="small"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  required
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Minimum Stock Level"
                  type="number"
                  value={formData.minStockLevel}
                  onChange={(e) => setFormData({ ...formData, minStockLevel: e.target.value })}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Category"
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  required
                  size="small"
                >
                  <MenuItem value="">Select Category</MenuItem>
                  <MenuItem value="1">Beverages</MenuItem>
                  <MenuItem value="2">Bakery</MenuItem>
                  <MenuItem value="3">Supplies</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { setOpenDialog(false); resetForm() }}>Cancel</Button>
            <Button type="submit" variant="contained">
              {selectedProduct ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  )
}

export default Products