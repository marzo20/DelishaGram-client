import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
// import axios from 'axios'
import feedIcon from "./svg/feed-svgrepo-com.svg"
import heartIcon from "./svg/heart-svgrepo-com.svg"
import magGlassIcon from "./svg/magnifying-glass-svgrepo-com.svg"
import profileIcon from "./svg/profile-svgrepo-com.svg"
import settingIcon from "./svg/setting-svgrepo-com.svg"
import plusIcon from "./svg/plus-svgrepo-com.svg"
import logoutIcon from "./svg/logout-svgrepo-com.svg"

export default function Navbar({ currentUser,
	handleLogout,
	// handleSearchSubmit,
	// searchDish,
	// setSearchDish
}) {
	const [searchDish, setSearchDish] = useState("")
	const navigate = useNavigate();

	const handleSearchSubmit = async (e) => {
		e.preventDefault()
		navigate("/searchresults", {
			state: {
				searchDish
			}
		})
	}

	const loggedIn = (
		<>
			<div
				className='flex'
			>

				{/* Search Bar */}
				<form 
				onSubmit={handleSearchSubmit}
				className="flex"
				>
					<label htmlFor="search"></label>
					<input
						id="search"
						type="text"
						placeholder="Search Dishes!"
						value={searchDish}
						onChange={e => { setSearchDish(e.target.value) }}
						className="border rounded-sm h-[2rem] w-[15rem] place-self-center text-xl text-center"
					/>
					<button 
					type="submit"
					className='place self center ml-[.2rem]'
					>
						<img
							src={magGlassIcon}
							alt='feed Icon'
							className='h-[1.2rem] flex item-center'
						/>
					</button>
				</form>

			</div>
			{/* divider */}
			<div
			className='flex'
			>
				{/* feed Nav Icon */}
				<div
					className='flex mx-[0.5rem]'
				>
					<img
						onClick={() => navigate('/feed')}
						src={feedIcon}
						alt='feed Icon'
						className='min-w-[30px] place-self-center'
					/>
				</div>

				{/* profile Nav Icon */}
				<div
					className='flex mx-[0.5rem]'
				>

					<img
						onClick={() => navigate(`/profile/${currentUser.userName}`)}
						src={profileIcon}
						alt='feed Icon'
						className='min-w-[40px] place-self-center'
					/>
				</div>

				{/* new post Nav Icon */}
				<div
					className='flex mx-[0.5rem]'
				>
					<img
						onClick={() => navigate('/newpost')}
						src={plusIcon}
						alt='feed Icon'
						className='h-[35px] min-w-[35px] place-self-center'
					/>
				</div>

				{/* Account/Edit Nav Icon */}
				<div
					className='flex mx-[0.5rem]'
				>
					<img
						onClick={() => navigate('/account')}
						src={settingIcon}
						alt='feed Icon'
						className='h-[35px] min-w-[35px] place-self-center'
					/>
				</div>

				{/* Log Out Nav Icon */}
				<div
					className='flex mx-[0.5rem]'
				>
					<img
						onClick={() => {
							handleLogout()
							navigate('/')
						}}
						src={logoutIcon}
						alt='feed Icon'
						className='h-[35px] min-w-[35px] place-self-center'
					/>
				</div>


			</div>
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
		<nav
			className='flex justify-center'
		>
			<div
			className='flex justify-between w-[100%] mt-[0.5rem] mx-[20rem]'>
			{/* user always sees this section */}
			<Link 
			to="/"
			className='place-self-center'
			>
				<p
				className="text-[1.5rem] font-['Roboto']  italic"
				>DelishaGram</p>
			</Link>

			{currentUser ? loggedIn : loggedOut}
			</div>
		</nav>
	)
}