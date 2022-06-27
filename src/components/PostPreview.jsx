import React from 'react'

export default function PostPreview({ dishName, restaurantName, userName }) {
    return (
        <>
            <div>
                <div>
                    <p>Image Place Holder</p>
                </div>
                <div>
                    <p>{userName}</p>
                    <p>{restaurantName}</p>
                    <p>{dishName}</p>
                </div>
            </div>
        </>
    )
}
