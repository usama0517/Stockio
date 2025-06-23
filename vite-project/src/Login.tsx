import "./Auth.css"
import "./login.css"

export default function Login() {
  return (
     <>
     <div className='container'>
      <div className="sub-container">
      <form className="padding10">

        <div className='form-fields-holder'>
         <label>User Name</label>
         <input type='text' placeholder='Enter Your Email'/>
         </div>

         <div className='form-fields-holder'>
         <label>Password</label>
         <input type='password' placeholder='Enter Your Password'/>
         </div>
         
         <input type='submit' value='Log In'/>
      </form>
        <p className='not-have-text'>Don't you have an account <a href='#'>Sign Up</a></p>
     </div>
     </div>
    </>
  )
}
