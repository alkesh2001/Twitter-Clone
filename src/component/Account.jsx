import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Account() {
  
  const getUserData = useSelector(state => state.auth.getUserAccountData) 
  // console.log(getUserData)
  
  useEffect(()=>{
    if(!getUserData || !getUserData.data || !getUserData.data.account){
        return <div className='bg-black text-white'> emtiy</div>
      }
  },[getUserData  ])

  // if(!getUserData || !getUserData.data || !getUserData.data.account){
  //   return <div className='bg-black text-white'> emtiy</div>
  // }

  return ( 
    <Link to={'/UserProfile'}>
        <div className='bg-black border border-white rounded-lg'>
          <div className='flex items-center justify-between px-2 py-1'>   
          <div className='flex gap-3 items-center'>
            <div className='p-1'>
                <img src={getUserData.data.account.avatar.url} alt="" className='bg-blue-400 h-12 w-12 rounded-full ' />
            </div>
            <div className='text-start text-lg mx-4 font-medium text-white'>
            {getUserData.data.account.username}
            </div>
          </div>
            <div className=''>
              <button className='bg-blue-400 px-3 py-1 rounded-md font-medium text-md'>Follow</button>
            </div>
          </div>
        </div>
    </Link>
  )
}

export default Account
