import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'

export default function Posts() {
    const [posts, setPosts] = useState([{
            dish: {
                dishName: '',
                restaurant:{
                    name:""
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
                        className='flex flex-col border my-[1rem] mx-[33rem] shadow-md rounded-lg'
                    >
                        <h2
                            className="text-start font-['Roboto'] pl-4 pt-1 font-black text-lg tracking-wide"
                        >
                            {post.poster.userName ? post.poster.userName : ''}
                        </h2>
                        <p
                          className="text-start font-['Roboto'] pl-5 pb-2 text-sm font-thin"  
                        >
                            {post.dish.restaurant.name ? post.dish.restaurant.name : ''}
                        </p>
                        <img
                            className="w-[40rem] min-w-[40rem]"
                            src={post.image.cloud_id} 
                            alt={post.dish.dishName}
                        />
                        <p
                            className="text-start font-['Roboto'] pl-3 pt-2 pb-2 text-md font-semibold "
                        >
                            {post.dish.dishName ? post.dish.dishName : ''}
                        </p>
                        
                    </div>
                </Link>
            </div>
        )
    }).reverse()
    return (
        <div
        className="grid justify-center"    
        >   
            {posts.length > 0 ? post : msg}
        </div>
    )
}

