import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

export default function Navbar({ currentUser, handleLogout }) {
	const [searchDish, setSearchDish] = useState('')
	const navigate = useNavigate()
	

	const handleSearchSubmit = async (e) => {
		e.preventDefault()
		try {
			const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/dishes/search/${searchDish}`)
			console.log(response.data)
		} catch (err) {
			console.warn(err)
		}
		navigate('/')
	}
	
	const loggedIn = (
		<>
			{/* if the user is logged in... */}
			<Link to='/posts'>Posts</Link>{' | '}
			<Link to='/profile'>Profile</Link>{' | '}
			<Link to='/newpost'>+</Link>{' | '}
			<Link to='/profile/edit'>Edit</Link>{' | '}
			<Link to="/login">
				<span onClick={handleLogout}>logout</span>
			</Link>
			<form onSubmit={handleSearchSubmit}>
				<label htmlFor="search" >Search for a Dish:</label>
                <input 
					id="search" 
					type="text" 
					placeholder="enter query here" 
					value={searchDish}
					onChange={e => { setSearchDish(e.target.value)}}
				/>
				<button type="submit">Search</button>
			</form>
		</>
	)

	const loggedOut = (
		<>
			{/* if the user is not logged in... */}
			<div>
				<Link to="/register">
					register
				</Link>
				<Link to="/login">{' | '}
					login
				</Link>
			</div>
		</>
	)

	return (
		<nav>
			{/* user always sees this section */}
			<Link to="/">
				<p>User App</p>
			</Link>

			{currentUser ? loggedIn : loggedOut}
		</nav>
	)
}