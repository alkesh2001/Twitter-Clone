import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function UserProfile() {
  // const dispatch = useDispatch();
  const getUserData = useSelector((state) => state.auth.getUserAccountData);
  const userData = useSelector((state) => state.auth.userData)
  // const accessToken = userData ? userData.accessToken : null;
  // console.log(userData.accessToken)
  // const PostId = getUserData.data._id
  const PostId = getUserData.data._id
  // console.log(userData.user)
   
  
  const [isFollowing , setisFollowing ] = useState(null)

  useEffect(() => {
    if (getUserData.data) {
      setisFollowing(getUserData.data.isFollowing);
    }
  }, [getUserData.data]);


  const FollowBtn = async (PostId) =>{
    try {
      // const endpoint =  isFollowing ? `http://localhost:8080/api/v1/social-media/unfollow/${PostId}` : `http://localhost:8080/api/v1/social-media/follow/${PostId}`;
      console.log(userData)
        const response = await axios.post( `http://localhost:8080/api/v1/social-media/follow/${PostId}`,
          {  
              headers: {
                Accept: 'application/json, text/plain, */*',
                'Authorization' : `Bearer ${userData.accessToken}`
              } 
            } 
            );
          if(response.status === 200){
            // console.log(response.data)
            setisFollowing(!isFollowing)
          }else{
            console.error('not over follow btn')
          }
      
    } catch (error) {
      console.error('api not work properly ' , error)
    }
}
    // useEffect(()=>{  
        
    // },[getUserData,PostId]) 

// console.log(isFollowing)
console.log(getUserData.data)

  return (
    <div className="h-screen">
      <div className="bg-black">
        <div className="flex justify-between px-5 py-5">
          <div>
            <Link to={"/Search"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
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
              stroke="#fff"
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
      </div>
      <div className="">
        <div className="bg-black h-screen text-white">
          <div className="">
            <div className="">
              <div className="">
                <div className=" h-[150px] w-full">
                  <img
                    src={getUserData.data.coverImage.url}
                    className="h-full w-full"
                    alt=""
                  />
                </div>
              </div>
              <div className="-translate-y-8 border-b border-0 border-gray-400">
                <div className="flex justify-between px-5 w-full">
                  <div className="h-20 w-20 rounded-full border border-blue-500 flex justify-center items-center">
                    <img
                      src={getUserData.data.account.avatar.url}
                      className=" rounded-full"
                      alt=""
                    />
                  </div>
                  <div className="py-1 translate-y-16">
                    {/* <Link to={'/EditProfile'}> */}
                    <button onClick={()=> FollowBtn(PostId)} className=" text-lg  px-4 py-1  rounded-lg bg-blue-500 font-medium ">
                     {isFollowing ? 'unFollow' : 'Follow'}
                    </button>
                    {/* </Link> */}
                  </div>
                </div>
                <div className="px-5 py-1">
                  <div className="text-lg font-medium">
                    {getUserData.data.account.username}
                  </div>
                  <div className="text-sm font-medium text-gray-400">
                    @{getUserData.data.account.username}
                  </div>
                  <div className="text-md font-normal  py-1">
                    {getUserData.data.bio}
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
                    {getUserData.data.location}
                  </div>
                </div>
                <div className="px-5 py-3">
                  <div className="flex gap-5">
                    <div className="text-md font-medium">
                      {getUserData.data.followingCount}
                      Following
                    </div>
                    <div className="text-md font-medium">
                      {getUserData.data.followersCount}
                      Followers
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
