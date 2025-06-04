import "./Signup.css"

export default function Signup() {
  return (
  <>
    <head>
    <title>Sign Up</title>
  </head>
  <div className='holder'>
    <div className='form'>
    <div className='form-div'>
    <h1>First-Name</h1>
    <input type='text' placeholder='Enter First Name'/>
    </div>
    <div className='form-div'>
    <h1>Last-Name</h1>
    <input type='text' placeholder='Enter Last Name'/>
    </div>

    <div className='form-div'>
    <h1>Email</h1>
    <input type="email" placeholder='Enter Email'/>
    </div>
    <div className='form-div'>
    <h1>Password</h1>
    <input type='password' placeholder='Enter password'/>
    </div>
    <div className='form-div'>
    <h1>Retype pas.</h1>
    <input type='password' placeholder='RE enter Password'/>
    </div>
    <button>Sign Up</button>
  
 </div>
</div>
</>
  )
}
