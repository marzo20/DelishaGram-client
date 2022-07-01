import { useState } from 'react'
import axios from 'axios'

export default function FileUploadForm({imgUrl, setImgUrl, setForm, form, closeImageModal}) {

    const [formImg, setFormImg] = useState('')
    const [msg, setMsg] = useState('')
    const [displayImg, setDisplayImg] = useState('')


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
            // setForm({ ...form, img: response.data.cloudImage })

        } catch (err) {
            console.warn(err)
            setMsg('go check the server console, thar was an arror')
        }
    }

    return (
        <div
        className='flex flex-col h-[35] w-[35] gap-2'
        >
            <h4>Choose File, and click submit, Save and Close to confirm!</h4>
            <div
            className='h-[35]'
            >
            {
                displayImg
                &&
                <img
                    className="w-[30rem] min-w-[30rem]"
                    src={displayImg}
                    alt='ur pic'
                />
            }
            </div>

            <form
                onSubmit={handleImageSubmit}
                encType='multipart/form'
            >
                <label htmlFor='image'>Upload an Image</label>
                <input
                    // no value on this controlled form
                    type="file"
                    id="image"
                    onChange={e => {
                        setFormImg(e.target.files[0])
                        // handleImageSubmit()
                    }}
                />

                <input 
                className="border-2 border-slate-200"
                type='submit' />

            </form>
            <button
            className="border-2 border-slate-200"
            onClick={()=>{
                closeImageModal()
                setForm({ ...form, img: displayImg })
            }}
            >Save and Close</button>
        </div>
    )
}