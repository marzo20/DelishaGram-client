import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import PostPreview from "../PostPreview"
import axios from "axios"

export default function SearchResults(){
    const [msg, setMsg] = useState("")
    const [httpStatus, setHttpStatus] = useState(null)
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
        const fetchDishes = async () => {
            try {
                const dishResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/dishes/search/${location.state.searchDish}`)
                setHttpStatus(dishResponse.status)
                if (httpStatus === 204) {
                    setMsg("No dishes found")
                } else if (httpStatus === 200){
                    setDishResults(dishResponse.data)
                }
                console.log("dishResponse: ",dishResponse)
            } catch (error) {
                console.log(error)
            }
        }
        fetchDishes()
    },[location, httpStatus])


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
            {httpStatus === 200 ? renderResults : msg}
        </>
    )
}