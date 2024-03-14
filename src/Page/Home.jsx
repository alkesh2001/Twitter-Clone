import React, { useEffect, useState } from 'react'
import { BottomBar, Navbar, PostCard } from '../component/index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

function Home() {
  
  const profileData = useSelector(state=> state.auth.profileData)
  const userData = useSelector(state => state.auth.userData)
  //  const accessToken = userData ? userData.accessToken : null;
 
  // console.log(userData.accessToken)
  const accessToken = userData ? userData.accessToken : null;

  const [visible , setVisible] = useState(false)

  // // console.log(userData)
  
  const aside = ()=>{
    setVisible(!visible)
  }
  
  const asideHide = ()=>{
    setVisible(false)
  }

  const[data , setData] = useState([])
   
  const getAllPost = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/social-media/posts/get/my?page=1&limit=10", {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      if (response.status === 200) {
        // console.log(response.data.data.posts)
        setData(response.data.data.posts);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }
  useEffect(()=>{
    getAllPost();
  },[accessToken  ])

  const DeletePost = async (id) =>{ 
    try {
          const response = await axios.delete(`http://localhost:8080/api/v1/social-media/posts/${id}`,
          // {},
          {
            headers:{
              Accept: "application/json",
              'Authorization': `Bearer ${accessToken}`
            }
          });
          if(response === 200){
              // console.log(response)
              // setData(data.filter((post)=> post.id !== id))
          }

      
    } catch (error) {
      console.log('error when delete post ' , error)
    }
  }

  // console.log(data[0].id)

  return (
    <>
    
    <div className='h-screen bg-white'>
      <nav>
        <Navbar aside={aside} visible={visible} />
      </nav>
      <div className='bg-black h-13'  onClick={asideHide}>
        <div className='text-white flex  justify-evenly pt-3'>
          <div>
           <div className='font-medium cursor-pointer'>For you </div>
           <div className='h-1 w-15 rounded-sm mt-1 bg-blue-400'></div>
          </div>
           <div className='font-medium'>Following</div>
        </div>
      </div>
      <div className=' border-t-0 border-white-300 '  onClick={asideHide} >
         <div className='h-screen overflow-auto bg-black'>
          <div className='text-white mb-10'>
            {data && data.map(post => (
              <PostCard key={post._id} post={post} DeletePost={DeletePost}/>
            ))}
          </div>
          <div>
            <Link to='/CreatePost'>
              <div className='bg-blue-400 h-14 w-14 flex justify-center items-center rounded-full fixed bottom-14 right-5'>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              </div>
            </Link>
          </div>
         </div>
      </div>
      <div className='fixed bottom-0 left-0 '>
        <BottomBar/>
      </div>

    </div>
    </>
  )
}

export default Home  
 