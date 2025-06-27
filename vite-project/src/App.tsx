
import './App.css'
import { BrowserRouter,Routes, Route } from 'react-router'
import Login from './Auth Pages/Login/Login'
import SignUp from './Auth Pages/SignUp/SignUp'
import Catagory from './Catagory'
function App() {
  //const [count, setCount] = useState(0)

  return (
    
     <>
    <BrowserRouter>
    <Routes>
     <Route path='/login' element={<Login/>}/>
     <Route path='/signup' element={<SignUp/>}/>
     <Route path='/catagory' element={<Catagory/>}/>
    </Routes>
    </BrowserRouter>
    </>
   
  )
}

export default App
