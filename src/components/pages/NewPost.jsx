import PostForm from "./PostForm"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from "react"

export default function NewPost({ imgUrl, setImgUrl }){
    
  let navigate = useNavigate()

    
    const handleSubmit = async (e, form, setForm) => {
       
        try {
          e.preventDefault()
          console.log("form:",form)
          const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/posts`, form)
          console.log(response)
          // console.log(response)
          // setPosts([...posts, response.data])
          
          setForm({
            restaurant: '',
            dish: '',
            rating: '',
            content: '',
            img: ''
        })
        // setIsLoaded(true)

          navigate('/posts')
        
        // console.log(currentUser)
        } catch (err) {
          console.log(err)
          if (err.response) {
            if (err.response.status === 400) {
              // this error is a validation error from our backend
              console.log(err.response.data.msg)
            }
          }
        }
        
      }

      

    return(
        <>
            <h1>create newPost</h1>
            <PostForm initialForm={{
                email:"",
                restaurant: '',
                dish: '',
                rating: '',
                content: '',
                img: ''
            }}
                handleSubmit={handleSubmit}
                imgUrl={imgUrl}
                setImgUrl={setImgUrl}  
                rerouteUrl='/posts'
            />
        </>
    )
}