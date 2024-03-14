import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Home from '../Page/Home'

function BottomBar() {
  
    // const [active , setActive] = useState(false)

    // const handleClick = ()=>{
    //     setActive(!active)
    // }

  return (
    <div className='bg-black  w-screen'>
       <div className='py-1'>
           <div className='flex justify-evenly'>
            <div className='p-2'  > 
            <Link to={'/Home'} >
                <svg xmlns="http://www.w3.org/2000/svg" active width="24" height="24" viewBox="0 0 24 24" fill='none' stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-home"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </Link>
            </div>
            <div className='p-2'>
              <Link to={'/Search'}>
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/> </svg>
              </Link>
            </div>
           </div>
       </div>
    </div>
  )
}

export default BottomBar
