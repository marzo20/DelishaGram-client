import { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Navigate, Link } from 'react-router-dom'

export default function Login({ currentUser, setCurrentUser }) {
	// state for the controlled form
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [msg, setMsg] = useState('')

	// submit event handler
	const handleSubmit = async e => {
		e.preventDefault()
		try {
			// post fortm data to the backend
			const reqBody = {
				email,
				password
			}
			const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/login`, reqBody)

			// save the token in localstorage
			const { token } = response.data
			localStorage.setItem('jwt', token)

			// decode the token
			const decoded = jwt_decode(token)

			// set the user in App's state to be the decoded token
			setCurrentUser(decoded)

		} catch (err) {
			console.warn(err)
			if (err.response) {
				if (err.response.status === 400) {
					setMsg(err.response.data.msg)
				}
			}
		}
	}

	// conditionally render a navigate component
	if (currentUser) {
		return <Navigate to="/feed" />
	}

	return (
		<div className='flex border border-2 justify-center mx-auto mt-[10rem] w-[30rem] h-[30rem]'>
			<div
			className='place-self-center flex flex-col'
			>
			<h1>Login Here:</h1>	

			<form onSubmit={handleSubmit} className="flex flex-col content-center">
				<div className='grid grid-cols-2 py-2'>
					<label htmlFor='email'>Email:</label>
					<input
					className='border border-sm text-center'
						type="email"
						id="email"
						placeholder='your email...'
						onChange={e => setEmail(e.target.value)}
						value={email}
					/>
				</div>

				<div  className='grid grid-cols-2 py-2'>
					<label htmlFor='password'>Password:</label>
					<input
					className='border border-sm text-center'
						type="password"
						id="password"
						placeholder='password...'
						onChange={e => setPassword(e.target.value)}
						value={password}
					/>
				</div>

				<button 
				className='border border-sm w-40 place-self-center'
				type="submit">Login</button>
			</form>
			<p>{msg}</p>
			<div>
					<Link to="/register"> 
					<p
					className='underline underline-offset-4 pt-[1rem]'
					>Not Registered? Sign Up Here!</p>
					</Link>
			</div>
			</div>
		</div>
	)
}