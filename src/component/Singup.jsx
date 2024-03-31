import React, { useState } from 'react'
import { useForm} from 'react-hook-form'
import { Link ,useNavigate } from 'react-router-dom'
import {Input} from './index.js'
import { useDispatch } from 'react-redux'
import { login } from '../Store/authSlice'
import Logo from './logo.jsx'
import axios from 'axios'

function Singup() {
  
    const {register , handleSubmit}= useForm();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const submit = async (data) => {
        try {
          const response = await axios.post("http://localhost:8080/api/v1/users/register", data, {
            headers: {
              "Content-Type": 'application/json'
            }
          });
          if (response.status === 200) {
          
              const currentUser = await axios.get('http://localhost:8080/api/v1/users/current-user', {
              headers: {
                "accept": 'application/json'
              }
            });
            if(currentUser.status === 200){
               const currentData = currentUser.data
               
               dispatch(login(currentData));
            } else{
              console.error('failed to fatch current userData')
            }
          } 
          navigate('/Home');
        } catch (error) {
          console.error('Error occurred while submitting data:', error);
        }
      };

  return (

    <div className=" flex items-center justify-center h-screen bg-black">
            <div className={`mx-auto w-full lg:max-w-lg  max-w-[320px] rounded-xl p-10 border border-gray-800`}>
                <div className="my-4 flex justify-center">
                    <Logo/>
                </div>
                <h2 className="text-center text-white text-2xl font-bold leading-tight">Sign in to Twitter</h2>
                <p className="text-white mt-2 text-center text-base ">
                    Already have an account?&nbsp;
                    <Link
                        to="/Login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        LogIn
                    </Link>
                </p>
                {/* {error && <p className="text-red-600 mt-8 text-center">{error}</p>} */}

                <form onSubmit={handleSubmit(submit)} method='POST' className='mt-6'>
                    <div className='space-y-5 text-white'>
                        <Input 
                            placeholder='Enter your full name'
                            {...register('username' , {
                                required : true
                            })}

                        />
                        <Input
                              type="email"
                              placeholder='Enter your Email'
                              {...register('email' ,{
                                required : true ,
                                validate: {
                                    matchPartern:(value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/ .test(value) || 
                                    'Email address must be valid address'
                                }
                              })}
                         />
                        <Input
                              type='password'
                              placeholder='Enter your password'
                              {...register('password',{
                                required: true
                              })}
                        />
                        <div className='w-full flex justify-center'>
                            <button className=' mt-3 bg-white text-black font-medium text-md  lg:text-lg px-4 py-2 rounded-lg' type='submit'> Create Account</button>
                        </div>
                    </div>
                </form>
            </div>
    </div>
  )
}

export default Singup
   