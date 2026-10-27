import React from 'react'
import HomePage from '../User/HomePage/HomePage'
import MyProfile from '../User/MyProfile/MyProfile'
import EditProfile from '../User/EditProfile/EditProfile'
import ChangePassword from '../User/ChangePassword/ChangePassword'
import { Route, Routes } from 'react-router'

const UserRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/myprofile" element={<MyProfile />} />
                <Route path="/editprofile" element={<EditProfile />} />
                <Route path="/changepassword" element={<ChangePassword />} />
            </Routes>
        </div>
    )
}

export default UserRoutes