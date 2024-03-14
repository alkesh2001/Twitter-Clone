import React, { useEffect, useState } from 'react'
import Input from './Input'
import { Link , useNavigate } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { CoverImage, ProfileData } from '../Store/authSlice';
import axios from 'axios';

function EditProfile() {
   
  const navigate = useNavigate();

  const userData = useSelector(state => state.auth.userData)
  const profileData = useSelector(state => state.auth.profileData)
  console.log(profileData)


  const {register , handleSubmit} = useForm()
  
  const dispatch = useDispatch();

  console.log(userData)

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/social-media/profile', {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${userData.accessToken}`
        }
      });
      if (response.status === 200) {
        dispatch(ProfileData(response.data));
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };
  
  useEffect(() => {
    getData();
  }, [userData.accessToken]);
  
  
  const[coverImage , setCoverImage] = useState(null)  
  const[coverImageFile , setCoverImageFile] = useState(null)  

  const Cover = (e) =>{
     const file = e.target.files[0];
     const imageFile = URL.createObjectURL(file)
     setCoverImage(imageFile)
     setCoverImageFile(file)
  };


  const updateCover = async () => {
       try {
          
          const formData = new FormData();

          if(coverImageFile) {
            formData.append('coverImage' ,coverImageFile )
          }

          const response = await axios.post(
            'http://localhost:8080/api/v1/social-media/profile/cover-image',
            formData,
            {
              headers: {
                // 'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${userData.accessToken}`,
              },
            }
          );
          console.log(response)
          if (response.status === 200) {
            console.log('Cover image uploaded successfully:', response);
            // dispatch(CoverImage(response.data));
          }
       } catch (error) {
        console.error('in this errror to fetch usercover image ', error)
       }
  }



  const updateUsername = async (newUsername) => {
    try {
      const response = await axios.patch('http://localhost:8080/api/v1/social-media/profile', 
        { username: newUsername }, 
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userData.accessToken}`
          }
        }
      );
      if (response.status === 200) {
        // Update the profile data in the Redux store
        dispatch(ProfileData(response.data));
      }
    } catch (error) {
      console.error('Error updating username:', error);
    }
  };

  const updateBio = async (newBio) => {
    try {
      const response = await axios.patch('http://localhost:8080/api/v1/social-media/profile', 
        { bio: newBio }, 
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userData.accessToken}`
          }
        }
      );
      if (response.status === 200) {
        // Update the profile data in the Redux store
        dispatch(ProfileData(response.data));
      }
    } catch (error) {
      console.error('Error updating bio:', error);
    }
  };
  
   const updateLocation = async (location)=>{
      try {
           const response = await axios.patch("http://localhost:8080/api/v1/social-media/profile",
           {location :location},
           {
            headers : {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userData.accessToken}`
            }
           }
           );
           if(response.ok){
               dispatch(ProfileData(response.data))
           }
      } catch (error) {
           console.log('error updating location' , error)
      }
   };
  
   
  console.log(profileData)

  return (
    <div className='bg-black h-screen '>
        <div className='text-white'>
          <div className='bg-black flex justify-between py-4 px-5'>
            <div className='flex items-center gap-5'>
              <div className=''>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
              </div>
              <div className='text-lg font-medium '>
                Edit Profile
              </div>
            </div>
             <div className=''>
              <Link to={'/Home'}>
                <button type='submit'  className='text-md font-medium rounded-full px-3 py-1 bg-blue-400'>
                  Save
                </button>
              </Link>
             </div>
          </div> 
          <form onSubmit={handleSubmit(updateCover)} method='POST'>
              <div>
                <div className=' flex justify-center items-center  bg-green-500 w-full h-[150px]'>
                  <div className='h-full w-full'>
                     <img src={coverImage} alt="" className='h-full w-full  object-centerc' />
                  </div>
                 <input {...register("image")} type="file"  accept="image/png, image/jpg, image/jpeg, image/gif" id='cover' className='hidden w-full h-[150px]' onChange={Cover} />
                  <label  className="absolute " htmlFor="cover">
                    <svg xmlns="http://www.w3.org/2000/svg" id='cover' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-camera"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
                  </label>
                </div>
              </div>
              <div className='px-5 -translate-y-8'>
                  <div className='h-20 w-20 bg-blue-500 rounded-full flex justify-center items-center'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-camera"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
                  </div>
                  <div  className='my-4 border-b border-0 border-gray-800'>
                    <span className='text-sm font-medium text-gray-400'>Name</span>
                    <Input type="text" onChange={(e) => updateUsername(e.target.value)} defaultValue={profileData.data.account.username}/>
                  </div>
                  <div className='my-4 border-b border-0  border-gray-800'>
                    <span className='text-sm font-medium text-gray-400'>Bio</span>
                    <Input type="text" defaultValue={profileData.data.bio}   onChange={(e) => updateBio(e.target.value)}/>
                  </div>
                  <div className='my-4 border-b border-0  border-gray-800'>
                    <span className='text-sm font-medium text-gray-400'>Locatione</span>
                    <Input type="text" onChange={(e)=> updateLocation(e.target.value)}  defaultValue={profileData.data.location} />
                  </div>
                  <div className='my-4 border-b border-0  border-gray-800'>
                    <span className='text-sm font-medium text-gray-400'>Brith Date</span>
                    <Input type="text"  />
                  </div>
                
              </div>
          </form>
        </div>
    </div>
  )
}

export default EditProfile
  
 