import "../LogIn/login.css"

export default function Sales() {
 
  return (
    <>
      <head>
      <title>Sales</title>
    </head>
    <div className='holder'>
      <div className='form'>
      <div className='form-div'>
      <h1>Qtty/Ammt</h1>
      <input type='number' placeholder='Enter Sold Ammount'/>
      </div>
      <div className='form-div'>
      <h1>Discarded</h1>
      <input type='number' placeholder='Enter Discarded (Optional)'/>
      </div>
      <button>Save</button>
    
   </div>
</div>
    </>
  )
}
