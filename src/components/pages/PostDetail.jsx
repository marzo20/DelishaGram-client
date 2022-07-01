import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import PostForm from './PostForm'
import {FaStar} from 'react-icons/fa'


export default function PostDetail({ currentUser, id }) {
    const navigate = useNavigate()
    // const { id } = useParams()
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
        <div
            id="whole-card-container"
            className='flex flex-col min-w-[30rem] w-[30rem] rounded-lg'
        >
            <h2
                id="userName-text"
                className="text-start font-['Roboto'] pl-4 pt-1 font-black text-lg tracking-wide"
            >
                {post.poster.userName}
            </h2>

            <p
                id="restaurantName-text"
                className="text-start font-['Roboto'] pl-5 pb-2 text-sm font-thin"
            >
                {post.dish.restaurant.name}
            </p>

           
            <div
                id="image-container"
                className=''
            >
                <img
                    id="image"
                    className="w-[30rem] min-w-[30rem]"
                    src={form.img}
                    alt={post.dish.dishName}
                />
            </div>

            <div
                id="dishName-dishRating-container"
                className="grid grid-cols-2"
            >
                <p
                    id="dishName-text"
                    className="text-start font-['Roboto'] pl-4 pt-2 pb-2 text-md font-semibold "
                >
                    {post.dish.dishName}
                </p>
                <h2
                    id="dishRating-text"
                    className="flex flex-row justify-end text-md font-['Roboto'] font-semibold text-end pt-2 pb-2 pr-9"
                >
                    {[...Array(5)].map((star,i) => {
                    return (
                      <>
                      <FaStar 
                      color={i < post.rating ? '#FFBA5A' : '#a9a9a9'}
                      size={30}/>
                      </>
                    )
                  })}
                </h2>
            </div>

            <div
                id="content-container"
                className="justify-self-start px-3"
            >
                <p
                    id="content-text"
                    className="text-base font-['Roboto'] text-start pb-[1rem] px-3"
                >
                    {post.content}
                </p>

            </div>

            <div
                id="buttons-container"
                className="grid pb-2 px-4 grid-cols-2"
            >
                {post.poster._id === currentUser.id ? <button
                    id="edit-button"
                    className="rounded-md w-20 bg-blue-600 text-white justify-start font-semibold font-['Roboto']"
                    onClick={() => setShowForm(!showForm)}
                >
                    Edit
                </button> : ''}
                {post.poster._id === currentUser.id ? <button
                    id="delete-button"
                    className="rounded-md w-20 text-white bg-red-600 justify-self-end font-semibold font-['Roboto']"
                    onClick={() => handleDelete()}
                >
                    Delete
                </button> : ''}
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