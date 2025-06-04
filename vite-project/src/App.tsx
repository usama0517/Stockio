import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sales from './Pages/SalesPage/Sales'
import Catagory from './Pages/CatagoryPage/Catagory'
import EditCatagory from './Pages/EditCatagoryPage/EditCatagory'
import Login from './Pages/LogIn/Login'
import Signup from './Pages/SignUp/Signup'
import Product from './Pages/ProductPage/Product'
import EditProduct from './Pages/EditProductPage/EditProduct'
import { ProtectedRoute } from './Pages/ProtectedRoute'


function App() {
 

  return (
    <BrowserRouter>
    
    <Routes>
      
      <Route path='/sales' element={
        <ProtectedRoute>
        <Sales/>
        </ProtectedRoute>
        }/>
      
       <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
         <Route path='/product' element={
          <ProtectedRoute>
          <Product/>
          </ProtectedRoute>}/>
          <Route path='/catagory' element={
            <ProtectedRoute>
            <Catagory/>
            </ProtectedRoute>}/>
           <Route path='/catagory/edit' element={<ProtectedRoute>
            <EditCatagory/>
            </ProtectedRoute>}/>
            <Route path='/product/edit' element={
              <ProtectedRoute>
              <EditProduct/>
              </ProtectedRoute>
              }/>
    </Routes> 
    
    </BrowserRouter>
  )
}

export default App
