import PostForm from "./PostForm"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect, useLayoutEffect, useState } from "react"
import FileUploadForm from '../FileUploadForm'
import Modal from 'react-modal';

export default function NewPost({ imgUrl, setImgUrl }) {
  let navigate = useNavigate()
  const [form, setForm] = useState({
    email: "",
    restaurant: '',
    restaurantId: "",
    location: "",
    dish: '',
    rating: '',
    content: '',
    img: ''
  })
  const [modalOpen, setModalOpen] = useState(false)
  const [yelpResults, setYelpResults] = useState({
    businesses: [{
      location: {}
    }],
    region: {},
    total: 0
  })
  const [lat, setLat] = useState("")
  const [long, setLong] = useState("")
  const [getLatLong, setGetLatLong] = useState(false)

  const [search, setSearch] = useState("")
  const [location, setLocation] = useState("")
  

  // geo location stuff
  useLayoutEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            console.log(result.state)
            result.onchange = () => {
              console.log(result.state)
            }
            navigator.geolocation.getCurrentPosition((postion) => {
              setLat(postion.coords.latitude)
              console.log("latitude", lat)
              setLong(postion.coords.longitude)
              console.log("longitude", long)
              setGetLatLong(true)
            })
          } else if (result.state === "prompt") {
            console.log(result.state)
          } else if (result.state === "denied") {
            console.log(result.state)
          }
        })
    } else {
      console.warn("sorry current location not available")
    }
  }, [long, lat])

  // modal code
  Modal.setAppElement(document.getElementById("newPostContainer"))

  const openModal = () => {
    setModalOpen(true);
  }
  const closeModal = () => {
    setModalOpen(false);
  }

  // function to get yelp data
  const handleYelpRestAPI = async (e) => {
    e.preventDefault()
    // const SearchTerm = "pizza"
    const reqParams = {
      params: {
        lat,
        long,
        term: search,
        location: location
      }
    }
    const yelpResponse = await axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api-v1/restaurants/yelpApi`, reqParams)
    console.log(yelpResponse.data)
    setYelpResults(yelpResponse.data)
    console.log(yelpResults)

  }

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

  // handle submit to create new post
  const handleSubmit = async (e, form, setForm) => {
    try {
      e.preventDefault()
      console.log("form:", form)
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/posts`, form)
      console.log(response)

      setForm({
        restaurant: '',
        restaurantObj:{},
        location:"",
        dish: '',
        rating: '',
        content: '',
        img: ''
      })
      // setIsLoaded(true)

      navigate('/feed')

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

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  }

  const showYelpResults = yelpResults.businesses.map((business) => {
    return (
      <>
        <div
          className="flex my-[10px] border rounded-lg"
          onClick={()=>{
            setForm({ ...form, restaurant: business.name, restaurantId: business.id  })
            setModalOpen(false)
          }}
          >
          <div>
            <img
              className="w-[150px] h-[150px]"
              src={business.image_url} alt={`image of ${business.name}`} />
          </div>
          <div
          className="flex flex-col justify-center mx-[10px]">
            <p
            className="font-bold text-xl"
            >{business.name}</p>
            <p
            className="text-lg"
            >{business.location.address1}</p>
            <p
             className="text-lg"
            >{business.location.city}</p>
          </div>
        </div>
      </>
    )
  })


  return (
    <>{
      getLatLong ? 
      <div id="newPostContainer">
        <h1>create newPost</h1>
        <FileUploadForm
          imgUrl={imgUrl}
          setImgUrl={setImgUrl}
          setForm={setForm}
          form={form}
        />
        <PostForm
          form={form}
          setForm={setForm}
          handleSubmit={handleSubmit}
          imgUrl={imgUrl}
          setImgUrl={setImgUrl}
          rerouteUrl='/posts'
          openModal={openModal}
          hasModal={true}
        />
      </div>
      : "LOADING"
    }
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div
          className="h-[50rem] w-[50rem]"          >
          <button
            className="border rounded-lg bg-slate-100 w-[30px] h-[30px]"
            onClick={closeModal}
          >X</button>
          <form
          className="flex justify-center"
            onSubmit={handleYelpRestAPI}>
            <input
              type="text"
              className="border"
              placeholder="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <input
              type="text"
              placeholder="location"
              className="border"
              list="locations"
              value={location}
              defaultValue="Current Location"
              onChange={e => setLocation(e.target.value)}
            />
            <datalist id="locations">
              <option value="Current Location">Current Location</option>

            </datalist>

            <button>Search</button>
          </form>
          {showYelpResults}
        </div>
      </Modal>
    </>
  )
}