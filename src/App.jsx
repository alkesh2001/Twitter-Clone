import { useState } from "react"
import Home from "./Page/Home"
// import Login from "./Page/Login"
// import Singup from "./Page/Singup"
import { Outlet } from "react-router-dom"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { login, logout } from "./Store/authSlice";
function App() {
  
  // const [loading ,setLoading] = useState(true);

  // const dispatch = useDispatch();

  // useEffect(  ()=>{
  //   const fetchCurrentUser = async() =>{
  //           try {
  //               const response = await  fetch('http://localhost:8080/api/v1/users/current-user',{
  //                 method :'GET',
  //                 headers : {
  //                     // "Authorization" : `Bearer ${userData.data.accessToken}` ,
  //                     "accept" : 'application/json' 
  //                 }
  //             })
  //             if(response.ok){
  //               const userData = response.json();
  //               dispatch(login(userData))
  //             }else{
  //               throw new Error('this is fetch error')
  //             }
          

  //           } catch (error) {
  //             console.error('catch error' , error)
  //             dispatch(logout())
  //           } finally{
  //             setLoading(false)
  //           }
  //   };
  //   fetchCurrentUser();


      //  fetch('http://localhost:8080/api/v1/users/current-user',{
      //     method :'GET',
      //     headers : {
      //         // "Authorization" : `Bearer ${userData.data.accessToken}` ,
      //         "accept" : 'application/json' 
      //     },
      //     // body: JSON.stringify(data)
      // }).then((response)=>{
      //   if(response.ok){
      //     response.json()
      //   } else{
      //     throw new Error('error to fetch api data in json')
      //   }
      // }).then(userData => {
      //   dispatch(login({userData}))
      // }).catch( error =>{
      //   console.error('error in fetch uuserdata' ,error);
      //   dispatch(logout());
      // })
      // .finally(()=> setLoading(false))
  // },[dispatch])

  return(
    <>
      <div>
        {/* <Home/> */}
        {/* <Singup/> */}
        <Outlet/>
        {/* <Login/> */}
      </div>
    </>
  ) 
}

export default App
 