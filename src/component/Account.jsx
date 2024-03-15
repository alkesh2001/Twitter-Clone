import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Account() {
  
  const getUserData = useSelector(state => state.auth.getUserAccountData) 

  return ( 
    <Link to={'/UserProfile'}>
      { getUserData ? (
        <div className='bg-black border-b '>
        <div className='flex items-center justify-between px-2 py-1'>   
        <div className='flex gap-3 items-center'>
          <div className='p-1 h-14 w-14 '>
              <img src={getUserData && getUserData.data.account.avatar.url} alt="" className='h-full w-full rounded-full ' />
          </div>
          <div className='text-start text-lg mx-4 font-medium text-white'>
          {getUserData && getUserData.data.account.username}
          </div>
        </div>
          <div className=''>
            <button className='bg-blue-400 px-3 py-1 rounded-md font-medium text-md'>Follow</button>
          </div>
        </div>
      </div>
      ) : (
            <div className=' flex justify-center  text-lg font-medium text-gray-600 '> 
            User Not Found
          </div>
      )
}
      
    </Link>
  )
}

export default Account
