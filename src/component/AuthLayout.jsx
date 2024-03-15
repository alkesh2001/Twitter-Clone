import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

export default function Protected({children , authentication = true }) {
  
   const navigate = useNavigate();
   const [loader , setLoader] = useState(true)
   const authStatus = useSelector(state => state.auth.status)
   
//    console.log(authStatus)
   useEffect(()=>{
        if(authentication && authStatus !== authentication){
            navigate('/Login')
        }else if(!authentication && authStatus !== authentication){
           navigate('/Home')
        }
        setLoader(false)
   },[authentication , authStatus , navigate])

  return loader? <h1>loading...</h1> : <>{children}</>
}


