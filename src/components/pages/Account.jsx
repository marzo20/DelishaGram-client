import { useState, useEffect } from "react"
import axios from "axios"
import jwt_decode from "jwt-decode"

export default function ProfileEdit() {
    const [userName, setUserName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")

    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [verifyNewPassword, setVerifyNewPassword] = useState("")

    const [msg, setMsg] = useState("")



    useEffect(() => {
        const getUserInfo = async () => {
            const jwtToken = localStorage.getItem("jwt")
            const decoded = jwt_decode(jwtToken)
            // setEmail(userEmail)
            console.log(decoded.id)
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/profile/${decoded.id}`)
            console.log("useEff response:", response.data)
            setUserName(response.data.userName)
            setFirstName(response.data.firstName)
            setLastName(response.data.lastName)
            setEmail(response.data.email)
        }
        getUserInfo()
    }, [])

    const handleEditUserSubmit = async (e) => {
        e.preventDefault()
        console.log("update user info")
        const jwtToken = localStorage.getItem("jwt")
        const decoded = jwt_decode(jwtToken)
        const userInfoReqBody = {
            userName,
            firstName,
            lastName,
            email
        }
        const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/profile/${decoded.id}`, userInfoReqBody)
        // console.log("put response:",response.data)
        setUserName(response.data.userName)
        setFirstName(response.data.firstName)
        setLastName(response.data.lastName)
        setEmail(response.data.email)
        // console.log(userInfoReqBody)
    }

    const handleChangePasswordSubmit = async (e) => {
        e.preventDefault()
        const jwtToken = localStorage.getItem("jwt")
        const decoded = jwt_decode(jwtToken)
        const userId = decoded.id
        console.log(userId)

        if (newPassword !== verifyNewPassword) {
            setMsg("Password Validation Failed, new password and verify new password must be the same")
            console.log(msg)
            return
        }

        // console.log("change password")
        const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/changepassword`, {
            currentPassword,
            newPassword,
            userId
        })
        // console.log(passwordReqBody)
        console.log(response)

    }

    return (
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-10 m-20 mt-[15rem] mr-[6rem]">
            <div className="border-slate-100 border-2 w-[30rem] rounded-lg ml-[7rem] justify-self-end">
                <h1
                    className="font-['Roboto'] pt-3 pl-3 underline"
                >Update User Information</h1>
                <form onSubmit={handleEditUserSubmit}>

                    <div className="grid grid-cols-2 m-2">
                        <label
                        className="font-['Roboto'] pl-12"
                        htmlFor="username">User Name: </label>
                        <input
                        className="border border-sm font-['Roboto'] rounded-lg"
                            id="username"
                            value={userName}
                            onChange={e => { setUserName(e.target.value) }}
                        />
                    </div>
                    <div className="grid grid-cols-2 m-2 font-['Roboto']">
                        <label 
                        className="font-['Roboto'] pl-12"
                        htmlFor="firstName">First Name:</label>
                        <input
                        className="border border-sm font-['Roboto'] rounded-lg"
                            id="firstName"
                            value={firstName}
                            onChange={e => { setFirstName(e.target.value) }}
                        />
                    </div>
                    <div className="grid grid-cols-2 m-2">
                        <label 
                        className="font-['Roboto'] pl-12"
                        htmlFor="lastName">Last Name: </label>
                        <input
                        className="border border-sm font-['Roboto'] rounded-lg"
                            id="lastName"
                            value={lastName}
                            onChange={e => { setLastName(e.target.value) }}
                        />
                    </div>
                    <div className="grid grid-cols-2 m-2">
                        <label 
                        className="font-['Roboto'] pl-12"
                        htmlFor="email">Email: </label>
                        <input
                        className="border border-sm font-['Roboto'] rounded-lg"
                            id="email"
                            value={email}
                            onChange={e => { setEmail(e.target.value) }}
                        />
                    </div>
                    <button 
                    className="border border-sm w-36 m-2 font-['Roboto'] rounded-lg bg-black text-white"
                    type="submit">Update Info</button>
                </form>
            </div>
            <div className="border-slate-100 border-2 w-[30rem] rounded-lg">
                <h1
                className="font-['Roboto'] pt-3 pl-3 underline"
                >Update Password</h1>
                <form 
                onSubmit={handleChangePasswordSubmit}>
                    <div className="grid grid-cols-2 m-2">
                        <label 
                        className="font-['Roboto'] pl-12"
                        htmlFor="currentPassword">Current Password: </label>
                        <input
                        className="border border-sm font-['Roboto'] rounded-lg"
                            id="currentPassword"
                            type="password"
                            value={currentPassword}
                            onChange={e => { setCurrentPassword(e.target.value) }}
                        />
                    </div>
                    <div className="grid grid-cols-2 m-2">
                        <label 
                        className="font-['Roboto'] pl-12"
                        htmlFor="newPassword">New Password: </label>
                        <input
                        className="border border-sm font-['Roboto'] rounded-lg"
                            id="newPassword"
                            type="password"
                            value={newPassword}
                            onChange={e => { setNewPassword(e.target.value) }}
                        />
                    </div>
                    <div className="grid grid-cols-2 m-2">
                        <label 
                        className="font-['Roboto'] pl-12"
                        htmlFor="verifyNewPassword">Verify New Password: </label>
                        <input
                        className="border border-sm font-['Roboto'] rounded-lg"
                            id="verifyNewPassword"
                            type="password"
                            value={verifyNewPassword}
                            onChange={e => { setVerifyNewPassword(e.target.value) }}
                        />
                    </div>
                    <button 
                    className="border border-sm m-2 w-36 font-['Roboto'] bg-black text-white rounded-lg mt-10"
                    type="submit">Change Password</button>
                </form>
            </div>
        </div>
    )
}