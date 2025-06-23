
import './App.css'

function App() {
  //const [count, setCount] = useState(0)

  return (
    
     <>
     <div className='container'>
      <div className="sub-container">
      <form defaultChecked>
       <div className='form-fields-holder'>
         <label>First Name</label>
         <input type='text' placeholder='Enter Your First Name'/>
         </div>

          <div className='form-fields-holder'>
         <label>Last Name</label>
         <input type='text' placeholder='Enter Your Last Name'/>
         </div>

          <div className='form-fields-holder'>
         <label>Email</label>
         <input type='text' placeholder='Enter Your Email'/>
         </div>

          <div className='form-fields-holder'>
         <label>Password</label>
         <input type='password' placeholder='Enter Your Password'/>
         </div>
         
          <div className='form-fields-holder'>
         <label>Re Password</label>
         <input type='password' placeholder='Re Type Your Password'/>
         </div>
         
         <input type='submit' value='Sign Up'/>
      </form>
        <p className='not-have-text'>Don't you have an account <a href='#'>Sign Up</a></p>
     </div>
     </div>
    </>
   
  )
}

export default App
