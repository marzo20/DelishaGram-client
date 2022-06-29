import { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Navigate } from 'react-router-dom'

export default function Register({ currentUser, setCurrentUser }) {
	// state for the controlled form
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [userName, setUserName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [msg, setMsg] = useState('')

	// submit event handler
	const handleSubmit = async e => {
		e.preventDefault()
		try {
			// post fortm data to the backend
			const reqBody = {
				firstName,
				lastName,
				userName,
				email,
				password
			}
			const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/register`, reqBody)

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
		return <Navigate to="/profile" />
	}

	return (
		<div
		className='flex justify-center mt-[10rem]'>
			<div
			className='flex flex-col h-[20rem] w-[25rem] border border-sm col-start-2 col-end-2 row-start-2 row-end-2'>
				<h1>Register for an account:</h1>

				<p>{msg}</p>

				<form 
				className='flex flex-col'
				onSubmit={handleSubmit}>
					<div>
					<label htmlFor='firstName'>First Name:</label>
					<input
						type="text"
						id="firstName"
						placeholder='your first name...'
						onChange={e => setFirstName(e.target.value)}
						value={firstName}
						required
					/>
					</div>
					<div>
					<label htmlFor='lastName'>Last Name:</label>
					<input
						type="text"
						id="lastName"
						placeholder='your last name...'
						onChange={e => setLastName(e.target.value)}
						value={lastName}
						required
					/>
					</div>
					<div>
					<label htmlFor='userName'>User Name:</label>
					<input
						type="text"
						id="userName"
						placeholder='your user name...'
						onChange={e => setUserName(e.target.value)}
						value={userName}
						required
					/>
					</div>
					<div>
					<label htmlFor='email'>Email:</label>
					<input
						type="email"
						id="email"
						placeholder='your email...'
						onChange={e => setEmail(e.target.value)}
						value={email}
						required
					/>
					</div>
					<div>
					<label htmlFor='password'>Password:</label>
					<input
						type="password"
						id="password"
						placeholder='password...'
						onChange={e => setPassword(e.target.value)}
						value={password}
						required
					/>
					</div>

					<button type="submit">Register</button>
				</form>
			</div>
		</div>
	)
}