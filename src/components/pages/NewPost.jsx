import PostForm from "./PostForm"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect, useLayoutEffect, useState } from "react"
import FileUploadForm from '../FileUploadForm'
import Modal from 'react-modal';
import jwt_decode from "jwt-decode"

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
  const [currentUserName, setCurrentUserName] = useState("")
  const [yelpModalOpen, setYelpModalOpen] = useState(false)
  const [imageModalOpen, setImageModalOpen] = useState(false)
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
  const [location, setLocation] = useState("Current Location")


  // geo location stuff
  useLayoutEffect(() => {
    const jwtToken = localStorage.getItem("jwt")
    const decoded = jwt_decode(jwtToken)
    console.log("decoded: ", decoded)
    setCurrentUserName(decoded.userName)
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

  const openImageModal = () => {
    setImageModalOpen(true)
  }

  const closeImageModal = () => {
    setImageModalOpen(false)
  }

  const openYelpModal = () => {
    setYelpModalOpen(true);
  }
  const closeYelpModal = () => {
    setYelpModalOpen(false);
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
        restaurantObj: {},
        location: "",
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
          onClick={() => {
            setForm({ ...form, restaurant: business.name, restaurantId: business.id })
            setYelpModalOpen(false)
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
      // renders when lat and long is obtained
      getLatLong ?

        <div
          id="newPostContainer"
          className="flex flex-row mx-auto">
          <div
            className="pl-[10rem] basis-[30%] grid"
          >
            <div
              className="w-[30rem] place-self-center"
            >
              <h1>create newPost</h1>

              {/* Button to Open Image Selector */}
              <div
                className="grid grid-cols-2"
              >
                  <p>Image: </p>
                  <button
                    onClick={openImageModal}
                    className="border w-[100px] h-[20px] place-self-center align-center"
                  >+</button>
              </div>

              {/* Post Form */}
              <PostForm
                form={form}
                setForm={setForm}
                handleSubmit={handleSubmit}
                imgUrl={imgUrl}
                setImgUrl={setImgUrl}
                rerouteUrl='/posts'
                openYelpModal={openYelpModal}
                hasModal={true}
              />
            </div>
          </div>


          {/* POST PREVIEW */}
          <div
            className="basis-[70%] flex justify-center mt-5">
            <div
              className="h-[50rem] w-[40rem] border"
            >
              <div
                className="flex flex-col"
              >
                <p
                  className="pl-4">{currentUserName}</p>
                <p
                  className="pl-5">{form.restaurant}</p>
              </div>
              <div
                className="flex justify-center"
              >
                <img
                  src={form.img}
                  alt={`image of ${form.dish}`}
                />
              </div>
              <div
                className="flex justify-between pt-1"
              >
                <p
                  className="pl-4"
                >{form.dish}</p>
                <p
                  className="pr-8">Rating: {form.rating}</p>
              </div>
              <div>
                <p
                  className="pl-4">{form.content}</p>
              </div>
            </div>
          </div>
        </div>
        : "LOADING"
    }

      {/* IMAGE MODAL */}
      <Modal
        isOpen={imageModalOpen}
        onRequestClose={closeImageModal}
        style={customStyles}
      >
        <FileUploadForm
          imgUrl={imgUrl}
          setImgUrl={setImgUrl}
          setForm={setForm}
          form={form}
          closeImageModal={closeImageModal}
        // openYelpModal={openYelpModal}
        />
      </Modal>


      {/* Restaurant Search Modal */}
      <Modal
        isOpen={yelpModalOpen}
        onRequestClose={closeYelpModal}
        style={customStyles}
      >
        <div
          className="h-[50rem] w-[50rem]"          >
          <button
            className="border rounded-lg w-[30px] h-[30px]"
            onClick={closeYelpModal}
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
          {console.log(yelpResults.businesses)}
          {yelpResults.businesses.length > 1 ? showYelpResults: "Please Search for a Restaurant to Select" }
        </div>
      </Modal>
    </>
  )
}