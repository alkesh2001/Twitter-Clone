import React from 'react'
import { BottomBar, Navbar,Account } from '../component/index'

function Search() {


  return (
    <div className='bg-black h-screen w-full'>
      <div className=''>
         <div>
            <Navbar/>
         </div>
      </div>
      <div className='px-2'>
        <div className=''>
            <Account/>
        </div>
      </div>
      <div className='fixed bottom-0 left-0 '>
         <BottomBar/>
      </div>
    </div>
  )
}

export default Search
