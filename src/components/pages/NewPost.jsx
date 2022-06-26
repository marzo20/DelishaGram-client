import PostForm from "./PostForm"

export default function NewPost({ handleSubmit }){
    return(
        <>
            <h1>create newPost</h1>
            <PostForm initialForm={{
                email:"",
                restaurant: '',
                dish: '',
                rating: '',
                content: ''
            }}
                handleSubmit={handleSubmit} />
        </>
    )
}