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
        image: {
            cloud_id: ''
        }
    })
    const [form, setForm] = useState({
        restaurant: '',
        dish: '',
        rating: '',
        content: ''
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/posts/${id}`)
                console.log('consologing', response.data)

                //    const newPost = response.data
                setPost(response.data)
                setForm({
                    restaurant: response.data.dish.restaurant.name,
                    dish: response.data.dish.dishName,
                    rating: response.data.rating,
                    content: response.data.content,
                    img: response.data.image.cloud_id
                })
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
    const handleDelete = () => {
        axios.delete(`${process.env.REACT_APP_SERVER_URL}/api-v1/posts/${id}`)
            .then(response => {
                navigate('/profile')
            })
            .catch(console.warn)
    }
    const renderDetail = (
        <div className=
            'border-slate-100 border-2 grid grid-cols-1 max-w-2xl place-content-center'>
                {post.poster._id === currentUser.id ? <button
                    className="border-slate-300 border-2 w-8 justify-self-end"
                    onClick={() => handleDelete()}>X</button>
                    : ''}     
            <div className="m-2 justify-self-center w-md">
                <img src={form.img} alt={post.dish.dishName}
                    className="w-[40rem] min-w-[40rem]" />
            </div>
            <div className="grid grid-cols-1 justify-self-end">
                {post.poster._id === currentUser.id ? <button
                    className="border-slate-300 border-2 w-20"
                    onClick={() => setShowForm(!showForm)}>Edit</button>
                    : ''}
            </div>
            <div className=" justify-center">
                <h3 className="text-lg font-sans font-bold">{post.poster.userName}</h3>
                <h2 className="text-lg font-sans font-bold">#Dish : {post.dish.dishName}</h2>
                <h2 className="text-lg font-sans font-bold">#Restaurant: {post.dish.restaurant.name}</h2>
                <h2 className="text-lg font-sans font-bold">#Rate: {post.rating}</h2>
                <p className="text-base font-sans text-center break-all">{post.content}</p>
                
            </div>

            
        </div>
    )
    return (
        <>
            {showForm ?
                <PostForm
                    form={form}
                    setForm={setForm}
                    handleSubmit={handleSubmit}
                /> : renderDetail}

        </>
    )
}