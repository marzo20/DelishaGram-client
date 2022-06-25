
export default function Posts({ posts }) {
  
    const post = posts.map((post, i) => {
        return (
            <div key={`post_${i}`}>
                <h1>Restaurant: {post.restaurant}</h1>
                <h2>Dish: {post.dish}</h2>
                <h3>Rate: {post.rating}</h3>
                <h1>Content: {post.content}</h1>

            </div>
        )
    })
    return (
        <>
            <h1>Render all posts</h1>
            <p>{post}</p>
        </>
    )
}