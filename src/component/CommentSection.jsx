import React, { useEffect, useState } from 'react'
import Input from './Input'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import CommentCard from './CommentCard'

function CommentSection({post}) {
  
  const userData = useSelector(state=> state.auth.userData)
  const PostId = post._id
  // console.log(post)

  const {register , handleSubmit} = useForm();
  const [com , setCom] = useState(null)
  const [commentData, setCommentData] = useState({ text: '' }); // State to hold comment text

  const handleInputChange = (e) => {
    setCommentData({ ...commentData, [e.target.name]: e.target.value });
  };

  const addComment = async () =>{

    const response = await axios.post(`http://localhost:8080/api/v1/social-media/comments/post/${PostId}`,
    commentData,
    {
      headers: {
          accept: 'application/json' ,
          Authorization : `Bearer ${userData.accessToken}`
      }
    })
  };
  
  
  useEffect(()=>{
      const Commentshow = async () =>{
        try {
           const response = await axios.get(`http://localhost:8080/api/v1/social-media/comments/post/${PostId}?page=1&limit=100`,
           {
            headers:{
              accept: 'application/json'
            }
           });
           if(response.data){
            setCom(response.data.data.comments)
            // console.log(response.data)
           }

        } catch (error) {
          
        }
      }
      Commentshow();
    },[]);

    const deleteComment = async (id) =>{
         const response = await axios.delete(`http://localhost:8080/api/v1/social-media/comments/${id}`,{
          headers :{
            'accept': 'application/json',
            Authorization : `Bearer ${userData.accessToken}`
          }
         });
         if(response.status === 200) {
          console.log('post delete')
         }
    };

    // console.log(com)
  
  return (
    <div className='bg-black  w-full '>
      <div className=' text-md px-5'>
        {com && com.map((comment)=> (
          <CommentCard key={comment._id} comment={comment} deleteComment={deleteComment}/> 
        ))}
      </div>
          <form action="" onSubmit={handleSubmit(addComment)}>
            <div className='flex border-t w-full items-center'>
                  <div className=' w-full'>
                      <Input placeholder={'Comment'} {...register("content", {
                            required: true,
                          })} onChange={handleInputChange}/>
                  </div>
                  <div className='w-7 flex items-center justify-center me-4' >
                    <button className='' type='submit'>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2ea4ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send-horizontal"><path d="m3 3 3 9-3 9 19-9Z"/><path d="M6 12h16"/></svg>
                    </button>
                  </div>
            </div>
          </form>
    </div>
  )
}

export default CommentSection
