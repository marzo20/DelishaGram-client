import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate
} from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './components/pages/Login'
import Profile from './components/pages/Profile'
import Register from './components/pages/Register'
import Welcome from './components/pages/Welcome'
import Navbar from './components/Navbar'
import NewPost from './components/pages/NewPost'
import Posts from './components/pages/Posts'
import PostDetail from './components/pages/PostDetail'
import SearchResults from './components/pages/SearchResults'
import Account from './components/pages/Account'
import './App.css'
import jwt_decode from 'jwt-decode'
import axios from 'axios'

function App() {
  // let navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)
  const [searchDish, setSearchDish] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [imgUrl, setImgUrl] = useState('')
  // the currently logged in user will be stored up here in state
  const [currentUser, setCurrentUser] = useState(null)
  // const navigate = useNavigate()
  // useEffect -- if the user navigates away form the page, we will log them back in
  useEffect(() => {
    // check to see if token is in storage
    const token = localStorage.getItem('jwt')
    if (token) {
      // if so, we will decode it and set the user in app state
      setCurrentUser(jwt_decode(token))
    } else {
      setCurrentUser(null)
    }
  }, []) // happen only once
  
  // const handleSearchSubmit = async (e) => {
	// 	e.preventDefault()
	// 	try {
	// 		const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/dishes/search/${searchDish}`)
	// 		console.log(response.data)
  //     setSearchResult(response.data)
      
	// 	} catch (err) {
  //     console.warn(err)
	// 	}
  //   // navigate('/searchresults')
  //   navigate('/searchresults', {replace: true})

	// }

  const handleSubmit = async (e, form, setForm) => {
    e.preventDefault()
    try {
      console.log("form:",form)
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/posts`, form)
      // console.log(response)
      // setPosts([...posts, response.data])
      setShowForm(false)
      setForm({
        restaurant: '',
        dish: '',
        rating: '',
        content: '',
        img: ''
    })
    // await navigate('/posts')
    // console.log(currentUser)
    } catch (err) {
      console.log(err)
      if (err.response) {
        if (err.response.status === 400) {
          // this error is a validation error from our backend
          console.log(err.response.data.msg)
        }
      }
    }
  }

  // event handler to log the user out when needed
  const handleLogout = () => {
    // check to see if a token exists in local storage
    if (localStorage.getItem('jwt')) {
      // if so, delete it 
      localStorage.removeItem('jwt')
      // set the user in the App state to be null
      setCurrentUser(null)
    }
  }

  return (
    <Router>
      <header>
        <Navbar
          currentUser={currentUser}
          handleLogout={handleLogout}
          // handleSearchSubmit={handleSearchSubmit}
          // searchDish={searchDish}
          // setSearchDish={setSearchDish}
        />
      </header>

      <div className="App">
        <Routes>
          <Route
            path="/"
            element={currentUser ? <Profile handleLogout={handleLogout} currentUser={currentUser} setCurrentUser={setCurrentUser} /> : <Navigate to="/login" />}
          />

          <Route
            path="/register"
            element={<Register currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          />

          <Route
            path="/login"
            element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          />

          {/* conditionally render auth locked routes */}
          <Route
            path="/profile"
            element={currentUser ? <Profile handleLogout={handleLogout} currentUser={currentUser} setCurrentUser={setCurrentUser} /> : <Navigate to="/login" />}
          />
          <Route
            path="/newpost"
            element={<NewPost
              imgUrl={imgUrl}
              setImgUrl={setImgUrl}
              handleSubmit={handleSubmit}
            />}
          />
          <Route
            path="/posts"
            element={<Posts />}
          />
          <Route
            path="/searchresults"
            element={<SearchResults 
              searchResult={searchResult}
              searchDish={searchDish}
             />}
          />
          <Route
            path="/posts/:id"
            element={<PostDetail 
            currentUser={currentUser}
            />}
          />
          <Route
            path="/account"
            element={<Account />}
          />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
