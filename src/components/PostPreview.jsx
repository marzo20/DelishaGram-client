import React from 'react'
import { useState, useEffect } from 'react'
import Modal from 'react-modal';
import PostDetail from './pages/PostDetail';


export default function PostPreview({ dishName, restaurantName, currentUser, image, postId }) {
    const [modalOpen, setModalOpen] = useState(false)
    const [viewPostId, setViewPostId] = useState("")

    	//MODAL CODE
	Modal.setAppElement(document.getElementById("profileContainer"))
	const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const openModal = () => setModalOpen(true)
    const closeModal = () => setModalOpen(false)

    return (
        <>
            <div 
            id='profileContainer'
            className="group border-slate-100 border-2 m-5">
                {/* <Link to={`/posts/${postId}`}> */}
                    <div 
                    onClick={()=>{
                        openModal()
                        setViewPostId(postId)
                    }}
                    className="w-64 h-64 bg-black-100 relative">
                        <div
                        className={`absolute inset-0 bg-cover bg-center z-0`}
                        style={{backgroundImage: `url(${image})`}} ></div>
                        <div className="opacity-0 bg-black hover:opacity-80 duration-300 absolute inset-0 z-1 flex justify-center items-center text-3xl text-white text-center font-semibold">{restaurantName}</div>
                    </div>
                {/* </Link> */}
            </div>
            <Modal
                isOpen={modalOpen}
                style={customStyles}
                onRequestClose={closeModal}
            >
                <PostDetail
                    currentUser={currentUser}
                    id={viewPostId}
                />
            </Modal>
        </>
    )
}
