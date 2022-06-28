import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import PostPreview from "../PostPreview"
import axios from "axios"

export default function SearchResults(){
    const [msg, setMsg] = useState("")
    const [getResponse, setGetResponse] = useState(false)
    const [dishResults, setDishResults] = useState({
        posts:[{
            dish: {
                restaurant:{}
            },
            poster:{}
        }]
    })
    const location = useLocation()
    console.log("location: ",location)
    useEffect( ()=>{
        fetchDishes()
    },[location])

    const fetchDishes = async () => {
        try {
            const dishResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/dishes/search/${location.state.searchDish}`)
            // setHttpStatus(dishResponse.status)
            if (dishResponse.data === "") {
                setGetResponse(false)
                setMsg("No dishes found")
                setDishResults({
                    posts:[{
                        dish: {
                            restaurant:{}
                        },
                        poster:{}
                    }]
                })
            } else {
                setGetResponse(true)
                setDishResults(dishResponse.data)
            }
            console.log("dishResponse: ",dishResponse)
        } catch (error) {
            console.log(error)
        }
    }

    
    const renderResults = dishResults.posts.map((result)=>{
        return(
            <>
                <PostPreview
                    dishName = {result.dish.dishName}
                    restaurantName = {result.dish.restaurant.name}
                    userName = {result.poster.userName}
                />
            </>
        )
    })
    
    return(
        <>
            <h1>Search Results:</h1>
            {/* {httpStatus === 200 ? renderResults : msg} */}
            {getResponse ? renderResults : msg}
        </>
    )
}