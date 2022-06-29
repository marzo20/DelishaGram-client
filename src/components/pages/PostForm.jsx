import { useEffect } from 'react'
import jwtDecode from 'jwt-decode'

export default function PostForm({ form, setForm, handleSubmit, hasModal, openModal, setModalOpen }) {   
    const token = localStorage.getItem("jwt")
    const user = jwtDecode(token)

    // styling classes:
    const buttonStyle = "border bg-slate-100"

    const inputDivStyle = "my-[5px] grid grid-cols-3"
    const labelStyle = ""
    const inputStyle = "border text-center col-span-2"

    const textAreaStyle = "resize-y border col-span-2"

    useEffect(() => {
        setForm({ ...form, email: user.email })
        console.log("current user", user)
    }, [])

    return (
        <>
            <form 
            className='border flex flex-col'
            onSubmit={e => {
                handleSubmit(e, form, setForm)
                // navigate(rerouteUrl)
            }
            }>
                <div>
                {hasModal ?
                    <button
                    className={`${buttonStyle}`}
                        type='button'
                        onClick={openModal}
                    >
                        Add a Restaurant
                    </button>
                    :
                    ""
                }
                <div
                className={inputDivStyle}>
                <label 
                className={labelStyle}
                htmlFor="restaurant">Restaurant</label>
                <input
                    className={inputStyle}
                    type="text"
                    id='restaurant'
                    placeholder='Select a Restaurant'
                    value={form.restaurant}
                    onChange={e => setForm({ ...form, restaurant: e.target.value })}
                    required
                    readOnly
                />
                </div>

                </div>
                <div
                className={inputDivStyle}
                >
                <label htmlFor="dish">dish: </label>
                <input
                className={inputStyle}
                    type="text"
                    id='dish'
                    placeholder='Bone Marrow Pasta'
                    value={form.dish}
                    onChange={e => setForm({ ...form, dish: e.target.value })}
                    required
                />
                </div>
                <div
                className={inputDivStyle}
                >
                <label htmlFor="rating">rating: </label>
                <input
                className={inputStyle}
                    type="number"
                    id='rating'
                    min="1"
                    max="5"
                    value={form.rating}
                    onChange={e => setForm({ ...form, rating: e.target.value })}
                    required
                />
                </div>
                <div
                className={inputDivStyle}
                >
                <label htmlFor="content">content: </label>
                <textarea
                className={textAreaStyle}
                    type="text"
                    id="content"
                    value={form.content}
                    onChange={e => setForm({ ...form, content: e.target.value })}
                    required
                />
                </div>
                <div 
                className='flex justify-center my-[10px]'>
                <button 
                className={`${buttonStyle} w-[100px]`}
                type="submit">Share!</button>
                </div>
            </form>

        </>
    )
}
