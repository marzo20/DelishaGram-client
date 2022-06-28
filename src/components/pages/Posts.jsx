import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'

export default function Posts() {
    const [posts, setPosts] = useState([{
            dish: {
                restaurant:{}
            },
            poster:{}
        }]
    )
    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await  axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/posts`)
                setPosts(response.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchData()
    },[])
    const msg = "No posts. Please Create new Post"

    const post = posts.map((post, i) => {
        return (
            <>
                <Link to={`/posts/${post._id}`}>
                    <div key={`post_${i}`}>
                        <h1>Restaurant: {post.dish.restaurant.name}</h1>
                        <h2>Dish: {post.dish.dishName ? post.dish.dishName : ''}</h2>
                        <h3>Rate: {post.rating ? post.rating : ''}</h3>
                    </div>
                </Link>
            </>
        )
    })
    return (
        <>
            <h1>Render all posts</h1>
            {posts.length > 0 ? post : msg}
            {/* {post} */}
        </>
    )
}