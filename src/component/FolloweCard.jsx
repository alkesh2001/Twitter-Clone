import React from 'react'

function FolloweList({followers}) {
   
  // console.log(followers)

  return (
    <div className='p-4'>
         <div className='flex justify-between'> 
             <div className='flex items-center gap-5'>
                <div className='h-14 w-14 '>
                  <img src={followers.avatar.url} alt="" className='rounded-full' />
                </div>
                <div className=''>
                   <div className='text-md font-medium'  >{followers.username}</div>
                   <div className='text-sm font-medium text-gray-500'>@{followers.username}</div>
                </div>
             </div>
             <div className='flex items-center '>
                <button className='border border-gray-600 px-4 py-1 rounded-full text-sm font-medium'>
                  {followers.isFollowing ?   ' Following ' :  'Follow'}
                </button>
             </div>
         </div>
    </div>
  )
}

export default FolloweList
