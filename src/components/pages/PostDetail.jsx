import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import PostForm from './PostForm'


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
            // className='border-slate-100 border rounded-lg grid grid-cols-1 max-w-2xl place-content-center shadow-md'
            className='flex flex-col border my-[1rem] mx-[33rem] min-w-[50rem] w-[50rem] shadow-md rounded-lg'
        >
            <h2
                className="text-start font-['Roboto'] pl-4 pt-1 font-black text-lg tracking-wide"
            >
                {post.poster.userName}
            </h2>
            <p
                className="text-start font-['Roboto'] pl-5 pb-2 text-sm font-thin"
            >
                {post.dish.restaurant.name}
            </p>
            {/* <div 
                className="m-2 justify-self-center w-md"
            > */}
            <img
                className="w-[50rem] min-w-[50rem]"
                src={form.img}
                alt={post.dish.dishName}
            />
            {/* </div> */}

            <div 
                className="grid grid-cols-2"
            >

                {/* <h2
                    className="text-lg font-['Roboto'] font-bold"
                >
                    {post.dish.dishName}
                </h2> */}
                <p
                    className="text-start font-['Roboto'] pl-4 pt-2 pb-2 text-md font-semibold "
                >
                    {post.dish.dishName}
                </p>
                <h2
                    className="text-md font-['Roboto'] font-semibold text-end pt-2 pb-2 pr-9"
                >
                    Rating: {post.rating}
                </h2>
            </div>
            <div
                className="justify-self-start px-3"
            >
                {/* <h2
                    className="text-lg font-['Roboto'] font-bold"
                >
                    {post.dish.dishName}
                </h2>
                <h2
                    className="text-lg font-['Roboto'] font-bold"
                >
                    {post.dish.restaurant.name}
                </h2> */}
                <p
                    className="text-base font-['Roboto'] text-start pb-[1rem] px-3"
                >
                    {post.content}
                </p>

            </div>
            <div
                className="grid pb-2 px-4 grid-cols-2"
            >
                {post.poster._id === currentUser.id ? <button
                    className="rounded-md w-20 bg-blue-600 text-white justify-start font-semibold font-['Roboto']"
                    onClick={() => setShowForm(!showForm)}
                >
                    Edit
                </button> : ''}
                {post.poster._id === currentUser.id ? <button
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