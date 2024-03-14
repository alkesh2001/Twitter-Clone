// import React, { useState , useEffect } from 'react'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { GetMyPostCard } from "./index";

function Profile() {
  const profileData = useSelector((state) => state.auth.profileData);
  const userData = useSelector(state => state.auth.userData)

  // const coverImageData = useSelector((state) => state.auth.coverImageData);
  // console.log(coverImageData);
  // console.log(profileData)
  
  const [getData , setGetData] = useState([])
  
  const getMypost = async () =>{
       
    try {
         const response = await axios.get('http://localhost:8080/api/v1/social-media/posts/get/my?page=1&limit=10',
         {
          headers : {
            'Accept': 'application/json',
            'Authorization': `Bearer ${userData.accessToken}`
          }
         });
         if(response.data){
          console.log(response.data.data)
          setGetData(response.data.data.posts)
         }
    } catch (error) {

    }
  }

  useEffect(()=>{
    getMypost();
  },[userData.accessToken])


  return (
    <div className="bg-black h-screen text-white">
      <div className="">
        <div className="flex justify-between px-5 py-5">
          <div>
            <Link to={"/Home"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-arrow-left"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
            </Link>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-more-vertical"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </div>
        </div>

        <div className=" ">
          <div className="">
            <div className=" h-[150px] w-full">
              <img
                src={profileData.data.coverImage.url}
                className="h-full w-full"
                alt=""
              />
            </div>
          </div>
          <div className="-translate-y-8   border-b border-0 border-gray-900">
            <div className="flex justify-between px-5 w-full">
              <div className="h-20 w-20 rounded-full border border-blue-500 flex justify-center items-center">
                <img
                  src={profileData.data.account.avatar.url}
                  className=" rounded-full"
                  alt=""
                />
              </div>
              <div className="py-1 translate-y-8">
                <Link to={"/EditProfile"}>
                  <button className="border-2 border-gray-400  px-4 py-1  rounded-full ">
                    Edit Profile
                  </button>
                </Link>
              </div>
            </div>
            <div className="px-5 py-1 ">
              <div className="text-lg font-medium">
                {profileData.data.account.username}
              </div>
              <div className="text-sm font-medium text-gray-400">
                @{profileData.data.account.username}
              </div>
              <div className="text-md font-normal  py-1">
                {profileData.data.bio}
              </div>
              <div className="text-md flex gap-2 items-center font-normal  py-1">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#636363"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-map-pin"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                {profileData.data.location}
              </div>
            </div>
            <div className="px-5 py-3">
              <div className="flex gap-5">
                <div className="text-md font-medium">
                  {profileData.data.followingCount} Following
                </div>
                <div className="text-md font-medium">
                  {profileData.data.followersCount} Followers
                </div>
              </div>
            </div>
            <div className="text-lg font-medium mx-4 w-12 text-center border-b-2 border-blue-500 ">
              post
            </div>
          </div>
          
        </div>
      </div>
      <div className="">
        <div className="">
            {getData && getData.map((post)=> 
            
            
              ( <GetMyPostCard key={post._id} post={post}/>)
         )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
