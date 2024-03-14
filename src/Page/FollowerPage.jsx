import React, { useEffect, useState } from 'react'
import { FolloweCard } from '../component'
import axios from 'axios'
import { useSelector } from 'react-redux'

function FollowerPage() {
  
    const [followData , setFollowData] = useState(null)
    const userData = useSelector(state => state.auth.userData)
    // console.log()

    useEffect(()=>{
        const getData = async () =>{
            const response = await axios.get(`http://localhost:8080/api/v1/social-media/follow/list/followers/${userData.user.username}?page=1&limit=100` ,{
                headers: {
                    Authorization : `Bearer ${userData.accessToken}`,
                    // 'accept: application/json' 
                }
            });
            if(response.data){
                // console.log(response.data.data. followers)
                setFollowData(response.data.data. followers)
            }
        }
        getData();
    },[userData.accessToken])

    
    


  return (
    <div className='h-screen bg-black w-full '>
        <div className='text-white '>
            <div className='fixed top-0 left-0  bg-black flex justify-between items-center border-b border-gray-800 w-full px-5 py-5'>
                <div className='flex gap-8 items-center' >
                    <div className='pt-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                    </div>
                    <div className='text-2xl font-medium '>Follower</div>
                </div>
                <div className=''>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round-plus"><path d="M2 21a8 8 0 0 1 13.292-6"/><circle cx="10" cy="8" r="5"/><path d="M19 16v6"/><path d="M22 19h-6"/></svg>
                </div>
            </div>
            <div className='bg-black mt-16 pt-4'>
                {
                   followData && followData.map((followers)=> (
                        <FolloweCard  key={followers._id} followers={followers}/>                
                    ))
                }
            </div>
        </div>

    </div>
  )
}

export default FollowerPage
