import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

export default function PostForm({ initialForm, handleSubmit }) {
    const [form, setForm] = useState(initialForm)
    const [pageLoaded, setPageLoaded] = useState(false)
    const token = localStorage.getItem("jwt")
    const user = jwtDecode(token)
    useEffect(() => {
        setForm({ ...form, email: user.email })
        console.log("current user", user)
    }, [])

    return (
        <>
            <h1>PostForm</h1>
            <form onSubmit={e => handleSubmit(e, form, setForm)}>
                <label htmlFor="restaurant">restaurant: </label>
                <input
                    type="text"
                    id='restaurant'
                    value={form.restaurant}
                    onChange={e => setForm({ ...form, restaurant: e.target.value })}
                    required
                />
                <label htmlFor="dish">dish: </label>
                <input
                    type="text"
                    id='dish'
                    value={form.dish}
                    onChange={e => setForm({ ...form, dish: e.target.value })}
                    required
                />
                <label htmlFor="rating">rating: </label>
                <input
                    type="number"
                    id='rating'
                    value={form.rating}
                    onChange={e => setForm({ ...form, rating: e.target.value })}
                    required
                />
                <label htmlFor="content">content: </label>
                <input
                    type="text"
                    id="content"
                    value={form.content}
                    onChange={e => setForm({ ...form, content: e.target.value })}
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}
