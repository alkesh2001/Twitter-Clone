import React, { useEffect, useState } from 'react'
import Input from './Input'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { GetUserAccount , ResetUserAccount } from '../Store/authSlice'

function SearchInput() {
   
  const userData = useSelector(state => state.auth.userData)
  const [searchValue , setSearchValue] = useState('')

  const dispatch = useDispatch();
  
  const getuserAccount = async () =>{

    if(searchValue == ''){
      dispatch(ResetUserAccount())
      console.log('clear the user data')
      return;
    }
       const response = await axios.get(`http://localhost:8080/api/v1/social-media/profile/u/${searchValue}` ,
       {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization : `Bearer ${userData.accessToken}`
        },
       });
       if(response.data){
        console.log(response.data)
        dispatch(GetUserAccount(response.data))
       }
  };  

  useEffect(()=>{
    if(searchValue){
      getuserAccount();
    }
  },[searchValue])
  
  const handleOnchange = (e)=>{
    setSearchValue(e.target.value)
  }


  return (
    <div className= 'ms-4 flex border border-gray-500 rounded-xl  items-center '>
       <Input onChange={handleOnchange} value={searchValue}/>
       <div className='mx-2'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
       </div>
    </div>
  )
}

export default SearchInput
 