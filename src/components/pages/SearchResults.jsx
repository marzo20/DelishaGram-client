// import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import PostPreview from "../PostPreview"
import axios from "axios"

export default function SearchResults({searchResult}){
    
    const [dishResults, setDishResults] = useState([])
    // const location = useLocation()
    // console.log("location: ",location)
    useEffect( ()=>{
        const fetchDishes = async () => {
            const dishResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/dishes/search/McChicken`)
            // console.log("Dish Search Response: ",dishResponse.data)
            const dishme = dishResponse.data
            setDishResults(dishme)
            console.log("dishResults: ",dishResults)
        }
        fetchDishes()
    },[])

    
    // const resultPosts = searchResult.map((result, i) => {
    //     return (
    //         <div key={`resultpost${i}`}>
    //             <h1>{result.restaurant.name}</h1>
    //             <h2>{result.dishName}</h2>
    //         </div>
    //     )
    // })
    return(
        <>
            {/* {resultPosts} */}
            <h1>Search Results:</h1>
        </>
    )
}