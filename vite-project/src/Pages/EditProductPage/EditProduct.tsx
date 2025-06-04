import "../SignUp/Signup.css"

export default function EditProduct() {
  return (
    <>
    <head>
   <title>Sign Up</title>
 </head>
 <div className='holder'>
   <div className='form'>
   <div className='form-div'>
   <h1>Name</h1>
   <input type='text' placeholder='Update Name'/>
   </div>
   <div className='form-div'>
   <h1>Price</h1>
   <input type="number" min={1} placeholder='Update Price'/>
   </div>

   <div className='form-div'>
   <h1>Qtty/Ammt</h1>
   <input type="number" placeholder='Update total QUantity or Ammount'/>
   </div>
  
   <div className='button-div'>
   <button>Update</button>
   <button>Delete</button>
 </div>
</div>
</div>
 </>
  )
}
