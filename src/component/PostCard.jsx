import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import CommentSection from "./CommentSection";

  function PostCard({post , DeletePost}) {
     
    const PostId = post._id


    const [islike , setIsLike] = useState(post.isLiked) 
    const [updateData , setUpdateData] = useState('')
  
    const userData = useSelector(state => state.auth.userData)
    const accessToken = userData ? userData.accessToken : null;
    // console.log(accessToken)
    

    const handleLike = async (PostId) => {
        
      try {
        const response = await axios.post(`http://localhost:8080/api/v1/social-media/like/post/${PostId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if(response.data){
          setIsLike(oldLike => !oldLike)
          // console.log(response.data)
        }

      } catch (error) {
         console.error('error in this when likes not working', error)
      }

    }

    useEffect(()=>{

      const updatePostResponse = async () =>{
      try {
          const response = await axios.get(`http://localhost:8080/api/v1/social-media/posts/${PostId}`);
    
            if(response.data){
              // console.log(response.data)
              setUpdateData(response.data.data.likes);
              // console.log(response.data)
              // setIsLike(response.data.isLiked)
            } else{
              console.error('this error in updatePostresponse')
            }
        }
        catch (error) {
        }
      } 
      updatePostResponse();

    },[PostId,islike])

    const handledelete = async () =>{

      try {
        console.log('postId' , PostId)
         await DeletePost(PostId)
      } catch (error) {
        
      }
    }

    const [show , setShow] = useState(false)
     
    const showDelete = () =>{
       setShow(!show)
    }

    const [ Comment , setComment] = useState(false)
    const showComment = () =>{
      setComment(!Comment)
    }
    

    return (
      <div className="bg-black pb-3 border-b border-gray-900 text-white ">
        <div className="px-4 pt-3">
          <div className="flex gap-5">
            <div className=" w-16 h-16 rounded-full">
              <img src={post.author.account.avatar.url} className="rounded-full" alt="" />
            </div>
            <div className="  w-full">
              <div className="flex justify-between">
                <div>
                  <div className="text-md font-medium ">{post.author.account.username}</div>
                  <div className=" text-md font-normal">{post.content}</div>
                </div>
                <div className="relative">
                  <div className="absolute top-0 right-0">
                       <svg  xmlns="http://www.w3.org/2000/svg" onClick={showDelete} className="" width="24" height="24" viewBox="0 0 24 24" fill='none' stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-more-horizontal"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/> </svg>
                  </div>
                  <div className={`${!show ? 'hidden' : ''} mt-5`} > 
                       <button onClick={handledelete}  className= " bg-blue-500 text-sm font-medium  px-3 py-1 rounded-lg">Delete</button>
                  </div>
                </div>
              </div>
              <div>
                <div className=" w-full h-full py-3 md:h-[400px] lg:h-[500px] lg:w-[500px]">
                  <img className="rounded-md" src={post.image} key={post.image} alt="" />
                  {post.images.map((image,index)=>{ 
                    return(
                      <img key={index[0]}  className=" rounded-lg" src={image.url}  alt="" />
                    )
                  })} 
                   {/* /* to display all images */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex ps-6 justify-evenly mt-1">
           <div className="flex  ">
             <button className="flex items-center gap-2" onClick={()=>handleLike(PostId)} >
              {!islike ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill='none' stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"  fill="#FF0000" stroke="#FF0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                  )}
              {updateData}
             </button>
           </div>
           <div>
            <button className='' onClick={showComment}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
            </button>
           </div>
           <div>
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-share"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></svg>
            </button>
           </div>
        </div>
        <div className={`w-full border-t border-gray-200 mt-5 duration-75 ${!Comment ? 'hidden' : '' }`}>
           <CommentSection post={post}/>
        </div>
      </div>
    );
  }

  export default PostCard;
 