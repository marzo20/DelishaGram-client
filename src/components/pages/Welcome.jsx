import Login from "./Login"
import {Link} from "react-router-dom"
import Profile from "./Profile"

export default function Welcome( {currentUser}) {
	return (
		<>
		<div>
			<Login />
		</div>
		<div>
			<p>Not Registered? <Link to="/register">Sign Up Here</Link></p>
		</div>
		</>
	)
}