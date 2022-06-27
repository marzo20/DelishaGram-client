import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import PostPreview from "../PostPreview"
import axios from "axios"

export default function SearchResults({
    // searchDish, 
    // searchResult
}){
    
    const [dishResults, setDishResults] = useState({
        posts:[{
            dish: {
                restaurant:{}
            },
            poster:{}
        }]
    })
    const location = useLocation()
    const [loaded, setLoaded] = useState(false)
    console.log("location: ",location)
    useEffect( ()=>{
        const fetchDishes = async () => {
            try {
                const dishResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/dishes/search/${location.state.searchDish}`)
                // console.log("Dish Search Response: ",dishResponse.data)
                // const dishme = dishResponse.data
                // console.log("dishme",dishme)
                setDishResults(dishResponse.data)
                console.log("dishResults: ",dishResults)
            } catch (error) {
                console.log(error)
            }
        }
        fetchDishes()
    },[location])

    
    // const resultPosts = searchResult.map((result, i) => {
    //     return (
    //         <div key={`resultpost${i}`}>
    //             <h1>{result.restaurant.name}</h1>
    //             <h2>{result.dishName}</h2>
    //         </div>
    //     )
    // })

    const renderResults = dishResults.posts.map((result)=>{
        return(
            <div>
                <p>{result.dish.dishName}</p>
                <p>{result.dish.restaurant.name}</p>
                <p>{result.poster.userName}</p>
            </div>
        )
    })
    return(
        <>
            <h1>Search Results:</h1>
            {renderResults}
        </>
    )
}