import { Link } from 'react-router-dom'

export default function Navbar({ currentUser, handleLogout }) {
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