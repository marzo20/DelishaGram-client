import PostForm from "./PostForm"

export default function NewPost({ handleSubmit, imgUrl, setImgUrl }){
    return(
        <>
            <h1>create newPost</h1>
            <PostForm initialForm={{
                email:"",
                restaurant: '',
                dish: '',
                rating: '',
                content: '',
                img: ''
            }}
                handleSubmit={handleSubmit}
                imgUrl={imgUrl}
                setImgUrl={setImgUrl}  
                rerouteUrl='/posts'
            />
        </>
    )
}