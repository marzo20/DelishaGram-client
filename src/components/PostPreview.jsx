import React from 'react'
import { Link } from 'react-router-dom'

export default function PostPreview({ dishName, restaurantName, userName, image, postId }) {
    return (
        <>
            <div className="group border-slate-100 border-2 m-5">
                <Link to={`/posts/${postId}`}>
                    <div className="w-64 h-64 bg-black-100 relative">
                        <div
                        className={`absolute inset-0 bg-cover bg-center z-0`}
                        style={{backgroundImage: `url(${image})`}} ></div>
                        <div className="opacity-0 bg-black hover:opacity-80 duration-300 absolute inset-0 z-10 flex justify-center items-center text-3xl text-white text-center font-semibold">{restaurantName}</div>
                    </div>
                </Link>
            </div>
        </>
    )
}
