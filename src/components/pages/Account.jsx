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
    

    
    useEffect(()=>{
        const getUserInfo = async () => {
            const jwtToken = localStorage.getItem("jwt")
            const decoded = jwt_decode(jwtToken)
            // setEmail(userEmail)
            console.log(decoded.id)
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/profile/${decoded.id}`)
            console.log("useEff response:",response.data)
            setUserName(response.data.userName)
            setFirstName(response.data.firstName)
            setLastName(response.data.lastName)
            setEmail(response.data.email)
        }
        getUserInfo()
    },[])

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
        const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/profile/${decoded.id}`,userInfoReqBody)
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

        if (newPassword !== verifyNewPassword){
            setMsg("Password Validation Failed, new password and verify new password must be the same")
            console.log(msg)
            return
        }

        // console.log("change password")
        const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/changepassword`,{
            currentPassword,
            newPassword,
            userId 
        })
        // console.log(passwordReqBody)
        console.log(response)

    }

    return (
        <div>
            <h1>UserName</h1>
            <form onSubmit={handleEditUserSubmit}>
                <div>
                    <label htmlFor="username">User Name: </label>
                    <input
                        id="username"
                        value={userName}
                        onChange={e => { setUserName(e.target.value) }}
                    />
                </div>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        id="firstName"
                        value={firstName}
                        onChange={e => { setFirstName(e.target.value) }}
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name: </label>
                    <input
                        id="lastName"
                        value={lastName}
                        onChange={e => { setLastName(e.target.value) }}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input
                        id="email"
                        value={email}
                        onChange={e => { setEmail(e.target.value) }}
                    />
                </div>
                <button type="submit">Update Info</button>
            </form>
            <form onSubmit={handleChangePasswordSubmit}>
                <div>
                    <label htmlFor="currentPassword">Current Password: </label>
                    <input
                        id="currentPassword"
                        type="password"
                        value={currentPassword}
                        onChange={e => { setCurrentPassword(e.target.value) }}
                    />
                </div>
                <div>
                    <label htmlFor="newPassword">New Password: </label>
                    <input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={e => { setNewPassword(e.target.value) }}
                    />
                </div>
                <div>
                    <label htmlFor="verifyNewPassword">Verify New Password: </label>
                    <input
                        id="verifyNewPassword"
                        type="password"
                        value={verifyNewPassword}
                        onChange={e => { setVerifyNewPassword(e.target.value) }}
                    />
                </div>
                <button type="submit">Change Password</button>
            </form>
        </div>
    )
}