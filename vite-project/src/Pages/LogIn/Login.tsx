import "./login.css"

export default function Login() {
  return (
    <>
       
    <head>
      <title>Log-In</title>
    </head>
    <div className='holder'>
      <div className='form'>
      <div className='form-div'>
      <h1>Email</h1>
      <input type='email' placeholder='Enter Email'/>
      </div>
      <div className='form-div'>
      <h1>Password</h1>
      <input type='password' placeholder='Enter Password'/>
      </div>
      <button>Log In</button>
    
   </div>
</div>
  </>
  )
}
