import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import PostForm from './PostForm'


export default function PostDetail({ currentUser }) {
    const navigate = useNavigate()
    const { id } = useParams()
    const [showForm, setShowForm] = useState(false)
    const [post, setPost] = useState({
        dish: {
            dishName: '',
            restaurant: {
                name: ''
            }
        },
        poster: {
            userName: '',
            _id: '',
        },
    })
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/posts/${id}`)
                console.log('consologing', response.data)

                //    const newPost = response.data
                setPost(response.data)
                console.log('what is in post', post)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])
    const handleSubmit = async (e, form, setForm) => {
        e.preventDefault()
        try {
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api-v1/posts/${id}`, form)
            console.log(response.data)
            setPost(response.data)
            setShowForm(false)
        } catch (err) {
            console.log('put method failed :(', err)
        }
    }
    const handleDelete = (e) => {
        axios.delete(`${process.env.REACT_APP_SERVER_URL}/api-v1/posts/${id}`)
            .then(response => {
                navigate('/posts')
            })
            .catch(console.warn)
    }
    const renderDetail = (
        <div>
            <h1>PostDetail</h1>
            <img src={post.image.cloud_id} alt={post.dish.dishName} />
            <h3>Posted by: {post.poster.userName}</h3>
            <h2>Dish: {post.dish.dishName}</h2>
            <h2>Restaurant: {post.dish.restaurant.name}</h2>
            <h2>Rate: {post.rating}</h2>
            <p>{post.content}</p>
            {post.poster._id === currentUser.id ? <button onClick={() => setShowForm(!showForm)}>Edit</button>
                : ''}
            <div>
                {post.poster._id === currentUser.id ? <button onClick={() => handleDelete()}>Delete</button>
                    : ''}

            </div>
        </div>
    )
    return (
        <>
            {showForm ?
                <PostForm
                    initialForm={{
                        restaurant: post.dish.restaurant.name,
                        dish: post.dish.dishName,
                        rating: post.rating,
                        content: post.content
                    }}
                    handleSubmit={handleSubmit}
                /> : renderDetail}

        </>
    )
}