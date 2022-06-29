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
            <div
            className=''
            >
                <Link to={`/posts/${post._id}`}>
                    <div 
                        key={`post_${i}`}
                        className='flex flex-col items-center border my-[1rem] mx-[33rem]'
                    >
                        <h2
                            className=""
                        >
                            {post.poster.userName ? post.poster.userName : ''}
                        </h2>
                        <img
                            className="w-[40rem] min-w-[40rem]"
                            src={post.image.cloud_id} 
                            alt={post.dish.dishName}
                        />
                        <h1
                          className=""  
                        >{post.dish.restaurant.name ? post.dish.restaurant.name : ''}</h1>
                        <h2
                            className=""
                        >{post.dish.dishName ? post.dish.dishName : ''}</h2>
                        
                    </div>
                </Link>
            </div>
        )
    })
    return (
        <div
            
        >   
            {posts.length > 0 ? post : msg}
        </div>
    )
}
