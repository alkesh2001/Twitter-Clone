import React, { useEffect } from 'react'

function CommentCard({comment ,deleteComment}) {
    
    const PostId = comment._id

    // console.log(comment)
    useEffect(()=>{
        comment;
    },[comment])

    const handledelete = () =>{
         deleteComment(PostId)
    }

  return (
    <div className='bg-black my-2'>
        <div className='flex gap-6'>
            <div className='h-16 w-16 flex justify-center items-center'>
                <img src={comment.author.account.avatar.url} className='h-12 w-12 rounded-full' alt="" />
            </div>
            <div className='flex items-center  justify-between w-full'> 
                <div>
                    <div>
                        <div className='text-md font-medium'>{comment.author.account.username}</div>
                    </div>
                    <div className='texxt-sm'>
                        {comment.content}
                    </div>
                </div>
                <div className='flex items-center'>
                    <div className='flex justify-end'>
                        <button onClick={handledelete}> 
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1f9eff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CommentCard
