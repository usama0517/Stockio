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
  LinearProgress,
} from '@mui/material'
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Category as CategoryIcon,
} from '@mui/icons-material'
import { format } from 'date-fns'
import { useSnackbar } from '../contexts/SnackbarContext'
import type { Category } from '../types'

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const { showSnackbar } = useSnackbar()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    setLoading(true)
    try {
      // Mock data - Replace with API call
      const mockCategories: Category[] = [
        {
          id: '1',
          name: 'Beverages',
          description: 'Hot and cold drinks',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          productCount: 25,
        },
        {
          id: '2',
          name: 'Bakery',
          description: 'Fresh baked goods',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          productCount: 15,
        },
        {
          id: '3',
          name: 'Supplies',
          description: 'Office and kitchen supplies',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          productCount: 10,
        },
      ]
      setCategories(mockCategories)
    } catch (error) {
      showSnackbar('Error fetching categories', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (selectedCategory) {
        // Update category
        setCategories(categories.map(cat => 
          cat.id === selectedCategory.id ? { ...cat, ...formData } : cat
        ))
        showSnackbar('Category updated successfully', 'success')
      } else {
        // Create category
        const newCategory: Category = {
          id: Date.now().toString(),
          ...formData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          productCount: 0,
        }
        setCategories([...categories, newCategory])
        showSnackbar('Category created successfully', 'success')
      }
      setOpenDialog(false)
      resetForm()
    } catch (error) {
      showSnackbar('Error saving category', 'error')
    }
  }

  const handleDelete = async (id: string) => {
    const category = categories.find(cat => cat.id === id)
    if (!category) return

    if (category.productCount && category.productCount > 0) {
      showSnackbar('Cannot delete category with existing products', 'error')
      return
    }

    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        setCategories(categories.filter(cat => cat.id !== id))
        showSnackbar('Category deleted successfully', 'success')
      } catch (error) {
        showSnackbar('Error deleting category', 'error')
      }
    }
  }

  const handleEdit = (category: Category) => {
    setSelectedCategory(category)
    setFormData({
      name: category.name,
      description: category.description,
    })
    setOpenDialog(true)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
    })
    setSelectedCategory(null)
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
          Categories
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{ textTransform: 'none' }}
        >
          Add Category
        </Button>
      </Box>

      {loading ? (
        <LinearProgress />
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Products</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((category) => (
                    <TableRow key={category.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <CategoryIcon sx={{ mr: 2, color: 'primary.main' }} />
                          <Box>
                            <Typography variant="subtitle1" fontWeight={500}>
                              {category.name}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {category.description}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={category.productCount || 0}
                          color="primary"
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {format(new Date(category.createdAt), 'MMM dd, yyyy')}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton size="small" onClick={() => handleEdit(category)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton size="small" onClick={() => handleDelete(category.id)}>
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
              count={categories.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </>
      )}

      <Dialog open={openDialog} onClose={() => { setOpenDialog(false); resetForm() }} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 600 }}>
          {selectedCategory ? 'Edit Category' : 'Add New Category'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Category Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { setOpenDialog(false); resetForm() }}>Cancel</Button>
            <Button type="submit" variant="contained">
              {selectedCategory ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  )
}

export default Categories