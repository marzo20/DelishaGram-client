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
    dish: '',
    rating: '',
    content: '',
    img: ''
  })
  const [modalOpen, setModalOpen] = useState(false)
  const [yelpResults, setYelpResults] = useState({
    businesses:[{
      location:{}
    }],
    region:{},
    total:0
  })
  const [pickedRestId, setPickedRestId] = useState("")
  const [lat, setLat] = useState("")
  const [long, setLong] = useState("")
  const [restSearch, setRestSearch] = useState("")

  // modal code
  Modal.setAppElement(document.getElementById("newPostContainer"))
  
  const openModal = () => {
    handleYelpRestAPI()
  }
  const closeModal = () => {
    setModalOpen(false);
  }

  // function to get yelp data
  const handleYelpRestAPI = async () => {
    const SearchTerm = "pizza"
    const reqParams = {
      params: {
        lat,
        long,
        term: SearchTerm,

      }
    }
    const yelpResponse = await axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api-v1/restaurants/yelpApi`, reqParams)
    console.log(yelpResponse.data)
    setYelpResults(yelpResponse.data)
    console.log(yelpResults)
    setModalOpen(true);
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
      // console.log(response)
      // setPosts([...posts, response.data])

      setForm({
        restaurant: '',
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
  }, [])

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  }



  

  const showYelpResults = yelpResults.businesses.map((business)=>{
    return(
      <>
        <div
        className="flex">
            <div>
              <img 
              className="w-[75px]"
              src={business.image_url} alt={`image of ${business.name}`} />
            </div>
            <div>
              <p>{business.name}</p>
              <p>{business.location.address1}</p>
              <p>{business.location.city}</p>
            </div>
        </div>
      </>
    )
  })


  return (
    <>
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
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div
          className="h-[30rem] w-[30rem]">
          <button
            onClick={closeModal}
          >X</button>
          {showYelpResults}
        </div>
      </Modal>
    </>
  )
}