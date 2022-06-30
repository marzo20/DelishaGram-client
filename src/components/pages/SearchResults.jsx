import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import PostPreview from "../PostPreview"
import axios from "axios"


export default function SearchResults( {currentUser }) {
    const [msg, setMsg] = useState("")
    const [getResponse, setGetResponse] = useState(false)
    const [dishResults, setDishResults] = useState({
        posts: [{
            dish: {
                restaurant: {}
            },
            image: {},
            poster: {}
        }]
    })
    const location = useLocation()
    console.log("location: ", location)
    useEffect(() => {
        fetchDishes()
    }, [location])

    const fetchDishes = async () => {
        try {
            const dishResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/dishes/search/${location.state.searchDish}`)
            // setHttpStatus(dishResponse.status)
            if (dishResponse.data === "") {
                setGetResponse(false)
                setMsg("No dishes found")
                setDishResults({
                    posts: [{
                        dish: {
                            restaurant: {}
                        },
                        image: {},
                        poster: {}
                    }]
                })
            } else {
                setGetResponse(true)
                setDishResults(dishResponse.data)
            }
            console.log("dishResponse: ", dishResponse)
        } catch (error) {
            console.log(error)
        }
    }


    const renderResults = dishResults.posts.map((result) => {
        return (
            <>
                <PostPreview
                    postId={result._id}
                    image={result.image.cloud_id}
                    dishName={result.dish.dishName}
                    restaurantName={result.dish.restaurant.name}
                    userName={result.poster.userName}
                    currentUser={currentUser}
                />
            </>
        )
    })

    return (
        <>
            <h1 className="flex justify-center m-4 text-3xl font-bold">Search Results</h1>
            {/* {httpStatus === 200 ? renderResults : msg} */}
            <div
            className="grid grid-cols-3 mx-[15rem] justify-items-center">
                {getResponse ? renderResults : msg}
            </div>
        </>
    )
}