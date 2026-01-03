import  { createContext, useState, useContext, useEffect, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import type { User } from '../types'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>
  logout: () => void
  updateUser: (userData: User) => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider= ({ children }:AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      } catch (error) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // TODO: Replace with actual API call
      // const response = await api.post('/auth/login', { email, password })
      const a = password;
      console.log(`assasasa${a}sadbau2ebbadab`)
      // Mock response for now
      const mockUser: User = {
        id: '1',
        email,
        name: 'Admin User',
        role: 'ADMIN',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      const mockToken = 'mock-jwt-token'
      
      localStorage.setItem('token', mockToken)
      localStorage.setItem('user', JSON.stringify(mockUser))
      api.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`
      setUser(mockUser)
      navigate('/dashboard')
      
      return { success: true }
    } catch (error: any) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Invalid credentials' 
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    delete api.defaults.headers.common['Authorization']
    setUser(null)
    navigate('/login')
  }

  const updateUser = (userData: User) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}