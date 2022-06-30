import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import Modal from 'react-modal';
import PostDetail from "./PostDetail";

export default function Profile({ currentUser, handleLogout }) {
	// state for the secret message (aka user privilaged data)
	const bgColor = "#50d71e"
	const [msg, setMsg] = useState('')
	const [userPosts, setUserPosts] = useState([])
	const [modalOpen, setModalOpen] = useState(false)
    const [viewPostId, setViewPostId] = useState("")
	// useEffect for getting the user data and checking auth
	useEffect(() => {
		const fetchData = async () => {
			try {
				const userResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/profile/${currentUser.id}`)
				console.log('this is user data', userResponse.data)
				setUserPosts(userResponse.data.posts)
				// get the token from local storage
				const token = localStorage.getItem('jwt')
				// make the auth headers
				const options = {
					headers: {
						'Authorization': token
					}
				}
				// hit the auth locked endpoint
				const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/auth-locked`, options)
				// example POST with auth headers (options are always last argument)
				// await axios.post(url, requestBody (form data), options)
				// set the secret user message in state
				setMsg(response.data.msg)
			} catch (err) {
				// if the error is a 401 -- that means that auth failed
				console.warn(err)
				if (err.response) {
					if (err.response.status === 401) {
						// panic!
						handleLogout()
					}
				}
			}
		}
		fetchData()
	}, [])
	const userPost = userPosts.map((post, i) => {
		return (
			<>
				{/* <Link to={`/posts/${post._id}`}> */}
				<div
						key={`post-${i}`}
						className={`w-64 h-64 bg-black-100 relative border m-3 p-6'`}
					>
						<div
						onClick={()=>{
							openModal()
                            setViewPostId(post._id)
						}}
                        className={`absolute inset-0 bg-cover bg-center z-0`}
                        style={{backgroundImage: `url(${post.image.cloud_id})`}} ></div>
						<div className="opacity-0 bg-black hover:opacity-80 duration-300 absolute inset-0 z-10 flex justify-center items-center text-3xl text-white text-center font-semibold">{post.dish.restaurant.name}</div>
						{/* <img 
						className={`w-64 h-64 absolute inset-0 bg-cover bg-center z-0`}
						onClick={()=>{
							openModal()
                            setViewPostId(post._id)
						}}
						src={post.image.cloud_id} 
						alt={post.dish.dishName}/> */}
					</div>
				{/* </Link> */}
			</>
		)
	}).reverse()

	//MODAL CODE
	Modal.setAppElement(document.getElementById("profileContainer"))
	const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const openModal = () => setModalOpen(true)
    const closeModal = () => setModalOpen(false)

	return (
		<>
		<div
		id='profileContainer'
		>
			<h1
				className='text-lg font-bold border m-3 p-6 text-center'
			>Welcome, {currentUser.userName}</h1>
			<h2
			className='text-center text-3xl font-bold'
			>My Posts</h2>
			
			{/* {userPost} */}
			<h2>
				<div
					className='grid grid-cols-3 mx-[15rem] justify-items-center'
				>
					{userPosts.length > 0 ? userPost : 'NO POST'}
				</div>
			</h2>


		</div>
		<Modal
                isOpen={modalOpen}
                style={customStyles}
                onRequestClose={closeModal}
            >
                <PostDetail
                    currentUser={currentUser}
                    id={viewPostId}
                />
            </Modal>
		
		</>
	)
}