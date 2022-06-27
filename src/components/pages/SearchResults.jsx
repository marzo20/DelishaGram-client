export default function SearchResults({searchResult}){
    
    const resultPosts = searchResult.map((result, i) => {
        return (
            <div key={`resultpost${i}`}>
                <h1>{result.restaurant.name}</h1>
                <h2>{result.dishName}</h2>
            </div>
        )
    })
    return(
        <>
            {resultPosts}
        </>
    )
}