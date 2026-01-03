export type User = {
  id: string
  email: string
  name: string
  role: 'ADMIN' | 'MANAGER' | 'EMPLOYEE' | 'DISABLED'
  createdAt: string
  updatedAt: string
}

export type Product = {
  id: string
  name: string
  sku: string
  description: string
  price: number
  cost: number
  quantity: number
  minStockLevel: number
  categoryId: string
  category?: Category
  createdAt: string
  updatedAt: string
}

export type Category = {
  id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
  productCount?: number
}

export type Sale = {
  id: string
  productId: string
  product?: Product
  quantity: number
  price: number
  total: number
  saleDate: string
  createdAt: string
  updatedAt: string
}

export type Discard = {
  id: string
  productId: string
  product?: Product
  quantity: number
  reason: string
  date: string
  createdAt: string
}

export type RevenueSummary = {
  daily: number
  weekly: number
  monthly: number
  yearly: number
}

export type DashboardStats = {
  totalProducts: number
  totalSales: number
  totalRevenue: number
  lowStockProducts: number
}

export type LoginCredentials = {
  email: string
  password: string
}

export type RegisterData = LoginCredentials & {
  name: string
  confirmPassword: string
}

export type ChartData = {
  date: string
  revenue: number
  sales: number
  profit: number
}

export type CategoryData = {
  name: string
  value: number
  color: string
}

export type TopProduct = {
  name: string
  sales: number
  revenue: number
}