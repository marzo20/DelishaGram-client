import React from 'react'
import { Link } from 'react-router-dom'

export default function PostPreview({ dishName, restaurantName, userName, image, postId }) {
    return (
        <>
            <div className="border-slate-100 border-2">
                <Link to={`/posts/${postId}`}>
                    <div>
                        <img src={image} alt={dishName} />
                    </div>
                    <div>
                        <p>{userName}</p>
                        <p>{restaurantName}</p>
                        <p>{dishName}</p>
                    </div>
                </Link>
            </div>
        </>
    )
}
