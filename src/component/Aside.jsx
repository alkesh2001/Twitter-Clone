import {  useSelector , useDispatch } from 'react-redux'
import { logout } from '../Store/authSlice';
import { useNavigate , Link } from 'react-router-dom';
import { ProfileData } from '../Store/authSlice';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Aside() {
  
  const userData = useSelector(state => state.auth.userData)
  const profileData = useSelector(state=> state.auth.profileData)
  // console.log(profileData)
  console.log(userData)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Logout = ()=>{
     dispatch(logout())
     navigate('/Login');

  }
  
  // const [data , setData] = useState(null)

  
  useEffect(() => {
  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/social-media/profile', {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${userData.accessToken}`
        }
      });
      if (response.status === 200) {
        // setData(response.data)
        dispatch(ProfileData(response.data));
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

    getData();
  }, []);
  
  // console.log(data)
  return (
    <div className='bg-black  h-screen    w-[280px] pt-10' >
         <div className='bg-black  text-white '>
          
            <div className=' flex justify-between px-6 border-b-2 border-gray-400'>
              <div className=''>
                <div className=''>
                  <Link to='/Profile'>
                  {profileData &&  <img src={profileData.data.account.avatar.url} className='border-4 cursor-pointer border-white h-10 w-10 rounded-full ' alt=" "/> }
                   
                    <p className=' cursor-pointer pt-2 font-medium'>
                      { profileData && profileData.data.account.username}
                      </p> 
                    <p className='cursor-pointer text-sm font-medium text-gray-400'>@
                    { profileData && profileData.data.account.username}
                    </p> 
                  </Link>
                </div>
                  <div className='flex  gap-5 py-3'>
                     <div className='font-medium'>
                      <Link >
                        Following {profileData && profileData.data.followingCount}
                      </Link>
                      </div>
                     <div  className='font-medium'>
                      <Link to='/Follower'>
                         Followers {profileData && profileData.data.followersCount}
                      </Link>
                      </div>
                  </div>
              </div>
              <div className='text-white pt-2 '>
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
              </div>
            </div>

            <div className=' py-10  border-b-2 border-gray-400'>
              <div className='text-white font-medium text-2xl'>
                
                <div className='flex gap-7 py-2 px-6'>
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
                  <div>
                    <Link to={"/Profile"}>
                            Profile
                    </Link>
                  </div>
                </div>

                 <div className='flex gap-5 py-2 px-6'>
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30">
                      <path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z" fill='white'></path>
                   </svg>
                  <div>
                    Premium
                  </div>
                </div>

                <div className='flex gap-7 py-2 px-6'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-marked"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><polyline points="10 2 10 10 13 7 16 10 16 2"/></svg>
                  <div>
                    Bookmarks
                  </div>
                </div>

                <div className='flex gap-7 py-2 px-6'>
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-list"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/><path d="M14 4h7"/><path d="M14 9h7"/><path d="M14 15h7"/><path d="M14 20h7"/></svg>
                  <div>
                    Lists
                  </div>
                </div>

                <div className='flex gap-7 py-2 px-6'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mic"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
                  <div>
                    Spaces
                  </div>
                </div>

                <div className='flex gap-7 py-2 px-6'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-badge-indian-rupee"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="M8 8h8"/><path d="M8 12h8"/><path d="m13 17-5-1h1a4 4 0 0 0 0-8"/></svg>
                  <div>
                    Monetization
                  </div>
                </div>

              </div>
            </div>
            <div className='bg-black'>
               <div className=' text-xl font-medium px-9  py-4 ' >
                  <span className='cursor-pointer' onClick={Logout}>
                     LogOut 
                  </span>
               </div>
            </div>
         </div>
    </div>
  )
}

export default Aside
