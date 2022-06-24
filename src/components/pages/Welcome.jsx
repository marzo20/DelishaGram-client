import Login from "./Login"
import {Link} from "react-router-dom"

export default function Welcome() {
	return (
		<>
		<div>
			<Login/>
		</div>
		<div>
			<p>Not Registered? <Link to="/register">Sign Up Here</Link></p>
		</div>
		</>
	)
}