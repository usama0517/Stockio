import "../LogIn/login.css"

export default function EditCatagory() {
  return (
    <>
     <head>
      <title>Edit Catagory</title>
    </head>
    <div className='holder'>
      <div className='form'>
      <div className='form-div'>
      <h1>Name</h1>
      <input type='text' placeholder='Enter a new Name'/>
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
