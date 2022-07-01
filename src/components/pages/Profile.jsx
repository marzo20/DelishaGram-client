import { useState, useEffect, useLayoutEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import axios from 'axios'
import Modal from 'react-modal';
import PostDetail from "./PostDetail";
import jwt_decode from "jwt-decode"

export default function Profile({ currentUser, handleLogout }) {
	const { userName } = useParams()
	// state for the secret message (aka user privilaged data)
	const bgColor = "#50d71e"
	const [msg, setMsg] = useState('')
	const [currentUserId, setCurrentUserId] = useState("")
	const [userPosts, setUserPosts] = useState([])
	const [modalOpen, setModalOpen] = useState(false)
	const [viewPostId, setViewPostId] = useState("")
	const [followers, setFollowers] = useState([])
	const [following, setFollowing] = useState([])
	const [currentProfileUserId, setCurrentProfileUserId] = useState("")
	const [isFollowing, setIsFollowing] = useState(null)
	const [pageLoaded, setPageLoaded] = useState(false)

	// useEffect for getting the user data and checking auth
	useLayoutEffect(() => {
		const fetchData = async () => {
			try {			
				const token = localStorage.getItem('jwt')
				const decoded = jwt_decode(token)
				console.log("decoded:",decoded.id)
				setCurrentUserId(decoded.id)

				const userResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/profile/${userName}`)
				// console.log('this is user data', userResponse.data)
				setUserPosts(userResponse.data.posts)
				// get the token from local storage
				// console.log("currentUser:",currentUser)
				// make the auth headers
				// const options = {
				// 	headers: {
				// 		'Authorization': token
				// 	}
				// }
				// console.log("current user:",currentUser.id)
				setCurrentProfileUserId(userResponse.data.id)
				
				// console.log(isFollowing)
				setFollowers(userResponse.data.followers)
				setFollowing(userResponse.data.following)
				// console.log("currentUser:",currentUserId)
				// console.log(followers)
				const followStatus = followers.includes(currentUserId)
				console.log("followStatus",followStatus)
				setIsFollowing(followStatus)
				setPageLoaded(true)
				// console.log("isFollowing",isFollowing)
				
				// hit the auth locked endpoint
				// const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/auth-locked`, options)
				// example POST with auth headers (options are always last argument)
				// await axios.post(url, requestBody (form data), options)
				// set the secret user message in state
				// setMsg(response.data.msg)
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
	}, [userName,isFollowing])

	const userPost = userPosts.map((post, i) => {
		return (
			<>
				{/* <Link to={`/posts/${post._id}`}> */}
				<div
					key={`post-${i}`}
					onClick={() => {
						openModal()
						setViewPostId(post._id)
					}}
					className={`w-64 h-64 bg-black-100 relative border m-3 p-6'`}
				>
					<div
						// onClick={()=>{
						// 	openModal()
						//     setViewPostId(post._id)
						// }}
						className={`absolute inset-0 bg-cover bg-center z-0`}
						style={{ backgroundImage: `url(${post.image.cloud_id})` }} ></div>
					<div
						// onClick={()=>{
						// 	openModal()
						//     setViewPostId(post._id)
						// }}
						className="opacity-0 bg-black hover:opacity-80 duration-300 absolute inset-0 z-1 flex justify-center items-center text-3xl text-white text-center font-semibold">{post.dish.restaurant.name}</div>
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

	const handleFollow = async () => {
		try {
			
			console.log("follow")
			const reqBody ={
				currentUserId: currentUserId,
				userToFollowId: currentProfileUserId,
			}
			// console.log(reqBody)
			const followPromise = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/follow`,reqBody)
			setIsFollowing(true)
		} catch (error) {
			console.warn(error)
		}
	}

	const handleUnfollow = async () => {
		try {
			console.log("unfollow")
			const reqBody ={
				currentUserId: currentUserId,
				userToUnfollowId: currentProfileUserId.toString()
			}
			console.log(reqBody)
			const unfollowPromise = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/unfollow`,reqBody)
			console.log(unfollowPromise)
			setIsFollowing(false)
		} catch (error) {
			console.warn(error)
		}
	}

	return (
		
		<>
		{pageLoaded ?
			<div
				id='profileContainer'
			>
				<div
					className='border-b flex justify-center'>
					<h1
						className='text-lg font-bold m-3 p-6 text-center'
					>{userName}</h1>
					{/* show number of posts */}
					<div
						className='flex flex-col justify-center items-center place-self-center px-3'
					>
						<p>{userPosts.length}</p>
						<p>Posts</p>
					</div>


					{/* show number of followers */}
					<div
						className='flex flex-col justify-center items-center place-self-center px-3'>
						<p>{followers.length}</p>
						<p>followers</p>
					</div>

					{/* show number of people following */}
					<div
						className='flex flex-col justify-center items-center place-self-center px-3'>
						<p>{following.length}</p>
						<p>following</p>
					</div>

					{currentUserId === currentProfileUserId ?
						""
						:
						<button
						onClick={isFollowing ? handleUnfollow : handleFollow}
						>{isFollowing ? "Unfollow":"Follow"}</button>
					}
				</div>

				<h2
					className='text-center text-3xl font-bold'
				>Posts</h2>

				{/* {userPost} */}
				<h2>
					<div
						className='grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mx-[15rem] justify-items-center'
					>
						{userPosts.length > 0 ? userPost : 'NO POST'}
					</div>
				</h2>


			</div>
			:""}
			
			
			<Modal
				isOpen={modalOpen}
				style={customStyles}
				onRequestClose={closeModal}
			>
				<PostDetail
					currentUser={currentUser}
					id={viewPostId}
					closeModal={closeModal}
				/>
			</Modal>
		</>
		
		
	)
}