import PostForm from "./PostForm"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function NewPost({ imgUrl, setImgUrl }){
    let navigate = useNavigate()
    const handleSubmit = async (e, form, setForm) => {
        e.preventDefault()
        try {
          console.log("form:",form)
          const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/posts`, form)
          // console.log(response)
          // setPosts([...posts, response.data])
          setForm({
            restaurant: '',
            dish: '',
            rating: '',
            content: '',
            img: ''
        })
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
        navigate('/posts')
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