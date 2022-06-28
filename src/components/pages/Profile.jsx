import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Profile({ currentUser, handleLogout }) {
	// state for the secret message (aka user privilaged data)
	const bgColor = "#50d71e"
	const [msg, setMsg] = useState('')
	const [userPosts, setUserPosts] = useState([])
	// useEffect for getting the user data and checking auth
	useEffect(() => {
	const fetchData = async () => {
			try {
				const userResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/profile/${currentUser.id}`)
				console.log('this is user data',userResponse.data)
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
	},[])
	const userPost = userPosts.map((post, i) => {
		
		return(
			<>
				<div 
				key={`post-${i}`}
				className={`flex flex-col`}
				>
					<h2>Restaurant: {post.dish.restaurant.name}</h2>
					<h2>Dish : {post.dish.dishName}</h2>
					<h2>Rate : {post.rating}</h2>
				</div>
			</>
		)
	})
	return (
		<div>
			<h1
			className='text-lg font-bold border m-3 p-6'
			>Welcome, {currentUser.userName}</h1>
			<h2>User Posts:</h2>
			{msg}
			{/* {userPost} */}
			<h2>
				<div
				className='grid grid-cols-3 grid-rows-auto mx-[15rem]'
				>
				{userPosts.length>0 ? userPost : 'NO POST'}
				</div>
			</h2>
			
			
		</div>
	)
}