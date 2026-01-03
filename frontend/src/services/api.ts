import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authAPI = {
  login: (credentials: { email: string; password: string }) => 
    api.post('/auth/login', credentials),
  register: (userData: any) => api.post('/auth/register', userData),
}

export const productAPI = {
  getAll: () => api.get('/products'),
  getById: (id: string) => api.get(`/products/${id}`),
  create: (product: any) => api.post('/products', product),
  update: (id: string, product: any) => api.put(`/products/${id}`, product),
  delete: (id: string) => api.delete(`/products/${id}`),
}

export const categoryAPI = {
  getAll: () => api.get('/categories'),
  create: (category: any) => api.post('/categories', category),
  update: (id: string, category: any) => api.put(`/categories/${id}`, category),
  delete: (id: string) => api.delete(`/categories/${id}`),
}

export const salesAPI = {
  recordSale: (sale: any) => api.post('/sales', sale),
  getSales: (params?: any) => api.get('/sales', { params }),
  getAnalytics: (params?: any) => api.get('/sales/analytics', { params }),
  recordDiscard: (discard: any) => api.post('/sales/discard', discard),
}

export const userAPI = {
  getAll: () => api.get('/users'),
  updateAccess: (id: string, access: any) => api.put(`/users/${id}/access`, access),
}

export default api