import { useEffect, useState } from "react"
import axios from 'axios'
import Modal from 'react-modal';
import PostDetail from "./PostDetail";
import { useNavigate } from "react-router-dom";

export default function Feed({ currentUser }) {
    const navigate = useNavigate()
    const [posts, setPosts] = useState([{
        dish: {
            dishName: '',
            restaurant: {
                name: ""
            }
        },
        poster: {},
        image: {}
    }]
    )

    const [modalOpen, setModalOpen] = useState(false)
    const [viewPostId, setViewPostId] = useState("")

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/posts`)
            .then(response => {
                console.log(response)
                setPosts(response.data)
            })
            .catch(console.warn)
    }, [])
    const msg = "No posts. Please Create new Post"

    const post = posts.map((post, i) => {
        return (
            <div
                id="whole-card-container"
                key={`post_${i}`}
                className='flex flex-col border my-[1rem] mx-[33rem] shadow-md rounded-lg'
            >
                <h2
                    id="userName-text"
                    className="
                    text-start font-['Roboto'] pl-4 pt-1 font-black text-lg tracking-wide no-underline
                    hover:underline"
                    onClick={() => { navigate(`/profile/${post.poster.userName}`) }}
                >
                    {post.poster.userName ? post.poster.userName : ''}
                </h2>

                <p
                    id="restaurantName-text"
                    className="text-start font-['Roboto'] pl-5 pb-2 text-sm font-thin"
                >
                    {post.dish.restaurant.name ? post.dish.restaurant.name : ''}
                </p>

                <img
                    id="image"
                    onClick={() => {
                        openModal()
                        setViewPostId(post._id)
                        console.log("post_id",post._id)
                        console.log("viewPostId",viewPostId)
                    }}
                    className="w-[475px] min-w-[475px] h-[475px]min-h-[475px]"
                    src={post.image.cloud_id}
                    alt={post.dish.dishName}
                />

                <p
                    id="dishName-text"
                    className="text-start font-['Roboto'] pl-3 pt-2 pb-2 text-md font-semibold "
                >
                    {post.dish.dishName ? post.dish.dishName : ''}
                </p>

            </div>
        )
    }).reverse()

    // MODAL STUFF


    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: 0,
            overflow: 'hidden visible',
            'max-height': 'calc(100vh - 60px)',
            'overflow-y': 'scroll',
            'max-width': '30rem',
            'border-radius': '8px',
             /* scroll bar width */
             '&::-webkit-scrollbar': { width: '10px' },
             '&::-webkit-scrollbar-track': { 'box-shadow' : 'inset 0 0 2px #333' },
             /* scroll bar handle */
             '&::-webkit-scrollbar-thumb': {
                background: 'rgba(51, 51, 51, 0.8)',
                opacity: 0.6,
                'border-radius': '10px'
            }
            
             //  &::- webkit - scrollbar {
            //     "width": "10px"
            // }

            // /* scroll bar track */
            // &:: -webkit - scrollbar - track {
            //     box - shadow: inset 0 0 2px #333;
            //     border - radius: 10px;
            // }

           

            // /* scroll bar handle on hover */
            // &:: -webkit - scrollbar - thumb:hover {
            //     background: rgba(51, 51, 51, 1);
            // }
        },
        
    };

const openModal = () => setModalOpen(true)
const closeModal = () => setModalOpen(false)

return (
    <>
        <div
            id="feedContainer"
            className="grid justify-center"
        >
            {posts.length > 0 ? post : msg}

        </div>
        <Modal
            isOpen={modalOpen}
            style={customStyles}
            onRequestClose={closeModal}
        >
            <PostDetail
                currentUser={currentUser}
                id={viewPostId}
                closeModal={closeModal}
            />
        </Modal>
    </>
)
}

