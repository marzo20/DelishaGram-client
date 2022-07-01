import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import PostForm from './PostForm'
import { FaStar } from 'react-icons/fa'


export default function PostDetail({ currentUser, id, closeModal }) {
    const navigate = useNavigate()
    console.log("id", id)
    // const { id } = useParams()
    const [showForm, setShowForm] = useState(false)
    const [commentContent, setCommentContent] = useState("")
    const [commentSubmitted, setCommentSubmitted] = useState(false)
    const [commentArr, setCommentArr] = useState([{
        commenter:{}
    }])
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
                // console.log('consologing', response.data)

                //    const newPost = response.data
                setPost(response.data)
                setForm({
                    restaurant: response.data.dish.restaurant.name,
                    dish: response.data.dish.dishName,
                    rating: response.data.rating,
                    content: response.data.content,
                    img: response.data.image.cloud_id
                })
                // get comments
                const getComments = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/comments/${response.data._id}`)
                setCommentArr(getComments.data.comments)
                setCommentSubmitted(false)
                setCommentContent("")

            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [id,commentSubmitted])

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

    const handleCommentSubmit = async (e) => {
        e.preventDefault()
        // console.log("comment!")
        try {
            if (commentContent === "") {
                console.log("nothing to comment")
                return
            }
            const reqBody = {
                content: commentContent,
                postId: post._id,
                userId: currentUser.id
            }
            const commentPromise = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/comments`, reqBody)
            console.log(commentPromise)
            setCommentSubmitted(true)
        } catch (error) {
            console.warn(error)
        }
    }

    const rendComments = commentArr.map((comment) => {
        return (
            <>
                <div
                    className='flex'>
                    <p
                        className='font font-bold pl-6'
                        onClick={() => {
                            
                            navigate(`/profile/${comment.commenter.userName}`)
                            closeModal()
                        }}
                    >{comment.commenter.userName}</p>
                    <p
                        className='pl-2'
                    >{comment.content}</p>
                </div>
            </>
        )
    })

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
                    className="text-start font-['Roboto'] pl-4 pt-2 pb-2 mt-1 text-md font-semibold "
                >
                    {post.dish.dishName}
                </p>
                <h2
                    id="dishRating-text"
                    className="flex flex-row justify-end text-md font-['Roboto'] font-semibold text-end pt-2 pb-2 pr-9"
                >
                    {[...Array(5)].map((star, i) => {
                        return (
                            <>
                                <FaStar
                                    color={i < post.rating ? '#FFBA5A' : '#a9a9a9'}
                                    size={30} />
                            </>
                        )
                    })}
                </h2>
            </div>

            <div
                id="content-container"
                className="justify-self-start px-3"
            >
                <h1
                    className='font-bold inline'
                >
                    {post.poster.userName}
                </h1>
                <p
                    id="content-text"
                    className="text-base font-['Roboto'] text-start pb-[1rem] px-3 inline"
                >
                    {post.content}
                </p>

            </div>
            <div>
                {commentArr.length > 0 ? rendComments : ""}
            </div>
            <div>
                <form
                    onSubmit={handleCommentSubmit}
                    className='flex'>
                    <input
                        className='border w-4/5 ml-[1rem] mb-[2rem] rounded-md'
                        value={commentContent}
                        onChange={e => { setCommentContent(e.target.value) }}
                    />
                    <button
                        className='border mb-[2rem] ml-1 bg-black text-white px-2 rounded-md'
                        type='submit'>Post</button>
                </form>
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
                    className="rounded-md w-20 mr-1 text-white bg-red-600 justify-self-end font-semibold font-['Roboto']"
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