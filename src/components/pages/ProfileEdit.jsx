import { useState } from "react"

export default function ProfileEdit() {
    const [userInfo, setUserInfo] = useState({
        userName:"",
        firstName:"",
        lastName:"",
        email:""
    })

    const [password, setPassword] = useState({
        currentPassword:"",
        newPassword:"",
        verifyNewPassword:"",
    })

    const handleUserInfoSubmit = (e) => {
        e.preventDefault()
        console.log("update user info", userInfo)
    }

    const handleChangePasswordSubmit = (e) => {
        e.preventDefault()
        console.log("change password")
    }

    return (
        <>
            <h1>UserName</h1>
            <form onSubmit={handleUserInfoSubmit}>
                <label htmlFor="username">User Name: </label>
                <input
                    id="username"
                    value={userInfo.userName}
                    onChange={e=>{setUserInfo({userName:e.target.value})}}
                />

                <label htmlFor="firstName">First Name:</label>
                <input
                    id="firstName"
                    value={userInfo.firstName}
                    onChange={e=>{setUserInfo({firstName:e.target.value})}}
                />

                <label htmlFor="lastName">Last Name: </label>
                <input
                    id="lastName"
                    value={userInfo.lastName}
                    onChange={e=>{setUserInfo({lastName:e.target.value})}}
                />

                <label htmlFor="email"></label>
                <input
                    id="email"
                    value={userInfo.email}
                    onChange={e=>{setUserInfo({email:e.target.value})}}
                />
                <button type="submit">Submit Change</button>
            </form>
        </>
    )
}