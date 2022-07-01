import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Comments({allComments}) {
    const navigate = useNavigate()
    console.log("ALLCOMMENTS:", allComments)
    const renderComments = allComments.map((comment)=>{
        return(
            <div
            className='flex'>
            <p
                style={{
                    cursor: 'pointer',
                    transition: 'color 200ms'
                }} 
                className='font font-bold pl-6'
                onClick={() => {
                    
                    navigate(`/profile/${comment.commenter.userName}`)
                }}
            >{comment.commenter.userName}</p>
            <p
                className='pl-2'
            >{comment.content}</p>
        </div>
        )
    })
  
    return (
    <>

    {renderComments}

    </>
  )
}
