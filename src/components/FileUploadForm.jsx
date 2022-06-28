import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function FileUploadForm({imgUrl, setImgUrl, setForm, form}) {
    const { id } = useParams()

    const [formImg, setFormImg] = useState('')
    const [msg, setMsg] = useState('')
    const [displayImg, setDisplayImg] = useState({
        // post: {
        //     id: ''
        // }
    })

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/posts/${id}`)
    //             console.log('Consolelogging:', response.data)
    //         } catch (err) {
    //             console.warn(err)
    //         }
    //     }
    //     fetchData()
    // }, [])

    const handleImageSubmit = async e => {
        e.preventDefault()
        try {
            // multipart form data object
            const fd = new FormData()
            // append the data
            // fd.append('title', sometitle)
            fd.append('image', formImg)
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/images`, fd)
            console.log(response.data)
            setDisplayImg(response.data.cloudImage)
            setForm({ ...form, img: response.data.cloudImage })

        } catch (err) {
            console.warn(err)
            setMsg('go check the server console, thar was an arror')
        }
    }

    return (
        <div>
            <h4>upload a pic!</h4>
            {
                displayImg
                &&
                <img
                    src={displayImg}
                    alt='ur pic'
                />
            }

            <form
                onSubmit={handleImageSubmit}
                encType='multipart/form'
            >
                <label htmlFor='image'>Upload an Image</label>
                <input
                    // no value on this controlled form
                    type="file"
                    id="image"
                    onChange={e => setFormImg(e.target.files[0])}
                />

                <input type='submit' />

            </form>
        </div>
    )
}