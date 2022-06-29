import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'

export default function Posts() {
    const [posts, setPosts] = useState([{
            dish: {
                dishName: '',
                restaurant:{
                    name: ''
                }
            },
            poster:{},
            image:{}
        }]
    )
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/posts`)
            .then(response => {
                console.log(response)
                setPosts(response.data)
            })
            .catch(console.warn)
    },[])
    const msg = "No posts. Please Create new Post"

    const post = posts.map((post, i) => {
        return (
            <>
                <Link to={`/posts/${post._id}`}>
                    <div key={`post_${i}`}>
                        <h1>Restaurant: {post.dish.restaurant.name ? post.dish.restaurant.name : ''}</h1>
                        <h2>{post.dish.dishName ? post.dish.dishName : ''}</h2>
                        
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